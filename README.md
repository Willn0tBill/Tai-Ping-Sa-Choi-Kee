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

The owner has not supplied a standalone official logo file. Although their photographed sign clearly shows the Chinese and English restaurant names, that does not authorize fabricating a separate mark or using an invented orange `太` badge. Therefore the custom icon, decorative faux brand seal, and `favicon.svg` have been removed. The main page uses the typographic name **太平沙财记 / TAI PING SA CHOI KEE** and the second page uses the text-only name **Quickly’s / 快可立**. Add a logo and favicon only after obtaining the actual restaurant-provided artwork with permission.

## Business distinction — do not merge menus

**Tai Ping Sa Choi Kee / 太平沙财记** is the Chinese-food restaurant and primary identity of this website, with Chinese kitchen number **(626) 937-6555**. **Quickly / 快可立** has the **drinks AND snacks** menu and contact number **(626) 937-6552**. They share the photographed address, but do **not** label Quickly's milk tea, slushes, toppings or fried snacks as Tai Ping dishes. The Quickly section is explicitly labeled as a separate business menu. This distinction must be preserved in future redesigns and menu imports.

## Separate Quickly’s page (current architecture)

- **`index.html` — 太平沙财记 / Tai Ping Sa Choi Kee**: Chinese kitchen, signature dishes, location and restaurant contact (+1 626-937-6555). It must not render Quickly’s drinks/snacks catalog in its body.
- **`quicklys.html` — Quickly’s**: distinct, internally linked page with its own bilingual 77-item drinks, snacks and toppings menu, in-page search, price display and Quickly’s contact (+1 626-937-6552). The restaurant site remains accessible by a cross-link.
- Both businesses share the same street address; that does **not** mean they share branding, menus or phone numbers. Navigation labels use **“Quickly’s”**, not **“Drinks & Snacks”** as the business name.
- Both pages reuse `styles.css`, `app.js`, responsive navigation, the photographed storefront where appropriate, and `noindex,nofollow` while owner approval remains outstanding.

## Design consolidation — Chinese-led and responsive

The former 46 KB stylesheet contained contradictory selectors added across many revisions. It has been replaced with a single responsive stylesheet using a calm, modern Cantonese-inspired palette, consistent spacing, restrained photographic treatments and a clear typographic hierarchy. Both pages present Chinese as the primary language and English directly underneath. The Quickly’s page now opens with `快可立` and the English business name `Quickly’s` beneath it; the brand is represented by text only, not a fabricated logo. At viewport widths below 1100px, navigation collapses into an accessible menu. Below 740px, the oversized desktop telephone button disappears and the telephone link remains available inside the expanded menu. Shared phone numbers and menus remain distinct by business. The site is still a concept awaiting approval.

## November 2026 mobile-first and motion pass

The two businesses continue to have separate pages, menus, and telephone numbers. The latest pass improves the experience for **phone-first customers** while maintaining the Chinese-primary, English-secondary presentation:

