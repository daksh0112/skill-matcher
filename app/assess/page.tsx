"use client";

import { useState, KeyboardEvent } from "react";
import Link from "next/link";

const INTEREST_OPTIONS = [
  "Teaching & Education", "Writing & Content", "Design & Art",
  "Technology & Coding", "Health & Wellness", "Finance & Money",
  "Marketing & Sales", "Cooking & Food", "Fitness & Sport",
  "Music & Audio", "Video & Photography", "Business & Strategy",
  "Science & Research", "Sustainability", "Parenting & Family",
  "Travel & Lifestyle", "Gaming", "Law & Compliance",
];

const TIME_OPTIONS = [
  { value: "under5", label: "Under 5 hrs/week", sub: "Side project energy" },
  { value: "5to15", label: "5 – 15 hrs/week", sub: "Serious side hustle" },
  { value: "15to30", label: "15 – 30 hrs/week", sub: "Near full commitment" },
  { value: "fulltime", label: "Full time", sub: "All in, ready to go" },
];

const RISK_OPTIONS = [
  { value: "low", label: "Low — I need stable income", sub: "Prefer guaranteed returns before quitting anything" },
  { value: "medium", label: "Medium — some risk is fine", sub: "Willing to invest time/money for upside" },
  { value: "high", label: "High — I'm all in", sub: "Ready to bet big for a big outcome" },
];

type FormData = {
  skills: string[];
  interests: string[];
  timeAvailable: string;
  riskTolerance: string;
  background: string;
};

type IncomeStep = string;

type IncomePath = {
  title: string;
  tagline: string;
  whyItFits: string;
  incomeRange: string;
  timeToFirstIncome: string;
  difficulty: string;
  difficultyLevel: number;
  firstSteps: IncomeStep[];
  tags: string[];
};

type ApiResult = {
  paths: IncomePath[];
  summary: string;
};

const STEPS = ["Skills", "Interests", "Time", "Risk", "Background"];

