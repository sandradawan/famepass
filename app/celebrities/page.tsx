"use client";

import { useMemo, useState } from "react";
import CelebrityCard from "@/components/CelebrityCard";
import { filterCelebrities } from "@/lib/celebrities";

const categories = [
  { id: "all", label: "All" },
  { id: "music", label: "Music" },
  { id: "film", label: "Film" },
  { id: "sports", label: "Sports" },
  { id: "tv", label: "TV" },
  { id: "creator", label: "Creator" },
];

export default function CelebritiesPage() {
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("all");

  const list = useMemo(
    () => filterCelebrities({ q, category }),
    [q, category]
  );

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <p className="text-xs font-semibold uppercase tracking-wider text-gold">
        Directory
      </p>
      <h1 className="mt-2 font-display text-4xl text-cream md:text-5xl">
        American celebrities
      </h1>
      <p className="mt-3 max-w-xl text-muted">
        Find a star and request your digital FamePass fan membership card.
      </p>

      <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search by name…"
          className="w-full rounded-xl border border-white/10 bg-surface px-4 py-3 text-sm text-cream outline-none focus:border-gold/50 sm:max-w-sm"
        />
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setCategory(c.id)}
              className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider transition ${
                category === c.id
                  ? "gold-gradient text-ink"
                  : "border border-white/10 text-muted hover:text-cream"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((c) => (
          <CelebrityCard key={c.id} celebrity={c} />
        ))}
      </div>

      {list.length === 0 && (
        <p className="mt-16 text-center text-muted">No celebrities match your search.</p>
      )}
    </div>
  );
}
