import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 bg-surface">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              Premium digital fan membership cards. Memorabilia for fans of
              American music, film, sports, and culture.
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gold">
              Explore
            </p>
            <div className="mt-4 flex flex-col gap-2 text-sm text-muted">
              <Link href="/celebrities" className="hover:text-cream">
                All celebrities
              </Link>
              <Link href="/my-cards" className="hover:text-cream">
                My Cards
              </Link>
              <Link href="/#how" className="hover:text-cream">
                How it works
              </Link>
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gold">
              Legal
            </p>
            <div className="mt-4 flex flex-col gap-2 text-sm text-muted">
              <Link href="/terms" className="hover:text-cream">
                Terms
              </Link>
              <Link href="/privacy" className="hover:text-cream">
                Privacy
              </Link>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Fan memorabilia only. Not an official endorsement unless marked
              Official or Verified.
            </p>
          </div>
        </div>
        <p className="mt-12 text-xs text-muted/70">
          © {year} FamePass. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
