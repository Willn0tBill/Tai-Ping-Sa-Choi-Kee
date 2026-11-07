import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import vm from 'node:vm';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const css = readFileSync(new URL('../styles.css', import.meta.url), 'utf8');
const js = readFileSync(new URL('../app.js', import.meta.url), 'utf8');

test('static page has useful structure, labels and verified contact links', () => {
  for (const id of ['main', 'menu', 'favorites', 'visit', 'menu-grid']) {
    assert.match(html, new RegExp('id="' + id + '"'));
  }
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
  assert.match(html, /in-store menu photograph/);
  assert.match(html, /Please confirm with the shop/);
  assert.ok(!html.includes('application/ld+json'), 'unapproved demo must not imply verified official schema');
  for (const tag of html.match(/<img\b[^>]*>/g) ?? []) {
    assert.match(tag, /alt="[^"]+"/);
    assert.match(tag, /loading="lazy"|fetchpriority="high"/);
  }
  for (const file of ['index.html', 'styles.css', 'app.js', 'favicon.svg']) {
    assert.equal(existsSync(new URL('../' + file, import.meta.url)), true, file + ' missing');
  }
});

test('responsive layout supports reduced motion and keyboard focus', () => {
  assert.match(css, /@media\(max-width:560px\)/);
  assert.match(css, /@media\(max-width:800px\)/);
  assert.match(css, /prefers-reduced-motion:reduce/);
  assert.match(css, /:focus-visible/);
  assert.match(html, /class="skip-link"/);
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
  const window={innerWidth:390,addEventListener(){}};
  vm.runInNewContext(js,{document,window,Date,console});
  return {nodes,toggle,filters,feature,docEvents};
}

test('menu search filters English and Chinese items and resets correctly', () => {
  const {nodes,filters} = setup();
  assert.equal(nodes['menu-grid'].children.length,14);
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
  assert.equal(html.includes('data-filter="toppings"'), true);
  assert.equal(html.includes('data-filter="smoothie"'), true);
  assert.equal(html.includes('data-filter="foam"'), false);
  assert.equal(entries.find(e => e.name === 'Popcorn Chicken').price, 8.29);
  assert.equal(entries.find(e => e.name === 'Barley Milk Tea').priceM, 5.28);
  assert.equal(entries.find(e => e.name === 'Mango Slush').priceM, 4.28);
  assert.equal(entries.find(e => e.name === 'Oreo Slush').priceL, 4.98);
  assert.equal(entries.find(e => e.name === 'Crystal Boba').price, 1);
  assert.equal(js.includes('const priceLabel'), true);
});

test('actual restaurant food board has bilingual featured dishes without invented prices', () => {
  const kitchen = html.split('<section class="kitchen-section')[1]?.split('<section class="menu-section')[0];
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
  assert.match(html, /data-filter="milk"[^>]*><span lang="zh-Hans">奶茶<\/span><small lang="en">Milk tea<\/small><\/button>/);
  assert.match(html, /<h2 id="kitchen-heading" lang="zh-Hans">/);
  assert.match(html, /<h2 id="menu-heading" lang="zh-Hans">/);
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
