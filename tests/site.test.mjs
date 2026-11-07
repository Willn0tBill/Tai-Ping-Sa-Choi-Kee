import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import vm from 'node:vm';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const quicklyHtml = readFileSync(new URL('../quicklys.html', import.meta.url), 'utf8');
const css = readFileSync(new URL('../styles.css', import.meta.url), 'utf8');
const js = readFileSync(new URL('../app.js', import.meta.url), 'utf8');

test('static page has useful structure, labels and verified contact links', () => {
  for (const id of ['main','kitchen','favorites','visit']) {
    assert.match(html, new RegExp('id="' + id + '"'));
  }
  for (const id of ['main','menu','menu-grid','menu-search','visit']) {
    assert.match(quicklyHtml, new RegExp('id="' + id + '"'));
  }
  assert.ok(!html.includes('id="menu-grid"'),'Quickly menu should not render on restaurant homepage');
  assert.ok(!html.includes('id="menu-heading"'),'separate menu should live only on Quickly’s page');
  assert.match(html, /href="quicklys\.html"/);
  assert.match(quicklyHtml, /href="index\.html"/);
  assert.match(html, /name="robots" content="noindex,nofollow"/);
  assert.match(html, /tel:\+16269376552/);
  assert.match(html, /15848 Halliburton Rd/);
  assert.match(html, /Tai Ping Sa Choi Kee/);
  assert.match(html, /太平沙财记/);
  assert.match(html, /id="kitchen"/);
  assert.match(html, /tel:\+16269376555/);
  assert.match(html, /tel:\+16269376552/);
  assert.ok(!html.includes('Quickly Hacienda Heights | Boba & Bites'));

  assert.match(html, /lang="zh-Hans"/);
  assert.match(html, /aria-expanded="false"/);
  assert.match(html, /Website concept preview/);
  assert.match(quicklyHtml, /Prices transcribed from the photographed menu/);
  assert.match(quicklyHtml, /verify before ordering/);
  assert.ok(!html.includes('application/ld+json'), 'unapproved demo must not imply verified official schema');
  for (const tag of html.match(/<img\b[^>]*>/g) ?? []) {
    assert.match(tag, /alt="[^"]+"/);
    assert.match(tag, /loading="lazy"|fetchpriority="high"/);
  }
  for (const file of ['index.html', 'quicklys.html', 'styles.css', 'app.js']) {
    assert.equal(existsSync(new URL('../' + file, import.meta.url)), true, file + ' missing');
  }
});

test('responsive layout supports reduced motion and keyboard focus', () => {
  assert.match(css, /@media\(max-width:560px\)/);
  assert.match(css, /@media\(max-width:800px\)/);
  assert.match(css, /prefers-reduced-motion:reduce/);
  assert.match(css, /:focus-visible/);
  assert.match(html, /class="skip-link"/);
  assert.match(quicklyHtml, /class="skip-link"/);
});

class FakeElement {
  constructor(tag='div') {
    this.tagName=tag; this.children=[]; this.dataset={}; this.attrs={}; this.events={};
    this.textContent=''; this.value=''; this.hidden=false; this.style={setProperty(){}};
    const members=new Set();
    this.classList={
      add:(v)=>members.add(v),
      remove:(...values)=>values.forEach(v=>members.delete(v)),
      contains:(v)=>members.has(v),
      toggle:(v,force)=>{if(force===undefined) force=!members.has(v); if(force) members.add(v); else members.delete(v); return force;}
    };
  }
  addEventListener(event, callback) {(this.events[event]??=[]).push(callback);}
  dispatch(event, details={}) {for(const callback of this.events[event]??[]) callback(details);}
  setAttribute(name,value) {this.attrs[name]=value;}
  getAttribute(name) {return this.attrs[name]??null;}
  appendChild(child) {this.children.push(...(child.fragment?child.children:[child]));return child;}
  replaceChildren(...elements) {this.children=[];elements.forEach(el=>this.appendChild(el));}
  querySelectorAll(selector) {return selector==='a'?[this.link]:[];}
  contains(node) {return this===node||this.children.includes(node);}
  focus() {this.focused=true;}
}

function setup() {
  const ids=['menu-grid','menu-count','menu-empty','menu-search','clear-search','copyright-year','site-nav'];
  const nodes=Object.fromEntries(ids.map(id=>[id,new FakeElement()]));
  nodes['site-nav'].link=new FakeElement('a');
  const toggle=new FakeElement('button');
  toggle.setAttribute('aria-expanded','false');
  const filters=['all','milk','tea','special','slush','smoothie','snacks','toppings'].map(value=>{
    const b=new FakeElement('button');b.dataset.filter=value;return b;
  });
  const feature=new FakeElement('a');
  feature.dataset.selectCategory='milk';
  const docEvents={};
  const document={
    getElementById:(id)=>nodes[id]??null,
    querySelectorAll:(selector)=>selector==='[data-filter]'?filters:selector==='[data-select-category]'?[feature]:[],
    querySelector:(selector)=>selector==='.menu-toggle'?toggle:null,
    createElement:(tag)=>new FakeElement(tag),
    createDocumentFragment:()=>Object.assign(new FakeElement(),{fragment:true}),
    addEventListener:(type,fn)=>{(docEvents[type]??=[]).push(fn);}
  };
  const windowEvents={};
  const window={innerWidth:390,addEventListener:(type,fn)=>{(windowEvents[type]??=[]).push(fn);}};
  vm.runInNewContext(js,{document,window,Date,console});
  return {nodes,toggle,filters,feature,docEvents,window,windowEvents};
}

