'use strict';

/**
 * Transcribed from photographs of the Hacienda Heights in-store menu supplied
 * by the user. Confirm availability and pricing with owner before launch.
 * Ambiguous Mango Milk Tea line (English disagrees with Chinese) excluded.
 */
const MENU_ITEMS = [
  {
    "name": "Milk Tea",
    "zh": "快可立奶茶",
    "type": "milk",
    "tag": "Milk tea",
    "categoryZh": "奶茶",
    "color": "#ecb47c",
    "priceM": 4.28,
    "priceL": 4.78
  },
  {
    "name": "Milk Green Tea",
    "zh": "快可立奶绿",
    "type": "milk",
    "tag": "Milk tea",
    "categoryZh": "奶茶",
    "color": "#ecb47c",
    "priceM": 4.28,
    "priceL": 4.78
  },
  {
    "name": "Honey Milk Tea",
    "zh": "蜂蜜奶茶",
    "type": "milk",
    "tag": "Milk tea",
    "categoryZh": "奶茶",
    "color": "#ecb47c",
    "priceM": 4.28,
    "priceL": 4.78
  },
  {
    "name": "Almond Milk Tea",
    "zh": "杏仁奶茶",
    "type": "milk",
    "tag": "Milk tea",
    "categoryZh": "奶茶",
    "color": "#ecb47c",
    "priceM": 4.28,
    "priceL": 4.78
  },
  {
    "name": "Barley Milk Tea",
    "zh": "胚芽奶茶",
    "type": "milk",
    "tag": "Milk tea",
    "categoryZh": "奶茶",
    "color": "#ecb47c",
    "priceM": 5.28,
    "priceL": 5.78
  },
  {
    "name": "Coconut Milk Tea",
    "zh": "椰香奶茶",
    "type": "milk",
    "tag": "Milk tea",
    "categoryZh": "奶茶",
    "color": "#ecb47c",
    "priceM": 4.38,
    "priceL": 4.88
  },
  {
    "name": "Taro Milk Tea",
    "zh": "芋香奶茶",
    "type": "milk",
    "tag": "Milk tea",
    "categoryZh": "奶茶",
    "color": "#ecb47c",
    "priceM": 4.28,
    "priceL": 4.78
  },
  {
    "name": "Thai Milk Tea",
    "zh": "泰式奶茶",
    "type": "milk",
    "tag": "Milk tea",
    "categoryZh": "奶茶",
    "color": "#ecb47c",
    "priceM": 4.28,
    "priceL": 4.78
  },
  {
    "name": "Coffee Milk Tea",
    "zh": "咖啡奶茶",
    "type": "milk",
    "tag": "Milk tea",
    "categoryZh": "奶茶",
    "color": "#ecb47c",
    "priceM": 4.28,
    "priceL": 4.78
  },
  {
    "name": "Chocolate Milk Tea",
    "zh": "巧克力奶茶",
    "type": "milk",
    "tag": "Milk tea",
    "categoryZh": "奶茶",
    "color": "#ecb47c",
    "priceM": 4.28,
    "priceL": 4.78
  },
  {
    "name": "Honeydew Milk Tea",
    "zh": "哈密瓜奶茶",
    "type": "milk",
    "tag": "Milk tea",
    "categoryZh": "奶茶",
    "color": "#ecb47c",
    "priceM": 4.28,
    "priceL": 4.78
  },
  {
    "name": "Rose Milk Tea",
    "zh": "玫瑰奶茶",
    "type": "milk",
    "tag": "Milk tea",
    "categoryZh": "奶茶",
    "color": "#ecb47c",
    "priceM": 4.28,
    "priceL": 4.78
  },
  {
    "name": "Strawberry Milk Tea",
    "zh": "草莓奶茶",
    "type": "milk",
    "tag": "Milk tea",
    "categoryZh": "奶茶",
    "color": "#ecb47c",
    "priceM": 4.28,
    "priceL": 4.78
  },
  {
    "name": "Oreo Milk Tea",
    "zh": "奥利奥奶茶",
    "type": "milk",
    "tag": "Milk tea",
    "categoryZh": "奶茶",
    "color": "#ecb47c",
    "priceM": 4.58,
    "priceL": 5.08
  },
  {
    "name": "Bubble Black / Green Tea",
    "zh": "泡沫红茶 / 绿茶",
    "type": "tea",
    "tag": "Flavored tea",
    "categoryZh": "调味茶",
    "color": "#a3cf83",
    "priceM": 4.28,
    "priceL": 4.78
  },
  {
    "name": "Honey Black / Green Tea",
    "zh": "蜂蜜红茶 / 绿茶",
    "type": "tea",
    "tag": "Flavored tea",
    "categoryZh": "调味茶",
    "color": "#a3cf83",
    "priceM": 4.28,
    "priceL": 4.78
  },
  {
    "name": "Guava Black / Green Tea",
    "zh": "芭乐红茶 / 绿茶",
    "type": "tea",
    "tag": "Flavored tea",
    "categoryZh": "调味茶",
    "color": "#a3cf83",
    "priceM": 4.28,
    "priceL": 4.78
  },
  {
    "name": "Mango Black / Green Tea",
    "zh": "芒果红茶 / 绿茶",
    "type": "tea",
    "tag": "Flavored tea",
    "categoryZh": "调味茶",
    "color": "#a3cf83",
    "priceM": 4.28,
    "priceL": 4.78
  },
  {
    "name": "Lemon Black / Green Tea",
    "zh": "柠檬红茶 / 绿茶",
    "type": "tea",
    "tag": "Flavored tea",
    "categoryZh": "调味茶",
    "color": "#a3cf83",
    "priceM": 4.28,
    "priceL": 4.78
  },
  {
    "name": "Strawberry Black / Green Tea",
    "zh": "草莓红茶 / 绿茶",
    "type": "tea",
    "tag": "Flavored tea",
    "categoryZh": "调味茶",
    "color": "#a3cf83",
    "priceM": 4.28,
    "priceL": 4.78
  },
  {
    "name": "Grapefruit Black / Green Tea",
    "zh": "柚子红茶 / 绿茶",
    "type": "tea",
    "tag": "Flavored tea",
    "categoryZh": "调味茶",
    "color": "#a3cf83",
    "priceM": 4.28,
    "priceL": 4.78
  },
  {
    "name": "Rose Black / Green Tea",
    "zh": "玫瑰红茶 / 绿茶",
    "type": "tea",
    "tag": "Flavored tea",
    "categoryZh": "调味茶",
    "color": "#a3cf83",
    "priceM": 4.28,
    "priceL": 4.78
  },
  {
    "name": "Green Apple Black / Green Tea",
    "zh": "青苹果红茶 / 绿茶",
    "type": "tea",
    "tag": "Flavored tea",
    "categoryZh": "调味茶",
    "color": "#a3cf83",
    "priceM": 4.28,
    "priceL": 4.78
  },
  {
    "name": "Passion Fruit Black / Green Tea",
    "zh": "百香果红茶 / 绿茶",
    "type": "tea",
    "tag": "Flavored tea",
    "categoryZh": "调味茶",
    "color": "#a3cf83",
    "priceM": 4.28,
    "priceL": 4.78
  },
  {
    "name": "Peach Black / Green Tea",
    "zh": "水蜜桃红茶 / 绿茶",
    "type": "tea",
    "tag": "Flavored tea",
    "categoryZh": "调味茶",
    "color": "#a3cf83",
    "priceM": 4.28,
    "priceL": 4.78
  },
  {
    "name": "Winter Melon Tea",
    "zh": "冬瓜茶",
    "type": "tea",
    "tag": "Flavored tea",
    "categoryZh": "调味茶",
    "color": "#a3cf83",
    "priceM": 4.28,
    "priceL": 4.78
  },
  {
    "name": "Honey Lemon with Aloe",
    "zh": "蜂蜜柠檬芦荟",
    "type": "special",
    "tag": "Special drinks",
    "categoryZh": "特调饮品",
    "color": "#dfb48a",
    "priceM": 4.98,
    "priceL": 5.68
  },
  {
    "name": "Brown Sugar Latte",
    "zh": "黑糖拿铁",
    "type": "special",
    "tag": "Special drinks",
    "categoryZh": "特调饮品",
    "color": "#dfb48a",
    "priceM": 4.98,
    "priceL": 5.68
  },
  {
    "name": "Iced Coffee",
    "zh": "冰咖啡",
    "type": "special",
    "tag": "Special drinks",
    "categoryZh": "特调饮品",
    "color": "#dfb48a",
    "priceM": 4.28,
    "priceL": 4.88
  },
  {
    "name": "Mango Slush",
    "zh": "芒果冰沙",
    "type": "slush",
    "tag": "Slush",
    "categoryZh": "冰沙",
    "color": "#bea9da",
    "priceM": 4.28,
    "priceL": 4.78
  },
  {
    "name": "Lemon Slush",
    "zh": "柠檬冰沙",
    "type": "slush",
    "tag": "Slush",
    "categoryZh": "冰沙",
    "color": "#bea9da",
    "priceM": 4.28,
    "priceL": 4.78
  },
  {
    "name": "Pineapple Slush",
    "zh": "凤梨冰沙",
    "type": "slush",
    "tag": "Slush",
    "categoryZh": "冰沙",
    "color": "#bea9da",
    "priceM": 4.28,
    "priceL": 4.78
  },
  {
    "name": "Strawberry Slush",
    "zh": "草莓冰沙",
    "type": "slush",
    "tag": "Slush",
    "categoryZh": "冰沙",
    "color": "#bea9da",
    "priceM": 4.28,
    "priceL": 4.78
  },
  {
    "name": "Coconut Slush",
    "zh": "椰香冰沙",
    "type": "slush",
    "tag": "Slush",
    "categoryZh": "冰沙",
    "color": "#bea9da",
    "priceM": 4.28,
    "priceL": 4.78
  },
  {
    "name": "Lychee Slush",
    "zh": "荔枝冰沙",
    "type": "slush",
    "tag": "Slush",
    "categoryZh": "冰沙",
    "color": "#bea9da",
    "priceM": 4.28,
    "priceL": 4.78
  },
  {
    "name": "Taro Slush",
    "zh": "芋头冰沙",
    "type": "slush",
    "tag": "Slush",
    "categoryZh": "冰沙",
    "color": "#bea9da",
    "priceM": 4.28,
    "priceL": 4.78
  },
  {
    "name": "Green Apple Slush",
    "zh": "青苹果冰沙",
    "type": "slush",
    "tag": "Slush",
    "categoryZh": "冰沙",
    "color": "#bea9da",
    "priceM": 4.28,
    "priceL": 4.78
  },
  {
    "name": "Peach Slush",
    "zh": "水蜜桃冰沙",
    "type": "slush",
    "tag": "Slush",
    "categoryZh": "冰沙",
    "color": "#bea9da",
    "priceM": 4.28,
    "priceL": 4.78
  },
  {
    "name": "Passion Fruit Slush",
    "zh": "百香果冰沙",
    "type": "slush",
    "tag": "Slush",
    "categoryZh": "冰沙",
    "color": "#bea9da",
    "priceM": 4.28,
    "priceL": 4.78
  },
  {
    "name": "Honeydew Slush",
    "zh": "哈密瓜冰沙",
    "type": "slush",
    "tag": "Slush",
    "categoryZh": "冰沙",
    "color": "#bea9da",
    "priceM": 4.28,
    "priceL": 4.78
  },
  {
    "name": "Chocolate Slush",
    "zh": "巧克力冰沙",
    "type": "slush",
    "tag": "Slush",
    "categoryZh": "冰沙",
    "color": "#bea9da",
    "priceM": 4.28,
    "priceL": 4.78
  },
  {
    "name": "Yogurt Slush",
    "zh": "养乐多冰沙",
    "type": "slush",
    "tag": "Slush",
    "categoryZh": "冰沙",
    "color": "#bea9da",
    "priceM": 4.28,
    "priceL": 4.78
  },
  {
    "name": "Thai Milk Tea Slush",
    "zh": "泰式奶茶冰沙",
    "type": "slush",
    "tag": "Slush",
    "categoryZh": "冰沙",
    "color": "#bea9da",
    "priceM": 4.28,
    "priceL": 4.78
  },
  {
    "name": "Milk Tea Slush",
    "zh": "奶茶冰沙",
    "type": "slush",
    "tag": "Slush",
    "categoryZh": "冰沙",
    "color": "#bea9da",
    "priceM": 4.28,
    "priceL": 4.78
  },
  {
    "name": "Matcha Slush",
    "zh": "抹茶冰沙",
    "type": "slush",
    "tag": "Slush",
    "categoryZh": "冰沙",
    "color": "#bea9da",
    "priceM": 4.28,
    "priceL": 4.78
  },
  {
    "name": "Oreo Slush",
    "zh": "奥利奥冰沙",
    "type": "slush",
    "tag": "Slush",
    "categoryZh": "冰沙",
    "color": "#bea9da",
    "priceM": 4.58,
    "priceL": 4.98
  },
  {
    "name": "Mango Smoothie",
    "zh": "芒果雪泥",
    "type": "smoothie",
    "tag": "Smoothies",
    "categoryZh": "雪泥",
    "color": "#d9a6bc",
    "priceM": 5.28,
    "priceL": 5.68
  },
  {
    "name": "Strawberry Smoothie",
    "zh": "草莓雪泥",
    "type": "smoothie",
    "tag": "Smoothies",
    "categoryZh": "雪泥",
    "color": "#d9a6bc",
    "priceM": 5.28,
    "priceL": 5.68
  },
  {
    "name": "Passion Fruit Smoothie",
    "zh": "百香果雪泥",
    "type": "smoothie",
    "tag": "Smoothies",
    "categoryZh": "雪泥",
    "color": "#d9a6bc",
    "priceM": 5.28,
    "priceL": 5.68
  },
  {
    "name": "Peach Smoothie",
    "zh": "水蜜桃雪泥",
    "type": "smoothie",
    "tag": "Smoothies",
    "categoryZh": "雪泥",
    "color": "#d9a6bc",
    "priceM": 5.28,
    "priceL": 5.68
  },
  {
    "name": "Matcha Smoothie",
    "zh": "抹茶雪泥",
    "type": "smoothie",
    "tag": "Smoothies",
    "categoryZh": "雪泥",
    "color": "#d9a6bc",
    "priceM": 5.28,
    "priceL": 5.68
  },
  {
    "name": "Strawberry Banana Smoothie",
    "zh": "草莓香蕉雪泥",
    "type": "smoothie",
    "tag": "Smoothies",
    "categoryZh": "雪泥",
    "color": "#d9a6bc",
    "priceM": 5.38,
    "priceL": 5.78
  },
  {
    "name": "Mango Strawberry Smoothie",
    "zh": "芒果草莓雪泥",
    "type": "smoothie",
    "tag": "Smoothies",
    "categoryZh": "雪泥",
    "color": "#d9a6bc",
    "priceM": 5.38,
    "priceL": 5.78
  },
  {
    "name": "Coconut Pineapple Smoothie",
    "zh": "凤梨椰香雪泥",
    "type": "smoothie",
    "tag": "Smoothies",
    "categoryZh": "雪泥",
    "color": "#d9a6bc",
    "priceM": 5.38,
    "priceL": 5.78
  },
  {
    "name": "Oreo Chocolate Smoothie",
    "zh": "奥利奥巧克力雪泥",
    "type": "smoothie",
    "tag": "Smoothies",
    "categoryZh": "雪泥",
    "color": "#d9a6bc",
    "priceM": 5.48,
    "priceL": 5.98
  },
  {
    "name": "Fresh Taro Smoothie",
    "zh": "芋头牛奶雪泥（鲜）",
    "type": "smoothie",
    "tag": "Smoothies",
    "categoryZh": "雪泥",
    "color": "#d9a6bc",
    "priceM": 5.48,
    "priceL": 5.98
  },
  {
    "name": "Fresh Red Bean Smoothie",
    "zh": "红豆牛奶雪泥（鲜）",
    "type": "smoothie",
    "tag": "Smoothies",
    "categoryZh": "雪泥",
    "color": "#d9a6bc",
    "priceM": 5.48,
    "priceL": 5.98
  },
  {
    "name": "French Fries",
    "zh": "炸薯条",
    "type": "snacks",
    "tag": "Snacks",
    "categoryZh": "小吃",
    "color": "#e7ad65",
    "price": 5.29
  },
  {
    "name": "Fried Tempura (10 pcs)",
    "zh": "炸甜不辣（10个）",
    "type": "snacks",
    "tag": "Snacks",
    "categoryZh": "小吃",
    "color": "#e7ad65",
    "price": 6.99
  },
  {
    "name": "Fried Fish Tofu (10 pcs)",
    "zh": "炸鱼豆腐（10个）",
    "type": "snacks",
    "tag": "Snacks",
    "categoryZh": "小吃",
    "color": "#e7ad65",
    "price": 6.99
  },
  {
    "name": "Fried Squid Balls (10 pcs)",
    "zh": "炸花枝丸（10个）",
    "type": "snacks",
    "tag": "Snacks",
    "categoryZh": "小吃",
    "color": "#e7ad65",
    "price": 7.99
  },
  {
    "name": "Taiwanese Sausage (3 pcs)",
    "zh": "台湾香肠（3根）",
    "type": "snacks",
    "tag": "Snacks",
    "categoryZh": "小吃",
    "color": "#e7ad65",
    "price": 7.29
  },
  {
    "name": "Popcorn Chicken",
    "zh": "盐酥鸡",
    "type": "snacks",
    "tag": "Snacks",
    "categoryZh": "小吃",
    "color": "#e7ad65",
    "price": 8.29
  },
  {
    "name": "Fried Chicken Wings (5 pcs)",
    "zh": "炸鸡翅（5个）",
    "type": "snacks",
    "tag": "Snacks",
    "categoryZh": "小吃",
    "color": "#e7ad65",
    "price": 10.99
  },
  {
    "name": "Small Snack Combination",
    "zh": "小拼盘",
    "type": "snacks",
    "tag": "Snacks",
    "categoryZh": "小吃",
    "color": "#e7ad65",
    "price": 11.29
  },
  {
    "name": "Large Snack Combination",
    "zh": "大拼盘",
    "type": "snacks",
    "tag": "Snacks",
    "categoryZh": "小吃",
    "color": "#e7ad65",
    "price": 26.29
  },
  {
    "name": "Crystal Boba",
    "zh": "水晶波霸",
    "type": "toppings",
    "tag": "Toppings",
    "categoryZh": "加料",
    "color": "#b5cda5",
    "price": 1
  },
  {
    "name": "Strawberry Popping Boba",
    "zh": "草莓爆爆珠",
    "type": "toppings",
    "tag": "Toppings",
    "categoryZh": "加料",
    "color": "#b5cda5",
    "price": 1
  },
  {
    "name": "Green Apple Popping Boba",
    "zh": "青苹果爆爆珠",
    "type": "toppings",
    "tag": "Toppings",
    "categoryZh": "加料",
    "color": "#b5cda5",
    "price": 1
  },
  {
    "name": "Barley Popping Boba",
    "zh": "胚芽爆爆珠",
    "type": "toppings",
    "tag": "Toppings",
    "categoryZh": "加料",
    "color": "#b5cda5",
    "price": 1
  },
  {
    "name": "Egg Pudding",
    "zh": "鸡蛋布丁",
    "type": "toppings",
    "tag": "Toppings",
    "categoryZh": "加料",
    "color": "#b5cda5",
    "price": 0.6
  },
  {
    "name": "Aloe",
    "zh": "芦荟",
    "type": "toppings",
    "tag": "Toppings",
    "categoryZh": "加料",
    "color": "#b5cda5",
    "price": 0.6
  },
  {
    "name": "Rainbow Jelly",
    "zh": "彩虹椰果",
    "type": "toppings",
    "tag": "Toppings",
    "categoryZh": "加料",
    "color": "#b5cda5",
    "price": 0.6
  },
  {
    "name": "Lychee Jelly",
    "zh": "荔枝椰果",
    "type": "toppings",
    "tag": "Toppings",
    "categoryZh": "加料",
    "color": "#b5cda5",
    "price": 0.6
  },
  {
    "name": "Boba",
    "zh": "波霸",
    "type": "toppings",
    "tag": "Toppings",
    "categoryZh": "加料",
    "color": "#b5cda5",
    "price": 0.6
  },
  {
    "name": "Brown Sugar",
    "zh": "黑糖",
    "type": "toppings",
    "tag": "Toppings",
    "categoryZh": "加料",
    "color": "#b5cda5",
    "price": 0.6
  },
  {
    "name": "Red Bean",
    "zh": "红豆",
    "type": "toppings",
    "tag": "Toppings",
    "categoryZh": "加料",
    "color": "#b5cda5",
    "price": 1
  }
];

