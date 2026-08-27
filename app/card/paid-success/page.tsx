"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import MembershipCard from "@/components/MembershipCard";
import { saveCard } from "@/lib/cards-storage";
import { generateCardCode } from "@/lib/celebrities";

type Pending = {
  fanName: string;
  fanEmail: string;
  slug: string;
  celebrityName: string;
  category: string;
};

function PaidSuccessInner() {
  const [card, setCard] = useState<{
    fanName: string;
    celebrityName: string;
    cardCode: string;
    category: string;
  } | null>(null);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("fp_pending");
      if (!raw) {
        setMissing(true);
        return;
      }
      const pending = JSON.parse(raw) as Pending;
      const code = generateCardCode(pending.slug);
      saveCard({
        fanName: pending.fanName,
        fanEmail: pending.fanEmail,
        celebrityName: pending.celebrityName,
        celebritySlug: pending.slug,
        category: pending.category,
        cardCode: code,
        createdAt: new Date().toISOString(),
      });
      sessionStorage.removeItem("fp_pending");
      setCard({
        fanName: pending.fanName,
        celebrityName: pending.celebrityName,
        cardCode: code,
        category: pending.category,
      });

      // Best-effort server log / Supabase
      fetch("/api/card-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fanName: pending.fanName,
          fanEmail: pending.fanEmail,
          slug: pending.slug,
        }),
      }).catch(() => {});
    } catch {
      setMissing(true);
    }
  }, []);

  if (missing) {
    return (
      <div className="mx-auto max-w-lg px-6 py-20 text-center">
        <h1 className="font-display text-3xl text-cream">Thanks for your support</h1>
        <p className="mt-3 text-muted">
          We could not recover the card details on this device. Email us your
          payment receipt and we will issue your FamePass manually.
        </p>
        <Link href="/celebrities" className="mt-8 inline-block text-gold hover:underline">
          Browse celebrities →
        </Link>
      </div>
    );
  }

  if (!card) {
    return (
      <div className="py-24 text-center text-muted">Issuing your premium card…</div>
    );
  }

  return (
    <div className="mx-auto max-w-lg px-6 py-20 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
        Payment received
      </p>
      <h1 className="mt-3 font-display text-4xl text-cream">Premium FamePass</h1>
      <p className="mt-3 text-muted">
        Your paid fan card for{" "}
        <span className="text-cream">{card.celebrityName}</span> is ready.
      </p>

      <div className="mt-10 flex justify-center">
        <MembershipCard
          fanName={card.fanName}
          celebrityName={card.celebrityName}
          cardCode={card.cardCode}
          category={card.category}
        />
      </div>

      <p className="mt-6 text-xs text-muted">
        Saved under <Link href="/my-cards" className="text-gold hover:underline">My Cards</Link>
      </p>

      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <Link
          href="/my-cards"
          className="rounded-full gold-gradient px-6 py-3 text-xs font-semibold uppercase tracking-wider text-ink"
        >
          View wallet
        </Link>
        <Link
          href="/celebrities"
          className="rounded-full border border-white/15 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-cream"
        >
          Get another
        </Link>
      </div>
    </div>
  );
}

export default function PaidSuccessPage() {
  return (
    <Suspense fallback={<div className="py-24 text-center text-muted">Loading…</div>}>
      <PaidSuccessInner />
    </Suspense>
  );
}
