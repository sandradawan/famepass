"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { getCelebrity } from "@/lib/celebrities";
import { saveCard } from "@/lib/cards-storage";
import { getCheckoutUrl, isPaidCheckoutEnabled, PAID_CARD } from "@/lib/pricing";
import MembershipCard from "@/components/MembershipCard";

export default function CelebrityProfilePage() {
  const params = useParams();
  const router = useRouter();
  const slug = String(params.slug || "");
  const celebrity = useMemo(() => getCelebrity(slug), [slug]);
  const paidEnabled = isPaidCheckoutEnabled();

  const [fanName, setFanName] = useState("");
  const [fanEmail, setFanEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!celebrity) {
    return (
      <div className="mx-auto max-w-lg px-6 py-24 text-center">
        <h1 className="font-display text-3xl text-cream">Celebrity not found</h1>
        <Link href="/celebrities" className="mt-6 inline-block text-gold hover:underline">
          ← Back to directory
        </Link>
      </div>
    );
  }

  async function issueFreeCard() {
    setError("");
    if (!fanName.trim() || !fanEmail.trim()) {
      setError("Please enter your name and email.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/card-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fanName: fanName.trim(),
          fanEmail: fanEmail.trim(),
          slug: celebrity!.slug,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || "Request failed");
      }

      const card = data.card;
      saveCard({
        fanName: card.fanName,
        fanEmail: card.fanEmail,
        celebrityName: card.celebrityName,
        celebritySlug: card.celebritySlug,
        category: card.category,
        cardCode: card.cardCode,
        createdAt: new Date().toISOString(),
      });

      const qs = new URLSearchParams({
        name: card.fanName,
        celeb: card.celebrityName,
        code: card.cardCode,
        category: card.category,
      });
      router.push(`/card/success?${qs.toString()}`);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setLoading(false);
    }
  }

  function goToPaidCheckout() {
    setError("");
    if (!fanName.trim() || !fanEmail.trim()) {
      setError("Enter your name and email before paying.");
      return;
    }

    // Remember intent so success return can still feel connected
    try {
      sessionStorage.setItem(
        "fp_pending",
        JSON.stringify({
          fanName: fanName.trim(),
          fanEmail: fanEmail.trim(),
          slug: celebrity!.slug,
          celebrityName: celebrity!.name,
          category: celebrity!.category,
        })
      );
    } catch {
      /* ignore */
    }

    const url = getCheckoutUrl({
      slug: celebrity!.slug,
      fanName: fanName.trim(),
      fanEmail: fanEmail.trim(),
    });

    if (!url) {
      setError("Paid checkout is not configured yet.");
      return;
    }

    window.location.href = url;
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <Link href="/celebrities" className="text-sm text-gold hover:underline">
        ← All celebrities
      </Link>

      <div className="mt-8 grid gap-12 lg:grid-cols-2">
        <div>
          <div className="overflow-hidden rounded-3xl border border-white/5 bg-surface">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={celebrity.imageUrl}
              alt={celebrity.name}
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
          <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-gold">
            {celebrity.category}
          </p>
          <h1 className="mt-2 font-display text-4xl text-cream md:text-5xl">
            {celebrity.name}
          </h1>
          <p className="mt-4 text-muted leading-relaxed">{celebrity.bio}</p>
          <p className="mt-6 text-xs text-muted/80">
            Fan memorabilia only. Not an official endorsement unless marked
            Verified.
          </p>
        </div>

        <div>
          <div className="rounded-3xl border border-white/10 bg-surface p-6 md:p-8">
            <h2 className="font-display text-2xl text-cream">
              Get your fan card
            </h2>
            <p className="mt-2 text-sm text-muted">
              Digital FamePass membership card for {celebrity.name}. US fans can
              pay in USD.
            </p>

            <div className="mt-8 space-y-4">
              <div>
                <label className="text-xs uppercase tracking-wider text-muted">
                  Your name
                </label>
                <input
                  value={fanName}
                  onChange={(e) => setFanName(e.target.value)}
                  placeholder="As it should appear on the card"
                  className="mt-2 w-full rounded-xl border border-white/10 bg-ink px-4 py-3 text-sm text-cream outline-none focus:border-gold/50"
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-wider text-muted">
                  Email
                </label>
                <input
                  type="email"
                  value={fanEmail}
                  onChange={(e) => setFanEmail(e.target.value)}
                  placeholder="you@email.com"
                  className="mt-2 w-full rounded-xl border border-white/10 bg-ink px-4 py-3 text-sm text-cream outline-none focus:border-gold/50"
                />
              </div>

              {error && <p className="text-sm text-red-400">{error}</p>}

              {paidEnabled && (
                <button
                  type="button"
                  onClick={goToPaidCheckout}
                  className="w-full rounded-full gold-gradient py-3.5 text-sm font-semibold uppercase tracking-wider text-ink"
                >
                  Pay ${PAID_CARD.priceUsd} USD — {PAID_CARD.label}
                </button>
              )}

              <button
                type="button"
                disabled={loading}
                onClick={issueFreeCard}
                className={`w-full rounded-full py-3.5 text-sm font-semibold uppercase tracking-wider transition disabled:opacity-60 ${
                  paidEnabled
                    ? "border border-white/15 text-cream hover:border-gold/40"
                    : "gold-gradient text-ink"
                }`}
              >
                {loading
                  ? "Creating card…"
                  : paidEnabled
                    ? "Get free basic card"
                    : "Request membership card"}
              </button>

              {paidEnabled && (
                <p className="text-center text-[11px] text-muted">
                  Secure USD checkout (Lemon Squeezy / Gumroad). Card issues after
                  payment confirmation.
                </p>
              )}

              {!paidEnabled && (
                <p className="text-center text-[11px] text-muted">
                  Paid USD checkout activates when you add NEXT_PUBLIC_CHECKOUT_URL
                  (Lemon Squeezy or Gumroad product link).
                </p>
              )}
            </div>

            <div className="mt-10 opacity-80">
              <p className="mb-3 text-center text-[10px] uppercase tracking-wider text-muted">
                Preview
              </p>
              <MembershipCard
                fanName={fanName || "Your Name"}
                celebrityName={celebrity.name}
                cardCode="FP-PREVIEW"
                category={celebrity.category}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