const menuGrid = document.getElementById('menu-grid');
const menuCount = document.getElementById('menu-count');
const menuEmpty = document.getElementById('menu-empty');
const searchInput = document.getElementById('menu-search');
const filterButtons = Array.from(document.querySelectorAll('[data-filter]'));
const nav = document.getElementById('site-nav');
const navToggle = document.querySelector('.menu-toggle');
const year = document.getElementById('copyright-year');

let activeCategory = 'milk';
let showSavedOnly = false;
const savedToggle = document.getElementById('menu-saved-filter');
const savedCount = document.getElementById('saved-count');
const SAVED_KEY = 'quicklysMenuSavedV1';
const validSavedIds = new Set(MENU_ITEMS.map(item => item.type + '|' + item.name));
const savedItems = new Set();
try {
  const stored = JSON.parse(window.localStorage?.getItem(SAVED_KEY) || '[]');
  if (Array.isArray(stored)) {
    for (const id of stored) if (typeof id === 'string' && validSavedIds.has(id)) savedItems.add(id);
  }
} catch (_) { /* blocked storage must never break browsing */ }
function itemKey(item) { return item.type + '|' + item.name; }
function saveSelections() {
  try { window.localStorage?.setItem(SAVED_KEY, JSON.stringify([...savedItems])); }
  catch (_) { /* favorites still work in this tab */ }
}
function syncSavedStatus() {
  if (savedCount) savedCount.textContent = String(savedItems.size);
  if (savedToggle) {
    savedToggle.setAttribute('aria-pressed', String(showSavedOnly));
    savedToggle.classList.toggle('is-active', showSavedOnly);
  }
}
// Registered after the page is ready; menu filtering can replace cards later.
let observeNewCards = () => {};
let forgetOldCards = () => {};
let rearmCardReveals = () => {};

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
    const haystack = [item.name, item.zh, item.type, item.tag, item.categoryZh].join(' ').toLocaleLowerCase();
    return matchesCategory && (!showSavedOnly || savedItems.has(itemKey(item))) &&
      (!query || haystack.includes(query));
  });

  const fragment = document.createDocumentFragment();
  for (const [index, item] of matches.entries()) {
    const card = document.createElement('article');
    card.className = 'menu-card';
    card.setAttribute('data-card-reveal', '');
    card.style.setProperty('--card-stagger', String((index % 3) * 65) + 'ms');
    card.style.setProperty('--accent', item.color);
    const category = makeTextElement('div', 'menu-card-top', item.categoryZh, 'zh-Hans');
    category.appendChild(makeTextElement('small', 'menu-category-en', item.tag, 'en'));
    card.appendChild(category);
    card.appendChild(makeTextElement('h3', 'menu-item-zh', item.zh, 'zh-Hans'));
    card.appendChild(makeTextElement('p', 'menu-en', item.name, 'en'));
    const priceLabel = Number.isFinite(item.price)
      ? '$' + item.price.toFixed(2)
      : (Number.isFinite(item.priceM) && Number.isFinite(item.priceL)
        ? 'M $' + item.priceM.toFixed(2) + ' · L $' + item.priceL.toFixed(2)
        : '请询价 / Ask in store');
    const foot = makeTextElement('div', 'menu-card-bottom menu-price', '');
    foot.appendChild(makeTextElement('span', 'menu-price-value', priceLabel));
    const saved = savedItems.has(itemKey(item));
    const saveButton = makeTextElement('button', 'menu-save', saved ? '★ 已收藏 · Saved' : '☆ 收藏 · Save');
    saveButton.type = 'button';
    saveButton.setAttribute('aria-pressed', String(saved));
    saveButton.setAttribute('aria-label',
      (saved ? '取消收藏 ' : '收藏 ') + item.zh + ' / ' + (saved ? 'Unsave ' : 'Save ') + item.name);
    if (saved) saveButton.classList.add('is-saved');
    saveButton.addEventListener('click', () => {
      const key = itemKey(item);
      if (savedItems.has(key)) savedItems.delete(key);
      else savedItems.add(key);
      saveSelections();
      syncSavedStatus();
      if (showSavedOnly) {
        renderMenu();
        savedToggle?.focus();
      } else {
        const selected = savedItems.has(key);
        saveButton.classList.toggle('is-saved', selected);
        saveButton.setAttribute('aria-pressed', String(selected));
        saveButton.setAttribute('aria-label',
          (selected ? '取消收藏 ' : '收藏 ') + item.zh + ' / ' + (selected ? 'Unsave ' : 'Save ') + item.name);
        saveButton.textContent = selected ? '★ 已收藏 · Saved' : '☆ 收藏 · Save';
      }
    });
    foot.appendChild(saveButton);
    card.appendChild(foot);
    fragment.appendChild(card);
  }
  forgetOldCards(menuGrid);
  menuGrid.replaceChildren(fragment);
  observeNewCards(menuGrid);
  menuCount.textContent = '共 ' + matches.length + ' 项 · ' + matches.length + ' menu item' + (matches.length === 1 ? '' : 's');
  menuEmpty.hidden = matches.length !== 0;
  syncSavedStatus();
  const emptyTitle = menuEmpty.querySelector?.('strong');
  const emptyEnglish = menuEmpty.querySelector?.('p');
  if (emptyTitle) emptyTitle.textContent = showSavedOnly && !savedItems.size ? '尚未收藏菜品' : '没有找到相关商品';
  if (emptyEnglish) emptyEnglish.textContent = showSavedOnly && !savedItems.size
    ? 'No saved items yet. Select Save on a menu item.'
    : 'No matches — try another name or category.';
}

