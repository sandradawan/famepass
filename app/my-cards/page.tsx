"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import MembershipCard from "@/components/MembershipCard";
import { loadCards, type SavedCard } from "@/lib/cards-storage";

export default function MyCardsPage() {
  const [cards, setCards] = useState<SavedCard[]>([]);

  useEffect(() => {
    setCards(loadCards());
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <p className="text-xs font-semibold uppercase tracking-wider text-gold">
        Wallet
      </p>
      <h1 className="mt-2 font-display text-4xl text-cream">My FamePass cards</h1>
      <p className="mt-3 text-muted">
        Cards issued on this device are saved in your browser.
      </p>

      {cards.length === 0 ? (
        <div className="mt-16 rounded-2xl border border-dashed border-white/15 bg-surface p-12 text-center">
          <p className="text-muted">You have no cards yet.</p>
          <Link
            href="/celebrities"
            className="mt-6 inline-flex rounded-full gold-gradient px-6 py-3 text-xs font-semibold uppercase tracking-wider text-ink"
          >
            Browse celebrities
          </Link>
        </div>
      ) : (
        <div className="mt-12 grid gap-8 sm:grid-cols-2">
          {cards.map((c) => (
            <div key={c.cardCode}>
              <MembershipCard
                fanName={c.fanName}
                celebrityName={c.celebrityName}
                cardCode={c.cardCode}
                category={c.category}
              />
              <p className="mt-2 text-center text-[11px] text-muted">
                {new Date(c.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
