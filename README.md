# SkillMatch AI

> Discover realistic income paths hidden in your skills — powered by Claude AI.

Enter your skills and interests, answer 4 quick questions, and get 3–5 personalized income paths with income ranges, difficulty ratings, and concrete first steps.

**Live in 60 seconds. No login required.**

---

## Stack

- **Next.js 16** (App Router)
- **Tailwind CSS v4**
- **Claude claude-sonnet-4-6** via Anthropic SDK
- Deploy on **Vercel**

## Local development

```bash
# 1. Clone
git clone https://github.com/daksh0112/skill-matcher.git
cd skill-matcher

# 2. Install deps
npm install

# 3. Add API key
cp .env.local.example .env.local
# Edit .env.local → set ANTHROPIC_API_KEY

# 4. Run
npm run dev
# → http://localhost:3000
```

## Deploy to Vercel

```bash
npx vercel
```

Then add `ANTHROPIC_API_KEY` in the Vercel dashboard under **Project Settings → Environment Variables**.

## Project structure

```
app/
  page.tsx          # Landing page
  assess/page.tsx   # Multi-step assessment form + results
  api/match/        # Claude API route
globals.css         # Dark theme + custom utilities
```

---

Built with [Claude Code](https://claude.ai/code)
