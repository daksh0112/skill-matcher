import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const TIME_LABELS: Record<string, string> = {
  under5: "less than 5 hours per week",
  "5to15": "5–15 hours per week",
  "15to30": "15–30 hours per week",
  fulltime: "full time (40+ hours per week)",
};

const RISK_LABELS: Record<string, string> = {
  low: "low risk tolerance (needs stable, predictable income)",
  medium: "medium risk tolerance (willing to invest time/money for upside)",
  high: "high risk tolerance (ready to bet big for a big outcome)",
};

export async function POST(req: NextRequest) {
  const { skills, interests, timeAvailable, riskTolerance, background } =
    await req.json();

  if (!skills?.length || !interests?.length || !timeAvailable || !riskTolerance) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const prompt = `You are an expert career and income strategy consultant. A person has given you the following profile:

SKILLS: ${skills.join(", ")}
INTERESTS: ${interests.join(", ")}
TIME AVAILABLE: ${TIME_LABELS[timeAvailable] || timeAvailable}
RISK TOLERANCE: ${RISK_LABELS[riskTolerance] || riskTolerance}
BACKGROUND/CONTEXT: ${background || "None provided"}

Based on this profile, generate exactly 4 personalized income paths this person can realistically pursue. These should be specific, actionable, and tailored to their actual profile — not generic advice.

Respond ONLY with valid JSON in this exact format:
{
  "summary": "One sentence that captures what makes this person's profile interesting and what kind of paths we found for them.",
  "paths": [
    {
      "title": "Short, compelling path name (e.g. 'Health Content Creator', 'B2B Notion Consultant')",
      "tagline": "One punchy line explaining the core idea",
      "whyItFits": "2-3 sentences explaining specifically why this fits THEIR skills and interests. Reference their actual skills and interests by name.",
      "incomeRange": "Realistic monthly range e.g. '$500–$3,000'",
      "timeToFirstIncome": "e.g. '2–4 weeks' or '2–3 months'",
      "difficulty": "Easy / Medium / Hard",
      "difficultyLevel": 1-5 number (1=easiest, 5=hardest),
      "firstSteps": [
        "Specific, concrete action step 1",
        "Specific, concrete action step 2",
        "Specific, concrete action step 3"
      ],
      "tags": ["tag1", "tag2"]
    }
  ]
}

Rules:
- Be specific to their profile. If they know Python + Finance, suggest a fintech tool or financial data consulting, not "start a blog".
- Income ranges must be realistic, not aspirational fantasy numbers.
- First steps must be actionable THIS WEEK, not vague ("research the market" is too vague — "post 3 Reels this week showing your Excel tips" is good).
- Sort paths from most accessible/quick to highest upside/complexity.
- Respond with JSON only, no markdown, no extra text.`;

  try {
    const message = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 2048,
      messages: [{ role: "user", content: prompt }],
    });

    const raw = message.content[0].type === "text" ? message.content[0].text : "";
    const parsed = JSON.parse(raw);

    return NextResponse.json(parsed);
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json({ error: "Failed to generate results" }, { status: 500 });
  }
}
