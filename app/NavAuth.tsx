"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

export default function NavAuth() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div className="w-24 h-9 skeleton rounded-full" />;
  }

  if (session) {
    return (
      <div className="flex items-center gap-3">
        <Link
          href="/assess"
          className="btn-primary text-white text-sm font-medium px-5 py-2.5 rounded-full"
        >
          New analysis →
        </Link>
        <button
          onClick={() => signOut()}
          className="text-sm"
          style={{ color: "rgba(240,240,255,0.35)" }}
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => signIn("google", { callbackUrl: "/assess" })}
      className="btn-primary text-white text-sm font-medium px-5 py-2.5 rounded-full"
    >
      Start Free →
    </button>
  );
}
