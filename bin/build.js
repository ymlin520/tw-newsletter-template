#!/usr/bin/env node
// 用法：node bin/build.js examples/consult.json [輸出.html]
import { readFileSync, writeFileSync } from "node:fs";
import { renderNewsletter } from "../src/newsletter.js";
const [src, out] = process.argv.slice(2);
if (!src) { console.log("用法：node bin/build.js <內容.json> [輸出.html]"); process.exit(1); }
const html = renderNewsletter(JSON.parse(readFileSync(src, "utf8")));
if (out) { writeFileSync(out, html, "utf8"); console.log(`已輸出 ${out}（${Math.round(html.length / 1024)} KB）`); }
else process.stdout.write(html);
