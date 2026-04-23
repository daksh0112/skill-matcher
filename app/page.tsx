import Link from "next/link";

const features = [
  {
    icon: "🎯",
    title: "Hyper-personalized",
    desc: "Not generic advice. Real paths based on your actual skills, time, and risk appetite.",
  },
  {
    icon: "⚡",
    title: "60-second assessment",
    desc: "No lengthy forms. Answer five quick questions and get your results instantly.",
  },
  {
    icon: "💰",
    title: "Realistic income ranges",
    desc: "Every path comes with honest income projections — no hype, no fantasy numbers.",
  },
  {
    icon: "🗺️",
    title: "First steps included",
    desc: "Each result includes concrete actions you can take this week to get started.",
  },
];

const testimonials = [
  {
    text: "I've been a nurse for 8 years and had no idea I could turn my knowledge into a $6k/month health coaching business. SkillMatch showed me exactly how.",
    name: "Sarah K.",
    role: "Nurse turned health coach",
  },
  {
    text: "I thought my only option was freelancing. Turns out my Excel skills + finance background = a SaaS product. I wouldn't have seen that without this tool.",
    name: "Marcus T.",
    role: "Finance analyst",
  },
  {
    text: "The first steps section is what makes this different. It's not vague — it tells you exactly what to do Monday morning.",
    name: "Priya M.",
    role: "Teacher & course creator",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen" style={{ background: "#0a0a0f" }}>
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-5 max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold"
            style={{ background: "linear-gradient(135deg, #7c3aed, #4f46e5)" }}
          >
            S
          </div>
          <span className="font-semibold text-base" style={{ color: "#f0f0ff" }}>
            SkillMatch <span style={{ color: "#a78bfa" }}>AI</span>
          </span>
        </div>
        <Link
          href="/assess"
          className="btn-primary text-white text-sm font-medium px-5 py-2.5 rounded-full"
        >
          Start Free →
        </Link>
      </nav>

      {/* Hero */}
      <section className="text-center px-6 pt-20 pb-24 max-w-4xl mx-auto fade-in-up">
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm mb-8"
          style={{
            background: "rgba(124, 58, 237, 0.12)",
            border: "1px solid rgba(124, 58, 237, 0.25)",
            color: "#c4b5fd",
          }}
        >
          <span>✦</span>
          <span>AI-powered. Free. No signup needed.</span>
        </div>

        <h1
          className="text-5xl sm:text-6xl font-bold leading-tight mb-6"
          style={{ color: "#f0f0ff" }}
        >
          Discover the income paths{" "}
          <span className="gradient-text">hidden in your skills</span>
        </h1>

        <p
          className="text-xl leading-relaxed mb-10 max-w-2xl mx-auto"
          style={{ color: "rgba(240, 240, 255, 0.55)" }}
        >
          Tell us what you know and what you love. Our AI finds realistic ways to
          turn that into income — businesses, freelance paths, or products you can
          actually start.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/assess"
            className="btn-primary text-white font-semibold px-8 py-4 rounded-full text-lg w-full sm:w-auto"
          >
            Find my income paths →
          </Link>
          <p style={{ color: "rgba(240, 240, 255, 0.35)", fontSize: "14px" }}>
            Takes 60 seconds · No account needed
          </p>
        </div>

        {/* Social proof numbers */}
        <div
          className="flex items-center justify-center gap-8 mt-14 pt-10"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          {[
            { num: "50+", label: "Income paths mapped" },
            { num: "60s", label: "Average completion time" },
            { num: "Free", label: "Forever, no catch" },
          ].map((item) => (
            <div key={item.label} className="text-center">
              <div
                className="text-2xl font-bold"
                style={{ color: "#a78bfa" }}
              >
                {item.num}
              </div>
              <div
                className="text-sm mt-1"
                style={{ color: "rgba(240,240,255,0.4)" }}
              >
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-20 max-w-6xl mx-auto">
        <h2
          className="text-3xl font-bold text-center mb-14"
          style={{ color: "#f0f0ff" }}
        >
          Why SkillMatch is different
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f) => (
            <div key={f.title} className="glass rounded-2xl p-6">
              <div className="text-3xl mb-4">{f.icon}</div>
              <h3
                className="font-semibold text-base mb-2"
                style={{ color: "#f0f0ff" }}
              >
                {f.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "rgba(240,240,255,0.5)" }}
              >
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section
        className="px-6 py-20"
        style={{ background: "rgba(255,255,255,0.02)" }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className="text-3xl font-bold mb-14"
            style={{ color: "#f0f0ff" }}
          >
            How it works
          </h2>
          <div className="flex flex-col gap-8">
            {[
              {
                step: "01",
                title: "Enter your skills & interests",
                desc: "Tell us what you're good at and what excites you — no resume formatting needed.",
              },
              {
                step: "02",
                title: "Set your constraints",
                desc: "How much time do you have? What's your risk tolerance? We factor in reality.",
              },
              {
                step: "03",
                title: "Get ranked income paths",
                desc: "AI analyzes your profile and surfaces 3–5 paths sorted by fit, with income ranges and exact first steps.",
              },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-6 text-left">
                <div
                  className="text-2xl font-bold shrink-0 w-12 text-right"
                  style={{ color: "rgba(124, 58, 237, 0.6)" }}
                >
                  {item.step}
                </div>
                <div>
                  <h3
                    className="font-semibold text-lg mb-1"
                    style={{ color: "#f0f0ff" }}
                  >
                    {item.title}
                  </h3>
                  <p style={{ color: "rgba(240,240,255,0.5)" }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-6 py-20 max-w-6xl mx-auto">
        <h2
          className="text-3xl font-bold text-center mb-14"
          style={{ color: "#f0f0ff" }}
        >
          Real people, real paths found
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="glass rounded-2xl p-6">
              <p
                className="text-sm leading-relaxed mb-5"
                style={{ color: "rgba(240,240,255,0.65)" }}
              >
                &ldquo;{t.text}&rdquo;
              </p>
              <div>
                <div
                  className="font-semibold text-sm"
                  style={{ color: "#f0f0ff" }}
                >
                  {t.name}
                </div>
                <div
                  className="text-xs mt-0.5"
                  style={{ color: "rgba(240,240,255,0.4)" }}
                >
                  {t.role}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-24 text-center">
        <div
          className="max-w-2xl mx-auto rounded-3xl p-12"
          style={{
            background:
              "linear-gradient(135deg, rgba(124,58,237,0.15), rgba(79,70,229,0.1))",
            border: "1px solid rgba(124,58,237,0.2)",
          }}
        >
          <h2
            className="text-4xl font-bold mb-4"
            style={{ color: "#f0f0ff" }}
          >
            Your next income path is waiting
          </h2>
          <p
            className="mb-8 text-lg"
            style={{ color: "rgba(240,240,255,0.5)" }}
          >
            Stop wondering. Start knowing. It takes 60 seconds.
          </p>
          <Link
            href="/assess"
            className="btn-primary inline-block text-white font-semibold px-10 py-4 rounded-full text-lg"
          >
            Find my paths — it&apos;s free →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="text-center py-8 text-sm"
        style={{
          color: "rgba(240,240,255,0.25)",
          borderTop: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        Built with Claude AI · SkillMatch {new Date().getFullYear()}
      </footer>
    </div>
  );
}
