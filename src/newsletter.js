// 繁體中文 B2B 電子報 HTML 範本
// 每期只做 3 件事：① 本期主題（摘要＋完整版請看官網）② 主推一項服務 ③ 行動區（預約／回信）＋簽名
// 全部 table 排版＋行內樣式，Gmail、Outlook、Apple Mail 都能顯示；手機自動上下排。
export const VERSION = "1.0.0";

// 7 種產業點綴色，整封信只換這一個顏色
export const ACCENTS = {
  factory: "#2F5D8A",   // 工業製造
  logistics: "#2C6FA8", // 物流貿易
  commerce: "#7A5FA8",  // 電商行銷
  pro: "#A48450",       // 專業服務（會計、法律、顧問）
  care: "#4E9484",      // 醫療美容
  life: "#C9824A",      // 生活服務（餐飲、旅遊、教育）
  space: "#9A7B5A",     // 空間營造（建設、室內設計）
};

const F = {
  serif: `'Noto Serif TC','Source Han Serif TC','PMingLiU','MingLiU',Georgia,serif`,
  sans: `'Noto Sans TC','Microsoft JhengHei','PingFang TC',Arial,sans-serif`,
  ink: "#2B2B2B", body: "#5F5F5F", mute: "#9A9A9A", line: "#E4E1DB", paper: "#F8F6F2",
};
const e = s => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/**
 * @param {object} d 內容，欄位見 README 與 examples/*.json
 * @returns {string} 完整 HTML（可直接貼進 Gmail、Mailchimp、Brevo 等的 HTML 編輯器）
 */
