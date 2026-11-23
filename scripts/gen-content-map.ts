/* Generates docs/page-content-map.md from the same data modules the pages render,
   so the documented copy always matches the site. Run: npm run docs:content-map */

import { writeFileSync, readFileSync } from "node:fs";
import { CATEGORIES, TOP_CATEGORIES, AGRI_CATEGORIES, AGRI_TOTAL, CATALOGUE_TOTAL } from "../src/site/data/catalogue";
import { ABOUT, FARM_TO_CONTAINER, PRODUCTS_PAGE, AGRICULTURE_PAGE, EXIM, GALLERY_PAGE, CONTACT_PAGE, COMPANY } from "../src/site/data/pages";

const out: string[] = [];
const w = (s = "") => out.push(s);
const list = (items: string[]) => items.forEach((i) => w(`- ${i}`));

w(readFileSync(new URL("./content-map-intro.md", import.meta.url), "utf8").trim());

/* ───────── About ───────── */
w("\n---\n\n## 1. About Us · `/about-us`\n");
w("**Replaces:** https://pratibhashyamexports.com/about-us/  ");
w("**Source content used:** About page intro, three supporting claims, 'Operating Across the Globe', 'Trusted by Buyers & Producers', 'Delivering Solution', leadership names, roles and photos, vision and mission; homepage About text (FPO awareness events, procurement-to-delivery scope), Why Choose Us points, Global Presence labels and Farm-to-Container steps.  ");
w("**Not carried over:** 0% counters, director pop-up placeholders (Duden text, +1 phone, info@example.com), 'six export categories', 'Vission' typo.\n");
w("**Section structure:** hero card → story with photo and badge → four-pillar bento → operations as staggered bars → buyer/producer audience cards → leadership grid → vision and mission → farm-to-container row → global presence → footer CTA.\n");
w(`**Hero:** ${ABOUT.heroTitle}  \n${ABOUT.heroText}\n`);
w(`**${ABOUT.story.eyebrow}: ${ABOUT.story.title}**\n`);
ABOUT.story.paragraphs.forEach((p) => w(`${p}\n`));
w(`Badge: **${ABOUT.story.badge.value}** ${ABOUT.story.badge.label}\n`);
w("**What we stand for: Four promises behind every consignment.**");
list(ABOUT.pillars.map((p) => `**${p.title}.** ${p.text}`));
w("\n**What we manage: Procurement to delivery, under one roof.**");
list(ABOUT.operations.map((o) => `${o.n} **${o.title}**: ${o.text}`));
w("");
ABOUT.audiences.forEach((a) => w(`**${a.title}.** ${a.text}\n`));
w(`**Leadership: Meet the leadership behind every shipment.** ${ABOUT.leadershipIntro}`);
list(ABOUT.leaders.map((l) => `**${l.name}** (${l.role}): ${l.text}`));
w(`\n**Vision:** ${ABOUT.vision}\n\n**Mission:** ${ABOUT.mission}\n`);
w("**From farm to container**");
list(FARM_TO_CONTAINER.map((s) => `${s.n} **${s.title}** (${s.tag}): ${s.text}`));
w("\n**Operating across the globe: Offices in India and Dubai, with an international network of buyers, distributors and partners.**");
list(ABOUT.presence.map((p) => `**${p.title}**: ${p.text}`));

/* ───────── Products ───────── */
w("\n---\n\n## 2. Products Overview · `/products`\n");
w("**Replaces:** https://pratibhashyamexports.com/product/ (fixes the Textile link to `/textile-2/`)  ");
w("**Source content used:** the four category tiles and their homepage descriptions; 'buyers can combine multiple categories'; documentation and logistics points from Why Choose Us.\n");
w("**Section structure:** split hero (curved image, stats) → four alternating editorial category blocks (Agriculture lists its seven lines) → three capability cards → footer CTA.\n");
w(`**Hero:** ${PRODUCTS_PAGE.heroTitle}  \n${PRODUCTS_PAGE.heroText}  \nStats: 4 categories · ${CATALOGUE_TOTAL} named products · 28 textile categories\n`);
TOP_CATEGORIES.forEach((t, i) => {
  w(`**0${i + 1} ${t.title}** (${t.count} ${t.countLabel}) → \`${t.path}\`  `);
  w(`*${t.summary}* ${t.description}${t.children ? `  \nLinks: ${t.children.map((c) => c.title).join(", ")}` : ""}\n`);
});
w("**Consolidated orders, handled end to end.**");
list(PRODUCTS_PAGE.capabilities.map((c) => `**${c.title}.** ${c.text}`));

/* ───────── Agriculture ───────── */
w("\n---\n\n## 3. Agriculture Overview · `/products/agriculture`\n");
w("**Replaces:** https://pratibhashyamexports.com/agriculture-product-page/  ");
w("**Source content used:** the seven sub-category tiles and their images, homepage Agriculture description, Farm-to-Container steps.  ");
w("**Removed:** the 'Travel / Makes me Realize…' template block.\n");
w("**Section structure:** hero card → curved image with a numbered list of the seven lines → seven-tile bento → 'combine lines' note → farm-to-container staggered bars.\n");
w(`**Hero:** ${AGRICULTURE_PAGE.heroTitle}  \n${AGRICULTURE_PAGE.heroText}  \nStats: 7 product lines · ${AGRI_TOTAL} products listed\n`);
w(`**${AGRICULTURE_PAGE.introTitle}:** ${AGRICULTURE_PAGE.introText}\n`);
list(AGRI_CATEGORIES.map((c, i) => `${i + 1}. **${c.shortTitle}** (${c.products.length}): ${c.lede}`));