function setCategory(category) {
  if (!['all', 'milk', 'tea', 'special', 'slush', 'smoothie', 'snacks', 'toppings'].includes(category)) return;
  const changed = activeCategory !== category;
  activeCategory = category;
  let selectedButton = null;
  for (const button of filterButtons) {
    const selected = button.dataset.filter === category;
    button.classList.toggle('is-active', selected);
    button.setAttribute('aria-pressed', String(selected));
    if (selected) selectedButton = button;
  }
  renderMenu();
  if (!changed) return;

  // Reassure customers that the category changed; don't animate each typed character.
  if (menuCount && document.documentElement?.classList.contains('motion-on')) {
    menuCount.classList.remove('is-updated');
    void menuCount.offsetWidth;
    menuCount.classList.add('is-updated');
  }

  // A long row of category tabs should keep the active option in view on phones.
  if (selectedButton && window.innerWidth <= 740 &&
      typeof selectedButton.scrollIntoView === 'function') {
    selectedButton.scrollIntoView({
      block: 'nearest', inline: 'nearest',
      behavior: document.documentElement?.classList.contains('motion-on') ? 'smooth' : 'auto'
    });
  }
}

for (const button of filterButtons) {
  button.addEventListener('click', () => setCategory(button.dataset.filter));
}
if (savedToggle) savedToggle.addEventListener('click', () => {
  showSavedOnly = !showSavedOnly;
  renderMenu();
  savedToggle.setAttribute('aria-pressed', String(showSavedOnly));
});

