// Local preview of the static export WITH the production headers from vercel.json.
// Usage: npm run build && npm run preview  → http://localhost:4173
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join } from "node:path";
import { gzipSync } from "node:zlib";

const root = join(import.meta.dirname, "..", "out");
const vercel = JSON.parse(await readFile(join(import.meta.dirname, "..", "vercel.json"), "utf8"));
const types = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml", ".png": "image/png", ".txt": "text/plain", ".xml": "application/xml", ".webmanifest": "application/manifest+json", ".woff2": "font/woff2", ".json": "application/json" };

const headersFor = (path) => {
  const out = {};
  for (const rule of vercel.headers) {
    const re = new RegExp("^" + rule.source.replace("(.*)", ".*") + "$");
    if (re.test(path)) for (const h of rule.headers) out[h.key] = h.value;
  }
  delete out["Strict-Transport-Security"];
  out["Content-Security-Policy"] = out["Content-Security-Policy"]?.replace("; upgrade-insecure-requests", "");
  return out;
};

async function resolve(path) {
  for (const p of [path, path + ".html", join(path, "index.html")]) {
    try {
      if ((await stat(join(root, p))).isFile()) return p;
    } catch {}
  }
  return null;
}

createServer(async (req, res) => {
  const url = decodeURIComponent(new URL(req.url, "http://x").pathname);
  const file = await resolve(url);
  const status = file ? 200 : 404;
  const served = file ?? "404.html";
  const type = types[extname(served)] ?? "application/octet-stream";
  let body = await readFile(join(root, served));
  const extra = {};
  // Compress text like Vercel does, so local Lighthouse numbers are comparable.
  if (/text|javascript|json|xml|svg/.test(type) && /gzip/.test(req.headers["accept-encoding"] ?? "")) {
    body = gzipSync(body);
    extra["Content-Encoding"] = "gzip";
  }
  res.writeHead(status, { "Content-Type": type, ...extra, ...headersFor(url) });
  res.end(body);
}).listen(4173, () => console.log("Serving out/ with vercel.json headers on http://localhost:4173"));
