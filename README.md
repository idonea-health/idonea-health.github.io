# idonea-health.github.io

Kylo's public website, live at **https://kylohealth.ai** (the company is Kylo Health; the GitHub org and repo still carry the old name, Idonea). **Made-up patients only. No real patient data ever goes in this repo.**

| Path | What it is |
| - | - |
| `index.html` | The home page: what Kylo is, how it works, the rules it holds to, where things stand. Edited here. |
| `demo/index.html` | The coordinator demo on 50 made-up patients. Built in the private repo idonea-health/idonea-mvp (`cd ui/app && node build.mjs` writes `site/index.html`) and copied here. |
| `jwks.json` | Kylo's public signing key, registered with ModMed for Bulk FHIR. Never edit by hand. |
| `privacy.html`, `terms.html`, `logo.png` | Linked from the ModMed app listing. |
| `fonts/`, `img/` | Self-hosted fonts (SIL Open Font License) and the demo screenshot. |

Every push to `main` publishes the site through `.github/workflows/pages.yml`, which first refuses to publish if
any sponsor or protocol name appears. Search engines are asked not to index it (`robots.txt` and a `noindex` tag).
Anyone with the link can open it.

## kylohealth.ai

The domain is on Cloudflare. A Cloudflare Worker (`cloudflare/worker.js`, Worker name `kylohealth-site`) serves
kylohealth.ai by passing requests through to this Pages site; www.kylohealth.ai redirects to kylohealth.ai. This repo
deliberately has **no** Pages custom domain: setting one would redirect https://idonea-health.github.io/jwks.json, the
address ModMed checks Kylo's sign-in against. Order for retiring the old address:

1. In ModMed's vendor dashboard, change the app's key set URL to `https://kylohealth.ai/jwks.json`.
2. Run `python3 -m idonea.connectors.diagnose gci` and check sign-in still works; then change `PUBLISHED_JWKS` in
   idonea-mvp to the new address.
3. Only then rename the GitHub org, and change `ORIGIN` in the Worker to the new github.io address.