if (searchInput) searchInput.addEventListener('input', () => {
  if (searchInput.value.trim()) setCategory('all');
  else renderMenu();
});

const clearFilters = document.getElementById('clear-search');
if (clearFilters) clearFilters.addEventListener('click', () => {
  searchInput.value = '';
  showSavedOnly = false;
  setCategory('milk');
  syncSavedStatus();
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
  navToggle.setAttribute('aria-label', '展开导航 / Open navigation');
}

if (nav && navToggle) {
  navToggle.addEventListener('click', () => {
    const willOpen = navToggle.getAttribute('aria-expanded') !== 'true';
    nav.classList.toggle('is-open', willOpen);
    navToggle.setAttribute('aria-expanded', String(willOpen));
    navToggle.setAttribute('aria-label', willOpen ? '收起导航 / Close navigation' : '展开导航 / Open navigation');
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
    if (window.innerWidth > 1100) closeMobileNav();
  });
}

/* Mobile action links close the open menu before navigating. */
for (const link of document.querySelectorAll('.mobile-action-bar a')) {
  link.addEventListener('click', closeMobileNav);
}

/* Progressive enhancement: unsupported browsers and reduced-motion visitors
   see all content immediately; only capable browsers opt in to reveals. */
function initScrollReveals() {
  if (typeof IntersectionObserver !== 'function' || !document.documentElement) return;

  const targets = Array.from(document.querySelectorAll('[data-reveal]'));
  if (targets.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  }, {threshold: 0.08, rootMargin: '0px 0px -22px 0px'});

  targets.forEach((element, index) => {
    element.style.setProperty('--reveal-delay', String((index % 4) * 45) + 'ms');
    observer.observe(element);
  });
  document.documentElement.classList.add('has-motion');
}

