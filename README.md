# Tai Ping Sa Choi Kee / 太平沙财记

An editorial, mobile-first, bilingual restaurant website **concept** for Tai Ping Sa Choi Kee (太平沙财记) at 15848 Halliburton Rd, Hacienda Heights, CA 91745. Quickly has a separate drinks and snacks menu at the same address.

> **Status:** Owner review preview. Not an official Tai Ping Sa Choi Kee or Quickly website; this is not approved for public representation of either business.

## What is included

- Distinctive responsive visual design; no framework or build dependency.
- English and Simplified Chinese shown together throughout the interface, without a language switcher.
- Bilingual Tai Ping Sa Choi Kee kitchen-category overview; the full food menu and prices await confirmation.
- Separate searchable bilingual Quickly drinks-and-snacks menu from in-store photographs, with visible prices and category filters.
- Semantic HTML, keyboard-accessible navigation, focus indicators, skip link, and reduced-motion support.
- Real address, click-to-call link, Google Maps directions, descriptive meta tags, and accessible image text.
- Illustrative photos from Unsplash. The images are **not** photographs of this shop.

## Local preview

Open `index.html` in a browser, or serve the directory locally:

```sh
python3 -m http.server 8080
```

Then visit `http://localhost:8080`. The site has no package install or build step.

## Updating the menu

Edit the `MENU_ITEMS` list near the top of `app.js`. Each item has:

- `name`: English item name
- `zh`: Simplified Chinese item name
- `type`: `milk`, `tea`, `special`, `slush`, `smoothie`, `snacks`, or `toppings`
- `priceM` / `priceL` for drinks or `price` for toppings and snacks, plus `tag`, `categoryZh`, and `color` for presentation

The current site includes **77 English/Chinese items** transcribed from the user's photographs of the menu at **Quickly, 15848 Halliburton Rd**. We include **14 milk teas, 12 flavored teas, 3 special drinks, 17 slushes, 11 smoothies, 9 snacks, and 11 toppings**. Prices are visible and represent the printed and handwritten prices photographed; **the photos' capture date and the continuing accuracy of the prices have not been independently established. The owner must confirm before launch**.

Specific review notes:
- The photographed milk-tea list has a crossed-out row and one lower row whose Chinese text reads `芒果奶茶` (Mango Milk Tea) but whose printed English text says `Oreo Milk Tea`. The crossed-out and mismatched rows were **not imported** pending confirmation.
- The printed Barley Milk Tea price appears overridden by handwritten **$5.28 M / $5.78 L**; Coconut Milk Tea reads **$4.38 M / $4.88 L**. Confirm both.
- The handwritten snack combination prices appear to be **$11.29 small** and **$26.29 large**, and the selection rules need confirmation.
- The menu states an additional **$0.49 card-transaction charge** and that spice cannot be served on the side. Confirm current policy and any applicable legal/price-display requirements before putting those notices on the public site.
- Two additional photos display a different menu branded **Tai Pin Sa Choi Kee / 太平沙财记** at the same address and phone number. Those dishes have **not** been merged into Quickly's menu; ask the owner whether they should have their own section or site.
- The old June 2022 MenuSifu PDF is no longer the data source. Its outdated prices and the former sea-salt foam section were removed.

## Owner approval checklist

- [ ] Obtain permission to represent the business and confirm branding rights.
- [ ] Confirm exact store name, address, phone, hours/holiday hours, and preferred ordering URL.
- [ ] Have owner review all 77 transcribed bilingual entries and prices against the latest in-store menu, and clarify the ambiguous milk tea line and combination rules.
- [ ] Replace illustrative Unsplash images with real, approved product and storefront photography.
- [ ] Confirm promotions, contact links, accessibility, and legal copy.
- [ ] Remove `noindex` metadata and the concept-preview disclaimer **only after** owner approval.
- [ ] Configure custom domain, HTTPS, and preferred deployment platform.
- [ ] Confirm any analytics/cookie/privacy disclosures before adding third-party trackers.

## Launch / deployment

This is a static site. It can be deployed to GitHub Pages, Cloudflare Pages, Netlify, or another static host. For GitHub Pages, configure **Settings → Pages → Deploy from a branch** (main / root). Don't enable public indexing or advertise the site as official until the owner signs off.

## Image licenses & credits

Photos are illustrative and freely usable under the [Unsplash License](https://unsplash.com/license), not supplied by Quickly:

- Hero photo: [Nathenia Landers](https://unsplash.com/photos/four-colorful-boba-teas-with-straws-y8rjmtsq0lE)
- Milk tea photo: [Najib Chari](https://unsplash.com/photos/a-creamy-beverage-with-caramel-swirls-and-tapioca-pearls-AL3uWJvhfWE)
- Snacks photo: [Lee Milo](https://unsplash.com/photos/basket-of-fried-chicken-tenders-fries-and-popcorn-chicken-bG8sQGD8Bi8)

## Verification

```sh
node --check app.js
node --test tests/site.test.mjs
```

This performs syntax and source smoke checks, **not** visual cross-browser QA. Before deployment, test interactions and accessibility on actual mobile browsers and verify all links with the owner.

## Restaurant naming and contact

- Website's primary identity: **Tai Ping Sa Choi Kee (太平沙财记)**.
- Restaurant kitchen phone photographed on Tai Ping Sa Choi Kee take-out menu: **(626) 937-6555**.
- Quickly drinks/snacks counter phone photographed on drinks menu: **(626) 937-6552**.
- Both menus show **15848 Halliburton Rd, Hacienda Heights, CA 91745**.
- **Rename the GitHub repository** using its Settings > General > Repository name control to `Tai-Ping-Sa-Choi-Kee`. The GitHub integration used for code changes does not expose repository-settings mutations. This README and website have been rebranded, but GitHub repository rename is a separate administrative action. Update GitHub Pages and external links afterward.

## Featured dishes from the in-store wall poster (November 2026 reference)

The site showcases 13 bilingual dishes legible on the user-supplied **Tai Ping Sa Choi Kee / 太平沙财记** poster, including 干炒牛河, 港式生炒骨, 海鲜两面黄, 椒盐鲜鱿, 清平白切鸡（半只）, 鱼香茄子煲, 蚵仔煎蛋, 牛杂捞面, XO海鲜炒饭, 椒盐大虾, 招牌牛腩饭, 姜葱油泡猪肝 and 海鲜豆腐煲. One obscured dish was intentionally omitted rather than guessed.

The display uses **no food prices** because none were shown on the photo, and its English dish names are proposed translations rather than owner-approved menu wording. The poster image is currently used as a design/content reference rather than published as a full-resolution site photo; obtain approved, high-quality individual food photos before launch. Do not treat the poster's anniversary promotion or a delivery-app advertisement as currently active without confirmation.

