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
  assert.match(html, /lang="zh-Hans"/);
  assert.match(html, /aria-expanded="false"/);
  assert.match(html, /Website concept preview/);
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
  const filters=['all','milk','fruit','slush','snacks'].map(value=>{
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
  assert.equal(nodes['menu-grid'].children.length,12);
  filters[4].dispatch('click');
  assert.equal(nodes['menu-grid'].children.length,4);
  assert.equal(filters[4].getAttribute('aria-pressed'),'true');
  nodes['menu-search'].value='盐酥鸡';
  nodes['menu-search'].dispatch('input');
  assert.equal(nodes['menu-grid'].children.length,1);
  assert.equal(nodes['menu-grid'].children[0].children[1].textContent,'Popcorn Chicken');
  nodes['menu-search'].value='unavailable item';
  nodes['menu-search'].dispatch('input');
  assert.equal(nodes['menu-grid'].children.length,0);
  assert.equal(nodes['menu-empty'].hidden,false);
  nodes['clear-search'].dispatch('click');
  assert.equal(nodes['menu-grid'].children.length,12);
  assert.equal(nodes['menu-empty'].hidden,true);
  nodes['menu-search'].value='taro';
  nodes['menu-search'].dispatch('input');
  assert.equal(nodes['menu-grid'].children.length,2);
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
  assert.equal(nodes['menu-grid'].children.length,3);
  toggle.dispatch('click');
  nodes['site-nav'].link.dispatch('click');
  assert.equal(toggle.getAttribute('aria-expanded'),'false');
});
