// Server static minimal pentru testarea exportului (servește out/, cu 404.html ca pe GitHub Pages).
// Folosire: node scripts/serve.mjs [port] [prefix]   ex. node scripts/serve.mjs 4378 /service-auto-demo
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
const port = Number(process.argv[2] ?? 4378), prefix = process.argv[3] ?? "";
const root = path.resolve("out");
const types = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".webp": "image/webp", ".jpg": "image/jpeg", ".png": "image/png", ".svg": "image/svg+xml", ".xml": "application/xml", ".txt": "text/plain", ".woff2": "font/woff2", ".json": "application/json" };
http.createServer((req, res) => {
  let u = decodeURIComponent(new URL(req.url, "http://x").pathname);
  if (prefix && u.startsWith(prefix)) u = u.slice(prefix.length) || "/";
  let f = path.join(root, u);
  if (!f.startsWith(root)) { res.writeHead(403).end(); return; }
  if (fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f, "index.html");
  if (!fs.existsSync(f)) { res.writeHead(404, { "Content-Type": types[".html"] }); fs.createReadStream(path.join(root, "404.html")).pipe(res); return; }
  res.writeHead(200, { "Content-Type": types[path.extname(f)] ?? "application/octet-stream" });
  fs.createReadStream(f).pipe(res);
}).listen(port, () => console.log(`http://localhost:${port}${prefix}/`));
