export const metadata = { title: "Privacy" };

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="font-display text-4xl text-cream">Privacy</h1>
      <div className="mt-8 space-y-4 text-sm leading-relaxed text-muted">
        <p>
          When you request a FamePass card, we collect your name and email to
          issue the card and (optionally) store the request in our database.
        </p>
        <p>
          Cards saved in "My Cards" are stored in your browser (localStorage) on
          this device unless you connect an account in a future version.
        </p>
        <p>
          We do not sell your personal information. Payment processors (if added)
          will process payment data under their own policies.
        </p>
        <p>
          Contact: use the project owner email associated with this deployment.
        </p>
      </div>
    </div>
  );
}
