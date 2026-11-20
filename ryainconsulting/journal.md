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
