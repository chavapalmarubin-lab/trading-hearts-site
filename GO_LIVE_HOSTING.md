# Trading Hearts — Self-Hosting the Public Site (independence from Rhodium)

Goal: reuse Rhodium's site, but **TH controls the deploy and the money**. The page is a single static
`index.html` (membership section embedded, Stripe runs on TH's account). Static hosting = trivial + free.

## The independence stack
| Layer | Who controls it now | Target |
|---|---|---|
| The HTML | TH (this folder) | TH ✅ |
| Money / checkout | TH Stripe (payment links) | TH ✅ |
| **Hosting / deploy** | Rhodium repo + Fernando merges | **TH self-host** ← this doc |
| **Domain / DNS** | ❓ (verify — likely Rhodium) | **TH must control** ← the real gate |

The hosting is easy. **The domain is the actual dependency.** See §4.

## 1. Recommended host — Cloudflare Pages (free, fast, TH-owned, great custom-domain support)
GitHub Pages is the zero-extra-account alternative (you already have GitHub); steps for it in §3b.

## 2. Put the site in a TH-owned GitHub repo
```bash
cd "<this folder>"            # th_public_site
git init && git add index.html GO_LIVE_HOSTING.md
git commit -m "TH public site — self-hosted, Stripe membership embedded"
# create a repo under your account/org (e.g. chavapalmarubin-lab/trading-hearts-site), then:
git branch -M main
git remote add origin https://github.com/<your-org>/trading-hearts-site.git
git push -u origin main        # uses your existing PAT
```
(Repo can be **public** — the page is public anyway. No secrets live in it; payment links are public by design.)

## 3a. Deploy via Cloudflare Pages
1. dash.cloudflare.com → **Workers & Pages** → **Create** → **Pages** → **Connect to Git** → pick the repo.
2. Framework preset: **None**. Build command: *(blank)*. Output dir: **/** (root). Deploy.
3. You get `trading-hearts-site.pages.dev` instantly. Every `git push` redeploys.

## 3b. Or GitHub Pages (no second account)
Repo → **Settings → Pages** → Source: **Deploy from a branch** → `main` / root → Save.
Live at `https://<org>.github.io/trading-hearts-site/`.

## 4. Custom domain — THE independence step
To serve the site at `tradinghearts.productions` (or your domain) on TH's host, you need **DNS control**:
- **If TH owns the domain registration:** in the host (Cloudflare Pages → Custom domains / GH Pages → custom domain), add the domain and update the DNS record (CNAME/A) at your registrar. Done — fully independent.
- **If Rhodium owns the domain/DNS:** this is the dependency to break. Either (a) have the domain **transferred to a TH-controlled registrar/Cloudflare account** (add to the Rhodium ownership ask — `TH_RHODIUM_OWNERSHIP_ASK.md`), or (b) launch on a **new TH-owned domain** and redirect later.
- Interim: you can run live on the free `*.pages.dev` / `*.github.io` URL with zero dependency while the domain is sorted.

## 5. Before it goes public — swap test → live Stripe
The embedded buttons currently point at **sandbox** payment links. At go-live:
1. Activate the live Stripe account; create the 3 products / 6 prices in **live** mode.
2. Create **live** payment links for each price.
3. Replace the six `https://buy.stripe.com/test_…` URLs in `index.html` (the `TH_PLANS` block in the membership `<script>`) with the live `https://buy.stripe.com/…` URLs.
4. Push → live. (I can do steps 1–3 once the live account is connected.)

## What I need from you to finish this
1. **Domain:** who controls `tradinghearts.productions` DNS today — TH or Rhodium? (Determines §4.)
2. **Repo:** confirm the GitHub org/name to use (e.g. `chavapalmarubin-lab/trading-hearts-site`) — I'll create + push it.
3. **Host:** Cloudflare Pages or GitHub Pages.

Once those are set, the only thing between staging and a live, TH-controlled public site is the test→live link swap.
