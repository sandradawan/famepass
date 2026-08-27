import Link from "next/link";
import type { Celebrity } from "@/lib/celebrities";

export default function CelebrityCard({ celebrity }: { celebrity: Celebrity }) {
  return (
    <Link
      href={`/celebrities/${celebrity.slug}`}
      className="group overflow-hidden rounded-2xl border border-white/5 bg-surface transition hover:border-gold/40"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-surface-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={celebrity.imageUrl}
          alt={celebrity.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
        <span className="absolute left-3 top-3 rounded-full border border-white/10 bg-black/50 px-2.5 py-1 text-[10px] uppercase tracking-wider text-cream backdrop-blur">
          {celebrity.category}
        </span>
      </div>
      <div className="p-4">
        <h3 className="font-display text-xl text-cream group-hover:text-gold-light transition">
          {celebrity.name}
        </h3>
        <p className="mt-1 line-clamp-2 text-sm text-muted">{celebrity.bio}</p>
        <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-gold">
          Get fan card →
        </p>
      </div>
    </Link>
  );
}
