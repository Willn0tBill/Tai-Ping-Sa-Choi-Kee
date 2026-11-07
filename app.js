'use strict';

/**
 * Store-owned menu data belongs here once the owner confirms it.
 * These are illustrative highlights based on public references, not a price list.
 */
const MENU_ITEMS = [
  { name:'Classic Milk Tea', zh:'经典奶茶', type:'milk', tag:'Milk tea', color:'#ecb47c', note:'A familiar favorite' },
  { name:'Thai Milk Tea', zh:'泰式奶茶', type:'milk', tag:'Milk tea', color:'#f2a155', note:'Rich & comforting' },
  { name:'Taro Milk Tea', zh:'芋香奶茶', type:'milk', tag:'Milk tea', color:'#b9a1d8', note:'Creamy & mellow' },
  { name:'Green Apple Tea', zh:'青苹果茶', type:'fruit', tag:'Fruit & tea', color:'#a3cf83', note:'Bright & refreshing' },
  { name:'Flavored Iced Tea', zh:'风味冰茶', type:'fruit', tag:'Fruit & tea', color:'#d7be61', note:'Cool & easygoing' },
  { name:'Taro Slush', zh:'芋头冰沙', type:'slush', tag:'Slush', color:'#c0a8db', note:'Chilly & creamy' },
  { name:'Red Bean Slush', zh:'红豆冰沙', type:'slush', tag:'Slush', color:'#bd8378', note:'A classic treat' },
  { name:'Green Apple Slush', zh:'青苹果冰沙', type:'slush', tag:'Slush', color:'#a9d483', note:'Fruity & icy' },
  { name:'Popcorn Chicken', zh:'盐酥鸡', type:'snacks', tag:'Snacks', color:'#e8af64', note:'Savory favorite' },
  { name:'Curly Fries', zh:'螺旋薯条', type:'snacks', tag:'Snacks', color:'#eccb78', note:'Crispy bites' },
  { name:'Fried Tofu', zh:'炸豆腐', type:'snacks', tag:'Snacks', color:'#dcb46d', note:'Golden & savory' },
  { name:'Taiwanese Sausage', zh:'台湾香肠', type:'snacks', tag:'Snacks', color:'#cb9471', note:'Classic snack' }
];

const menuGrid = document.getElementById('menu-grid');
const menuCount = document.getElementById('menu-count');
const menuEmpty = document.getElementById('menu-empty');
const searchInput = document.getElementById('menu-search');
const filterButtons = Array.from(document.querySelectorAll('[data-filter]'));
const nav = document.getElementById('site-nav');
const navToggle = document.querySelector('.menu-toggle');
const year = document.getElementById('copyright-year');

let activeCategory = 'all';

function makeTextElement(tag, className, text, lang) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (lang) element.lang = lang;
  element.textContent = text;
  return element;
}

function renderMenu() {
  if (!menuGrid || !searchInput) return;
  const query = searchInput.value.trim().toLocaleLowerCase();
  const matches = MENU_ITEMS.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.type === activeCategory;
    const haystack = [item.name, item.zh, item.type, item.tag, item.note].join(' ').toLocaleLowerCase();
    return matchesCategory && (!query || haystack.includes(query));
  });

  const fragment = document.createDocumentFragment();
  for (const item of matches) {
    const card = document.createElement('article');
    card.className = 'menu-card';
    card.style.setProperty('--accent', item.color);
    card.appendChild(makeTextElement('div', 'menu-card-top', item.tag));
    card.appendChild(makeTextElement('h3', '', item.name));
    card.appendChild(makeTextElement('p', 'menu-zh', item.zh, 'zh-Hans'));
    const foot = makeTextElement('div', 'menu-card-bottom', item.note);
    foot.appendChild(makeTextElement('span', '', '↗'));
    card.appendChild(foot);
    fragment.appendChild(card);
  }
  menuGrid.replaceChildren(fragment);
  menuCount.textContent = matches.length + ' menu highlight' + (matches.length === 1 ? '' : 's') + ' / 精选';
  menuEmpty.hidden = matches.length !== 0;
}

function setCategory(category) {
  if (!['all', 'milk', 'fruit', 'slush', 'snacks'].includes(category)) return;
  activeCategory = category;
  for (const button of filterButtons) {
    const selected = button.dataset.filter === category;
    button.classList.toggle('is-active', selected);
    button.setAttribute('aria-pressed', String(selected));
  }
  renderMenu();
}

for (const button of filterButtons) {
  button.addEventListener('click', () => setCategory(button.dataset.filter));
}

if (searchInput) searchInput.addEventListener('input', renderMenu);

const clearFilters = document.getElementById('clear-search');
if (clearFilters) clearFilters.addEventListener('click', () => {
  searchInput.value = '';
  setCategory('all');
  searchInput.focus();
});

for (const link of document.querySelectorAll('[data-select-category]')) {
  link.addEventListener('click', () => {
    if (searchInput) searchInput.value = '';
    setCategory(link.dataset.selectCategory);
  });
}

function closeMobileNav() {
  if (!nav || !navToggle) return;
  nav.classList.remove('is-open');
  navToggle.setAttribute('aria-expanded', 'false');
  navToggle.setAttribute('aria-label', 'Open navigation');
}

if (nav && navToggle) {
  navToggle.addEventListener('click', () => {
    const willOpen = navToggle.getAttribute('aria-expanded') !== 'true';
    nav.classList.toggle('is-open', willOpen);
    navToggle.setAttribute('aria-expanded', String(willOpen));
    navToggle.setAttribute('aria-label', willOpen ? 'Close navigation' : 'Open navigation');
  });
  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMobileNav));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && nav.classList.contains('is-open')) {
      closeMobileNav();
      navToggle.focus();
    }
  });
  document.addEventListener('click', (event) => {
    if (!nav.contains(event.target) && !navToggle.contains(event.target)) closeMobileNav();
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 800) closeMobileNav();
  });
}

if (year) year.textContent = String(new Date().getFullYear());
renderMenu();
