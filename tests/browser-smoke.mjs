/**
 * Browser-level smoke tests for both restaurant pages.
 * Uses runner-provided Chrome and puppeteer-core; no downloaded browser binary.
 * Saves phone and desktop screenshots as GitHub Actions artifacts.
 */
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { readFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import puppeteer from 'puppeteer-core';

const root = path.resolve(process.cwd());
const chromeCandidates = [
  process.env.CHROME_BIN,
  '/usr/bin/google-chrome',
  '/usr/bin/google-chrome-stable',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser'
].filter(Boolean);
const chrome = chromeCandidates.find(existsSync);
assert.ok(chrome, 'Chrome/Chromium binary unavailable for real-browser smoke test');

const mime = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript' };
const server = createServer(async (req, res) => {
  let file;
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    file = path.resolve(root, '.' + (pathname === '/' ? '/index.html' : pathname));
    if (!file.startsWith(root + path.sep)) throw new Error('invalid path');
    const contents = await readFile(file);
    res.writeHead(200, {'content-type': (mime[path.extname(file)] || 'text/plain') + '; charset=utf-8'});
    res.end(contents);
  } catch {
    res.writeHead(404);
    res.end('Not found');
  }
});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const base = 'http://127.0.0.1:' + server.address().port;
const browser = await puppeteer.launch({
  executablePath: chrome,
  headless: true,
  args: ['--no-sandbox', '--disable-dev-shm-usage']
});
const output = path.join(root, 'artifacts', 'browser');
await mkdir(output, {recursive:true});

async function visit(file, width, height, name, mobile) {
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  await page.setViewport({width,height,deviceScaleFactor:1.5,isMobile:mobile,hasTouch:mobile});
  await page.goto(base + '/' + file, {waitUntil:'domcontentloaded',timeout:30000});
  await page.evaluate(() => localStorage.removeItem('restaurantMotionPreference'));
  await page.reload({waitUntil:'domcontentloaded',timeout:30000});
  await page.waitForFunction(() => document.documentElement.classList.contains('motion-ready'),{timeout:10000});
  const animated = await page.evaluate(() => ({
    on:document.documentElement.classList.contains('motion-on'),
    hero:getComputedStyle(document.querySelector('.hero-copy>h1,.quicklys-intro>h1')).animationName,
    banner:getComputedStyle(document.querySelector('.ticker-track')).animationName,
    viewport:window.innerWidth,
    document:document.documentElement.scrollWidth,
    toggle:document.querySelector('[data-motion-toggle]')?.getAttribute('aria-pressed')
  }));
  assert.ok(animated.on, name + ': expected motion to start on normally');
  assert.match(animated.hero,/hero-text-rise/,name + ': hero title should animate');
  assert.match(animated.banner,/ticker-travel/,name + ': marquee should move');
  assert.ok(animated.document<=animated.viewport+2, name + ': page must not horizontally overflow: '+JSON.stringify(animated));
  assert.equal(animated.toggle,'true');

  if (mobile) {
    const state = await page.evaluate(() => ({
      hamburger:getComputedStyle(document.querySelector('.menu-toggle')).display,
      desktopCTA:getComputedStyle(document.querySelector('.header-cta')).display,
      mobileActions:getComputedStyle(document.querySelector('.mobile-action-bar')).display
    }));
    assert.notEqual(state.hamburger,'none',name+': mobile menu must show');
    assert.equal(state.desktopCTA,'none',name+': large CTA must not crowd header');
    assert.notEqual(state.mobileActions,'none',name+': accessible mobile actions should show');
    await page.click('.menu-toggle');
    assert.equal(await page.$eval('.menu-toggle',b=>b.getAttribute('aria-expanded')),'true');
    await page.keyboard.press('Escape');
    assert.equal(await page.$eval('.menu-toggle',b=>b.getAttribute('aria-expanded')),'false');
    if (file==='index.html') {
      assert.equal(await page.$eval('.feature-grid',el=>el.scrollWidth>el.clientWidth),true,'photos should swipe on phones');
    }
  } else if(width>=1460) {
    assert.notEqual(await page.$eval('.section-rail',el=>getComputedStyle(el).display),'none',name+': desktop rail should appear');
  }

  await page.screenshot({path:path.join(output,name+'.png'),fullPage:false});
  if(file==='index.html') {
    await page.click('[data-gallery-index="0"]');
    assert.equal(await page.$eval('.photo-dialog',d=>d.open),true,'gallery must open');
    await page.click('[data-photo-next]');
    assert.equal(await page.$eval('[data-photo-count]',e=>e.textContent.trim()),'2 / 3','gallery should advance');
    await page.keyboard.press('Escape');
    await page.waitForFunction(()=>!document.querySelector('.photo-dialog').open);
  } else {
    await page.click('[data-filter="snacks"]');
    assert.equal(await page.$$eval('.menu-card',nodes=>nodes.length),9,'Quickly snack filter should work');
    await page.click('[data-motion-toggle]');
    assert.equal(await page.$eval('[data-motion-toggle]',e=>e.getAttribute('aria-pressed')),'false');
    await page.click('[data-motion-replay]');
    assert.equal(await page.$eval('[data-motion-toggle]',e=>e.getAttribute('aria-pressed')),'true');
  }
  assert.deepEqual(errors,[],name+': uncaught browser errors');
  await page.close();
  console.log('PASS '+name+' '+JSON.stringify(animated));
}

try {
  await visit('index.html',390,844,'tai-phone',true);
  await visit('quicklys.html',390,844,'quickly-phone',true);
  await visit('index.html',1500,900,'tai-desktop',false);
  await visit('quicklys.html',1500,900,'quickly-desktop',false);
  const reduced = await browser.newPage();
  await reduced.setViewport({width:390,height:844,isMobile:true,hasTouch:true});
  await reduced.emulateMediaFeatures([{name:'prefers-reduced-motion',value:'reduce'}]);
  await reduced.goto(base+'/index.html',{waitUntil:'domcontentloaded'});
  await reduced.evaluate(()=>localStorage.removeItem('restaurantMotionPreference'));
  await reduced.reload({waitUntil:'domcontentloaded'});
  await reduced.waitForFunction(()=>document.documentElement.classList.contains('motion-ready'));
  assert.equal(await reduced.evaluate(()=>document.documentElement.classList.contains('motion-off')),true,
    'Reduce Motion starts with animations paused');
  await reduced.click('[data-motion-replay]');
  assert.equal(await reduced.evaluate(()=>document.documentElement.classList.contains('motion-on')),true,
    'Explicit user opt-in can start animation');
  await reduced.close();
  console.log('PASS reduced-motion browser behavior');
} finally {
  await browser.close();
  await new Promise(resolve=>server.close(resolve));
}
