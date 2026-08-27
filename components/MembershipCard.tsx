import React from "react";

type Props = {
  fanName: string;
  celebrityName: string;
  cardCode: string;
  category?: string;
};

export default function MembershipCard({
  fanName,
  celebrityName,
  cardCode,
  category = "fan",
}: Props) {
  return (
    <div className="card-foil relative aspect-[1.6/1] w-full max-w-md overflow-hidden rounded-2xl border border-gold/30 p-6 shadow-2xl shadow-black/50">
      <div className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-gold/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-10 left-10 h-32 w-32 rounded-full bg-gold-light/10 blur-3xl" />

      <div className="relative flex h-full flex-col justify-between">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gold-light">
              FamePass
            </p>
            <p className="mt-1 font-display text-2xl text-cream">Member</p>
          </div>
          <div className="rounded-full border border-gold/40 px-3 py-1 text-[10px] uppercase tracking-wider text-gold">
            {category}
          </div>
        </div>

        <div>
          <p className="text-[10px] uppercase tracking-wider text-muted">Fan</p>
          <p className="font-display text-2xl text-cream capitalize">{fanName}</p>
          <p className="mt-3 text-[10px] uppercase tracking-wider text-muted">
            Celebrity
          </p>
          <p className="text-lg text-gold-light">{celebrityName}</p>
        </div>

        <div className="flex items-end justify-between border-t border-white/10 pt-4">
          <div>
            <p className="text-[9px] uppercase tracking-wider text-muted">
              Member ID
            </p>
            <p className="font-mono text-sm text-cream">{cardCode}</p>
          </div>
          <p className="text-[9px] text-muted">Digital · Non-transferable</p>
        </div>
      </div>
    </div>
  );
}