- Fixed, bilingual **mobile quick-action bar** for jumping to the correct menu or calling the correct business. Safe-area spacing prevents the bar from covering the footer or iPhone home indicator.
- Quickly’s menu categories become horizontally swipeable on smaller screens; search remains accessible and the 77 photographed entries and prices are unchanged.
- Three **real menu-category shortcuts** (milk tea, slush, snacks) in the Quickly’s hero. They interact with the existing menu filtering rather than creating dummy buttons.
- On desktop, an intentional **menu help sidebar** uses otherwise empty space for category guidance and the Quickly’s phone number. It disappears below 900px to prioritize menu content on tablets and phones.
- Scroll-reveal motion for page sections, lightweight menu-card entrances, a responsive menu transition, and restrained hover/tap feedback. Animations are progressive enhancements: if JavaScript, IntersectionObserver, or motion preference support is unavailable, content remains visible. Respect \`prefers-reduced-motion\` without relying on the animation to convey information.
- Corrected the mobile navigation resize threshold to **1100px**, matching the actual CSS breakpoint. Earlier code closed the menu at 800px, leaving a broken interval for tablets.
- Kept actual restaurant photos and Chinese/English text; no invented logos, AI food replacements, fabricated ratings, fake testimonials, or prices were added.

The code is tested with Node's simulated DOM and GitHub Actions. A final real-device visual review, especially Safari on iPhone and Chrome on Android, remains necessary before treating it as production-ready.


## Verified ordering, Yelp and directions links

Both business pages now expose an accessible **online ordering + reviews + directions** section near the top, a direct Fantuan CTA in the hero, and a phone-friendly persistent order button. The source links were checked against the actual Hacienda Heights businesses rather than generated from guesses.

| Business | Fantuan online order | Yelp | Phone |
|---|---|---|---|
| 太平沙财记 / Tai Ping Sa Choi Kee | https://www.fantuanorder.com/en-US/store/tai-ping-sa-choi-kee/us-1364034559 | https://www.yelp.com/biz/tai-ping-sa-choi-kee-hacienda-heights (direct listing confirmed via Eater LA) | (626) 937-6555 |
| 快可立 / Quickly’s | https://www.fantuanorder.com/en-US/store/quickly/us-28952 | Yelp **search** scoped to Quickly at 15848 Halliburton Road (not a verified direct listing) | (626) 937-6552 |

Address on both: **15848 Halliburton Rd, Hacienda Heights, CA 91745**.

- Apple Maps directions: `https://maps.apple.com/?daddr=15848%20Halliburton%20Rd%2C%20Hacienda%20Heights%2C%20CA%2091745&dirflg=d`
- Google Maps directions: `https://www.google.com/maps/dir/?api=1&destination=15848%20Halliburton%20Rd%2C%20Hacienda%20Heights%2C%20CA%2091745`
- **Caution:** Yelp search is used for Quickly’s because its exact direct business URL could not be confirmed (Yelp blocks web inspection). Do **not** replace the search with a guessed `/biz/quickly-...` slug. The exact restaurant Yelp URL is known.
- Both ordering links are to third-party Fantuan product pages. Availability, fees, prices, pickup/delivery options and service hours depend on Fantuan and customer location. Neither page claims to process payments itself.
- Apple and Google map links use the address and open their respective apps where supported; they do not embed location tracking or require access to the visitor's GPS.
- External links use `target="_blank" rel="noopener noreferrer"`. Both pages remain `noindex,nofollow` concept websites pending owner approval.


## Visible animation pass

The original motion was too subtle because entrance effects were limited to an observer-triggered 20px reveal. The following are intentionally noticeable **without being distracting**:

- Independently animated **Chinese-first hero text** with short staggered entrances on both business pages, plus a photograph reveal (fade, vertical movement and small scale/blur transition).
- The existing dark restaurant ticker now **scrolls continuously** and pauses when hovered. It duplicates its existing text instead of introducing fake promotions.
- Section and cards animate in-view with a more legible 32px rise. Importantly, the new CSS **never hides content while waiting for JavaScript or IntersectionObserver**.
- The bilingual **继续探索 / Scroll to explore** link guides visitors to ordering and directions; its down arrow has modest motion.
- The previous thin yellow scroll-progress indicator was removed after feedback; it was mistaken for the entire animation experience.
- Navigation underline, card accents and call-to-action arrows gain purposeful hover / focus / active transitions.
- Motion can be turned off via the visitor's OS `prefers-reduced-motion` setting, and the entire site remains useful with JavaScript disabled. No generated logos, AI food photography or additional image dependencies were introduced.

Animation behavior is checked with 19 automated tests. Real-phone visual QA remains a separate review step.

## Motion accessibility and replay (verified-motion v3)

The hero, photos, and bilingual restaurant ticker have noticeable staggered / gentle movements, and section reveals animate as people scroll. The website now includes **动效开启 / Motion on** or **动效暂停 / Motion paused** controls and a **重播 / Replay** control near the start of both pages. No decorative bar is used as a substitute for actual animation.

