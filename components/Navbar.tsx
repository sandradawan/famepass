"use client";

import Link from "next/link";
import { useState } from "react";
import Logo from "./Logo";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-ink/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-muted md:flex">
          <Link href="/celebrities" className="hover:text-cream transition">
            Celebrities
          </Link>
          <Link href="/#how" className="hover:text-cream transition">
            How it works
          </Link>
          <Link href="/#faq" className="hover:text-cream transition">
            FAQ
          </Link>
          <Link
            href="/celebrities"
            className="rounded-full gold-gradient px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-ink shadow-lg shadow-gold/20"
          >
            Get a card
          </Link>
        </nav>

        <button
          type="button"
          className="md:hidden text-cream"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-white/5 bg-ink px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4 text-sm">
            <Link href="/celebrities" onClick={() => setOpen(false)}>
              Celebrities
            </Link>
            <Link href="/#how" onClick={() => setOpen(false)}>
              How it works
            </Link>
            <Link href="/#faq" onClick={() => setOpen(false)}>
              FAQ
            </Link>
            <Link
              href="/celebrities"
              onClick={() => setOpen(false)}
              className="rounded-full gold-gradient px-5 py-3 text-center text-xs font-semibold uppercase tracking-wider text-ink"
            >
              Get a card
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