export function renderNewsletter(d) {
  const ac = ACCENTS[d.accent] || d.accent || ACCENTS.factory;
  const { serif, sans, ink, body, mute, line, paper } = F;
  const brand = d.brand || {};
  const iss = d.issue || {};
  const svc = d.service;
  const cta = d.cta;
  const sig = d.signature || {};
  const W = `role="presentation" width="100%" cellpadding="0" cellspacing="0"`;
  const no = iss.number != null ? `NO.${String(iss.number).padStart(2, "0")}` : "";
  const head = brand.logo
    ? `<img src="${e(brand.logo)}" height="34" alt="${e(brand.name)}" style="display:block;border:0;height:34px;width:auto">`
    : `<span style="font-family:${serif};font-size:18px;letter-spacing:3px;color:${ink}">${e(brand.name)}</span>`;
  const button = (b, main, onDark) => `<a href="${e(b.url)}" target="_blank" style="display:inline-block;${onDark
    ? (main ? `background:#FFFFFF;color:${ac};border:1px solid #FFFFFF;font-weight:700` : `border:1px solid rgba(255,255,255,.8);color:#FFFFFF`)
    : (main ? `background:${ac};border:1px solid ${ac};color:#FFFFFF` : `border:1px solid ${ink};color:${ink}`)};font-size:14px;letter-spacing:2px;text-decoration:none;padding:12px 24px;margin:0 8px 8px 0">${e(b.text)}</a>`;
  const list = (items, color, numColor) => items.map((g, i) => `<div style="font-size:14px;line-height:2;color:${color}"><span style="font-family:${serif};color:${numColor}">0${i + 1}</span>　${e(g)}</div>`).join("");

  const hero = iss.image ? `<tr><td><a href="${e(iss.url)}" target="_blank"><img src="${e(iss.image)}" width="640" alt="${e(iss.title)}" style="display:block;width:100%;height:auto;border:0"></a></td></tr>` : "";
  const issueBlock = `<tr><td class="pad" style="padding:${iss.image ? 32 : 12}px 44px 34px">
  <div style="font-family:${serif};font-size:12px;letter-spacing:4px;color:${ac}">${e([no, iss.label || "本期主題"].filter(Boolean).join("・"))}</div>
  <div class="h1" style="font-family:${serif};font-size:23px;line-height:1.55;color:${ink};margin-top:10px">${e(iss.title)}</div>
  <div style="font-size:14px;line-height:2;color:${body};margin-top:12px">${d.greeting ? e(d.greeting) + "，" : ""}${e(iss.summary)}</div>
  ${iss.points?.length ? `<div style="margin-top:14px;border-left:2px solid ${ac};padding-left:14px">${list(iss.points, ink, ac)}</div>` : ""}
  ${iss.url ? `<div style="margin-top:18px"><a href="${e(iss.url)}" target="_blank" style="font-size:14px;letter-spacing:1px;color:${ac};text-decoration:none;border-bottom:1px solid ${ac};padding-bottom:2px">${e(iss.more || "完整版請看官網")} →</a></div>` : ""}
</td></tr>`;

  const svcBlock = svc ? `<tr><td class="pad" style="background:${paper};padding:34px 44px">
  <div style="font-family:${serif};font-size:12px;letter-spacing:4px;color:${ac}">${e(svc.label || "本期推薦服務")}</div>
  <div style="font-family:${serif};font-size:21px;line-height:1.5;color:${ink};margin-top:8px">${e(svc.name)}</div>
  <div style="font-size:14px;line-height:2;color:${body};margin-top:10px">${e(svc.pitch)}</div>
  ${svc.items?.length ? `<div style="margin-top:12px">${list(svc.items, ink, ac)}</div>` : ""}
  ${svc.buttons?.length ? `<div style="margin-top:20px">${svc.buttons.map((b, i) => button(b, i === 0, false)).join("")}</div>` : ""}
</td></tr>` : "";

  const ctaBlock = cta ? `<tr><td class="pad" bgcolor="${ac}" style="background:${ac};padding:38px 44px 32px">
  <div style="font-family:${serif};font-size:12px;letter-spacing:4px;color:rgba(255,255,255,.75)">${e(cta.label || "NEXT STEP")}</div>
  <div style="font-family:${serif};font-size:22px;line-height:1.55;color:#FFFFFF;margin-top:8px">${e(cta.title)}</div>
  <div style="font-size:14px;line-height:2;color:rgba(255,255,255,.9);margin-top:8px">${e(cta.text)}</div>
  ${cta.items?.length ? `<div style="font-size:14px;color:#FFFFFF;margin:12px 0 4px">${e(cta.itemsTitle || "你會拿到：")}</div>${list(cta.items, "#FFFFFF", "#FFFFFF")}` : ""}
  ${cta.buttons?.length ? `<div style="margin-top:20px">${cta.buttons.map((b, i) => button(b, i === 0, true)).join("")}</div>` : ""}
</td></tr>` : "";

  const contact = [sig.email && `<a href="mailto:${e(sig.email)}" style="color:${ink};text-decoration:none">${e(sig.email)}</a>`,
    sig.phone && e(sig.phone),
    sig.website && `<a href="${e(sig.website)}" target="_blank" style="color:${ink};text-decoration:none">${e(sig.website.replace(/^https?:\/\//, "").replace(/\/$/, ""))}</a>`].filter(Boolean).join("　");
  const sigBlock = sig.name ? `<tr><td class="pad" style="padding:${cta ? 26 : 30}px 44px 18px">
  <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;${cta ? "" : `border-top:1px solid ${line};`}"><tr>
  <td class="col" valign="middle" style="font-size:12px;line-height:1.9;color:${body};border-left:2px solid ${ac};padding-left:14px">
    <span style="font-family:${serif};font-size:17px;letter-spacing:3px;color:${ink}">${e(sig.name)}</span>
    <br><span style="color:${ac};letter-spacing:1px">${e([sig.title, brand.name].filter(Boolean).join("・"))}</span><br>${contact}</td></tr></table>
</td></tr>` : "";

  return `<!doctype html><html lang="zh-Hant"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${e(iss.title)}</title>
<style>@media only screen and (max-width:600px){.pad{padding-left:24px!important;padding-right:24px!important}.col{display:block!important;width:100%!important;box-sizing:border-box!important}.h1{font-size:21px!important}}</style></head>
<body style="margin:0;padding:0;background:#FFFFFF">
${d.preheader ? `<div style="display:none;max-height:0;overflow:hidden;opacity:0">${e(d.preheader)}</div>` : ""}
<table ${W} style="background:#FFFFFF"><tr><td align="center" style="padding:0">
<table role="presentation" width="640" cellpadding="0" cellspacing="0" style="width:100%;max-width:640px;background:#FFFFFF;font-family:${sans};color:${body}">
<tr><td style="padding:20px 32px"><table ${W}><tr>
  <td>${brand.url ? `<a href="${e(brand.url)}" target="_blank" style="text-decoration:none">${head}</a>` : head}</td>
  <td align="right" style="font-family:${serif};font-size:11px;letter-spacing:3px;color:${mute}">${e(no)}${iss.date ? `<br>${e(iss.date)}` : ""}</td></tr></table></td></tr>
${hero}${issueBlock}${svcBlock}${ctaBlock}${sigBlock}
<tr><td class="pad" style="padding:6px 44px 30px;font-size:11px;line-height:1.8;color:${mute}">${e(d.footer || "")}${d.unsubscribe ? `<br><a href="${e(d.unsubscribe)}" style="color:${mute}">取消訂閱</a>` : ""}</td></tr>
</table></td></tr></table></body></html>`;
}