/* One-time on-screen card arrivals.
   Card entrance is triggered only when the individual card intersects the
   viewport. Dynamic Quickly's menu results are registered after each render.
   Nothing is hidden without IntersectionObserver, and reduced-motion visitors
   see the full cards immediately. */
function initCardReveals() {
  const root = document.documentElement;
  if (!root || typeof IntersectionObserver !== 'function') return;

  const observed = new WeakSet();
  const listeners = new WeakSet();
  const visibleEnough = (entry) =>
    entry.isIntersecting && entry.intersectionRatio >= 0.15;

  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      const card = entry.target;
      if (card.classList.contains('card-reveal-complete')) {
        observer.unobserve(card);
        observed.delete(card);
        continue;
      }
      const onScreen = visibleEnough(entry) && root.classList.contains('motion-on');
      if (onScreen) {
        // First entry starts the animation. Subsequent entries resume it at
        // the exact frame where it stopped, without restarting the timeline.
        card.classList.add('card-in-view');
        card.classList.add('card-on-screen');
      } else {
        // Keep the animation instance, but stop its clock the moment the card
        // leaves the viewport. CSS animation-play-state handles the pause.
        card.classList.remove('card-on-screen');
      }
    }
  }, {
    threshold: [0, 0.15, 0.5, 1],
    rootMargin: '0px 0px -8% 0px'
  });

  function completed(event) {
    const card = event.target;
    if (event.animationName !== 'card-enter-on-view' ||
        !card.classList.contains('card-in-view') ||
        !card.classList.contains('card-on-screen')) return;
    card.classList.add('card-reveal-complete');
    card.classList.remove('card-in-view', 'card-on-screen');
    observer.unobserve(card);
    observed.delete(card);
  }

  observeNewCards = (scope = document) => {
    const cards = Array.from(scope.querySelectorAll('[data-card-reveal]'));
    for (const [index, card] of cards.entries()) {
      if (observed.has(card) || card.classList.contains('card-reveal-complete')) continue;
      if (!card.style.getPropertyValue?.('--card-stagger')) {
        card.style.setProperty('--card-stagger', String((index % 3) * 65) + 'ms');
      }
      if (!listeners.has(card)) {
        card.addEventListener('animationend', completed);
        listeners.add(card);
      }
      observer.observe(card);
      observed.add(card);
    }
  };

  forgetOldCards = (scope) => {
    for (const card of scope.querySelectorAll('[data-card-reveal]')) {
      observer.unobserve(card);
      observed.delete(card);
      card.removeEventListener?.('animationend', completed);
      listeners.delete(card);
    }
  };

  rearmCardReveals = () => {
    // Replay only arms the observer. Nothing actually animates until the
    // individual card is on-screen, and an interrupted card is rearmed too.
    for (const card of document.querySelectorAll('[data-card-reveal]')) {
      observer.unobserve(card);
      observed.delete(card);
      card.classList.remove('card-in-view', 'card-on-screen', 'card-reveal-complete');
    }
    observeNewCards();
  };

  root.classList.add('card-reveal-ready');
  observeNewCards();
}

