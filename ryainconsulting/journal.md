# ryAIn Consulting — Journal

## 2026-11-02 — Market research before building the site
- Researched what small-business AI consultants actually sell, how solo operators get clients, and whether social media is needed. Full findings are in `market-research.md`.
- Key takeaways: the demand is for outcomes, not "AI." Missed-call text-back / lead capture is the most common productized offer for local businesses. Generic "AI chatbot" and generic AI training are saturated (chambers run free workshops). Referrals convert far better than social media (32% vs 1%).
- Possible differentiator: "no inquiry goes unanswered" = PagerDuty-style incident response for small businesses.
- Noticed: uncommitted edits to `business-plan.md` removed the 2026-07-26 "website builds are the lead offer" decision. Need to confirm with Ryan whether that was intentional.
- Next: Ryan decides on niche, whether to add a "never miss an inquiry" tier, and the social media scope. Then plan the site structure.

## 2026-11-20 — Expanding into AI best-use & automation consulting; journal/lesson rules
- Service line 3 broadened from "AI consulting" to **AI best use and automation consulting** (updated in `business-plan.md`). This is Ryan's decision; pricing and packaging are still open.
- Wrote `ai-automation-learning-plan.md`: 6 modules (AI best use, no-code automation, lead capture + texting compliance, PagerDuty-style monitoring, agents/MCP, consulting process). Each module ends with a build on Ryan's own businesses that doubles as a demo. Roughly 8 weeks at side-job pace.
- Root `CLAUDE.md` now requires a short **Lesson** in every working response and journal updates after every meaningful session. ryAIn and web agency work also log here. The `/update-journals` command (root and `Local Website Build/`) now includes this journal and a Lessons heading.

**Lessons**
- Most "AI automation" a small business needs is plain automation, with one AI step at most. Knowing when *not* to use AI is the consulting skill.
- CLAUDE.md rules are instructions Claude reads every session and usually follows, but nothing enforces them. A hook in settings.json would be needed to *guarantee* a behavior, like a journal reminder at session end.

**Next:** start Module 1 (personal ryAIn assistant + 5 saved prompts, time a task before/after). Choose Zapier or Make for Module 2.

## 2026-11-20 (later) — Dropped the PagerDuty angle; plan rebuilt from first principles
- **Decision (Ryan):** don't blend the PagerDuty/enterprise background into ryAIn. Monitoring and incident response are enterprise needs; a tattoo shop or bakery has no cloud environment to watch. Positioning starts from what local businesses actually need.
- Rewrote `ai-automation-learning-plan.md` around the four jobs every local business does (get found and get inquiries, book and serve, get paid and do admin, keep customers coming back). Modules: owner interviews → AI for writing work → getting more from the tools they already pay for → never miss an inquiry → packaging/pricing/handoff. The monitoring module is gone.
- Removed PagerDuty/monitoring framing from `business-plan.md` (including "uptime monitoring" in the $50/mo plan) and `market-research.md` (section 3 is marked dropped, with the reason). Added the rule to `ryainconsulting/CLAUDE.md` and Claude's memory.

**Lessons**
- A differentiator only works if the *customer* values it. "I have enterprise reliability experience" is interesting to me, not to a bakery owner.
- Start discovery with the client's day, not your toolbox. Interviewing 3–5 owners is now the first module because it decides what's worth learning next.

**Next:** Module 1: interview 3–5 owners (Kadillac, nail salons, smoothie shop, Personal Touch, the BJJ gym) about their weekly time sinks.

## 2026-11-25 — Offer restructured, ryAIn site live, private-file incident on client sites
- **Offer (Ryan's decision):** the $50/mo website is the foot in the door. The $150 voice plan is gone. Everything AI (voice/chat agents, n8n automations, AI usage consulting) is now one **custom-quoted** offer, priced by how much automation the client wants. "Unlimited updates" is dropped from the $50 plan. The site bio no longer mentions PagerDuty, which matches the 11-20 decision.
- **ryAIn site is live** at `ryainconsulting.netlify.app`. There's no custom domain yet, on purpose, to keep costs down.
- **Incident:** Netlify was publicly serving internal files. On Kadillac (a real client) that meant the client journal and research notes; on ryAIn it meant the **finance tracker** and journal. Fixing Kadillac caused about 30 minutes of downtime. Fixed with a `site/` folder layout and a "journal.md must 404" check, now in the agency Netlify guide. Old deploys still contain the files and are slated for deletion.
- **Client-facing quality issue caught by Ryan:** North Star testimonials had been trimmed and spliced. Now only complete, verbatim reviews are used (also saved as a standing rule in Claude's memory).

**Lessons**
- **Land and expand:** a cheap, low-risk entry product earns the trust that sells the scoped, higher-value work. That only works if the entry product is clearly scoped, which is why "unlimited" came out.
- **Security is part of the product.** A client's internal notes sitting at a public URL is a trust breach, even if nobody found it. "Verify private things are actually private" belongs on every go-live checklist I sell.
- **The incident order is reusable as a story for clients:** restore service (rollback), then find the cause (publish-dir timing), then fix it so it can't recur (folder structure plus a 404 check). That's a real example of the reliability habit, explained in a local business's terms.

**Next:** decide whether to state an edit limit on the $50 plan. Get one AI automation proof point for the Work section (an owner interview from Module 1 could become the first one).
