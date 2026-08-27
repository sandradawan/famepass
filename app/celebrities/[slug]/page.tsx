"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { getCelebrity, generateCardCode } from "@/lib/celebrities";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import MembershipCard from "@/components/MembershipCard";

export default function CelebrityProfilePage() {
  const params = useParams();
  const router = useRouter();
  const slug = String(params.slug || "");
  const celebrity = useMemo(() => getCelebrity(slug), [slug]);

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

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!fanName.trim() || !fanEmail.trim()) {
      setError("Please enter your name and email.");
      return;
    }

    setLoading(true);
    const code = generateCardCode(celebrity!.slug);

    try {
      if (isSupabaseConfigured()) {
        const supabase = createClient();
        if (supabase) {
          await supabase.from("card_requests").insert({
            celebrity_id: celebrity!.id,
            fan_name: fanName.trim(),
            fan_email: fanEmail.trim().toLowerCase(),
            card_code: code,
            status: "issued",
          });
        }
      }

      const qs = new URLSearchParams({
        name: fanName.trim(),
        celeb: celebrity!.name,
        code,
        category: celebrity!.category,
      });
      router.push(`/card/success?${qs.toString()}`);
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
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
              Free digital FamePass membership card for {celebrity.name}.
            </p>

            <form onSubmit={onSubmit} className="mt-8 space-y-4">
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

              {error && (
                <p className="text-sm text-red-400">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-full gold-gradient py-3.5 text-sm font-semibold uppercase tracking-wider text-ink disabled:opacity-60"
              >
                {loading ? "Creating card…" : "Request membership card"}
              </button>
            </form>

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
