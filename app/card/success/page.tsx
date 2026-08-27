"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import MembershipCard from "@/components/MembershipCard";

function SuccessContent() {
  const params = useSearchParams();
  const name = params.get("name") || "Fan";
  const celeb = params.get("celeb") || "Celebrity";
  const code = params.get("code") || "FP-XXXX";
  const category = params.get("category") || "fan";

  return (
    <div className="mx-auto max-w-lg px-6 py-20 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
        Success
      </p>
      <h1 className="mt-3 font-display text-4xl text-cream">
        Your FamePass is ready
      </h1>
      <p className="mt-3 text-muted">
        Digital fan membership card for <span className="text-cream">{celeb}</span>.
      </p>

      <div className="mt-10 flex justify-center">
        <MembershipCard
          fanName={name}
          celebrityName={celeb}
          cardCode={code}
          category={category}
        />
      </div>

      <p className="mt-6 text-xs text-muted">
        Screenshot or save this page. Member ID:{" "}
        <span className="font-mono text-cream">{code}</span>
      </p>

      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <Link
          href="/celebrities"
          className="rounded-full gold-gradient px-6 py-3 text-xs font-semibold uppercase tracking-wider text-ink"
        >
          Get another card
        </Link>
        <Link
          href="/"
          className="rounded-full border border-white/15 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-cream"
        >
          Home
        </Link>
      </div>

      <p className="mt-12 text-[11px] leading-relaxed text-muted/70">
        Fan memorabilia only. Not affiliated with {celeb} unless marked Official
        or Verified.
      </p>
    </div>
  );
}

export default function CardSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="py-24 text-center text-muted">Loading your card…</div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
