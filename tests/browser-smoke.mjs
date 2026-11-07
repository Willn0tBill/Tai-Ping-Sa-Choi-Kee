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

async function verifyTickerLoop(page, name) {
  const result = await page.evaluate(async () => {
    const ticker = document.querySelector('.ticker');
    const track = ticker.querySelector('.ticker-track');
    const copies = Array.from(track.querySelectorAll('.ticker-copy'));
    const area = ticker.getBoundingClientRect();
    const widths = copies.map(node => node.getBoundingClientRect().width);
    const animation = track.getAnimations().find(a => a.animationName === 'ticker-travel');
    if (!animation) return {error:'ticker-travel animation missing'};
    animation.pause();
    const duration = animation.effect.getComputedTiming().duration;
    const phases = [];
    for (const position of [0, .17, .5, .79, .99]) {
      animation.currentTime = duration * position;
      await new Promise(requestAnimationFrame);
      const [a,b] = copies.map(node => node.getBoundingClientRect());
      const viewport = ticker.getBoundingClientRect();
      phases.push({
        position,
        left:Math.min(a.left,b.left) - viewport.left,
        right:Math.max(a.right,b.right) - viewport.right,
        seam:b.left-a.right
      });
    }
    animation.play();
    return {
      container:area.width,
      widths,
      copiesMatch:copies.length===2 && copies[0].innerHTML===copies[1].innerHTML,
      textLength:copies[0]?.textContent?.length,
      duration,
      phases
    };
  });
  assert.ok(!result.error,name+': '+result.error);
  assert.equal(result.copiesMatch,true,name+': two groups must be identical '+JSON.stringify(result));
  assert.ok(result.widths.length===2 && result.widths.every(w=>w>=result.container+40),
    name+': each strip must cover full viewport '+JSON.stringify(result));
  assert.ok(Math.abs(result.widths[0]-result.widths[1])<1,
    name+': both duplicate strips must be same width '+JSON.stringify(result));
  assert.ok(result.duration>=12000,
    name+': marquee should move at a comfortable visible speed '+JSON.stringify(result));
  for (const phase of result.phases) {
    assert.ok(phase.left<2 && phase.right>-2,
      name+': text coverage must fill the viewport at every animation phase '+JSON.stringify(result));
    assert.ok(Math.abs(phase.seam)<1.5,
      name+': moving groups should meet without gaps '+JSON.stringify(result));
  }
  console.log('PASS '+name+' ticker '+JSON.stringify({
    width:result.container,strip:Math.round(result.widths[0]),
    duration:result.duration,phases:result.phases.length
  }));
}

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

  // Make sure the card lower on the page has not animated prematurely.
  const farSelector = file === 'index.html' ? '.signature-card:last-child' : '.menu-card:last-child';
  const beforeCard = await page.evaluate(selector => {
    const card = document.querySelector(selector);
    if (!card) return {missing:true};
    return {
      top:card.getBoundingClientRect().top,viewport:innerHeight,
      tagged:card.hasAttribute('data-card-reveal'),
      appeared:card.classList.contains('card-in-view'),
      animation:getComputedStyle(card).animationName
    };
  },farSelector);
  assert.ok(!beforeCard.missing && beforeCard.tagged,name+': distant cards should be observed individually');
  if(beforeCard.top > beforeCard.viewport+70) {
    assert.equal(beforeCard.appeared,false,name+': offscreen cards must not animate on load '+JSON.stringify(beforeCard));
    assert.equal(beforeCard.animation,'none',name+': offscreen cards must have no CSS animation '+JSON.stringify(beforeCard));
  }

  // Capture after the introductory motion; otherwise a first-frame image
  // can look blank while the elements are still entering.
  await new Promise(resolve=>setTimeout(resolve,1500));
  await page.screenshot({path:path.join(output,name+'.png'),fullPage:false});
  await verifyTickerLoop(page, name);

  const floating = await page.evaluate(() => {
    const group = document.querySelector('.hero-floating-actions');
    const photo = document.querySelector('.hero-visual,.quicklys-store-photo');
    const bounds = group.getBoundingClientRect(), image = photo.getBoundingClientRect();
    return {
      cards:group.querySelectorAll('.float-card').length,
      layout:getComputedStyle(group).position,
      width:bounds.width,
      top:bounds.top,
      bottom:bounds.bottom,
      imageTop:image.top,imageBottom:image.bottom,
      viewport:innerWidth
    };
  });
  assert.equal(floating.cards,3,name+': exactly three useful floating cards');
  assert.ok(floating.width>=150,name+': cards should be readable '+JSON.stringify(floating));
  assert.equal(floating.layout,'relative',name+': floating cards should not overlap photos on any device');
  assert.ok(floating.top>=floating.imageBottom-3,
    name+': action cards should start below the real photo '+JSON.stringify(floating));
  if (!mobile) {
    const cardRow=await page.evaluate(()=>{
      const cards=Array.from(document.querySelectorAll('.hero-floating-actions>.float-card'));
      const rects=cards.map(card=>card.getBoundingClientRect());
      return {
        columns:getComputedStyle(document.querySelector('.hero-floating-actions')).gridTemplateColumns.split(' ').length,
        tops:rects.map(x=>x.top),
        layoutRow:cards.map(x=>x.offsetTop),
        widths:rects.map(x=>x.width),
        photoBottom:document.querySelector('.hero-visual,.quicklys-store-photo').getBoundingClientRect().bottom
      };
    });
    assert.equal(cardRow.columns,3,name+': desktop/tablet cards should form three balanced columns '+JSON.stringify(cardRow));
    // The cards gently float by up to 7px, so getBoundingClientRect().top
    // differs while they animate. offsetTop checks the actual CSS grid row.
    assert.ok(Math.max(...cardRow.layoutRow)-Math.min(...cardRow.layoutRow)<3,
      name+': all cards should share one layout row '+JSON.stringify(cardRow));
    assert.ok(cardRow.widths.every(w=>w>160),
      name+': desktop/tablet cards should have usable width '+JSON.stringify(cardRow));
    if (file==='quicklys.html') {
      const menuLayout=await page.evaluate(()=>{
        const cards=Array.from(document.querySelectorAll('.menu-card')).slice(0,3);
        return cards.map(el=>el.getBoundingClientRect().top);
      });
      if(width>=1101)assert.ok(Math.max(...menuLayout)-Math.min(...menuLayout)<3,
        name+': large desktop Quickly menu should fit three useful columns');
      else assert.ok(menuLayout[2]>menuLayout[1]+20,
        name+': tablet Quickly menu should remain two readable columns');
    }
  }
  for (const href of [
    'https://maps.apple.com/?daddr=15848%20Halliburton%20Rd%2C%20Hacienda%20Heights%2C%20CA%2091745&dirflg=d',
    'https://www.google.com/maps/dir/?api=1&destination=15848%20Halliburton%20Rd%2C%20Hacienda%20Heights%2C%20CA%2091745'
  ]) {
    const found=await page.evaluate(url=>Array.from(document.querySelectorAll('.float-card-map-actions a')).some(a=>a.href===url),href);
    assert.equal(found,true,name+': accurate directions link '+href);
  }

  if (mobile) {
    const photo = await page.evaluate(() => {
      const target = document.querySelector('.hero-visual,.quicklys-store-photo');
      const box = target.getBoundingClientRect();
      return {top:box.top,screen:window.innerHeight};
    });
    assert.ok(photo.top > 110 && photo.top < photo.screen*0.76,
      name+': the real food/storefront photo should start in the first mobile screen '+JSON.stringify(photo));
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
  // Scroll-triggered cards must not run offscreen. Their CSS animation
  // timeline pauses on exit and resumes, then completes exactly once.
  await page.evaluate(() => {
    document.documentElement.style.scrollBehavior = 'auto';
    window.scrollTo({top:0,behavior:'instant'});
    document.querySelector('[data-motion-replay]')?.click();
  });
  await page.addStyleTag({content:
    '.motion-on.card-reveal-ready [data-card-reveal].card-in-view:not(.card-reveal-complete){animation-duration:2400ms!important;animation-delay:0ms!important}'
  });
  const farBeforeScroll=await page.$eval(farSelector,card=>({
    entered:card.classList.contains('card-in-view'),
    finished:card.classList.contains('card-reveal-complete'),
    animation:getComputedStyle(card).animationName,
    top:card.getBoundingClientRect().top
  }));
  assert.equal(farBeforeScroll.entered,false,name+': Replay must not animate far-offscreen cards '+JSON.stringify(farBeforeScroll));

  await page.evaluate(selector => {
    document.querySelector(selector)?.scrollIntoView({block:'center',behavior:'instant'});
  },farSelector);
  await page.waitForFunction(
    selector=>document.querySelector(selector)?.classList.contains('card-on-screen'),
    {timeout:8000},farSelector
  );
  const cardRunning=await page.$eval(farSelector,card=>({
    animation:getComputedStyle(card).animationName,
    playState:getComputedStyle(card).animationPlayState
  }));
  assert.match(cardRunning.animation,/card-enter-on-view/,
    name+': card entrance begins only in viewport '+JSON.stringify(cardRunning));
  assert.equal(cardRunning.playState,'running',name+': visible animation must run');

  if(width===390 || width===1500){
    // Test interruption before the 2.4-second test animation completes.
    await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));
    await page.waitForFunction(selector=>{
      const card=document.querySelector(selector);
      return card?.classList.contains('card-in-view') &&
        !card.classList.contains('card-on-screen');
    },{timeout:8000},farSelector);
    const paused=await page.$eval(farSelector,card=>({
      status:getComputedStyle(card).animationPlayState,
      time:card.getAnimations()[0]?.currentTime ?? null,
      complete:card.classList.contains('card-reveal-complete')
    }));
    assert.equal(paused.status,'paused',name+': card animation must pause offscreen');
    assert.equal(paused.complete,false);
    await new Promise(resolve=>setTimeout(resolve,180));
    const pausedTime=await page.$eval(farSelector,card=>card.getAnimations()[0]?.currentTime ?? null);
    assert.ok(paused.time!==null && pausedTime!==null && Math.abs(pausedTime-paused.time)<25,
      name+': timeline must not advance offscreen '+JSON.stringify({paused,pausedTime}));

    await page.evaluate(selector=>
      document.querySelector(selector)?.scrollIntoView({block:'center',behavior:'instant'}),
      farSelector);
    await page.waitForFunction(selector=>
      document.querySelector(selector)?.classList.contains('card-on-screen'),
      {timeout:8000},farSelector);
    assert.equal(await page.$eval(farSelector,card=>getComputedStyle(card).animationPlayState),'running',
      name+': partially completed entrance should resume in view');
  }
  await page.waitForFunction(selector=>
    document.querySelector(selector)?.classList.contains('card-reveal-complete'),
    {timeout:8000},farSelector);
  const finished=await page.$eval(farSelector,card=>({
    complete:card.classList.contains('card-reveal-complete'),
    animation:getComputedStyle(card).animationName
  }));
  assert.equal(finished.complete,true);
  assert.equal(finished.animation,'none',name+': completed card should not keep animating');
  await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));
  await page.evaluate(selector=>
    document.querySelector(selector)?.scrollIntoView({block:'center',behavior:'instant'}),
    farSelector);
  assert.equal(await page.$eval(farSelector,card=>card.classList.contains('card-reveal-complete')),true,
    name+': completed card should not replay on the next viewport visit');

  if (width === 1900) {
    // A second wide desktop width catches loops that were measured only once.
    await page.setViewport({width:2370,height,deviceScaleFactor:1.5,isMobile:false,hasTouch:false});
    await page.waitForFunction(() => {
      const ticker = document.querySelector('.ticker');
      const first = ticker?.querySelector('.ticker-copy');
      return first?.getBoundingClientRect().width >= ticker.getBoundingClientRect().width + 40;
    },{timeout:10000});
    await verifyTickerLoop(page,name+'-resized-2370');
  }
  assert.deepEqual(errors,[],name+': uncaught browser errors');
  await page.close();
  console.log('PASS '+name+' '+JSON.stringify(animated));
}

