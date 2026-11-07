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
    const priceLabel = Number.isFinite(item.price)
      ? '$' + item.price.toFixed(2)
      : (Number.isFinite(item.priceM) && Number.isFinite(item.priceL)
        ? 'M $' + item.priceM.toFixed(2) + ' · L $' + item.priceL.toFixed(2)
        : 'Ask in store / 请询价');
    const foot = makeTextElement('div', 'menu-card-bottom menu-price', priceLabel);
    card.appendChild(foot);
    fragment.appendChild(card);
  }
  menuGrid.replaceChildren(fragment);
  menuCount.textContent = matches.length + ' menu item' + (matches.length === 1 ? '' : 's') + ' / 菜单项目';
  menuEmpty.hidden = matches.length !== 0;
}

function setCategory(category) {
  if (!['all', 'milk', 'tea', 'special', 'slush', 'smoothie', 'snacks', 'toppings'].includes(category)) return;
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

if (searchInput) searchInput.addEventListener('input', () => {
  if (searchInput.value.trim()) setCategory('all');
  else renderMenu();
});

const clearFilters = document.getElementById('clear-search');
if (clearFilters) clearFilters.addEventListener('click', () => {
  searchInput.value = '';
  setCategory('milk');
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
 + item.price.toFixed(2) : (Number.isFinite(item.priceM) && Number.isFinite(item.priceL) ? 'M 
    card.appendChild(foot);
    fragment.appendChild(card);
  }
  menuGrid.replaceChildren(fragment);
  menuCount.textContent = matches.length + ' archived menu item' + (matches.length === 1 ? '' : 's') + ' / 历史菜单';
  menuEmpty.hidden = matches.length !== 0;
}

function setCategory(category) {
  if (!['all', 'milk', 'tea', 'special', 'slush', 'smoothie', 'snacks', 'toppings'].includes(category)) return;
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

if (searchInput) searchInput.addEventListener('input', () => {
  if (searchInput.value.trim()) setCategory('all');
  else renderMenu();
});

const clearFilters = document.getElementById('clear-search');
if (clearFilters) clearFilters.addEventListener('click', () => {
  searchInput.value = '';
  setCategory('milk');
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
 + item.priceM.toFixed(2) + ' · L 
    card.appendChild(foot);
    fragment.appendChild(card);
  }
  menuGrid.replaceChildren(fragment);
  menuCount.textContent = matches.length + ' archived menu item' + (matches.length === 1 ? '' : 's') + ' / 历史菜单';
  menuEmpty.hidden = matches.length !== 0;
}

function setCategory(category) {
  if (!['all', 'milk', 'tea', 'special', 'slush', 'smoothie', 'snacks', 'toppings'].includes(category)) return;
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

if (searchInput) searchInput.addEventListener('input', () => {
  if (searchInput.value.trim()) setCategory('all');
  else renderMenu();
});

const clearFilters = document.getElementById('clear-search');
if (clearFilters) clearFilters.addEventListener('click', () => {
  searchInput.value = '';
  setCategory('milk');
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
 + item.priceL.toFixed(2) : 'Ask in store / 请询价');
    const foot = makeTextElement('div', 'menu-card-bottom menu-price', priceLabel);
    card.appendChild(foot);
    fragment.appendChild(card);
  }
  menuGrid.replaceChildren(fragment);
  menuCount.textContent = matches.length + ' archived menu item' + (matches.length === 1 ? '' : 's') + ' / 历史菜单';
  menuEmpty.hidden = matches.length !== 0;
}

function setCategory(category) {
  if (!['all', 'milk', 'tea', 'special', 'slush', 'smoothie', 'snacks', 'toppings'].includes(category)) return;
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

if (searchInput) searchInput.addEventListener('input', () => {
  if (searchInput.value.trim()) setCategory('all');
  else renderMenu();
});

const clearFilters = document.getElementById('clear-search');
if (clearFilters) clearFilters.addEventListener('click', () => {
  searchInput.value = '';
  setCategory('milk');
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
