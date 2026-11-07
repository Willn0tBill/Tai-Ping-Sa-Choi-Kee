# Tai Ping Sa Choi Kee / 太平沙财记

An editorial, mobile-first, bilingual restaurant website **concept** for Tai Ping Sa Choi Kee (太平沙财记) at 15848 Halliburton Rd, Hacienda Heights, CA 91745. Quickly has a separate drinks and snacks menu at the same address.

> **Status:** Owner review preview. Not an official Tai Ping Sa Choi Kee or Quickly website; this is not approved for public representation of either business.

## What is included

- Distinctive responsive visual design; no framework or build dependency.
- Restaurant name presented as Chinese-first typography; no invented logo, icon, seal or favicon.
- English and Simplified Chinese shown together throughout the interface, without a language switcher.
- Bilingual Tai Ping Sa Choi Kee kitchen-category overview; the full food menu and prices await confirmation.
- Separate searchable bilingual Quickly drinks-and-snacks menu from in-store photographs, with visible prices and category filters.
- Semantic HTML, keyboard-accessible navigation, focus indicators, skip link, and reduced-motion support.
- Real address, click-to-call link, Google Maps directions, descriptive meta tags, and accessible image text.
- Actual restaurant-associated storefront, eggplant clay pot, and interior photographs found in public restaurant listings. Their commercial reuse rights have **not yet been established**, and they must be replaced with owner-approved media or licensed properly before launch.

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
- The photographed restaurant menu is branded **Tai Ping Sa Choi Kee / 太平沙财记**, which is now the website’s primary identity. Its signature dishes are separate from the Quickly drinks and snacks section.
- The old June 2022 MenuSifu PDF is no longer the data source. Its outdated prices and the former sea-salt foam section were removed.

## Owner approval checklist

- [ ] Obtain permission to represent the business and confirm branding rights.
- [ ] Confirm exact store name, address, phone, hours/holiday hours, and preferred ordering URL.
- [ ] Have owner review all 77 transcribed bilingual entries and prices against the latest in-store menu, and clarify the ambiguous milk tea line and combination rules.
- [ ] Obtain explicit permission or valid licenses for all real restaurant photos on the preview; ideally replace third-party hotlinks with approved, locally hosted originals from the owner.
- [ ] Confirm promotions, contact links, accessibility, and legal copy.
- [ ] Remove `noindex` metadata and the concept-preview disclaimer **only after** owner approval.
- [ ] Configure custom domain, HTTPS, and preferred deployment platform.
- [ ] Confirm any analytics/cookie/privacy disclosures before adding third-party trackers.

## Launch / deployment

This is a static site. It can be deployed to GitHub Pages, Cloudflare Pages, Netlify, or another static host. For GitHub Pages, configure **Settings → Pages → Deploy from a branch** (main / root). Don't enable public indexing or advertise the site as official until the owner signs off.

## Actual restaurant photos — sources and permission

The former generic Unsplash images were removed. These are **photos of the actual Hacienda Heights location**, linked from public restaurant galleries **for concept review only**:

- Hero (eggplant clay pot): [restaurant gallery image](https://cdn.restaurants-us.com/3616-albums-2.jpg) via [Tai Ping Sa Choi Kee listing](https://taipingsachoikee.restaurants-us.com/).
- Exterior storefront and both business signs: [restaurant gallery image](https://cdn.restaurants-us.com/3616-albums-1.jpg) via the same [listing](https://taipingsachoikee.restaurants-us.com/).
- Interior: [public Yelp-hosted photo](https://s3-media0.fl.yelpcdn.com/bphoto/ZBEJxeL9uK-M6cb3rGqtVw/o.jpg) via the [Hacienda Heights restaurant listing](https://www.yelp.com/biz/tai-ping-sa-choi-kee-hacienda-heights).

**No reuse license has been verified.** Public visibility is not commercial permission. Do not treat the source credits as a license, or the externally hosted image URLs as a reliable production asset pipeline. Obtain owner and/or photographer authorization before the official public launch. The site retains `noindex,nofollow` and prominently notes it is an unapproved concept. Once permitted, acquire high-resolution approved copies, optimize to AVIF/WebP, and serve them from the site’s own host for speed and reliability. This is especially important for a paying client.

The menu photos supplied by the user remain source material for transcription. The featured food poster supplied by the user is also a reference for accurate dishes and brand identity.

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


## Bilingual presentation / 中英文排版

Chinese (Simplified, `zh-Hans`) is the primary interface language, with smaller English subtitles immediately beneath the restaurant name, navigation items, prominent buttons, section headings, and menu item names. Search continues to match both English and Chinese names. This is a presentation hierarchy, **not** a machine translation service, and the photographed source remains the reference for item details.

## Real-photo enhancement (no generated replacements)

The existing restaurant dish, storefront, and interior URLs remain unchanged. We apply restrained, non-destructive browser-side exposure, contrast, saturation, slight warm grading, soft edge falloff, sensible crops and improved editorial framing in CSS. This is **not** AI recreation or AI upscaling. The source photographs and details are untouched; appearance can vary slightly across browsers. High-resolution owner-provided originals would enable better native editing and faster self-hosting without relying on external sites. No generated food images are included.

## Brand assets: official only

The owner has not supplied a standalone official logo file. Although their photographed sign clearly shows the Chinese and English restaurant names, that does not authorize fabricating a separate mark or using an invented orange `太` badge. Therefore the custom icon, decorative faux brand seal, and `favicon.svg` have been removed. The site uses a clean typographic name **太平沙财记 / TAI PING SA CHOI KEE**. Add a logo and favicon only after obtaining the actual restaurant-provided artwork with permission.

## Business distinction — do not merge menus

**Tai Ping Sa Choi Kee / 太平沙财记** is the Chinese-food restaurant and primary identity of this website, with Chinese kitchen number **(626) 937-6555**. **Quickly / 快可立** has the **drinks AND snacks** menu and contact number **(626) 937-6552**. They share the photographed address, but do **not** label Quickly's milk tea, slushes, toppings or fried snacks as Tai Ping dishes. The Quickly section is explicitly labeled as a separate business menu. This distinction must be preserved in future redesigns and menu imports.