try {
  await visit('index.html',390,844,'tai-phone',true);
  await visit('quicklys.html',390,844,'quickly-phone',true);
  await visit('index.html',820,1100,'tai-tablet',false);
  await visit('quicklys.html',820,1100,'quickly-tablet',false);
  await visit('index.html',1500,900,'tai-desktop',false);
  await visit('quicklys.html',1500,900,'quickly-desktop',false);
  await visit('index.html',1900,900,'tai-wide',false);
  await visit('quicklys.html',1900,900,'quickly-wide',false);
  const reduced = await browser.newPage();
  await reduced.setViewport({width:390,height:844,isMobile:true,hasTouch:true});
  await reduced.emulateMediaFeatures([{name:'prefers-reduced-motion',value:'reduce'}]);
  await reduced.goto(base+'/index.html',{waitUntil:'domcontentloaded'});
  await reduced.evaluate(()=>localStorage.removeItem('restaurantMotionPreference'));
  await reduced.reload({waitUntil:'domcontentloaded'});
  await reduced.waitForFunction(()=>document.documentElement.classList.contains('motion-ready'));
  assert.equal(await reduced.$eval('.ticker-track',el=>getComputedStyle(el).animationName),'none',
    'reduced-motion users should not see a moving banner');
  assert.equal(await reduced.evaluate(()=>document.documentElement.classList.contains('motion-off')),true,
    'Reduce Motion starts with animations paused');
  // The replay button is below the hero on mobile. Scroll to a stable,
  // unobstructed hit target before a real pointer click (smooth scrolling and
  // the fixed bottom action bar can otherwise intercept browser automation).
  await reduced.evaluate(() => {
    document.documentElement.style.scrollBehavior = 'auto';
    document.querySelector('[data-motion-replay]').scrollIntoView({behavior:'instant',block:'center'});
  });
  await reduced.waitForFunction(() => {
    const target = document.querySelector('[data-motion-replay]').getBoundingClientRect();
    return target.top >= 0 && target.bottom < innerHeight-74;
  });
  await reduced.click('[data-motion-replay]');
  const motionState = await reduced.evaluate(()=>({
    on:document.documentElement.classList.contains('motion-on'),
    label:document.querySelector('[data-motion-toggle]')?.getAttribute('aria-pressed')
  }));
  assert.equal(motionState.on,true,
    'Explicit user opt-in can start animation: '+JSON.stringify(motionState));
  await reduced.close();
  console.log('PASS reduced-motion browser behavior');
} finally {
  await browser.close();
  await new Promise(resolve=>server.close(resolve));
}