export default function AssessPage() {
  const [step, setStep] = useState(0);
  const [skillInput, setSkillInput] = useState("");
  const [form, setForm] = useState<FormData>({
    skills: [],
    interests: [],
    timeAvailable: "",
    riskTolerance: "",
    background: "",
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ApiResult | null>(null);
  const [error, setError] = useState("");

  const addSkill = (raw: string) => {
    const trimmed = raw.trim();
    if (trimmed && !form.skills.includes(trimmed) && form.skills.length < 15) {
      setForm((f) => ({ ...f, skills: [...f.skills, trimmed] }));
    }
    setSkillInput("");
  };

  const removeSkill = (s: string) =>
    setForm((f) => ({ ...f, skills: f.skills.filter((x) => x !== s) }));

  const toggleInterest = (i: string) => {
    setForm((f) => ({
      ...f,
      interests: f.interests.includes(i)
        ? f.interests.filter((x) => x !== i)
        : f.interests.length < 6
        ? [...f.interests, i]
        : f.interests,
    }));
  };

  const canNext = () => {
    if (step === 0) return form.skills.length > 0;
    if (step === 1) return form.interests.length > 0;
    if (step === 2) return form.timeAvailable !== "";
    if (step === 3) return form.riskTolerance !== "";
    return true;
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Request failed");
      const data = await res.json();
      setResult(data);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const difficultyColor = (level: number) => {
    if (level <= 2) return "#34d399";
    if (level <= 3) return "#fbbf24";
    return "#f87171";
  };

  if (loading) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center px-6"
        style={{ background: "#0a0a0f" }}
      >
        <div
          className="w-16 h-16 rounded-full border-2 border-transparent spin-slow mb-8"
          style={{
            borderTopColor: "#7c3aed",
            borderRightColor: "#4f46e5",
          }}
        />
        <h2 className="text-2xl font-semibold mb-3" style={{ color: "#f0f0ff" }}>
          Analyzing your profile...
        </h2>
        <p style={{ color: "rgba(240,240,255,0.45)" }}>
          Mapping your skills to income paths
        </p>
        <div className="mt-8 flex flex-col gap-3 w-full max-w-md">
          {[80, 65, 90].map((w, i) => (
            <div key={i} className="skeleton h-4" style={{ width: `${w}%` }} />
          ))}
        </div>
      </div>
    );
  }

  if (result) {
    return (
      <div className="min-h-screen px-6 py-12" style={{ background: "#0a0a0f" }}>
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 fade-in-up">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm mb-8"
              style={{ color: "rgba(240,240,255,0.4)" }}
            >
              ← SkillMatch AI
            </Link>
            <div
              className="inline-block px-4 py-1.5 rounded-full text-sm mb-6"
              style={{
                background: "rgba(52, 211, 153, 0.1)",
                border: "1px solid rgba(52, 211, 153, 0.25)",
                color: "#34d399",
              }}
            >
              ✓ Analysis complete — {result.paths.length} paths found
            </div>
            <h1 className="text-4xl font-bold mb-4" style={{ color: "#f0f0ff" }}>
              Your personalized income paths
            </h1>
            <p className="text-lg max-w-xl mx-auto" style={{ color: "rgba(240,240,255,0.5)" }}>
              {result.summary}
            </p>
          </div>

          {/* Paths */}
          <div className="flex flex-col gap-6">
            {result.paths.map((path, i) => (
              <div
                key={i}
                className="result-card p-7 fade-in-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className="text-xs font-bold px-2 py-0.5 rounded"
                        style={{
                          background: "rgba(124,58,237,0.2)",
                          color: "#a78bfa",
                        }}
                      >
                        #{i + 1}
                      </span>
                      {path.tags?.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-0.5 rounded-full"
                          style={{
                            background: "rgba(255,255,255,0.06)",
                            color: "rgba(240,240,255,0.5)",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h2 className="text-xl font-bold mb-1" style={{ color: "#f0f0ff" }}>
                      {path.title}
                    </h2>
                    <p style={{ color: "#a78bfa", fontSize: "14px" }}>{path.tagline}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-lg font-bold" style={{ color: "#34d399" }}>
                      {path.incomeRange}
                    </div>
                    <div className="text-xs mt-0.5" style={{ color: "rgba(240,240,255,0.4)" }}>
                      per month
                    </div>
                  </div>
                </div>

                {/* Why it fits */}
                <div
                  className="rounded-xl p-4 mb-5"
                  style={{ background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.15)" }}
                >
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(240,240,255,0.7)" }}>
                    <span style={{ color: "#a78bfa", fontWeight: 600 }}>Why this fits you: </span>
                    {path.whyItFits}
                  </p>
                </div>

                {/* Meta row */}
                <div className="flex flex-wrap gap-5 mb-5">
                  <div>
                    <div className="text-xs mb-1" style={{ color: "rgba(240,240,255,0.35)" }}>
                      Time to first income
                    </div>
                    <div className="text-sm font-medium" style={{ color: "#f0f0ff" }}>
                      {path.timeToFirstIncome}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs mb-1" style={{ color: "rgba(240,240,255,0.35)" }}>
                      Difficulty
                    </div>
                    <div
                      className="text-sm font-medium"
                      style={{ color: difficultyColor(path.difficultyLevel) }}
                    >
                      {path.difficulty}
                    </div>
                  </div>
                </div>

                {/* First steps */}
                <div>
                  <div className="text-xs font-semibold mb-3" style={{ color: "rgba(240,240,255,0.4)", letterSpacing: "0.08em" }}>
                    FIRST 3 STEPS
                  </div>
                  <div className="flex flex-col gap-2">
                    {path.firstSteps.map((step, si) => (
                      <div key={si} className="flex items-start gap-3">
                        <div
                          className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5"
                          style={{
                            background: "rgba(124,58,237,0.2)",
                            color: "#a78bfa",
                          }}
                        >
                          {si + 1}
                        </div>
                        <p className="text-sm leading-relaxed" style={{ color: "rgba(240,240,255,0.65)" }}>
                          {step}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Restart */}
          <div className="text-center mt-12">
            <button
              onClick={() => {
                setResult(null);
                setStep(0);
                setForm({ skills: [], interests: [], timeAvailable: "", riskTolerance: "", background: "" });
              }}
              className="text-sm px-6 py-3 rounded-full"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(240,240,255,0.5)",
              }}
            >
              Start over with different inputs
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#0a0a0f" }}>
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-5 max-w-2xl mx-auto w-full">
        <Link href="/" className="text-sm" style={{ color: "rgba(240,240,255,0.4)" }}>
          ← Back
        </Link>
        <span className="text-sm font-medium" style={{ color: "rgba(240,240,255,0.4)" }}>
          Step {step + 1} of {STEPS.length}
        </span>
      </div>

      {/* Progress */}
      <div className="px-6 mb-8 max-w-2xl mx-auto w-full">
        <div className="h-1.5 rounded-full w-full" style={{ background: "rgba(255,255,255,0.08)" }}>
          <div
            className="progress-bar h-1.5"
            style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
          />
        </div>
        <div className="flex justify-between mt-2">
          {STEPS.map((s, i) => (
            <span
              key={s}
              className="text-xs"
              style={{ color: i <= step ? "#a78bfa" : "rgba(240,240,255,0.2)" }}
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* Step content */}
      <div className="flex-1 px-6 max-w-2xl mx-auto w-full fade-in-up">
        {/* STEP 0 — Skills */}
        {step === 0 && (
          <div>
            <h2 className="text-3xl font-bold mb-2" style={{ color: "#f0f0ff" }}>
              What are you good at?
            </h2>
            <p className="mb-8" style={{ color: "rgba(240,240,255,0.45)" }}>
              List skills, tools, knowledge areas — anything you&apos;re genuinely capable at.
            </p>
            <div className="flex gap-3 mb-4">
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
                  if (e.key === "Enter" || e.key === ",") {
                    e.preventDefault();
                    addSkill(skillInput);
                  }
                }}
                placeholder="e.g. Excel, public speaking, Python... (press Enter to add)"
                style={{ flex: 1 }}
              />
              <button
                onClick={() => addSkill(skillInput)}
                className="btn-primary text-white px-5 py-3 rounded-xl font-medium text-sm"
              >
                Add
              </button>
            </div>
            {form.skills.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {form.skills.map((s) => (
                  <div key={s} className="tag-chip">
                    {s}
                    <button onClick={() => removeSkill(s)}>✕</button>
                  </div>
                ))}
              </div>
            )}
            <p className="mt-4 text-xs" style={{ color: "rgba(240,240,255,0.25)" }}>
              {form.skills.length}/15 skills added
            </p>
          </div>
        )}

        {/* STEP 1 — Interests */}
        {step === 1 && (
          <div>
            <h2 className="text-3xl font-bold mb-2" style={{ color: "#f0f0ff" }}>
              What genuinely excites you?
            </h2>
            <p className="mb-8" style={{ color: "rgba(240,240,255,0.45)" }}>
              Pick up to 6 interest areas. Honest answers = better matches.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {INTEREST_OPTIONS.map((opt) => (
                <div
                  key={opt}
                  className={`option-card text-sm font-medium ${form.interests.includes(opt) ? "selected" : ""}`}
                  onClick={() => toggleInterest(opt)}
                  style={{ color: form.interests.includes(opt) ? "#c4b5fd" : "rgba(240,240,255,0.65)" }}
                >
                  {opt}
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs" style={{ color: "rgba(240,240,255,0.25)" }}>
              {form.interests.length}/6 selected
            </p>
          </div>
        )}

        {/* STEP 2 — Time */}
        {step === 2 && (
          <div>
            <h2 className="text-3xl font-bold mb-2" style={{ color: "#f0f0ff" }}>
              How much time can you commit?
            </h2>
            <p className="mb-8" style={{ color: "rgba(240,240,255,0.45)" }}>
              Be honest — paths are matched to your real availability.
            </p>
            <div className="flex flex-col gap-3">
              {TIME_OPTIONS.map((opt) => (
                <div
                  key={opt.value}
                  className={`option-card ${form.timeAvailable === opt.value ? "selected" : ""}`}
                  onClick={() => setForm((f) => ({ ...f, timeAvailable: opt.value }))}
                >
                  <div className="font-semibold text-sm" style={{ color: form.timeAvailable === opt.value ? "#c4b5fd" : "#f0f0ff" }}>
                    {opt.label}
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: "rgba(240,240,255,0.4)" }}>
                    {opt.sub}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 3 — Risk */}
        {step === 3 && (
          <div>
            <h2 className="text-3xl font-bold mb-2" style={{ color: "#f0f0ff" }}>
              What&apos;s your risk appetite?
            </h2>
            <p className="mb-8" style={{ color: "rgba(240,240,255,0.45)" }}>
              This determines whether we suggest stable paths or high-upside bets.
            </p>
            <div className="flex flex-col gap-3">
              {RISK_OPTIONS.map((opt) => (
                <div
                  key={opt.value}
                  className={`option-card ${form.riskTolerance === opt.value ? "selected" : ""}`}
                  onClick={() => setForm((f) => ({ ...f, riskTolerance: opt.value }))}
                >
                  <div className="font-semibold text-sm" style={{ color: form.riskTolerance === opt.value ? "#c4b5fd" : "#f0f0ff" }}>
                    {opt.label}
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: "rgba(240,240,255,0.4)" }}>
                    {opt.sub}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 4 — Background */}
        {step === 4 && (
          <div>
            <h2 className="text-3xl font-bold mb-2" style={{ color: "#f0f0ff" }}>
              Anything else we should know?
            </h2>
            <p className="mb-8" style={{ color: "rgba(240,240,255,0.45)" }}>
              Optional — but the more context you give, the more tailored your results.
            </p>
            <textarea
              rows={5}
              value={form.background}
              onChange={(e) => setForm((f) => ({ ...f, background: e.target.value }))}
              placeholder="e.g. I'm a nurse with 8 years experience, looking for ways to earn on the side without leaving my job. I'm good with people and have always wanted to teach..."
            />
            <p className="mt-3 text-xs" style={{ color: "rgba(240,240,255,0.25)" }}>
              Your current job, experience, goals, constraints — anything relevant.
            </p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div
            className="mt-4 p-4 rounded-xl text-sm"
            style={{
              background: "rgba(248, 113, 113, 0.1)",
              border: "1px solid rgba(248, 113, 113, 0.2)",
              color: "#fca5a5",
            }}
          >
            {error}
          </div>
        )}
      </div>

      {/* Nav buttons */}
      <div className="px-6 py-8 max-w-2xl mx-auto w-full flex justify-between items-center">
        <button
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          className="text-sm px-5 py-3 rounded-full"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.08)",
            color: "rgba(240,240,255,0.4)",
            visibility: step === 0 ? "hidden" : "visible",
          }}
        >
          ← Back
        </button>

        {step < STEPS.length - 1 ? (
          <button
            onClick={() => setStep((s) => s + 1)}
            disabled={!canNext()}
            className="btn-primary text-white font-semibold px-8 py-3 rounded-full"
            style={{
              opacity: canNext() ? 1 : 0.35,
              cursor: canNext() ? "pointer" : "not-allowed",
            }}
          >
            Continue →
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="btn-primary text-white font-semibold px-8 py-3 rounded-full"
          >
            Find my paths →
          </button>
        )}
      </div>
    </div>
  );
}
