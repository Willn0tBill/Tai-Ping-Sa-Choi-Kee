# Quickly — Hacienda Heights

An editorial, mobile-first, English + Chinese restaurant website **concept** for the Quickly location at 15848 Halliburton Rd, Hacienda Heights, CA 91745.

> **Status:** Owner review preview. Not an official Quickly website; not approved for public representation of the business.

## What is included

- Distinctive responsive visual design; no framework or build dependency.
- English and Simplified Chinese shown together throughout the interface, without a language switcher.
- Searchable bilingual menu highlights with category filters.
- Semantic HTML, keyboard-accessible navigation, focus indicators, skip link, and reduced-motion support.
- Real address, click-to-call link, Google Maps directions, descriptive meta tags, and accessible image text.
- Illustrative photos from Unsplash. The images are **not** photographs of this shop.

## Local preview

Open \`index.html\` in a browser, or serve the directory locally:

\`\`\`sh
python3 -m http.server 8080
\`\`\`

Then visit \`http://localhost:8080\`. The site has no package install or build step.

## Updating the menu

Edit the \`MENU_ITEMS\` list near the top of \`app.js\`. Each item has:

- \`name\`: English item name
- \`zh\`: Simplified Chinese item name
- \`type\`: \`milk\`, \`fruit\`, \`slush\`, or \`snacks\`
- \`tag\`, \`color\`, and \`note\`: presentation metadata

The included selection is a **demonstration based on historical/public references**. It is **not** a verified complete menu. Current products, names, availability, prices, allergen statements, and ordering options must come directly from the owner before launch.

## Owner approval checklist

- [ ] Obtain permission to represent the business and confirm branding rights.
- [ ] Confirm exact store name, address, phone, hours/holiday hours, and preferred ordering URL.
- [ ] Replace all preview items with the owner's latest full bilingual menu, including accurate prices and options.
- [ ] Replace illustrative Unsplash images with real, approved product and storefront photography.
- [ ] Confirm promotions, contact links, accessibility, and legal copy.
- [ ] Remove \`noindex\` metadata and the concept-preview disclaimer **only after** owner approval.
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

\`\`\`sh
node --check app.js
node --test tests/site.test.mjs
\`\`\`

This performs syntax and source smoke checks, **not** visual cross-browser QA. Before deployment, test interactions and accessibility on actual mobile browsers and verify all links with the owner.
