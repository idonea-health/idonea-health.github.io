// Cloudflare Worker "kylohealth-site" (account of Nilesh, zone kylohealth.ai). Serves https://kylohealth.ai by
// passing each request through to this repo's GitHub Pages site, so the old address keeps serving jwks.json
// unchanged for ModMed while the new domain is live. www and any other host redirect to https://kylohealth.ai.
// /.well-known/jwks.json is the same key set as /jwks.json. Deployed by pasting this file into the Worker editor;
// keep the two in step. When the GitHub org is renamed, change ORIGIN (after ModMed points at kylohealth.ai).
const ORIGIN = "https://idonea-health.github.io";

export default {
  async fetch(request) {
    const url = new URL(request.url);
    if (url.hostname !== "kylohealth.ai") {
      url.hostname = "kylohealth.ai"; url.protocol = "https:"; url.port = "";
      return Response.redirect(url.toString(), 301);
    }
    let path = url.pathname;
    if (path === "/.well-known/jwks.json") path = "/jwks.json";
    const upstream = await fetch(ORIGIN + path + url.search, { method: request.method === "HEAD" ? "HEAD" : "GET", redirect: "manual" });
    const headers = new Headers(upstream.headers);
    const loc = headers.get("location");
    if (loc) headers.set("location", loc.replace(/^https?:\/\/idonea-health\.github\.io/, "https://kylohealth.ai"));
    headers.delete("x-github-request-id"); headers.delete("x-origin-cache"); headers.delete("x-proxy-cache");
    headers.set("strict-transport-security", "max-age=31536000");
    headers.set("x-content-type-options", "nosniff");
    if (path === "/jwks.json") headers.set("access-control-allow-origin", "*");
    return new Response(upstream.body, { status: upstream.status, headers });
  },
};