test('menu search filters English and Chinese items and resets correctly', () => {
  const {nodes,filters} = setup();
  assert.equal(nodes['menu-grid'].children.length,14);
  assert.equal(nodes['menu-grid'].children[0].getAttribute('data-card-reveal'),'');
  assert.equal(nodes['menu-grid'].children[0].classList.contains('menu-card-enter'),false);
  filters[6].dispatch('click');
  assert.equal(nodes['menu-grid'].children.length,9);
  assert.equal(filters[6].getAttribute('aria-pressed'),'true');
  nodes['menu-search'].value='盐酥鸡';
  nodes['menu-search'].dispatch('input');
  assert.equal(nodes['menu-grid'].children.length,1);
  assert.equal(nodes['menu-grid'].children[0].children[1].textContent,'盐酥鸡');
  assert.equal(nodes['menu-grid'].children[0].children[2].textContent,'Popcorn Chicken');
  assert.equal(nodes['menu-grid'].children[0].children[1].lang,'zh-Hans');
  assert.equal(nodes['menu-grid'].children[0].children[2].lang,'en');
  nodes['menu-search'].value='unavailable item';
  nodes['menu-search'].dispatch('input');
  assert.equal(nodes['menu-grid'].children.length,0);
  assert.equal(nodes['menu-empty'].hidden,false);
  nodes['clear-search'].dispatch('click');
  assert.equal(nodes['menu-grid'].children.length,14);
  assert.equal(nodes['menu-empty'].hidden,true);
  nodes['menu-search'].value='taro';
  nodes['menu-search'].dispatch('input');
  assert.equal(nodes['menu-grid'].children.length,3);
});

test('mobile nav toggles accessibly and feature links select categories', () => {
  const {nodes,toggle,feature,docEvents} = setup();
  toggle.dispatch('click');
  assert.equal(toggle.getAttribute('aria-expanded'),'true');
  assert.equal(nodes['site-nav'].classList.contains('is-open'),true);
  docEvents.keydown[0]({key:'Escape'});
  assert.equal(toggle.getAttribute('aria-expanded'),'false');
  assert.equal(toggle.focused,true);
  feature.dispatch('click');
  assert.equal(nodes['menu-grid'].children.length,14);
  toggle.dispatch('click');
  nodes['site-nav'].link.dispatch('click');
  assert.equal(toggle.getAttribute('aria-expanded'),'false');
});

test('photographed Quickly menu has seven categories, prices, and no separate restaurant dishes', () => {
  const match = js.match(/const MENU_ITEMS = (\[[\s\S]*?\]);/);
  assert.ok(match, 'menu catalog should be a static, auditable data array');
  const entries = JSON.parse(match[1]);
  assert.equal(entries.length, 77);
  const actualCounts = Object.fromEntries([...new Set(entries.map(e => e.type))].map(type => [type, entries.filter(e => e.type === type).length]));
  assert.deepEqual(actualCounts, {milk:14,tea:12,special:3,slush:17,smoothie:11,snacks:9,toppings:11});
  for (const e of entries) {
    assert.ok(e.name && e.zh, 'every entry needs English and Chinese');
    assert.ok(Number.isFinite(e.price) || (Number.isFinite(e.priceM) && Number.isFinite(e.priceL)), 'photographed menu price stored');
  }
  assert.equal(entries.some(e => /Kung Pao Chicken|Mongolian Beef/.test(e.name)), false);
  assert.equal(quicklyHtml.includes('data-filter="toppings"'), true);
  assert.equal(quicklyHtml.includes('data-filter="smoothie"'), true);
  assert.equal(quicklyHtml.includes('data-filter="foam"'), false);
  assert.equal(entries.find(e => e.name === 'Popcorn Chicken').price, 8.29);
  assert.equal(entries.find(e => e.name === 'Barley Milk Tea').priceM, 5.28);
  assert.equal(entries.find(e => e.name === 'Mango Slush').priceM, 4.28);
  assert.equal(entries.find(e => e.name === 'Oreo Slush').priceL, 4.98);
  assert.equal(entries.find(e => e.name === 'Crystal Boba').price, 1);
  assert.equal(js.includes('const priceLabel'), true);
});

test('actual restaurant food board has bilingual featured dishes without invented prices', () => {
  const kitchen = html.split('<section class="kitchen-section')[1]?.split('<section class="favorites-section')[0];
  assert.ok(kitchen, 'missing kitchen feature section');
  assert.equal((kitchen.match(/class="signature-card(?: signature-card-primary)?"/g) || []).length, 13);
  for (const dish of ['干炒牛河', '港式生炒骨', '海鲜两面黄', '椒盐鲜鱿', '清平白切鸡', '鱼香茄子煲', '蚵仔煎蛋', '牛杂捞面', 'XO海鲜炒饭', '椒盐大虾', '招牌牛腩饭', '姜葱油泡猪肝', '海鲜豆腐煲']) {
    assert.ok(kitchen.includes(dish), 'missing actual posted dish: ' + dish);
  }
  assert.match(kitchen, /Confirm availability, prices and translations with the owner/);
  assert.match(kitchen, /English names are translations/);
  assert.ok(!/\$\d/.test(kitchen), 'no unverified food prices');
  assert.match(css, /\.signature-grid/);
  assert.match(css, /@media\(max-width:740px\)/);
});

test('Chinese-first website layout retains English translations underneath', () => {
  assert.match(html, /<html lang="zh-Hans">/);
  assert.match(html, /<title>太平沙财记 \| Tai Ping Sa Choi Kee/);
  assert.match(html, /<h1 id="hero-heading" class="hero-restaurant-title" lang="zh-Hans">太平/);
  assert.match(html, /<a href="#kitchen"><span lang="zh-Hans">中餐菜单<\/span><small lang="en">Kitchen<\/small><\/a>/);
  assert.match(quicklyHtml, /data-filter="milk"[^>]*><span lang="zh-Hans">奶茶<\/span><small lang="en">Milk tea<\/small><\/button>/);
  assert.match(html, /<h2 id="kitchen-heading" lang="zh-Hans">/);
  assert.match(quicklyHtml, /<h2 id="menu-heading" lang="zh-Hans">/);
  assert.match(html, /<h2 id="visit-heading" lang="zh-Hans">/);
  assert.match(css, /\.menu-card h3\.menu-item-zh/);
  assert.match(css, /\.menu-card p\.menu-en/);
  assert.match(js, /makeTextElement\('h3', 'menu-item-zh', item.zh, 'zh-Hans'\)/);
  assert.match(js, /makeTextElement\('p', 'menu-en', item.name, 'en'\)/);
});

