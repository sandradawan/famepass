/** USD pricing for US fans — paid via Lemon Squeezy or Gumroad */
export const PAID_CARD = {
  priceUsd: 7.99,
  label: "Premium Fan Card",
  description:
    "Digital FamePass membership card with unique member ID. Instant issue after payment.",
} as const;

/**
 * Set one of these in Vercel / .env.local after you create the product:
 * - NEXT_PUBLIC_CHECKOUT_URL = full Lemon Squeezy or Gumroad checkout/product link
 * Optional: append ?checkout[custom][slug]=... on LS if you configure custom fields
 */
export function getCheckoutUrl(opts: {
  slug: string;
  fanName?: string;
  fanEmail?: string;
}): string | null {
  const base = process.env.NEXT_PUBLIC_CHECKOUT_URL?.trim();
  if (!base) return null;

  try {
    const url = new URL(base);
    // Helpful metadata for you when matching orders manually
    url.searchParams.set("fp_slug", opts.slug);
    if (opts.fanName) url.searchParams.set("fp_name", opts.fanName);
    if (opts.fanEmail) url.searchParams.set("fp_email", opts.fanEmail);
    return url.toString();
  } catch {
    return base;
  }
}

export function isPaidCheckoutEnabled() {
  return Boolean(process.env.NEXT_PUBLIC_CHECKOUT_URL?.trim());
}
