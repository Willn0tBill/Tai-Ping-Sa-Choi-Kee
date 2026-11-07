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
      remove:(v)=>members.delete(v),
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
  assert.equal(nodes['menu-grid'].children[0].classList.contains('menu-card-enter'),true);
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
  assert.equal((html.match(/<img\b/g) ?? []).length, 3);
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
test('reveals show content only in capable motion-enabled browsers', () => {
  assert.match(css,/html\.has-motion \[data-reveal\]/);
  assert.match(css,/html\.has-motion \[data-reveal\]\.is-visible/);
  assert.match(css,/prefers-reduced-motion:no-preference/);
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
  assert.equal(reduced.classList.contains('has-motion'),false);
  const legacy=new FakeElement('html');
  vm.runInNewContext(js,{document:{...fakeDocument,documentElement:legacy},window:fakeWindow,Date,console});
  assert.equal(legacy.classList.contains('has-motion'),false);
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

test('visible motion system includes immediately noticeable hero animation and ticker', () => {
  for(const page of [html,quicklyHtml]){
    assert.match(page,/class="scroll-progress" aria-hidden="true"/);
    assert.match(page,/class="scroll-cue" href="#order"/);
    assert.match(page,/继续探索/);
  }
  const motion=css.split('Visible motion system v2')[1];
  assert.ok(motion,'new animation system exists');
  for(const name of ['hero-text-rise','hero-photo-rise','section-rise','ticker-travel','scroll-cue-float']){
    assert.ok(motion.includes('@keyframes '+name),name+' should be an actual animation');
  }
  assert.match(motion,/\.hero-copy>\*,\.quicklys-intro>\*\{/);
  assert.match(motion,/\.hero-visual,\.quicklys-store-photo\{animation:hero-photo-rise/);
  assert.match(motion,/\.ticker-track span\{animation:ticker-travel/);
  assert.match(motion,/\.ticker:hover \.ticker-track span/);
  assert.match(motion,/html\.has-motion \[data-reveal\]\{\s*opacity:1;transform:none/);
  assert.match(motion,/html\.has-motion \[data-reveal\]\.is-visible/);
  assert.match(motion,/prefers-reduced-motion:no-preference/);
  assert.match(motion,/prefers-reduced-motion:reduce/);
  assert.match(motion,/animation:none!important/);
  assert.ok(!motion.includes('background-image:url('),'no AI assets or animated image downloads');
});

test('reading progress updates with passive scroll listeners and respects short pages', () => {
  const root=new FakeElement('html'),bar=new FakeElement('div');
  const props={};
  root.scrollHeight=1300;root.clientHeight=300;
  root.style={setProperty:(k,v)=>{props[k]=v;}};
  const callbacks={};
  const body={scrollHeight:1300};
  const document={
    documentElement:root,body,
    getElementById:()=>null,
    querySelector:(selector)=>selector==='.scroll-progress'?bar:null,
    querySelectorAll:()=>[],
    addEventListener(){}
  };
  const window={
    innerWidth:390,innerHeight:300,scrollY:250,
    matchMedia:()=>({matches:true}),
    addEventListener:(type,fn,opts)=>{callbacks[type]={fn,opts};}
  };
  vm.runInNewContext(js,{document,window,Date,console});
  assert.equal(props['--page-progress'],'0.25');
  assert.equal(callbacks.scroll.opts.passive,true);
  window.scrollY=1000;callbacks.scroll.fn();
  assert.equal(props['--page-progress'],'1');
  window.scrollY=1400;callbacks.scroll.fn();
  assert.equal(props['--page-progress'],'1','progress should clamp to 100%');
  root.scrollHeight=300;body.scrollHeight=300;window.scrollY=0;callbacks.resize.fn();
  assert.equal(props['--page-progress'],'0','short pages are safe');
});