/* Motion controls: OS Reduce Motion is respected by default, but a visitor
   can explicitly opt in and replay the animations. Nothing is hidden
   while animations are off or if scripting is unavailable. */
function initMotionControls() {
  const root = document.documentElement;
  const toggle = document.querySelector('[data-motion-toggle]');
  const replay = document.querySelector('[data-motion-replay]');
  if (!root || !toggle || !replay) return;

  let reduceMotion = false;
  try {
    reduceMotion = !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  } catch (_) { /* no media queries: default to normal motion */ }
  let preference = null;
  try {
    preference = window.localStorage?.getItem('restaurantMotionPreference') || null;
  } catch (_) { /* privacy settings may disable local storage */ }
  let enabled = preference === 'on' || (preference !== 'off' && !reduceMotion);

  function sync(remember = false) {
    root.classList.toggle('motion-on', enabled);
    root.classList.toggle('motion-off', !enabled);
    root.classList.add('motion-ready');
    toggle.setAttribute('aria-pressed', String(enabled));
    const zh = toggle.querySelector('.motion-status-zh');
    const en = toggle.querySelector('.motion-status-en');
    if (zh) zh.textContent = enabled ? '动效开启' : '动效暂停';
    if (en) en.textContent = enabled ? 'Motion on' : 'Motion paused';
    toggle.setAttribute('aria-label', enabled ? '关闭网页动画 / Turn animations off' : '开启动效 / Play animations');
    if (remember) {
      try {
        window.localStorage?.setItem('restaurantMotionPreference', enabled ? 'on' : 'off');
      } catch (_) { /* no persistence is fine */ }
    }
  }

  toggle.addEventListener('click', () => {
    enabled = !enabled;
    sync(true);
    if (enabled) rearmCardReveals();
  });

  replay.addEventListener('click', () => {
    if (!enabled) {
      enabled = true;
      sync(true);
      rearmCardReveals();
      return;
    }
    /* Removing then re-adding the class restarts CSS animations on demand.
       The layout read intentionally flushes style without an extra timer. */
    root.classList.remove('motion-on');
    void root.offsetWidth;
    root.classList.add('motion-on');
    rearmCardReveals();
  });

  sync();
}


