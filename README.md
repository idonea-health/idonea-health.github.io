# idonea-health.github.io

Idonea's public website. **Made-up patients only. No real patient data ever goes in this repo.**

| Path | What it is |
| - | - |
| `index.html` | The home page: what Idonea is, how it works, the rules it holds to, where things stand. Edited here. |
| `demo/index.html` | The coordinator demo on 50 made-up patients. Built in the private repo idonea-health/idonea-mvp (`cd ui/app && node build.mjs` writes `site/index.html`) and copied here. |
| `jwks.json` | Idonea's public signing key, registered with ModMed for Bulk FHIR. Never edit by hand. |
| `privacy.html`, `terms.html`, `logo.png` | Linked from the ModMed app listing. |
| `fonts/`, `img/` | Self-hosted fonts (SIL Open Font License) and the demo screenshot. |

Every push to `main` publishes the site through `.github/workflows/pages.yml`, which first refuses to publish if
any sponsor or protocol name appears. Search engines are asked not to index it (`robots.txt` and a `noindex` tag).
Anyone with the link can open it.