test('photo assets are genuinely associated with the restaurant, not stock-photo placeholders', () => {
  assert.ok(!/images\\.unsplash\\.com|unsplash\\.com|photo-1747016804753|photo-1756132539966|photo-1768204039907/.test(html),
    'remove generic stock photo URLs');
  assert.match(html, /src="https:\/\/cdn\.restaurants-us\.com\/3616-albums-2\.jpg"/);
  assert.match(html, /src="https:\/\/cdn\.restaurants-us\.com\/3616-albums-1\.jpg"/);
  assert.match(html, /src="https:\/\/s3-media0\.fl\.yelpcdn\.com\/bphoto\/ZBEJxeL9uK-M6cb3rGqtVw\/o\.jpg"/);
  assert.match(html, /Photo permissions pending/);
  assert.match(html, /正式商用前须取得照片授权/);
  assert.equal((html.match(/<img\b/g) ?? []).length, 4);
});

test('photo enhancement preserves original image URLs and applies non-generative CSS only', () => {
  assert.match(html, /src="https:\/\/cdn\.restaurants-us\.com\/3616-albums-2\.jpg"/);
  assert.match(html, /src="https:\/\/cdn\.restaurants-us\.com\/3616-albums-1\.jpg"/);
  assert.match(html, /src="https:\/\/s3-media0\.fl\.yelpcdn\.com\/bphoto\/ZBEJxeL9uK-M6cb3rGqtVw\/o\.jpg"/);
  assert.match(css, /Authentic photos/);
  assert.match(css, /\.hero-photo\{[\s\S]*?filter:brightness\(1\.045\) contrast\(1\.085\) saturate\(1\.08\)/);
  assert.match(css, /\.feature-image-wrap img\{[\s\S]*?filter:brightness\(1\.04\) contrast\(1\.08\) saturate\(1\.065\)/);
  assert.ok(!html.includes('images.unsplash.com'));
});

test('official branding policy avoids any invented logo or seal', () => {
  assert.match(html, /<span class="brand-text"><strong lang="zh-Hans">太平沙财记<\/strong><small lang="en">TAI PING SA CHOI KEE/);
  assert.ok(!html.includes('rel="icon"'), 'no custom favicon until the official asset is supplied');
  assert.ok(!html.includes('class="brand-mark"'), 'no custom 太 symbol');
  assert.ok(!html.includes('class="visit-stamp"'), 'no custom seal pretending to be a restaurant emblem');
  assert.ok(!html.includes('hero-round-label'), 'no invented badge in hero');
  assert.match(html, /class="visit-address-panel"/);
  assert.match(css, /no invented logo marks/i);
});


test('Quickly’s has its own page with a properly named menu and cross-navigation', () => {
  assert.match(html, /href="quicklys\.html"/);
  assert.match(quicklyHtml, /<title>快可立 \| Quickly’s/);
  assert.match(quicklyHtml, /<h1 id="quicklys-heading" lang="zh-Hans">快可立<\/h1>/);
  assert.match(quicklyHtml, /<span lang="zh-Hans">快可立<\/span><small lang="en">Quickly’s<\/small>/);
  assert.ok(!html.includes('<section class="menu-section'), 'Tai Ping homepage must not host Quickly menu');
  assert.match(quicklyHtml, /<section class="menu-section/);
  assert.match(quicklyHtml, /<div class="menu-grid" id="menu-grid">/);
  assert.match(quicklyHtml, /data-filter="snacks"/);
  assert.match(quicklyHtml, /data-filter="milk"/);
  assert.match(quicklyHtml, /href="index\.html"/);
  assert.match(quicklyHtml, /tel:\+16269376552/);
  assert.match(html, /tel:\+16269376555/);
  assert.match(quicklyHtml, /same location/);
  assert.match(css, /\.quicklys-hero/);
  assert.ok(!quicklyHtml.includes('rel="icon"'), 'do not fabricate a Quickly’s logo');
  assert.ok(!quicklyHtml.includes('images.unsplash.com'), 'no random stock images');
  assert.match(quicklyHtml, /noindex,nofollow/);
});

test('mobile header collapses before content overlaps and never forces CTA onto phone width', () => {
  for (const doc of [html, quicklyHtml]) {
    assert.match(doc, /class="menu-toggle"/);
    assert.match(doc, /aria-controls="site-nav"/);
    assert.match(doc, /class="nav-call" href="tel:\+1626937655[25]"/);
    assert.match(doc, /<span class="brand-text"><strong lang="zh-Hans">/);
  }
  assert.match(css, /@media\(max-width:1100px\)\{[\s\S]*?\.nav\{display:none/);
  assert.match(css, /\.nav\.is-open\{display:flex\}/);
  assert.match(css, /@media\(max-width:740px\)\{[\s\S]*?\.header-cta\{display:none\}/);
  assert.ok(!css.includes('.header-cta span{font-size:17px'), 'global child-span rule caused unwanted oversized fragments');
  assert.ok(!css.includes('.nav a span{display:none'), 'Chinese nav labels must not disappear');
});
test('Quickly’s starts with Chinese brand name, not English-first typography', () => {
  assert.match(quicklyHtml, /<span class="brand-text"><strong lang="zh-Hans">快可立<\/strong><small lang="en">Quickly’s/);
  assert.match(quicklyHtml, /<h1 id="quicklys-heading" lang="zh-Hans">快可立<\/h1>/);
  assert.match(quicklyHtml, /class="quicklys-english-title" lang="en">Quickly’s<\/p>/);
  assert.match(quicklyHtml, /class="footer-brand" href="quicklys\.html" lang="zh-Hans">快可立<\/a>/);
  assert.match(quicklyHtml, /<p class="quicklys-description" lang="zh-Hans">/);
  assert.match(quicklyHtml, /<p class="quicklys-description-en" lang="en">/);
  assert.match(css, /\.quicklys-intro h1\{font:/);
  assert.match(css, /\.quicklys-english-title\{font:/);
});

test('mobile-first navigation and shortcuts work with independent brands', () => {
  for(const doc of [html,quicklyHtml]) assert.match(doc,/class="mobile-action-bar"/);
  assert.match(html,/class="mobile-action-primary" href="https:\/\/www\.fantuanorder\.com\/en-US\/store\/tai-ping-sa-choi-kee\/us-1364034559"/);
  assert.match(quicklyHtml,/class="mobile-action-primary" href="https:\/\/www\.fantuanorder\.com\/en-US\/store\/quickly\/us-28952"/);
  assert.match(html,/mobile-action-bar"[\s\S]*?tel:\+16269376555/);
  assert.match(quicklyHtml,/mobile-action-bar"[\s\S]*?tel:\+16269376552/);
  assert.match(quicklyHtml,/class="quicklys-shortcuts"/);
  assert.equal((quicklyHtml.match(/data-select-category="(?:milk|slush|snacks)"/g)||[]).length,3);
  assert.match(quicklyHtml,/class="menu-body-layout"/);
  assert.match(quicklyHtml,/class="menu-side-panel"/);
  assert.match(css,/scroll-snap-type:x proximity/);
  assert.match(css,/safe-area-inset-bottom/);
  assert.match(css,/@media\(max-width:900px\)\{[\s\S]*?\.menu-side-panel\{display:none\}/);
  assert.ok(!html.includes('class="menu-side-panel"'));
  const {toggle,window,windowEvents}=setup();
  toggle.dispatch('click');
  assert.equal(toggle.getAttribute('aria-expanded'),'true');
  window.innerWidth=950;windowEvents.resize[0]();
  assert.equal(toggle.getAttribute('aria-expanded'),'true');
  window.innerWidth=1101;windowEvents.resize[0]();
  assert.equal(toggle.getAttribute('aria-expanded'),'false');
});
test('scroll-reveal observer works independently of motion preference without hiding content', () => {
  assert.match(css,/\.motion-on\.has-motion \[data-reveal\]\.is-visible/);
  assert.match(css,/prefers-reduced-motion:reduce/);
  assert.match(js,/typeof IntersectionObserver !== 'function'/);
  const root=new FakeElement('html'),targets=[new FakeElement('section'),new FakeElement('article')];
  const fakeDocument={
    documentElement:root,getElementById:()=>null,querySelector:()=>null,
    querySelectorAll:selector=>selector==='[data-reveal]'?targets:[],
    addEventListener(){}
  };
  let observer;
  class FakeObserver {
    constructor(callback){this.callback=callback;this.observed=[];this.unobserved=[];observer=this;}
    observe(node){this.observed.push(node);}
    unobserve(node){this.unobserved.push(node);}
  }
  const fakeWindow={innerWidth:375,matchMedia:()=>({matches:false}),addEventListener(){}};
  vm.runInNewContext(js,{document:fakeDocument,window:fakeWindow,IntersectionObserver:FakeObserver,Date,console});
  assert.equal(root.classList.contains('has-motion'),true);
  assert.equal(observer.observed.length,2);
  observer.callback([{isIntersecting:true,target:targets[0]}]);
  assert.equal(targets[0].classList.contains('is-visible'),true);
  assert.equal(observer.unobserved.length,1);
  const reduced=new FakeElement('html');
  vm.runInNewContext(js,{document:{...fakeDocument,documentElement:reduced},window:{...fakeWindow,matchMedia:()=>({matches:true})},IntersectionObserver:FakeObserver,Date,console});
  assert.equal(reduced.classList.contains('has-motion'),true, 'visibility markers are safe even with reduced motion');
  assert.equal(reduced.classList.contains('motion-on'),false);
  const legacy=new FakeElement('html');
  vm.runInNewContext(js,{document:{...fakeDocument,documentElement:legacy},window:fakeWindow,Date,console});
  assert.equal(legacy.classList.contains('has-motion'),false,'unsupported browsers show static content');
});

test('both businesses have the correct and distinct Fantuan online ordering links', () => {
  const tai = 'https://www.fantuanorder.com/en-US/store/tai-ping-sa-choi-kee/us-1364034559';
  const quickly = 'https://www.fantuanorder.com/en-US/store/quickly/us-28952';
  assert.ok(html.includes(tai));
  assert.ok(quicklyHtml.includes(quickly));
  assert.ok(!html.includes(quickly), 'Tai Ping site must not accidentally order from Quickly’s Fantuan');
  assert.ok(!quicklyHtml.includes(tai), 'Quickly’s site must not accidentally order from Tai Ping Fantuan');
  assert.match(html, /饭团在线点餐/);
  assert.match(quicklyHtml, /饭团在线点餐/);
  assert.match(html, /class="service-card service-order"/);
  assert.match(quicklyHtml, /class="service-card service-order"/);
  assert.match(html, /class="service-card-link" href="https:\/\/www\.fantuanorder\.com\/en-US\/store\/tai-ping-sa-choi-kee\/us-1364034559" target="_blank" rel="noopener noreferrer"/);
  assert.match(quicklyHtml, /class="service-card-link" href="https:\/\/www\.fantuanorder\.com\/en-US\/store\/quickly\/us-28952" target="_blank" rel="noopener noreferrer"/);
});

test('both pages have Yelp, complete address, Apple Maps and Google Maps links', () => {
  const address = '15848 Halliburton Rd';
  const yelpTai = 'https://www.yelp.com/biz/tai-ping-sa-choi-kee-hacienda-heights';
  const yelpQuicklySearch = 'https://www.yelp.com/search?find_desc=Quickly&amp;find_loc=15848%20Halliburton%20Rd%2C%20Hacienda%20Heights%2C%20CA%2091745';
  assert.match(html, /<section class="service-hub section-pad" id="order"/);
  assert.match(quicklyHtml, /<section class="service-hub section-pad" id="order"/);
  assert.ok(html.includes(yelpTai));
  assert.ok(quicklyHtml.includes(yelpQuicklySearch));
  assert.ok(!quicklyHtml.includes(yelpTai));
  assert.match(quicklyHtml, /exact listing URL is unverified/);
  for(const doc of [html, quicklyHtml]){
    assert.match(doc, /<address class="service-address">15848 Halliburton Rd<br>Hacienda Heights, CA 91745<\/address>/);
    assert.ok(doc.includes(address));
    assert.match(doc, /href="https:\/\/maps\.apple\.com\/\?daddr=15848%20Halliburton%20Rd%2C%20Hacienda%20Heights%2C%20CA%2091745&amp;dirflg=d"/);
    assert.match(doc, /href="https:\/\/www\.google\.com\/maps\/dir\/\?api=1&amp;destination=15848%20Halliburton%20Rd%2C%20Hacienda%20Heights%2C%20CA%2091745"/);
    assert.match(doc, /aria-label="Apple 地图导航/);
    assert.match(doc, /aria-label="Google 地图导航/);
    assert.match(doc, /class="service-grid"/);
    assert.match(doc, /href="#order"/);
    assert.match(doc, /rel="noopener noreferrer"/);
  }
  assert.match(css, /\.service-grid\{display:grid/);
  assert.match(css, /\.service-map-links\{display:grid/);
  assert.match(css, /\.service-map-links a\{/);
  assert.match(css, /@media\(max-width:740px\)\{[\s\S]*?\.service-grid\{grid-template-columns:1fr/);
});

test('motion is explicit, replayable and visibly distinct from a scroll-progress line', () => {
  for (const page of [html,quicklyHtml]) {
    assert.ok(!page.includes('class="scroll-progress"'), 'the distracting yellow top bar was removed');
    assert.match(page,/data-motion-toggle aria-pressed="false"/);
    assert.match(page,/data-motion-replay/);
    assert.match(page,/class="scroll-cue" href="#order"/);
    assert.equal((page.match(/class="ticker-copy"/g)||[]).length,2,'marquee repeats seamlessly');
    assert.match(page,/href="styles\.css\?v=motion-v10"/);
    assert.match(page,/src="app\.js\?v=motion-v10" defer/);
  }
  for(const name of ['hero-text-rise','hero-photo-rise','section-rise','ticker-travel','photo-float','photo-pan']){
    assert.ok(css.includes('@keyframes '+name),'missing visible animation: '+name);
  }
  assert.match(css,/\.motion-on \.ticker-track\{animation:ticker-travel/);
  assert.match(css,/\.motion-on \.hero-copy>\*/);
  assert.match(css,/\.motion-on \.quicklys-intro>\*/);
  assert.match(css,/\.motion-on \.hero-visual,\.motion-on \.quicklys-store-photo\{/);
  assert.match(css,/\.motion-on\.has-motion \[data-reveal\]\.is-visible/);
  assert.match(css,/html\.motion-off \*,html\.motion-off \*::before/);
  assert.match(css,/html:not\(\.motion-on\) \*/);
  assert.ok(!css.includes('.scroll-progress'),'no hidden progress-bar leftovers in CSS');
  assert.ok(!js.includes('initScrollProgress'),'no progress logic');
  assert.match(js,/initMotionControls\(\)/);
  assert.match(js,/restaurantMotionPreference/);
});

test('motion control honors reduced-motion defaults and explicit replay/opt-in', () => {
  function boot(reduced,initialPreference=null) {
    const root=new FakeElement('html'),toggle=new FakeElement('button'),
          replay=new FakeElement('button'),zh=new FakeElement('span'),en=new FakeElement('small');
    const persisted={value:initialPreference};
    toggle.querySelector=s=>s==='.motion-status-zh'?zh:s==='.motion-status-en'?en:null;
    const document={
      documentElement:root,getElementById:()=>null,
      querySelector:s=>s==='[data-motion-toggle]'?toggle:s==='[data-motion-replay]'?replay:null,
      querySelectorAll:()=>[],addEventListener(){}
    };
    const window={
      innerWidth:390,addEventListener(){},
      matchMedia:()=>({matches:reduced}),
      localStorage:{
        getItem:()=>persisted.value,
        setItem:(_key,value)=>{persisted.value=value;}
      }
    };
    vm.runInNewContext(js,{document,window,Date,console});
    return {root,toggle,replay,zh,en,persisted};
  }
  const reduced=boot(true);
  assert.equal(reduced.root.classList.contains('motion-off'),true,'default pause honors OS reduce motion');
  assert.equal(reduced.toggle.getAttribute('aria-pressed'),'false');
  assert.equal(reduced.zh.textContent,'动效暂停');
  reduced.replay.dispatch('click');
  assert.equal(reduced.root.classList.contains('motion-on'),true,'replay enables motion by explicit choice');
  assert.equal(reduced.toggle.getAttribute('aria-pressed'),'true');
  assert.equal(reduced.persisted.value,'on');
  assert.equal(reduced.en.textContent,'Motion on');
  reduced.replay.dispatch('click');
  assert.equal(reduced.root.classList.contains('motion-on'),true,'replay restarts without disabling motion');
  reduced.toggle.dispatch('click');
  assert.equal(reduced.root.classList.contains('motion-off'),true);
  assert.equal(reduced.persisted.value,'off');
  const normal=boot(false);
  assert.equal(normal.root.classList.contains('motion-on'),true,'normal browsers play by default');
  const savedOn=boot(true,'on');
  assert.equal(savedOn.root.classList.contains('motion-on'),true,'explicit choice overrides OS default');
  const savedOff=boot(false,'off');
  assert.equal(savedOff.root.classList.contains('motion-off'),true,'explicit user pause persists');
});


test('real-photo gallery is accessible, bilingual and progressively enhanced', () => {
  assert.equal((html.match(/data-gallery-index="[012]"/g)||[]).length,3);
  assert.match(html, /<dialog class="photo-dialog" aria-label="店内实拍画廊/);
  assert.match(html, /data-photo-close/);
  assert.match(html, /data-photo-prev/);
  assert.match(html, /data-photo-next/);
  assert.match(html, /data-photo-count aria-live="polite"/);
  assert.match(html, /data-photo-large alt="店内实拍照片/);
  assert.match(html, /class="gallery-swipe-hint"/);
  assert.match(css, /scroll-snap-type:x mandatory/);
  assert.match(css, /@media\(max-width:740px\)\{[\s\S]*?\.feature-grid\{\s*display:flex;overflow-x:auto/);
  assert.match(css, /\.motion-on \.photo-dialog\[open\]\{animation:gallery-open/);
  assert.match(css, /@keyframes gallery-open/);
  assert.ok(!quicklyHtml.includes('data-gallery-index='),'Quickly’s should not borrow Tai Ping’s photo carousel');
  const dialog=new FakeElement('dialog');
  dialog.open=false;
  dialog.showModal=()=>{dialog.open=true;};
  dialog.close=()=>{dialog.open=false;dialog.dispatch('close');};
  const controls=Object.fromEntries(['[data-photo-large]','[data-photo-caption]','[data-photo-caption-en]','[data-photo-count]','[data-photo-close]','[data-photo-prev]','[data-photo-next]'].map(x=>[x,new FakeElement()]));
  dialog.querySelector=(sel)=>controls[sel]??null;
  const triggers=[0,1,2].map((index)=>{
    const anchor=new FakeElement('a');
    anchor.href='https://cdn.example.test/real-photo-'+index+'.jpg';
    anchor.dataset.galleryIndex=String(index);
    anchor.dataset.galleryTitle=['鱼香茄子煲','门店外观','店内环境'][index];
    anchor.dataset.galleryEn=['Eggplant clay pot','Storefront','Interior'][index];
    const img=new FakeElement('img');img.alt='Original image '+index;
    anchor.querySelector=(sel)=>sel==='img'?img:null;
    return anchor;
  });
  const doc={
    getElementById:()=>null,
    querySelector:(sel)=>sel==='.photo-dialog'?dialog:null,
    querySelectorAll:(sel)=>sel==='[data-gallery-index]'?triggers:[],
    addEventListener(){}
  };
  vm.runInNewContext(js,{document:doc,window:{innerWidth:390,addEventListener(){}},Date,console});
  let prevented=false;
  triggers[1].dispatch('click',{preventDefault:()=>{prevented=true;}});
  assert.equal(prevented,true);
  assert.equal(dialog.open,true);
  assert.equal(controls['[data-photo-count]'].textContent,'2 / 3');
  assert.equal(controls['[data-photo-caption]'].textContent,'门店外观');
  assert.equal(controls['[data-photo-large]'].alt,'Original image 1');
  controls['[data-photo-next]'].dispatch('click');
  assert.equal(controls['[data-photo-count]'].textContent,'3 / 3');
  dialog.dispatch('keydown',{key:'ArrowRight',preventDefault(){}});
  assert.equal(controls['[data-photo-count]'].textContent,'1 / 3','next from last wraps');
  controls['[data-photo-large]'].dispatch('touchstart',{changedTouches:[{clientX:250}]});
  controls['[data-photo-large]'].dispatch('touchend',{changedTouches:[{clientX:100}]});
  assert.equal(controls['[data-photo-count]'].textContent,'2 / 3','touch swipe advances');
  controls['[data-photo-close]'].dispatch('click');
  assert.equal(dialog.open,false);
  assert.equal(triggers[1].focused,true,'focus returns to the photo opener');
});

test('desktop section rail indicates the page section without interfering with mobile navigation', () => {
  assert.equal((html.match(/data-section-link="/g)||[]).length,5);
  assert.equal((quicklyHtml.match(/data-section-link="/g)||[]).length,4);
  assert.match(css, /@media\(min-width:1460px\)/);
  assert.match(css, /\.section-rail a\[aria-current="location"\] \.rail-indicator/);
  assert.match(js, /window.addEventListener\('scroll', onScroll, \{passive:true\}\)/);

  const links=['top','order','menu','visit'].map(id=>{
    const x=new FakeElement('a');x.dataset.sectionLink=id;
    x.removeAttribute=(key)=>{delete x.attrs[key];};
    return x;
  });
  const rail=new FakeElement('nav');rail.querySelectorAll=sel=>sel==='[data-section-link]'?links:[];
  const positions={top:0,order:1400,menu:2800,visit:4400};
  const nodes=Object.fromEntries(Object.keys(positions).map(id=>[id,{getBoundingClientRect:()=>({top:positions[id]})}]));
  const listeners={};
  const doc={
    getElementById:id=>nodes[id]??null,
    querySelector:sel=>sel==='.section-rail'?rail:null,
    querySelectorAll:()=>[],addEventListener(){}
  };
  const win={innerWidth:1600,innerHeight:800,
    addEventListener:(name,fn,opts)=>{listeners[name]={fn,opts};},
    requestAnimationFrame:fn=>fn()};
  vm.runInNewContext(js,{document:doc,window:win,Date,console});
  assert.equal(links[0].getAttribute('aria-current'),'location');
  positions.order=100;positions.menu=300;positions.visit=600;
  listeners.scroll.fn();
  assert.equal(links[2].getAttribute('aria-current'),'location','current location follows scrolling');
  assert.equal(links[0].getAttribute('aria-current'),null);
  assert.equal(listeners.scroll.opts.passive,true);
  positions.visit=220;listeners.scroll.fn();
  assert.equal(links[3].getAttribute('aria-current'),'location');
});

test('menu interactions provide smooth selection on mobile only when motion enabled', () => {
  assert.match(css, /@keyframes count-update/);
  assert.match(css, /\.motion-on \.menu-status #menu-count.is-updated/);
  assert.match(js, /selectedButton.scrollIntoView/);
  const {nodes,filters,window}=setup();
  // The fixture has no documentElement or scrollIntoView; the app must fail safe.
  window.innerWidth=390;
  filters[6].dispatch('click');
  assert.equal(nodes['menu-grid'].children.length,9);
  assert.equal(filters[6].getAttribute('aria-pressed'),'true');
});


test('phone-first hero exposes real image before long introductions and secondary controls', () => {
  for (const doc of [html, quicklyHtml]) {
    const title = doc.indexOf('id="hero-heading"')>=0
      ? doc.indexOf('id="hero-heading"') : doc.indexOf('id="quicklys-heading"');
    assert.ok(title > 0);
    assert.ok(doc.indexOf('class="motion-controls"') > title,'motion controls should not lead the brand');
  }
  assert.match(css,/\.hero-copy,\.quicklys-intro\{display:contents\}/);
  assert.match(css,/\.hero-visual\{\s*order:5;/);
  assert.match(css,/\.quicklys-store-photo\{\s*order:6;/);
  assert.match(css,/\.hero-copy \.hero-description\{order:6/);
  assert.match(css,/\.quicklys-intro \.quicklys-description\{order:7/);
  assert.match(css,/\.motion-controls \.motion-toggle,\.motion-controls \.motion-replay/);
  assert.ok(!html.includes('images.unsplash.com'));
  assert.ok(!quicklyHtml.includes('images.unsplash.com'));
});

test('floating hero cards use verified actions and keep business identities separate', () => {
  const taiFantuan='https://www.fantuanorder.com/en-US/store/tai-ping-sa-choi-kee/us-1364034559';
  const quicklyFantuan='https://www.fantuanorder.com/en-US/store/quickly/us-28952';
  for (const doc of [html,quicklyHtml]) {
    const hero=doc.split('class="hero-floating-actions"')[1]?.split('class="ticker"')[0];
    assert.ok(hero,'missing hero floating actions');
    assert.equal((hero.match(/class="float-card float-card-/g)||[]).length,3);
    assert.match(hero,/class="float-card float-card-maps"/);
    assert.match(hero,/class="float-card float-card-other"/);
    assert.match(hero,/15848 HALLIBURTON RD/);
    assert.match(hero,/maps\.apple\.com/);
    assert.match(hero,/google\.com\/maps\/dir/);
    assert.match(hero,/target="_blank" rel="noopener noreferrer"/);
    assert.match(hero,/在线点餐/);
    assert.match(hero,/同一地址 · 独立菜单/);
    assert.match(doc,/href="styles\.css\?v=motion-v10"/);
    assert.match(doc,/src="app\.js\?v=motion-v10" defer/);
  }
  const tai=html.split('class="hero-floating-actions"')[1]?.split('class="ticker"')[0];
  const quick=quicklyHtml.split('class="hero-floating-actions"')[1]?.split('class="ticker"')[0];
  assert.ok(tai.includes(taiFantuan));
  assert.ok(!tai.includes(quicklyFantuan));
  assert.ok(quick.includes(quicklyFantuan));
  assert.ok(!quick.includes(taiFantuan));
  assert.match(tai,/href="quicklys\.html"/);
  assert.match(quick,/href="index\.html"/);
  assert.match(css,/\.hero-floating-actions\{\s*position:absolute/);
  assert.match(css,/@media\(max-width:740px\)\{[\s\S]*?\.hero-floating-actions\{\s*position:relative/);
  assert.match(css,/\.quicklys-hero-layout \.hero-floating-actions\{order:7\}/);
  assert.match(css,/\.hero-copy \.hero-description\{order:7\}/);
  assert.match(css,/\.quicklys-intro \.quicklys-description\{order:8\}/);
  assert.match(css,/@keyframes float-card-drift/);
  assert.doesNotMatch(css,/\.motion-on \.float-card-order\{animation:float-card-drift/);
  assert.match(css,/\.motion-on\.card-reveal-ready \[data-card-reveal\]\.card-in-view:not\(\.card-reveal-complete\)/);
  assert.match(css,/\.motion-on \.float-card\{animation:none\}/);
  assert.match(css,/html:not\(\.motion-on\) \.float-card\{animation:none!important/);
  assert.ok(!/(?:fake|rating|review-count|discount-percent)/.test(tai),'no fake reviews or discounts on floating cards');
});


test('desktop and tablet editorial compositions use full-width action row without hiding photography',()=>{
  assert.match(css,/Cross-device editorial refinement v7/);
  const v7=css.split('Cross-device editorial refinement v7')[1];
  assert.match(v7,/@media\(min-width:901px\)\{/);
  assert.match(v7,/\.hero-floating-actions\{\s*position:relative;/);
  assert.match(v7,/grid-template-columns:repeat\(3,minmax\(0,1fr\)\)/);
  assert.match(v7,/@media\(min-width:741px\) and \(max-width:900px\)/);
  assert.match(v7,/\.float-card,.float-card-other\{\s*display:flex/);
  assert.match(v7,/\.quicklys-store-photo\{\s*aspect-ratio:4\/3/);
  assert.match(v7,/\.quicklys-store-photo img\{object-position:50% 40%\}/);
  assert.match(v7,/\.service-grid\{grid-template-columns:repeat\(3,minmax\(0,1fr\)\)/);
  assert.match(v7,/\.feature-image-wrap\{height:385px\}/);
  assert.match(v7,/\.quicklys-page \.menu-results \.menu-grid\{grid-template-columns:repeat\(3,minmax\(0,1fr\)\)/);
  for(const page of [html,quicklyHtml]){
    assert.match(page,/href="styles\.css\?v=motion-v10"/);
    assert.match(page,/src="app\.js\?v=motion-v10" defer/);
    assert.equal((page.match(/class="float-card float-card-/g)||[]).length,3);
  }
  assert.match(v7,/@media\(prefers-reduced-motion:reduce\)/);
});


test('ticker groups are identical and dynamically expanded for a seamless wrap',()=>{
  for(const page of [html, quicklyHtml]){
    const ticker=page.match(/<div class="ticker" aria-hidden="true">([\s\S]*?)<\/div><\/div>/);
    assert.ok(ticker,'two-copy ticker should exist');
    const copies=[...ticker[1].matchAll(/<span class="ticker-copy">([\s\S]*?)<\/span>/g)].map(m=>m[1]);
    assert.equal(copies.length,2,'marquee requires exactly two equal groups');
    assert.equal(copies[0],copies[1],'the sequence must be identical at the looping seam');
    assert.ok(copies[0].includes('<b>✳</b>'),'repeats should keep the separator');
    assert.match(page,/href="styles\.css\?v=motion-v10"/);
    assert.match(page,/src="app\.js\?v=motion-v10" defer/);
  }
  assert.match(js,/function initTickerLoop\(\)/);
  assert.match(js,/baseMarkup\.repeat\(repeats\)/);
  assert.match(js,/viewportWidth \+ 48/);
  assert.match(js,/window\.addEventListener\('resize', schedule, \{passive: true\}\)/);
  assert.match(js,/new ResizeObserver\(schedule\)/);
  assert.match(js,/document\.fonts\?\.ready\?\.then/);
  assert.match(css,/\.motion-on \.ticker-track\{\s*animation-name:ticker-travel;\s*animation-duration:var\(--ticker-duration,23s\)/);
  assert.match(css,/@keyframes ticker-travel\{\s*from\{transform:translate3d\(0,0,0\)\}\s*to\{transform:translate3d\(-50%,0,0\)\}/);
});


test('every static card is watched separately for its first viewport entry',()=>{
  const cards=(doc)=>({
    floating:(doc.match(/data-card-reveal class="float-card/g)||[]).length,
    services:(doc.match(/data-card-reveal class="service-card/g)||[]).length,
    dishes:(doc.match(/data-card-reveal class="signature-card/g)||[]).length,
    photos:(doc.match(/data-card-reveal class="feature-card/g)||[]).length
  });
  assert.deepEqual(cards(html),{floating:3,services:3,dishes:13,photos:2});
  assert.deepEqual(cards(quicklyHtml),{floating:3,services:3,dishes:0,photos:0});
  assert.equal((quicklyHtml.match(/data-card-reveal href="#menu" data-select-category/g)||[]).length,3);
  assert.match(quicklyHtml,/data-card-reveal class="menu-side-panel"/);
  for(const page of [html,quicklyHtml]){
    assert.doesNotMatch(page,/class="hero-floating-actions"[^>]+data-reveal/);
    assert.match(page,/href="styles\.css\?v=motion-v10"/);
    assert.match(page,/src="app\.js\?v=motion-v10" defer/);
  }
  assert.match(css,/@keyframes card-enter-on-view/);
  assert.match(css,/\.motion-on\.card-reveal-ready \[data-card-reveal\]\.card-in-view:not\(\.card-reveal-complete\)/);
  assert.match(css,/animation-delay:var\(--card-stagger,0ms\)/);
  assert.doesNotMatch(css,/\.motion-on \.float-card-order\{animation:float-card-drift/);
  assert.match(js,/observer\.unobserve\(card\)/);
  assert.match(js,/forgetOldCards\(menuGrid\)/);
  assert.match(js,/observeNewCards\(menuGrid\)/);
  assert.match(js,/function initCardReveals\(\)/);
  assert.match(js,/rearmCardReveals\(\)/);
});

test('card animation runs only while visible, pauses on exit, resumes and finishes once',()=>{
  const root=new FakeElement('html');
  const first=new FakeElement('article'),second=new FakeElement('article');
  first.setAttribute('data-card-reveal','');
  second.setAttribute('data-card-reveal','');
  const toggle=new FakeElement('button'),replay=new FakeElement('button');
  const zh=new FakeElement('span'),en=new FakeElement('span');
  toggle.querySelector=sel=>sel==='.motion-status-zh'?zh:sel==='.motion-status-en'?en:null;
  const nodes=[first,second];
  const doc={
    documentElement:root,
    querySelector:sel=>sel==='[data-motion-toggle]'?toggle:sel==='[data-motion-replay]'?replay:null,
    querySelectorAll:sel=>sel==='[data-card-reveal]'?nodes:[],
    getElementById:()=>null,
    addEventListener(){}
  };
  let callback,watched=[],options;
  class Observer {
    constructor(cb,settings){callback=cb;options=settings;}
    observe(card){if(!watched.includes(card))watched.push(card);}
    unobserve(card){watched=watched.filter(el=>el!==card);}
  }
  const win={innerWidth:390,addEventListener(){},matchMedia:()=>({matches:false})};
  vm.runInNewContext(js,{document:doc,window:win,IntersectionObserver:Observer,WeakSet,Date,console});
  assert.equal(root.classList.contains('card-reveal-ready'),true);
  assert.equal(watched.length,2);
  assert.equal(options.rootMargin,'0px 0px -8% 0px');
  assert.equal(options.threshold.includes(.15),true);
  assert.equal(first.classList.contains('card-in-view'),false,'nothing starts when offscreen');

  callback([{target:first,isIntersecting:true,intersectionRatio:.06}]);
  assert.equal(first.classList.contains('card-in-view'),false,'small intersection should not start an entrance');
  callback([{target:first,isIntersecting:true,intersectionRatio:.6}]);
  assert.equal(first.classList.contains('card-in-view'),true,'entering the viewport starts entrance');
  assert.equal(first.classList.contains('card-on-screen'),true);
  assert.equal(second.classList.contains('card-in-view'),false);
  assert.equal(watched.length,2,'running cards must stay observed to detect exit');

  callback([{target:first,isIntersecting:false,intersectionRatio:0}]);
  assert.equal(first.classList.contains('card-in-view'),true,'progress is preserved');
  assert.equal(first.classList.contains('card-on-screen'),false,'offscreen animation is paused');
  assert.equal(watched.length,2);
  // A card cannot be marked complete while its animation is paused.
  first.dispatch('animationend',{target:first,animationName:'card-enter-on-view'});
  assert.equal(first.classList.contains('card-reveal-complete'),false);
  callback([{target:first,isIntersecting:true,intersectionRatio:.8}]);
  assert.equal(first.classList.contains('card-on-screen'),true,'animation resumes on re-entry');
  first.dispatch('animationend',{target:first,animationName:'card-enter-on-view'});
  assert.equal(first.classList.contains('card-reveal-complete'),true,'completion is permanent until replay');
  assert.equal(first.classList.contains('card-in-view'),false);
  assert.equal(first.classList.contains('card-on-screen'),false);
  assert.equal(watched.length,1,'finished cards are unobserved');

  callback([{target:first,isIntersecting:true,intersectionRatio:1}]);
  assert.equal(first.classList.contains('card-on-screen'),false,'completed card never restarts');
  replay.dispatch('click');
  assert.equal(first.classList.contains('card-reveal-complete'),false,'replay re-arms complete cards');
  assert.equal(watched.length,2);
  assert.equal(first.classList.contains('card-on-screen'),false,'replay alone does not start any card');
  callback([{target:second,isIntersecting:true,intersectionRatio:.7}]);
  assert.equal(second.classList.contains('card-on-screen'),true);
  toggle.dispatch('click');
  assert.equal(root.classList.contains('motion-off'),true);
  callback([{target:second,isIntersecting:true,intersectionRatio:.7}]);
  assert.equal(second.classList.contains('card-on-screen'),false,'turning off motion stops on-screen animation');
  toggle.dispatch('click');
  assert.equal(root.classList.contains('motion-on'),true);
  assert.equal(second.classList.contains('card-on-screen'),false,'reenabling only re-arms until next observer entry');
});

test('card animation CSS pauses offscreen and is permanently stopped after completion',()=>{
  assert.match(css,/\.motion-on\.card-reveal-ready \[data-card-reveal\]\.card-in-view:not\(\.card-reveal-complete\)/);
  assert.match(css,/animation-play-state:paused/);
  assert.match(css,/\.card-in-view\.card-on-screen:not\(\.card-reveal-complete\)/);
  assert.match(css,/animation-play-state:running/);
  assert.match(css,/\.card-reveal-complete \{\s*animation:none!important/);
  assert.match(js,/intersectionRatio >= 0\.15/);
  assert.match(js,/observer\.unobserve\(card\)/);
  assert.match(js,/card\.removeEventListener\?\.\('animationend', completed\)/);
  assert.ok(!css.includes('.motion-on .float-card-order{animation:float-card-drift'),
    'do not revive continuous floating card animation');
});