/* Desktop chapter guide: an overview of real page sections, not decorative dots. */
function initSectionRail() {
  const rail = document.querySelector('.section-rail');
  if (!rail) return;
  const links = Array.from(rail.querySelectorAll('[data-section-link]'));
  const sections = links.map(link => ({
    link,
    section: document.getElementById(link.dataset.sectionLink)
  })).filter(item => item.section && typeof item.section.getBoundingClientRect === 'function');
  if (!sections.length) return;

  let scheduled = false;
  function update() {
    scheduled = false;
    const threshold = (window.innerHeight || 800) * 0.42;
    let active = sections[0];
    for (const item of sections) {
      if (item.section.getBoundingClientRect().top <= threshold) active = item;
    }
    for (const item of sections) {
      if (item === active) item.link.setAttribute('aria-current', 'location');
      else item.link.removeAttribute('aria-current');
    }
  }
  function onScroll() {
    if (scheduled) return;
    scheduled = true;
    if (typeof window.requestAnimationFrame === 'function') {
      window.requestAnimationFrame(update);
    } else {
      update();
    }
  }
  window.addEventListener('scroll', onScroll, {passive:true});
  window.addEventListener('resize', onScroll);
  window.addEventListener('hashchange', onScroll);
  update();
}

/* Native dialog gallery for the real restaurant photographs.
   Without JS / dialog support, the photo links still open the original image.
   No AI images and no library downloads. */
function initPhotoGallery() {
  const dialog = document.querySelector('.photo-dialog');
  const triggers = Array.from(document.querySelectorAll('[data-gallery-index]'));
  if (!dialog || !triggers.length || typeof dialog.showModal !== 'function') return;

  const image = dialog.querySelector('[data-photo-large]');
  const caption = dialog.querySelector('[data-photo-caption]');
  const captionEn = dialog.querySelector('[data-photo-caption-en]');
  const count = dialog.querySelector('[data-photo-count]');
  const close = dialog.querySelector('[data-photo-close]');
  const previous = dialog.querySelector('[data-photo-prev]');
  const next = dialog.querySelector('[data-photo-next]');
  if (!image || !caption || !captionEn || !count || !close || !previous || !next) return;

  let selected = 0;
  let opener = null;

  function select(index) {
    selected = (index + triggers.length) % triggers.length;
    const trigger = triggers[selected];
    const thumb = trigger.querySelector('img');
    if (!thumb) return;
    image.src = trigger.href;
    image.alt = thumb.alt;
    caption.textContent = trigger.dataset.galleryTitle || '';
    captionEn.textContent = trigger.dataset.galleryEn || '';
    count.textContent = (selected + 1) + ' / ' + triggers.length;
  }

  triggers.forEach((trigger, index) => {
    trigger.addEventListener('click', (event) => {
      event.preventDefault();
      opener = trigger;
      select(index);
      if (!dialog.open) dialog.showModal();
    });
  });

  previous.addEventListener('click', () => select(selected - 1));
  next.addEventListener('click', () => select(selected + 1));
  close.addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => opener?.focus());
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener('keydown', (event) => {
    if (!dialog.open) return;
    if (event.key === 'ArrowRight') { event.preventDefault(); select(selected + 1); }
    if (event.key === 'ArrowLeft') { event.preventDefault(); select(selected - 1); }
  });

  // Touch customers can swipe between the three real photos.
  let touchStart = null;
  image.addEventListener('touchstart', (event) => {
    touchStart = event.changedTouches?.[0]?.clientX ?? null;
  }, {passive:true});
  image.addEventListener('touchend', (event) => {
    if (touchStart === null) return;
    const end = event.changedTouches?.[0]?.clientX;
    if (typeof end === 'number' && Math.abs(end - touchStart) > 45) {
      select(selected + (end < touchStart ? 1 : -1));
    }
    touchStart = null;
  }, {passive:true});
}


/* Seamless bilingual marquee.
   The old markup only contained two short copies (about 1,200px total),
   leaving a gap on wide screens. Build two IDENTICAL strips, each at least
   as wide as the viewport, so a -50% travel always has new text behind it.
   Recalculate when the viewport or the downloaded font changes. */
