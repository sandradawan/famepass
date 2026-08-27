import Link from "next/link";
import CelebrityCard from "@/components/CelebrityCard";
import { getFeatured } from "@/lib/celebrities";

export default function HomePage() {
  const featured = getFeatured().slice(0, 6);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/5">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-gold/10 blur-[120px]" />
        </div>
        <div className="relative mx-auto max-w-6xl px-6 pb-24 pt-20 text-center md:pt-28">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
            Fan membership cards
          </p>
          <h1 className="mx-auto mt-5 max-w-3xl font-display text-5xl leading-tight text-cream md:text-7xl">
            Your pass to the{" "}
            <span className="bg-gradient-to-r from-gold-light to-gold bg-clip-text text-transparent">
              stars
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted">
            Browse American celebrities and request a premium digital fan
            membership card — personalized with your name and a unique member
            ID.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/celebrities"
              className="rounded-full gold-gradient px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-ink shadow-lg shadow-gold/25"
            >
              Browse celebrities
            </Link>
            <a
              href="#how"
              className="rounded-full border border-white/15 px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-cream hover:border-gold/50 transition"
            >
              How it works
            </a>
          </div>
          <p className="mt-8 text-xs text-muted/80">
            Fan memorabilia · Not an official endorsement unless marked Verified
          </p>
        </div>
      </section>

      {/* Featured */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gold">
              Featured
            </p>
            <h2 className="mt-2 font-display text-3xl text-cream md:text-4xl">
              Stars fans love
            </h2>
          </div>
          <Link
            href="/celebrities"
            className="text-sm text-gold hover:underline shrink-0"
          >
            View all →
          </Link>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((c) => (
            <CelebrityCard key={c.id} celebrity={c} />
          ))}
        </div>
      </section>

      {/* How */}
      <section id="how" className="border-y border-white/5 bg-surface">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <p className="text-xs font-semibold uppercase tracking-wider text-gold">
            Simple
          </p>
          <h2 className="mt-2 font-display text-3xl text-cream md:text-4xl">
            How FamePass works
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Choose a star",
                body: "Browse music, film, sports, and TV icons from the American scene.",
              },
              {
                step: "02",
                title: "Request your card",
                body: "Enter your name and email. We generate a unique member ID instantly.",
              },
              {
                step: "03",
                title: "Download & share",
                body: "Get a digital fan membership card you can save and show off.",
              },
            ].map((s) => (
              <div
                key={s.step}
                className="rounded-2xl border border-white/5 bg-ink/50 p-6"
              >
                <p className="font-mono text-sm text-gold">{s.step}</p>
                <h3 className="mt-3 font-display text-2xl text-cream">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-3xl px-6 py-20">
        <p className="text-xs font-semibold uppercase tracking-wider text-gold">
          FAQ
        </p>
        <h2 className="mt-2 font-display text-3xl text-cream">Common questions</h2>
        <div className="mt-10 space-y-6">
          {[
            {
              q: "Is this an official celebrity product?",
              a: "FamePass cards are fan memorabilia. They are not affiliated with or endorsed by the listed celebrities unless a profile is explicitly marked Official or Verified.",
            },
            {
              q: "Is the card free?",
              a: "The current MVP issues free digital cards. Paid tiers or physical prints can be added later.",
            },
            {
              q: "Do I get access to the celebrity’s social accounts?",
              a: "No. FamePass only provides a digital fan membership card — not private messages, calls, or account access.",
            },
          ].map((item) => (
            <div
              key={item.q}
              className="rounded-2xl border border-white/5 bg-surface p-5"
            >
              <p className="font-medium text-cream">{item.q}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-white/5 pb-24">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <h2 className="font-display text-3xl text-cream md:text-4xl">
            Ready for your pass?
          </h2>
          <p className="mt-3 text-muted">
            Pick a celebrity and get your digital fan card in seconds.
          </p>
          <Link
            href="/celebrities"
            className="mt-8 inline-flex rounded-full gold-gradient px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-ink"
          >
            Get started
          </Link>
        </div>
      </section>
    </>
  );
}