- By default, `prefers-reduced-motion: reduce` starts the website paused; no animation or content is hidden. Users can **explicitly opt in** from the page control, including on reduced-motion devices.
- If the visitor turns motion on or off, that choice is stored as `restaurantMotionPreference` where local storage is available. The toggle is clearly labeled and supports `aria-pressed`.
- Replay restarts hero and visible section animations without forcing a page refresh.
- Motion effects are gated by `.motion-on`, and CSS keeps all content legible when JavaScript is disabled.
- A duplicated track makes the restaurant-name and Quickly’s category marquees loop seamlessly. Pause on hover.
- `index.html` and `quicklys.html` use cache-busting query strings for `styles.css` and `app.js` so visitors see the latest behavior instead of older cached assets.
- No additional fonts, paid animation library, synthetic food images or fake brand logos were introduced.

An automated DOM test checks the default reduced-motion state, explicit opt-in, persisted override and replay. Real browser visual inspection remains necessary for final QA; the CI suite cannot prove exactly how the effect looks on a customer's device.


## Interactive restaurant experience (v4)

This pass adds interactions that remain useful after the first-load animation finishes:

- **Photo viewer:** the three existing, real Tai Ping Sa Choi Kee gallery photos open in an accessible native dialog, with next/previous controls, keyboard arrow navigation, Escape to close, focus return to the opened thumbnail, and swipe gestures on touchscreens. Without JavaScript or dialog support, each photo still links directly to its actual original image. No generated or substitute photos were introduced.
- **Mobile storefront gallery:** horizontal scroll snapping reveals the next real image instead of stacking giant photos vertically; a bilingual swipe hint explains the interaction.
- **Desktop section rail:** at widths of 1460px or more, a compact right-side navigation highlights the current page section and expands its Chinese-first labels on hover/focus. The rail is hidden on smaller viewports to avoid crowding.
- **Menu interaction polish:** the selected Quickly’s category scrolls into view in the horizontally swipeable filter strip, and the menu count animates when the category changes while motion is enabled. Searches remain unaffected.
- **Section emphasis:** a restrained animated underline draws beneath highlighted section headings; photo dialog uses a short entrance. Reduced motion and the existing explicit motion toggle continue to work.
- **Browser verification:** the GitHub Actions verification workflow now runs real Chrome (via puppeteer-core without a bundled browser download) for both sites at 390px mobile and 1500px desktop widths. It checks layout overflow, nav interaction, animation computed styles, the native photo dialog, Quickly’s menu filter, and reduced-motion behavior. Screenshots are uploaded as a CI artifact for visual review.

The two businesses keep independent menu ownership, contacts, Fantuan links and branding. The website remains an owner-unapproved concept, with original photo license confirmation still required before official commercial use.

## First-screen mobile layout (v5)

A Chrome screenshot review found that the mobile hero previously showed too much introduction before any real food or storefront photography. At widths up to 740px, both pages now place the **Chinese-first business name and real photo before the long introduction**, and push the secondary motion controls below the useful actions. Desktop retains its spacious two-column hero. The user can still reach Fantuan from the persistent mobile ordering button.

The browser test now asserts that the relevant real photo begins within the first mobile viewport, in addition to checking horizontal overflow, navigation, animations, menu filtering, image galleries, and reduced-motion opt-in. The source content, restaurant photography, and the separate businesses' links remain unchanged.

## Floating action cards — mobile-first v6

Each business homepage now has three restrained, **clickable floating cards** alongside its real hero photograph on wide screens. They are grounded in actual data, not imaginary ratings, coupon codes or accolades:

- **饭团在线点餐 / Fantuan:** external link to the correct business's confirmed Fantuan listing.
- **一键到店 / Get directions:** direct Apple Maps and Google Maps directions to **15848 Halliburton Rd, Hacienda Heights, CA 91745**, with independent 44px+ tap targets on phones.
- **同一地址 · 独立菜单 / Separate business:** navigates to the other tenant's own website page, explicitly acknowledging that menus and phone numbers are distinct.

The cards float by 7px only on motion-enabled desktop browsers; they pause on hover and do not animate on phones/tablets or when motion is off. At widths 741–900px they occupy their own row; at 740px and below they sit immediately **after** the actual food/storefront photo, as two balanced cards and one full-width cross-business card, without blocking the photo or ordering links. Their size, color contrast, and hover/focus treatments use the site's restrained design system. No fake brand logo or synthetic photography is introduced.

