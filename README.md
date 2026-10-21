# idonea-health.github.io

Public demo site for Idonea. **Synthetic patients only. No real patient data ever goes in this repo.**

`index.html` is built in the private repo idonea-health/idonea-mvp (`ui/app`, `npm run build` writes
`site/index.html`) and copied here. Every push to `main` publishes it to https://idonea-health.github.io/
through `.github/workflows/pages.yml`. Search engines are asked not to index it (`robots.txt` and a
`noindex` tag). Anyone with the link can open it.