/* ───────── Category pages ───────── */
w("\n---\n\n## 4–13. Category pages\n");
w("Every category page uses one template: **hero card** (category image, breadcrumb, three key counts) → **overview** (two paragraphs and a group index) → **a feature module specific to that category** → **full product catalogue** (group filter, search, image cards with an Enquire link) → catalogue note → related categories → footer CTA.\n");
w("Counts in the hero are derived from the published list (for example the number of basmati varieties). No specifications, packaging, MOQ, origin, certification or destination claims are made. Display names are lightly cleaned (spacing, capitalisation, 'Musterd' → 'Mustard'); the original label is kept in `src/site/data/products.generated.ts` as `source`.\n");
CATEGORIES.forEach((c, idx) => {
  w(`### ${idx + 4}. ${c.title} · \`${c.path}\`\n`);
  w(`**Replaces:** ${c.sourceUrl}  `);
  w(`**Feature module:** ${c.feature}: *${c.featureTitle}*. ${c.featureText}\n`);
  w(`**Hero:** ${c.title}: ${c.lede}  \nKey counts: ${c.highlights.map((h) => `${h.value} ${h.label}`).join(" · ")}\n`);
  c.body.forEach((p) => w(`${p}\n`));
  w(`**Products (${c.products.length}), by group:**\n`);
  c.groups.forEach((g) => {
    const items = c.products.filter((p) => p.group === g.id);
    w(`*${g.name}* (${items.length}): ${g.note}`);
    list(items.map((p) => (p.detail ? `${p.name} (${p.detail})` : p.name)));
    w("");
  });
  w(`**Related:** ${c.related.join(", ")}\n`);
});

/* ───────── EXIM ───────── */
w("\n---\n\n## 14. EXIM Training · `/exim-training`\n");
w("**Replaces:** https://pratibhashyamexports.com/exim-training/  ");
w("**Source content used:** all 20 curriculum topics (edited for clarity, no topics added or removed), the three service offerings, all nine FAQs, the batch, mode, certificate and audience details from the FAQs.  ");
w("**Not carried over (pending client confirmation):** '60 days', 'Recognized by DGFT, RCMC, FIEO, MSME', 'Lifetime support', 'Limited seats', 'AD Overseas', the email-as-website wording.\n");
w("**Section structure:** split hero → three service cards → facts and audience cards → curriculum in six stages (tabs plus accordion, with an 'all 20 modules' view) → enrolment band → FAQ accordion.\n");
w(`**Hero:** ${EXIM.heroTitle}  \n${EXIM.heroText}\n`);
w("**Services**"); list(EXIM.services.map((s) => `**${s.title}.** ${s.text}`));
w("\n**Facts**"); list(EXIM.facts.map((f) => `${f.value}: ${f.label}`));
w(`\n**Who it's for:** ${EXIM.audience.join(", ")}  \n**By the end you can:**`); list(EXIM.outcomes);
w("\n**Curriculum**");
EXIM.phases.forEach((ph, i) => {
  w(`\n*Stage ${i + 1}: ${ph.title}*`);
  EXIM.curriculum.slice(ph.range[0] - 1, ph.range[1]).forEach((t, j) => w(`${ph.range[0] + j}. **${t.title}**: ${t.text}`));
});
w("\n**FAQs**");
EXIM.faqs.forEach((f) => w(`- **${f.q}** ${f.a}`));

/* ───────── Gallery ───────── */
w("\n---\n\n## 15. Gallery · `/gallery`\n");
w("**Replaces:** https://pratibhashyamexports.com/gallery/  ");
w("**Source content used:** all 15 gallery images plus 7 real operational photos from the homepage (team site visits, meetings, container loading). No per-photo captions are written, because none are published. Photos are grouped only by what they visibly show.\n");
w(`**Hero:** ${GALLERY_PAGE.heroTitle}  \n${GALLERY_PAGE.heroText}\n`);
GALLERY_PAGE.groups.forEach((g) => w(`- **${g.title}** (${g.images.length}): ${g.images.map((i) => `\`gallery/${i}.jpg\``).join(", ")}`));
w("\nFeatures: filter chips, masonry grid, lightbox (keyboard arrows and Esc).");

/* ───────── Contact ───────── */
w("\n---\n\n## 16. Contact Us · `/contact`\n");
w("**Replaces:** https://pratibhashyamexports.com/contact/  ");
w("**Source content used:** published phone, email (Contact-page spelling), address, the 'customised quotation' copy, and the India and Dubai office labels. FAQ answers are drawn only from published site content.  ");
w("**Not carried over:** theme-vendor social links, the misspelt footer email.\n");
w("**Section structure (references: Nexorya contact page, Untitled UI contact page):** soft image hero → split card (company info tiles | enquiry form) → Google map → dotted world map with India and Dubai pins → FAQ.\n");
w(`**Hero:** ${CONTACT_PAGE.heroTitle}  \n${CONTACT_PAGE.heroText}\n`);
w(`**Company information:** Phone ${COMPANY.phoneDisplay} · Email ${COMPANY.email} · Head office ${COMPANY.address}\n`);
w("**Form fields:** full name, email, company (optional), country (optional), topic, message. With no backend yet, submitting opens the visitor's email app with the message filled in.\n");
w("**FAQs**");
CONTACT_PAGE.faqs.forEach((f) => w(`- **${f.q}** ${f.a}`));

writeFileSync(new URL("../docs/page-content-map.md", import.meta.url), out.join("\n") + "\n");
console.log("docs/page-content-map.md written");