function initTickerLoop() {
  if (typeof document.querySelectorAll !== 'function') return;
  for (const ticker of document.querySelectorAll('.ticker')) {
    const track = ticker.querySelector('.ticker-track');
    const copies = track?.querySelectorAll('.ticker-copy');
    if (!copies || copies.length !== 2) continue;

    const baseMarkup = copies[0].innerHTML;
    let repeats = 1;
    let scheduled = false;

    function sizeTicker() {
      scheduled = false;
      const viewportWidth = ticker.getBoundingClientRect().width;
      const currentGroupWidth = copies[0].getBoundingClientRect().width;
      if (viewportWidth < 1 || currentGroupWidth < 1) return;

      // Save the current animation phase so font readiness or resize doesn't
      // yank a visibly moving banner back to its beginning.
      const oldAnimation = track.getAnimations?.().find(a => a.animationName === 'ticker-travel');
      const oldDuration = oldAnimation?.effect?.getComputedTiming?.().duration ?? 0;
      const oldTime = Number(oldAnimation?.currentTime);
      const phase = oldDuration > 0 && Number.isFinite(oldTime)
        ? ((oldTime % oldDuration) + oldDuration) % oldDuration / oldDuration
        : null;

      const baseWidth = currentGroupWidth / repeats;
      const needed = Math.max(1, Math.min(64, Math.ceil((viewportWidth + 48) / baseWidth)));
      const changed = needed !== repeats || copies[1].innerHTML !== copies[0].innerHTML;
      if (changed) {
        repeats = needed;
        const repeatedMarkup = baseMarkup.repeat(repeats);
        copies[0].innerHTML = repeatedMarkup;
        copies[1].innerHTML = repeatedMarkup;
      }
      const groupWidth = copies[0].getBoundingClientRect().width;
      const duration = Math.max(12, Math.round(groupWidth / 65));
      const nextDuration = duration + 's';
      const durationChanged = track.style.getPropertyValue?.('--ticker-duration') !== nextDuration;
      if (durationChanged) track.style.setProperty('--ticker-duration', nextDuration);

      // CSS keeps motion paused until the first synchronous measurement.
      // This runs before the browser gets another chance to paint.
      ticker.classList.add('ticker-ready');
      if (phase !== null && (changed || durationChanged)) {
        const nextAnimation = track.getAnimations?.().find(a => a.animationName === 'ticker-travel');
        if (nextAnimation) nextAnimation.currentTime = phase * duration * 1000;
      }
    }

    function schedule() {
      if (scheduled) return;
      scheduled = true;
      if (typeof window.requestAnimationFrame === 'function') {
        window.requestAnimationFrame(sizeTicker);
      } else {
        sizeTicker();
      }
    }

    // Synchronous first pass avoids a one-frame short-text -> expanded-text
    // flash on reload. Later layout/font changes are batched per frame.
    sizeTicker();
    window.addEventListener('resize', schedule, {passive: true});
    if (typeof ResizeObserver === 'function') {
      const observer = new ResizeObserver(schedule);
      observer.observe(ticker);
    }
    if (document.fonts?.ready?.then) document.fonts.ready.then(schedule, () => {});
  }
}


/* Tai Ping's photographed feature board is intentionally price-free.
   Simple client-side categories/search keep the authentic dish list useful. */
function initKitchenMenu() {
  const search = document.getElementById('kitchen-search');
  const result = document.getElementById('kitchen-result-count');
  const empty = document.getElementById('kitchen-empty');
  const reset = document.getElementById('kitchen-clear');
  const filters = Array.from(document.querySelectorAll('[data-kitchen-filter]'));
  const cards = Array.from(document.querySelectorAll('.signature-grid .signature-card'));
  if (!search || !result || !cards.length) return;
  let category = 'all';

  function update() {
    const query = search.value.trim().toLocaleLowerCase();
    let visible = 0;
    for (const card of cards) {
      const name = card.querySelector('h3')?.textContent || '';
      const english = card.querySelector('p')?.textContent || '';
      const text = (name + ' ' + english).toLocaleLowerCase();
      const match = (category === 'all' || card.dataset.tone === category) &&
        (!query || text.includes(query));
      card.hidden = !match;
      if (match) visible++;
    }
    result.textContent = '共 ' + visible + ' 道菜 · ' + visible + ' dish' + (visible === 1 ? '' : 'es');
    if (empty) empty.hidden = visible !== 0;
    for (const button of filters) {
      const selected = button.dataset.kitchenFilter === category;
      button.classList.toggle('is-active', selected);
      button.setAttribute('aria-pressed', String(selected));
    }
  }

  for (const button of filters) button.addEventListener('click', () => {
    category = button.dataset.kitchenFilter;
    update();
  });
  search.addEventListener('input', () => {
    if (search.value.trim()) category = 'all';
    update();
  });
  reset?.addEventListener('click', () => {
    category = 'all';
    search.value = '';
    update();
    search.focus();
  });
  update();
}

/* Addresses must remain copyable even when external Maps isn't available.
   Clipboard permission denial shows a helpful message, not a broken button. */
function initCopyAddress() {
  const address = '15848 Halliburton Rd, Hacienda Heights, CA 91745';
  for (const button of document.querySelectorAll('[data-copy-address]')) {
    const status = button.parentElement?.querySelector('[data-copy-status]');
    button.addEventListener('click', async () => {
      try {
        if (typeof navigator === 'undefined' || !navigator.clipboard?.writeText)
          throw new Error('clipboard unavailable');
        await navigator.clipboard.writeText(address);
        if (status) status.textContent = '已复制地址 · Address copied';
      } catch (_) {
        if (status) status.textContent = '请手动复制上方地址 · Select address above to copy';
      }
    });
  }
}

/* External gallery images may fail or block hotlinking. An honest caption
   replaces a broken image instead of substituting invented food photography. */
function initPhotoFallbacks() {
  const images = document.querySelectorAll('.hero-photo, .feature-image-wrap img, .quicklys-store-photo img');
  for (const img of images) {
    function unavailable() {
      const container = img.closest?.('.gallery-trigger') || img.parentElement;
      if (!container || container.classList.contains('photo-unavailable')) return;
      container.classList.add('photo-unavailable');
      const message = document.createElement('span');
      message.className = 'photo-fallback';
      message.textContent = '图片暂时无法显示 · Photo temporarily unavailable';
      container.appendChild(message);
    }
    img.addEventListener('error', unavailable, {once:true});
    if (img.complete && !img.naturalWidth) unavailable();
  }
}

if (year) year.textContent = String(new Date().getFullYear());
renderMenu();
initKitchenMenu();
initCopyAddress();
initPhotoFallbacks();
initMotionControls();
initCardReveals();
initTickerLoop();
initScrollReveals();
initSectionRail();
initPhotoGallery();
