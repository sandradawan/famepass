# FamePass — USD checkout (US fans)

Fans pay in **US dollars**. You are in Nigeria, so we use a **Merchant of Record** instead of Stripe.

Recommended: **Lemon Squeezy** (clean USD, handles tax, payouts).  
Alternative: **Gumroad**.

---

## 1. Lemon Squeezy (recommended)

1. Create account: https://lemonsqueezy.com  
2. Complete store setup and payout details (they support many countries for creators — verify your payout method during onboarding).
3. **Products → New product**
   - Name: `FamePass Premium Fan Card`
   - Price: **$7.99 USD** (or your price)
   - Type: digital / something that does not need shipping
4. Copy the **checkout / buy link** for that product (or variant).
5. In Vercel (or `.env.local`):

```env
NEXT_PUBLIC_CHECKOUT_URL=https://YOURSTORE.lemonsqueezy.com/checkout/buy/xxxxxxxx
NEXT_PUBLIC_SITE_URL=https://your-famepass-domain.com
```

6. In Lemon Squeezy product settings, set **Thank you / confirmation redirect** (if available) to:

```text
https://your-famepass-domain.com/card/paid-success
```

7. Deploy. The profile page will show **Pay $7.99 USD**.

### After payment
- Fan returns to `/card/paid-success` (or you issue from email + My Cards flow).
- For full automation later: add a Lemon Squeezy **webhook** → `POST /api/webhooks/lemon-squeezy` to auto-issue cards from `order_created`.

---

## 2. Gumroad

1. Create account: https://gumroad.com  
2. New product → price **$7.99** → publish  
3. Copy the product URL  
4. Set:

```env
NEXT_PUBLIC_CHECKOUT_URL=https://yourname.gumroad.com/l/famepass
```

5. Use Gumroad’s “ping” / webhook or manual fulfillment until webhooks are wired.

---

## 3. How FamePass uses the link

- Button **Pay $X USD** opens `NEXT_PUBLIC_CHECKOUT_URL` and appends `fp_slug`, `fp_name`, `fp_email` as query params (for your records).
- Free basic card still works without checkout.
- Until the env var is set, only the free path is primary.

---

## 4. Payouts from Nigeria

- Lemon Squeezy / Gumroad pay **you** according to **their** payout rules (bank, PayPal, etc.).
- Confirm during signup that your country and payout method are supported.
- You never need a Nigerian Stripe merchant account for this path.

---

## 5. Suggested pricing

| Tier | Price | Notes |
|------|-------|--------|
| Free basic | $0 | Growth / viral |
| Premium | $7.99 | Default in code (`lib/pricing.ts`) |
| Bundle (later) | $14.99 | Multi-celeb pack |
