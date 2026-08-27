export const metadata = { title: "Terms" };

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="font-display text-4xl text-cream">Terms of use</h1>
      <div className="mt-8 space-y-4 text-sm leading-relaxed text-muted">
        <p>
          FamePass provides digital fan membership cards as memorabilia for
          entertainment purposes.
        </p>
        <p>
          Cards are not official products of the listed celebrities unless a
          profile is explicitly marked Official or Verified. FamePass does not
          grant access to private social accounts, messaging, or contact with any
          celebrity.
        </p>
        <p>
          You agree not to misuse the service for impersonation, fraud, or
          harassment. We may refuse or revoke cards that violate these terms.
        </p>
        <p>
          The service is provided as-is. We may update these terms as the product
          evolves.
        </p>
      </div>
    </div>
  );
}
