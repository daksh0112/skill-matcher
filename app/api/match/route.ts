import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

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
  // Auth check
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "UNAUTHENTICATED" }, { status: 401 });
  }

  // Usage check
  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  if (user.freeUsed && !user.isPaid) {
    return NextResponse.json({ error: "PAYWALL" }, { status: 402 });
  }

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
      "difficultyLevel": 1,
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
- Be specific to their profile. Reference their actual skills.
- Income ranges must be realistic, not aspirational fantasy numbers.
- First steps must be actionable THIS WEEK.
- Sort paths from most accessible/quick to highest upside/complexity.
- difficultyLevel is a number 1-5 (1=easiest).
- Respond with JSON only, no markdown, no extra text.`;

  try {
    const message = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 2048,
      messages: [{ role: "user", content: prompt }],
    });

    const raw =
      message.content[0].type === "text" ? message.content[0].text : "";
    const parsed = JSON.parse(raw);

    // Mark free usage after successful analysis
    if (!user.freeUsed) {
      await prisma.user.update({
        where: { id: session.user.id },
        data: { freeUsed: true },
      });
    }

    return NextResponse.json(parsed);
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json(
      { error: "Failed to generate results" },
      { status: 500 }
    );
  }
}