Chrome smoke tests now cover **390px phone, 820px tablet, and 1500px desktop** layouts on both pages, and verify the floating cards, independent order links, map URLs, photo visibility, and lack of horizontal overflow. The current site is still a concept pending owner approval.

## Cross-device polish — editorial desktop and tablet layout (v7)

This pass directly addresses the earlier desktop/tablet shortcomings seen in real Chrome screenshots. The three floating utility cards were covering the lower portion of the real restaurant photography and the third card often occupied an awkward full-width second row on tablets.

- **Desktop (901px+):** Two-column Chinese-led hero with a fully unobstructed food/storefront image, followed by a cohesive, elevated **three-column action row** for Fantuan, Apple/Google Maps and the other business. The utility cards retain a restrained float motion if enabled, but never overlap the food photography.
- **Tablet (741–900px):** Dedicated two-column hero with three equally spaced horizontal action cards, a shorter photo presentation, and compact typography. No more two-card row plus dangling third card.
- **Phones (up to 740px):** Preserved the approved photo-first stacked layout; useful cards remain tappable below the image, not as floating overlays.
- **Full-page desktop polish:** More intentional spacing and rhythm across signature dishes, Yelp/Fantuan/directions sections, real-photo gallery, and contact/location. At large desktop widths, Quickly’s menu uses three readable product columns alongside its information sidebar; tablet stays at two columns and phone at one.
- **Better real Quicklys storefront framing:** The wide photographic crop now shows more of both signs on desktop/tablet, rather than using a nearly square crop.
- **QA:** Additional source-level and real Chrome regression checks ensure three card columns, no photo overlap, no horizontal scrolling, no accidental reduction of mobile tap targets, and the correct business-specific Fantuan and map links.

No new brand imagery, synthetic food photography, invented reviews, pricing, or unverified claims. Still a concept until the owner approves.

## Seamless responsive ticker v8

The dark-green Chinese/English marquee used to contain only two short hard-coded text sequences. On wide desktop screens (e.g. 1900px), their total width was smaller than the viewport. That caused a large blank stretch, and the -50% travel could visibly reset.

The `initTickerLoop()` routine now measures the actual ticker and original sequence, builds **two identical, full-viewport-width-or-wider** repeating text groups, and sets animation duration based on real width so motion speed remains consistent between phones and desktop monitors. It recalculates after window resize, container resize and font readiness. CSS moves the whole track **exactly half its width**, so the second group takes the first group's place at the loop boundary. Both Tai Ping and Quickly’s use their own existing text, not fabricated promotional claims.

- With JS disabled, the banner is static, not broken.
- The existing motion toggle, replay button, hover-to-pause, and reduced-motion preference still apply.
- Real Chrome tests check coverage and group seams at five animation phases, at phone/tablet/desktop/1900px wide layouts, and after resizing a wide window to 2370px.
- No other menu, contact, photo, or branding content changed.

## Cards reveal only when visible (v9)

The appearance animation of every individual **Fantuan/maps/cross-business floating card, ordering/Yelp/directions service card, signature dish card, and real-photography gallery card** is now triggered by the card entering the visitor's viewport. Quickly’s category shortcut cards, desktop sidebar and dynamically created menu-item cards use the same mechanism.

- No card entrance begins simply because the page loaded or the menu was populated; the `IntersectionObserver` marks each card `card-in-view` when it becomes visible. Nearby cards are staggered gently rather than animating simultaneously.
- The entrance plays **once per card**, not each time the visitor scrolls it in and out. Existing perpetual card-floating loops are removed to avoid offscreen animation work.
- When Quickly’s menu category/search changes, removed cards are unobserved and new cards are observed, so long menus don't animate out of view or retain stale references.
- The existing **Motion off / Replay** controls still work. Replay resets the card observer so that cards animate again only when visible; reduced-motion users never have content hidden.
- If IntersectionObserver is unsupported or JavaScript is off, all cards remain fully readable without waiting for an animation.
- Real-Chrome browser smoke tests verify that a distant card starts static, animates on entering the viewport, and retains its one-time state.

