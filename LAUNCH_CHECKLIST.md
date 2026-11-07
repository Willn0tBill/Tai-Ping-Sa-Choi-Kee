# Owner approval and public-launch checklist

**Status:** Functional owner-unapproved concept on GitHub Pages. Technical release does not imply business endorsement.

## Already implemented
- [x] Separate Chinese-first pages for 太平沙财记 (Tai Ping Sa Choi Kee) and 快可立 (Quickly’s).
- [x] Separate verified phone numbers, correct Fantuan links and business-specific navigation.
- [x] Address, Apple/Google Maps directions and copy-address control.
- [x] Searchable 13-dish Tai Ping feature board, without fabricated prices.
- [x] Searchable 77-item Quickly’s menu, photo-transcribed prices and a private saved-item shortlist.
- [x] Factual bilingual FAQs rather than invented history, coupons or promotional claims.
- [x] Responsive layout, keyboard focus, reduced motion and on-screen card entrances.
- [x] Noindex/nofollow concept preview; no unapproved structured business data.
- [x] Automated interaction and real-browser GitHub Actions checks.

## Must be confirmed by owners **before** an official commercial launch
- [ ] Each owner/manager approves their page, business name, descriptions and use of brand references.
- [ ] Verify commercial reuse rights to the third-party storefront/interior/dish images or replace with licensed/owner-approved media.
- [ ] Confirm operating hours, holiday schedules and available ordering/pickup/delivery options.
- [ ] Tai Ping: confirm current full menu, available dishes, translations and prices; 13 featured dishes are not a full priced menu.
- [ ] Quickly’s: confirm all 77 items, sizes, prices, handwritten corrections and discontinued products.
- [ ] Find/confirm Quickly’s exact Yelp listing; the concept currently links to a location-scoped Yelp search.
- [ ] Owner review of privacy and accessibility wording, and any real brand/logo assets.
- [ ] Approve production domain/hosting ownership and who maintains the site.
- [ ] Only after sign-off, remove noindex, add correct canonical URLs and verified structured data as appropriate, and re-audit production SEO and external links.
- [ ] Agree on update/check schedule for hours, prices, menus and photo permissions.

## Maintenance notes
- Update Quickly’s MENU_ITEMS in app.js; do not invent prices.
- Edit Tai Ping’s signature-card HTML and data-tone categories in index.html to change kitchen filters.
- A renamed Quickly’s menu item may no longer match an old saved-item ID. This is expected and does not affect orders because saving does not place any order.
- Keep both concepts noindexed until explicitly approved.
- Confirm external image rights before official publication.
- Run GitHub Verify Site and inspect phone/tablet/desktop captures before each release.

Current feature preview does not require additional food photography.
