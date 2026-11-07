'use strict';

/**
 * Store-owned menu data belongs here once the owner confirms it.
 * These are illustrative highlights based on public references, not a price list.
 */
const MENU_ITEMS = [
  {
    "name": "Milk Tea",
    "zh": "快可立奶茶",
    "type": "milk",
    "tag": "Milk tea",
    "categoryZh": "奶茶类",
    "color": "#ecb47c",
    "archivedPriceM": 3.29,
    "archivedPriceL": 3.79
  },
  {
    "name": "Milk Green Tea",
    "zh": "快可立奶绿",
    "type": "milk",
    "tag": "Milk tea",
    "categoryZh": "奶茶类",
    "color": "#ecb47c",
    "archivedPriceM": 3.29,
    "archivedPriceL": 3.79
  },
  {
    "name": "Honey Milk Tea",
    "zh": "蜂蜜奶茶",
    "type": "milk",
    "tag": "Milk tea",
    "categoryZh": "奶茶类",
    "color": "#ecb47c",
    "archivedPriceM": 3.29,
    "archivedPriceL": 3.79
  },
  {
    "name": "Honey Milk Green Tea",
    "zh": "蜂蜜奶绿",
    "type": "milk",
    "tag": "Milk tea",
    "categoryZh": "奶茶类",
    "color": "#ecb47c",
    "archivedPriceM": 3.29,
    "archivedPriceL": 3.79
  },
  {
    "name": "Almond Milk Tea",
    "zh": "杏仁奶茶",
    "type": "milk",
    "tag": "Milk tea",
    "categoryZh": "奶茶类",
    "color": "#ecb47c",
    "archivedPriceM": 3.29,
    "archivedPriceL": 3.79
  },
  {
    "name": "Barley Milk Tea",
    "zh": "胚芽奶茶",
    "type": "milk",
    "tag": "Milk tea",
    "categoryZh": "奶茶类",
    "color": "#ecb47c",
    "archivedPriceM": 3.29,
    "archivedPriceL": 3.79
  },
  {
    "name": "Coconut Milk Tea",
    "zh": "椰香奶茶",
    "type": "milk",
    "tag": "Milk tea",
    "categoryZh": "奶茶类",
    "color": "#ecb47c",
    "archivedPriceM": 3.29,
    "archivedPriceL": 3.79
  },
  {
    "name": "Taro Milk Tea",
    "zh": "芋香奶茶",
    "type": "milk",
    "tag": "Milk tea",
    "categoryZh": "奶茶类",
    "color": "#ecb47c",
    "archivedPriceM": 3.29,
    "archivedPriceL": 3.79
  },
  {
    "name": "Thai Milk Tea",
    "zh": "泰式奶茶",
    "type": "milk",
    "tag": "Milk tea",
    "categoryZh": "奶茶类",
    "color": "#ecb47c",
    "archivedPriceM": 3.29,
    "archivedPriceL": 3.79
  },
  {
    "name": "Coffee Milk Tea",
    "zh": "咖啡奶茶",
    "type": "milk",
    "tag": "Milk tea",
    "categoryZh": "奶茶类",
    "color": "#ecb47c",
    "archivedPriceM": 3.29,
    "archivedPriceL": 3.79
  },
  {
    "name": "Chocolate Milk Tea",
    "zh": "巧克力奶茶",
    "type": "milk",
    "tag": "Milk tea",
    "categoryZh": "奶茶类",
    "color": "#ecb47c",
    "archivedPriceM": 3.29,
    "archivedPriceL": 3.79
  },
  {
    "name": "Honeydew Milk Tea",
    "zh": "哈密瓜奶茶",
    "type": "milk",
    "tag": "Milk tea",
    "categoryZh": "奶茶类",
    "color": "#ecb47c",
    "archivedPriceM": 3.29,
    "archivedPriceL": 3.79
  },
  {
    "name": "Cappuccino Milk Tea",
    "zh": "卡布奇诺奶茶",
    "type": "milk",
    "tag": "Milk tea",
    "categoryZh": "奶茶类",
    "color": "#ecb47c",
    "archivedPriceM": 3.29,
    "archivedPriceL": 3.79
  },
  {
    "name": "Oreo Milk Tea",
    "zh": "奥利奥奶茶",
    "type": "milk",
    "tag": "Milk tea",
    "categoryZh": "奶茶类",
    "color": "#ecb47c",
    "archivedPriceM": 3.49,
    "archivedPriceL": 3.99
  },
  {
    "name": "Bubble (Black or Green Tea)",
    "zh": "泡沫",
    "type": "tea",
    "tag": "Flavored tea",
    "categoryZh": "调味茶",
    "color": "#b7d19a",
    "archivedPriceM": 3.29,
    "archivedPriceL": 3.79
  },
  {
    "name": "Honey (Black or Green Tea)",
    "zh": "蜂蜜",
    "type": "tea",
    "tag": "Flavored tea",
    "categoryZh": "调味茶",
    "color": "#b7d19a",
    "archivedPriceM": 3.29,
    "archivedPriceL": 3.79
  },
  {
    "name": "Guava (Black or Green Tea)",
    "zh": "芭乐",
    "type": "tea",
    "tag": "Flavored tea",
    "categoryZh": "调味茶",
    "color": "#b7d19a",
    "archivedPriceM": 3.29,
    "archivedPriceL": 3.79
  },
  {
    "name": "Mango (Black or Green Tea)",
    "zh": "芒果",
    "type": "tea",
    "tag": "Flavored tea",
    "categoryZh": "调味茶",
    "color": "#b7d19a",
    "archivedPriceM": 3.29,
    "archivedPriceL": 3.79
  },
  {
    "name": "Lemon (Black or Green Tea)",
    "zh": "柠檬",
    "type": "tea",
    "tag": "Flavored tea",
    "categoryZh": "调味茶",
    "color": "#b7d19a",
    "archivedPriceM": 3.29,
    "archivedPriceL": 3.79
  },
  {
    "name": "Strawberry (Black or Green Tea)",
    "zh": "草莓",
    "type": "tea",
    "tag": "Flavored tea",
    "categoryZh": "调味茶",
    "color": "#b7d19a",
    "archivedPriceM": 3.29,
    "archivedPriceL": 3.79
  },
  {
    "name": "Grapefruit (Black or Green Tea)",
    "zh": "柚子",
    "type": "tea",
    "tag": "Flavored tea",
    "categoryZh": "调味茶",
    "color": "#b7d19a",
    "archivedPriceM": 3.29,
    "archivedPriceL": 3.79
  },
  {
    "name": "Rose (Black or Green Tea)",
    "zh": "玫瑰",
    "type": "tea",
    "tag": "Flavored tea",
    "categoryZh": "调味茶",
    "color": "#b7d19a",
    "archivedPriceM": 3.29,
    "archivedPriceL": 3.79
  },
  {
    "name": "Green Apple (Black or Green Tea)",
    "zh": "青苹果",
    "type": "tea",
    "tag": "Flavored tea",
    "categoryZh": "调味茶",
    "color": "#b7d19a",
    "archivedPriceM": 3.29,
    "archivedPriceL": 3.79
  },
  {
    "name": "Passion Fruit (Black or Green Tea)",
    "zh": "百香果",
    "type": "tea",
    "tag": "Flavored tea",
    "categoryZh": "调味茶",
    "color": "#b7d19a",
    "archivedPriceM": 3.29,
    "archivedPriceL": 3.79
  },
  {
    "name": "Peach (Black or Green Tea)",
    "zh": "水蜜桃",
    "type": "tea",
    "tag": "Flavored tea",
    "categoryZh": "调味茶",
    "color": "#b7d19a",
    "archivedPriceM": 3.29,
    "archivedPriceL": 3.79
  },
  {
    "name": "Winter Melon Tea",
    "zh": "冬瓜茶",
    "type": "tea",
    "tag": "Flavored tea",
    "categoryZh": "调味茶",
    "color": "#b7d19a",
    "archivedPriceM": 3.29,
    "archivedPriceL": 3.79
  },
  {
    "name": "Honey Lemon with Aloe",
    "zh": "蜂蜜柠檬芦荟",
    "type": "special",
    "tag": "Special drinks",
    "categoryZh": "特调饮品",
    "color": "#ddad80",
    "archivedPriceM": 3.99,
    "archivedPriceL": 4.49
  },
  {
    "name": "Brown Sugar Latte",
    "zh": "黑糖拿铁",
    "type": "special",
    "tag": "Special drinks",
    "categoryZh": "特调饮品",
    "color": "#ddad80",
    "archivedPriceM": 3.99,
    "archivedPriceL": 4.49
  },
  {
    "name": "Coffee (Iced or Hot)",
    "zh": "咖啡（冰/热）",
    "type": "special",
    "tag": "Special drinks",
    "categoryZh": "特调饮品",
    "color": "#ddad80",
    "archivedPriceM": 3.29,
    "archivedPriceL": 3.79
  },
  {
    "name": "Watermelon Juice",
    "zh": "西瓜汁",
    "type": "special",
    "tag": "Special drinks",
    "categoryZh": "特调饮品",
    "color": "#ddad80",
    "archivedPriceM": 3.29,
    "archivedPriceL": 3.79
  },
  {
    "name": "Mango Slush",
    "zh": "芒果冰沙",
    "type": "slush",
    "tag": "Slush",
    "categoryZh": "冰沙",
    "color": "#b9a1d8",
    "archivedPriceM": 3.29,
    "archivedPriceL": 3.79
  },
  {
    "name": "Lemon Slush",
    "zh": "柠檬冰沙",
    "type": "slush",
    "tag": "Slush",
    "categoryZh": "冰沙",
    "color": "#b9a1d8",
    "archivedPriceM": 3.29,
    "archivedPriceL": 3.79
  },
  {
    "name": "Pineapple Slush",
    "zh": "凤梨冰沙",
    "type": "slush",
    "tag": "Slush",
    "categoryZh": "冰沙",
    "color": "#b9a1d8",
    "archivedPriceM": 3.29,
    "archivedPriceL": 3.79
  },
  {
    "name": "Strawberry Slush",
    "zh": "草莓冰沙",
    "type": "slush",
    "tag": "Slush",
    "categoryZh": "冰沙",
    "color": "#b9a1d8",
    "archivedPriceM": 3.29,
    "archivedPriceL": 3.79
  },
  {
    "name": "Coconut Slush",
    "zh": "椰香冰沙",
    "type": "slush",
    "tag": "Slush",
    "categoryZh": "冰沙",
    "color": "#b9a1d8",
    "archivedPriceM": 3.29,
    "archivedPriceL": 3.79
  },
  {
    "name": "Lychee Slush",
    "zh": "荔枝冰沙",
    "type": "slush",
    "tag": "Slush",
    "categoryZh": "冰沙",
    "color": "#b9a1d8",
    "archivedPriceM": 3.29,
    "archivedPriceL": 3.79
  },
  {
    "name": "Taro Slush",
    "zh": "芋头冰沙",
    "type": "slush",
    "tag": "Slush",
    "categoryZh": "冰沙",
    "color": "#b9a1d8",
    "archivedPriceM": 3.29,
    "archivedPriceL": 3.79
  },
  {
    "name": "Green Apple Slush",
    "zh": "青苹果冰沙",
    "type": "slush",
    "tag": "Slush",
    "categoryZh": "冰沙",
    "color": "#b9a1d8",
    "archivedPriceM": 3.29,
    "archivedPriceL": 3.79
  },
  {
    "name": "Peach Slush",
    "zh": "水蜜桃冰沙",
    "type": "slush",
    "tag": "Slush",
    "categoryZh": "冰沙",
    "color": "#b9a1d8",
    "archivedPriceM": 3.29,
    "archivedPriceL": 3.79
  },
  {
    "name": "Passion Fruit Slush",
    "zh": "百香果冰沙",
    "type": "slush",
    "tag": "Slush",
    "categoryZh": "冰沙",
    "color": "#b9a1d8",
    "archivedPriceM": 3.29,
    "archivedPriceL": 3.79
  },
  {
    "name": "Honeydew Slush",
    "zh": "哈密瓜冰沙",
    "type": "slush",
    "tag": "Slush",
    "categoryZh": "冰沙",
    "color": "#b9a1d8",
    "archivedPriceM": 3.29,
    "archivedPriceL": 3.79
  },
  {
    "name": "Chocolate Slush",
    "zh": "巧克力冰沙",
    "type": "slush",
    "tag": "Slush",
    "categoryZh": "冰沙",
    "color": "#b9a1d8",
    "archivedPriceM": 3.29,
    "archivedPriceL": 3.79
  },
  {
    "name": "Yogurt Slush",
    "zh": "养乐多冰沙",
    "type": "slush",
    "tag": "Slush",
    "categoryZh": "冰沙",
    "color": "#b9a1d8",
    "archivedPriceM": 3.29,
    "archivedPriceL": 3.79
  },
  {
    "name": "Thai Milk Tea Slush",
    "zh": "泰式奶茶冰沙",
    "type": "slush",
    "tag": "Slush",
    "categoryZh": "冰沙",
    "color": "#b9a1d8",
    "archivedPriceM": 3.29,
    "archivedPriceL": 3.79
  },
  {
    "name": "Milk Tea Slush",
    "zh": "奶茶冰沙",
    "type": "slush",
    "tag": "Slush",
    "categoryZh": "冰沙",
    "color": "#b9a1d8",
    "archivedPriceM": 3.29,
    "archivedPriceL": 3.79
  },
  {
    "name": "Oreo Slush",
    "zh": "奥利奥冰沙",
    "type": "slush",
    "tag": "Slush",
    "categoryZh": "冰沙",
    "color": "#b9a1d8",
    "archivedPriceM": 3.49,
    "archivedPriceL": 3.99
  },
  {
    "name": "Mango Smoothie",
    "zh": "芒果雪泥",
    "type": "smoothie",
    "tag": "Smoothie",
    "categoryZh": "雪泥",
    "color": "#d9a6bc",
    "archivedPriceM": 3.99,
    "archivedPriceL": 4.49
  },
  {
    "name": "Strawberry Smoothie",
    "zh": "草莓雪泥",
    "type": "smoothie",
    "tag": "Smoothie",
    "categoryZh": "雪泥",
    "color": "#d9a6bc",
    "archivedPriceM": 3.99,
    "archivedPriceL": 4.49
  },
  {
    "name": "Passion Fruit Smoothie",
    "zh": "百香果雪泥",
    "type": "smoothie",
    "tag": "Smoothie",
    "categoryZh": "雪泥",
    "color": "#d9a6bc",
    "archivedPriceM": 3.99,
    "archivedPriceL": 4.49
  },
  {
    "name": "Peach Smoothie",
    "zh": "水蜜桃雪泥",
    "type": "smoothie",
    "tag": "Smoothie",
    "categoryZh": "雪泥",
    "color": "#d9a6bc",
    "archivedPriceM": 3.99,
    "archivedPriceL": 4.49
  },
  {
    "name": "Strawberry Banana Smoothie",
    "zh": "草莓香蕉雪泥",
    "type": "smoothie",
    "tag": "Smoothie",
    "categoryZh": "雪泥",
    "color": "#d9a6bc",
    "archivedPriceM": 3.99,
    "archivedPriceL": 4.49
  },
  {
    "name": "Mango Strawberry Smoothie",
    "zh": "芒果草莓雪泥",
    "type": "smoothie",
    "tag": "Smoothie",
    "categoryZh": "雪泥",
    "color": "#d9a6bc",
    "archivedPriceM": 3.99,
    "archivedPriceL": 4.49
  },
  {
    "name": "Coconut Pineapple Smoothie",
    "zh": "凤梨椰香雪泥",
    "type": "smoothie",
    "tag": "Smoothie",
    "categoryZh": "雪泥",
    "color": "#d9a6bc",
    "archivedPriceM": 3.99,
    "archivedPriceL": 4.49
  },
  {
    "name": "Oreo Chocolate Smoothie",
    "zh": "奥利奥巧克力雪泥",
    "type": "smoothie",
    "tag": "Smoothie",
    "categoryZh": "雪泥",
    "color": "#d9a6bc",
    "archivedPriceM": 4.49,
    "archivedPriceL": 4.99
  },
  {
    "name": "Taro (Fresh) Smoothie",
    "zh": "芋头牛奶雪泥（鲜）",
    "type": "smoothie",
    "tag": "Smoothie",
    "categoryZh": "雪泥",
    "color": "#d9a6bc",
    "archivedPriceM": 4.49,
    "archivedPriceL": 4.99
  },
  {
    "name": "Red Bean (Fresh) Smoothie",
    "zh": "红豆牛奶雪泥（鲜）",
    "type": "smoothie",
    "tag": "Smoothie",
    "categoryZh": "雪泥",
    "color": "#d9a6bc",
    "archivedPriceM": 4.49,
    "archivedPriceL": 4.99
  },
  {
    "name": "Oreo Potted Milk Tea",
    "zh": "盆栽奶茶",
    "type": "foam",
    "tag": "Sea salt milk foam",
    "categoryZh": "海盐奶盖",
    "color": "#b5d4cc",
    "archivedPriceM": 4.49,
    "archivedPriceL": 4.99
  },
  {
    "name": "Sea Salt Milk Foam Black Tea",
    "zh": "海盐奶盖红茶",
    "type": "foam",
    "tag": "Sea salt milk foam",
    "categoryZh": "海盐奶盖",
    "color": "#b5d4cc",
    "archivedPriceM": 3.99,
    "archivedPriceL": 4.49
  },
  {
    "name": "Sea Salt Milk Foam Green Tea",
    "zh": "海盐奶盖绿茶",
    "type": "foam",
    "tag": "Sea salt milk foam",
    "categoryZh": "海盐奶盖",
    "color": "#b5d4cc",
    "archivedPriceM": 3.99,
    "archivedPriceL": 4.49
  },
  {
    "name": "Sea Salt Milk Foam Coffee",
    "zh": "海盐奶盖咖啡",
    "type": "foam",
    "tag": "Sea salt milk foam",
    "categoryZh": "海盐奶盖",
    "color": "#b5d4cc",
    "archivedPriceM": 3.99,
    "archivedPriceL": 4.49
  },
  {
    "name": "French Fries",
    "zh": "炸薯条",
    "type": "snacks",
    "tag": "Snacks",
    "categoryZh": "小吃",
    "color": "#e5b56e",
    "archivedPriceM": 3.99,
    "archivedPriceL": null
  },
  {
    "name": "Sweet Potato Fries",
    "zh": "炸地瓜条",
    "type": "snacks",
    "tag": "Snacks",
    "categoryZh": "小吃",
    "color": "#e5b56e",
    "archivedPriceM": 4.59,
    "archivedPriceL": null
  },
  {
    "name": "Fried Tempura (10 pcs)",
    "zh": "炸甜不辣（10个）",
    "type": "snacks",
    "tag": "Snacks",
    "categoryZh": "小吃",
    "color": "#e5b56e",
    "archivedPriceM": 5.59,
    "archivedPriceL": null
  },
  {
    "name": "Fried Fish Tofu (10 pcs)",
    "zh": "炸鱼豆腐（10个）",
    "type": "snacks",
    "tag": "Snacks",
    "categoryZh": "小吃",
    "color": "#e5b56e",
    "archivedPriceM": 5.59,
    "archivedPriceL": null
  },
  {
    "name": "Fried Tofu (10 pcs)",
    "zh": "炸豆腐（10个）",
    "type": "snacks",
    "tag": "Snacks",
    "categoryZh": "小吃",
    "color": "#e5b56e",
    "archivedPriceM": 5.59,
    "archivedPriceL": null
  },
  {
    "name": "Fried Squid Balls (10 pcs)",
    "zh": "炸花枝丸（10个）",
    "type": "snacks",
    "tag": "Snacks",
    "categoryZh": "小吃",
    "color": "#e5b56e",
    "archivedPriceM": 6.59,
    "archivedPriceL": null
  },
  {
    "name": "Taiwanese Sausage (3 pcs)",
    "zh": "台湾香肠（3根）",
    "type": "snacks",
    "tag": "Snacks",
    "categoryZh": "小吃",
    "color": "#e5b56e",
    "archivedPriceM": 5.99,
    "archivedPriceL": null
  },
  {
    "name": "Popcorn Chicken",
    "zh": "盐酥鸡",
    "type": "snacks",
    "tag": "Snacks",
    "categoryZh": "小吃",
    "color": "#e5b56e",
    "archivedPriceM": 6.59,
    "archivedPriceL": null
  },
  {
    "name": "Fried Chicken Wings",
    "zh": "炸鸡翅",
    "type": "snacks",
    "tag": "Snacks",
    "categoryZh": "小吃",
    "color": "#e5b56e",
    "archivedPriceM": 8.99,
    "archivedPriceL": null
  },
  {
    "name": "Lamb Skewers (4 pcs)",
    "zh": "羊肉串（4串）",
    "type": "snacks",
    "tag": "Snacks",
    "categoryZh": "小吃",
    "color": "#e5b56e",
    "archivedPriceM": 7.99,
    "archivedPriceL": null
  },
  {
    "name": "Minced Pork Rice",
    "zh": "肉燥饭",
    "type": "snacks",
    "tag": "Snacks",
    "categoryZh": "小吃",
    "color": "#e5b56e",
    "archivedPriceM": 4.99,
    "archivedPriceL": null
  },
  {
    "name": "Fried Combination (3 items)",
    "zh": "酥炸拼盘（任选三样）",
    "type": "snacks",
    "tag": "Snacks",
    "categoryZh": "小吃",
    "color": "#e5b56e",
    "archivedPriceM": null,
    "archivedPriceL": null
  },
  {
    "name": "Small Fried Combination",
    "zh": "小拼盘",
    "type": "snacks",
    "tag": "Snacks",
    "categoryZh": "小吃",
    "color": "#e5b56e",
    "archivedPriceM": 8.99,
    "archivedPriceL": null
  },
  {
    "name": "Party Tray",
    "zh": "大拼盘",
    "type": "snacks",
    "tag": "Snacks",
    "categoryZh": "小吃",
    "color": "#e5b56e",
    "archivedPriceM": 21.99,
    "archivedPriceL": null
  },
  {
    "name": "Boba",
    "zh": "波霸",
    "type": "toppings",
    "tag": "Toppings",
    "categoryZh": "加料",
    "color": "#b8c9a1",
    "archivedPriceM": 0.6,
    "archivedPriceL": null
  },
  {
    "name": "Coffee Jelly",
    "zh": "黑砖",
    "type": "toppings",
    "tag": "Toppings",
    "categoryZh": "加料",
    "color": "#b8c9a1",
    "archivedPriceM": 0.6,
    "archivedPriceL": null
  },
  {
    "name": "Grass Jelly",
    "zh": "仙草",
    "type": "toppings",
    "tag": "Toppings",
    "categoryZh": "加料",
    "color": "#b8c9a1",
    "archivedPriceM": 0.6,
    "archivedPriceL": null
  },
  {
    "name": "Aloe",
    "zh": "芦荟",
    "type": "toppings",
    "tag": "Toppings",
    "categoryZh": "加料",
    "color": "#b8c9a1",
    "archivedPriceM": 0.6,
    "archivedPriceL": null
  },
  {
    "name": "Rainbow Jelly",
    "zh": "彩虹椰果",
    "type": "toppings",
    "tag": "Toppings",
    "categoryZh": "加料",
    "color": "#b8c9a1",
    "archivedPriceM": 0.6,
    "archivedPriceL": null
  },
  {
    "name": "Lychee Jelly",
    "zh": "荔枝椰果",
    "type": "toppings",
    "tag": "Toppings",
    "categoryZh": "加料",
    "color": "#b8c9a1",
    "archivedPriceM": 0.6,
    "archivedPriceL": null
  },
  {
    "name": "Passion Fruit Jelly",
    "zh": "百香果椰果",
    "type": "toppings",
    "tag": "Toppings",
    "categoryZh": "加料",
    "color": "#b8c9a1",
    "archivedPriceM": 0.6,
    "archivedPriceL": null
  },
  {
    "name": "Green Apple Jelly",
    "zh": "青苹果椰果",
    "type": "toppings",
    "tag": "Toppings",
    "categoryZh": "加料",
    "color": "#b8c9a1",
    "archivedPriceM": 0.6,
    "archivedPriceL": null
  },
  {
    "name": "Egg Pudding",
    "zh": "鸡蛋布丁",
    "type": "toppings",
    "tag": "Toppings",
    "categoryZh": "加料",
    "color": "#b8c9a1",
    "archivedPriceM": 0.6,
    "archivedPriceL": null
  },
  {
    "name": "Sea Salt Milk Foam",
    "zh": "海盐奶盖",
    "type": "toppings",
    "tag": "Toppings",
    "categoryZh": "加料",
    "color": "#b8c9a1",
    "archivedPriceM": 0.6,
    "archivedPriceL": null
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
    const foot = makeTextElement('div', 'menu-card-bottom', 'Archived 2022 menu / 2022年菜单');
    card.appendChild(foot);
    fragment.appendChild(card);
  }
  menuGrid.replaceChildren(fragment);
  menuCount.textContent = matches.length + ' archived menu item' + (matches.length === 1 ? '' : 's') + ' / 历史菜单';
  menuEmpty.hidden = matches.length !== 0;
}

function setCategory(category) {
  if (!['all', 'milk', 'tea', 'special', 'slush', 'smoothie', 'foam', 'snacks', 'toppings'].includes(category)) return;
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