## Strict on-screen-only card animation (v10)

The v9 observer started a card when it entered the viewport and immediately unobserved it. That let its CSS animation keep playing after it had scrolled offscreen. V10 fixes that state-machine bug.

- A card starts its entrance only when at least **15%** enters the observer's visible region (bottom 8% reserved), not because the page loads or because the menu populates.
- If the visitor scrolls it out of view **mid-animation**, the CSS animation's clock is **paused**. When the same card re-enters, the clock resumes at the interrupted frame.
- Only the actual `animationend` event marks a card complete. Complete cards become static and are unobserved, so they do not replay on every scroll. The existing Replay control explicitly re-arms them.
- Motion-off, reduced-motion and no-JavaScript conditions preserve readable static content; dynamically filtered Quickly's menu items register and unregister cleanly.
- Browser tests validate that an offscreen card is static, an in-view card is running, the animation's time stops advancing offscreen, it resumes on re-entry and remains still after finishing. Unit tests cover near-edge intersections, replay, completion and the motion toggle.

## Smooth reload / hard-refresh stabilization (v11)

This pass addresses first-load animation flicker and layout jumps on **both** restaurant pages:

- A tiny synchronous motion-preference bootstrap runs **before the external stylesheet**, so the correct enabled/disabled state is present at the first CSS paint. The deferred JS control sync no longer introduces a second wave of hero animations partway through load. Reduced-motion preferences and the saved explicit override are still honored.
- The motion controls now **reserve their layout space** before JavaScript initializes. Previously, changing them from `display:none` to `display:flex` caused a visible hero layout shift on reload.
- Google Fonts use `display=optional` rather than `swap` to avoid late font replacement pushing around Chinese/English headings on slow connections. Fallback system fonts remain available.
- Removed the hero photo's animating **blur filter**, keeping the existing transform and fade without expensive reload-time rasterization.
- The marquee is sized **synchronously** on startup and cannot start moving until its two copies cover the viewport. When fonts finish loading or the window resizes, the current loop phase is preserved rather than restarting at the left edge.
- Both static source tests and real Chrome hard-reload checks run on each page at **390px phone and 1500px desktop**, inspecting the motion bootstrap, reserved controls, full-width ticker and continuity during resize. Screenshots are retained in GitHub Actions artifacts.

The site's real photos, Chinese-first content, menu items, verified ordering links, and strict on-screen card animations remain unchanged.

## Menu, customer experience and readiness upgrade (v12)

Both concept pages now offer a more useful, polished experience without food photography the owner has not supplied.

### Tai Ping Sa Choi Kee — kitchen
- Search **all 13 dishes** from the photographed in-store food board in Chinese or English.
- Filter by noodles, seafood, clay pots, rice or other featured dishes. The board still contains **no invented prices**.
- Live bilingual result count, no-results explanation and reset control.
- Bilingual FAQ links to the correct Fantuan page and clarifies that full menu prices, hours and availability require confirmation.

### Quickly’s — menu
- Preserve all **77** transcribed bilingual menu items and visible prices, subject to owner verification.
- Add local Saved-items shortlist with accessible Save/Unsave buttons, saved filter and count.
- The shortlist uses browser localStorage key 'quicklysMenuSavedV1' when permitted. It is not an order, account or third-party transmission; it works in-tab if storage is blocked.
- Bilingual FAQ makes price uncertainty and separate menus clear.

### Shared usability, design and safeguards
- Consistent cards, typography, spacing, keyboard focus and responsive controls.
- Native HTML FAQ panels that work without JavaScript.
- Copy-address control with accessible success/fallback feedback.
- Honest photo-unavailable messages when remote image hosts fail; no artificial photos, logos or owner story.
- Strict-origin referrer policy, noindex/nofollow preview status, no unauthorized official-business schema.
- Browser tests for categories, Chinese search, saved-item persistence, FAQ, clipboard feedback, image fallback, overflow and indexing safeguards.

**This feature release is not an official public launch.** See LAUNCH_CHECKLIST.md for owner approval, rights, operating hours, pricing, Yelp link, official domain and SEO steps.
