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
