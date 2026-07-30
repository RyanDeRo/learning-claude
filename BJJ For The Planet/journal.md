# BJJ For The Planet — Journal

## 2026-07-25 — Website rebuild (off WordPress)

**What was built:** A complete replacement for bjjfortheplanet.com, built as a single self-contained `website/index.html` (no framework, no build step — matches the static-site pattern used across the other Local Website Build client sites so Ryan can maintain it himself). One scrolling homepage with anchor nav: Mission, Retreats, CharitySpar, Partners, About, Donate, Get Involved.

**Research done before building:**
- Pulled the full text/structure of the live WordPress site (all pages: home, retreats, about, partners & donors, donate, contact, registration, gallery) via WebFetch, plus the raw HTML to find actual image/PayPal/Instagram links.
- Verified the real partner orgs: Guardian (guardiangym.org — 501(c)(3), free BJJ scholarships, Peru academy in Máncora that hosted the inaugural retreat), CharitySpar (sister app), and Elite Sports (elitesports.com — confirmed with Ryan this is the actual gi donor, not the separate/unrelated elitegi.com which is currently a suspended hosting account).
- Discovered the live site's photography is entirely generic Unsplash/Pixabay stock (traced via filenames) and the 3 "testimonials" use stock headshots — none of it real. Flagged this to Ryan rather than silently carrying it over.

**Key decisions (made with Ryan):**
- **Imagery:** Cut the stock photos entirely (leftover from a prior WordPress consultant, not intentional). Ryan confirmed the AI-generated panda/monkey-in-gis illustration *is* the visual direction he wants, and he'll supply more in that style later. Built the hero around that illustration; left the About section with a clearly-labeled "Founder photo coming soon" placeholder rather than inventing a fake one.
- **Testimonials:** Cut — confirmed not real.
- **Site structure:** One scrolling page instead of the old 9-page WordPress structure, per Ryan's call (simpler to maintain).
- **Elite Gi identity:** Confirmed as Elite Sports (elitesports.com), the same brand already linked on the old Partners & Donors page.

**Content carried over (verified real, not invented):** mission statement, founder story (Ryan DeRobertis, trains at NorthStarMMA under Jackson Galka), the Máncora Peru retreat details (March 2026, partnered with Guardian), the CharitySpar concept ("loser pays the winner's charity"), real contact info (email, phone, Instagram, Roxborough PA address), and the live PayPal donation link.

**Technical notes:**
- Registration/contact combined into one Netlify Forms submission (`data-netlify="true"`) instead of the old site's two separate forms — no backend needed, deploys the same way as the other agency client sites.
- Used `NGO` schema.org JSON-LD type (validated) instead of a local-business type.
- Caught and fixed a real bug during QA: setting `width`/`height` HTML attributes on the hero `<img>` without a matching CSS `height` rule caused the browser to apply the raw `height="1536"` as literal pixels, blowing up the hero section. Fixed by adding `height: auto` in CSS. Also caught an inline `style="display:flex"` on the mobile nav that silently defeated the mobile media query — moved that rule into the stylesheet instead of inline.
- QA'd both desktop and mobile (390px) layouts via Chrome automation, including partner cards, the form, and the sticky mobile donate bar.

**Still missing / follow-up:**
- Real photos: Peru retreat, gi donation moment, Ryan's own training, more panda/monkey-style illustrations for other sections.
- A founder headshot or illustrated portrait for the About section.
- Decision on hosting/deploy target for this specific site (Netlify, same as the agency's client sites?) and DNS cutover plan for bjjfortheplanet.com — not yet done, this session only produced the local file.
- CharitySpar migration off Replit (separate workstream, tracked in `Charity Spar/`) is still open.

## 2026-07-26 — Shift focus off donations, add sweep-in hero effect

**Why:** Ryan felt the site over-indexed on asking for money. He wants the primary ask to be following Instagram or getting in touch, with donating still available but no longer the loudest thing on the page. He also asked for more dramatic effects/imagery, pointing at the pinned scroll-sweep hero on the Jazzmine Cox biophilic-design site (`Local Website Build/biophillicdesign-jazzmine-cox-consulting/`) as the reference, and said to use the BJJFTP logo as the swept-in image for now (real retreat photos aren't ready yet).

**Donation de-emphasis:**
- Header CTA, hero primary CTA, and the mobile sticky bar all changed from "Donate" to "Follow @bjjfortheplanet" (Instagram).
- The old `.donate-panel` (moss background, big PayPal button, its own section) is gone. Donating is now a single quiet line — `.support-line` — folded into the bottom of Get Involved, still linking the same PayPal URL, `id="donate"` preserved so the footer's existing Donate link still resolves.
- Get Involved got promoted instead: a new `.follow-card` (same "info card, ember spine" visual language as `.retreat-card`) puts the Instagram handle front and center, above the existing email/phone contact list and form.

**Dramatic sweep-in hero:**
- Replaced the old two-column hero (headline+CTAs beside a static patch-framed illustration) with a pinned, scroll-driven intro: the BJJFTP badge logo starts small and grows to full size while the headline's letter-spacing tightens, using GSAP + ScrollTrigger — same technique as the Jazzmine Cox site. Copied `gsap.min.js`/`ScrollTrigger.min.js` into `website/js/vendor/` (no CDN dependency, matches how the reference project ships them).
- The logo file has a plain light-gray square backdrop around the circular badge (not transparent), so it's masked to a circle via CSS (`.badge-mask { border-radius: 50%; overflow: hidden; }`) rather than floating as an awkward square on the dark hero — no image edit needed.
- Base CSS is the finished look (scale 1, letter-spacing .02em); GSAP only pulls away from that as a scroll-start point, so if the animation is ever blocked or `prefers-reduced-motion` is set, the hero just renders still instead of stuck mid-effect.
- The panda/monkey illustration that used to live in the hero moved to the Retreats section (which previously had zero imagery), labeled "Illustration" to keep the site's existing honesty pattern about what's a real photo vs. not.

**QA:** Verified in Chrome — pin/scale/letter-spacing animation triggers correctly on scroll, no console errors, Get Involved/support-line render as intended, footer/header anchors still resolve. Wasn't able to get a live mobile-viewport screenshot this session (the browser automation's resize tool didn't actually change the tab's viewport, confirmed via `window.innerWidth`), but the responsive rules reuse the site's existing tested breakpoints (860px, 640px) with no structural changes to how they apply — worth a manual mobile check next time the site's opened on a phone.

**Still open:** same follow-up list as above, plus mobile visual QA on this hero change specifically, and eventually swapping the logo sweep for a real retreat photo once one exists.
