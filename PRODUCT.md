# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
- **Primary:** overseas importers, distributors and wholesalers looking for a dependable Indian supplier of agricultural commodities (plus nuts & seeds, textiles, pharmaceuticals). They compare suppliers, check range and paperwork competence, and ask for a quote.
- **Secondary:** Indian farmers, FPOs and smallholder producers who want to enter export markets, served through EXIM Training.

## Product Purpose
Marketing website for Pratibhashyam Exports Pvt Ltd (Nagpur, India). Success = a qualified importer sends a quote request (WhatsApp or email) with product, quantity and destination.

## Positioning
Sources directly from farmers and FPOs, inspects at source, handles the full export paperwork (invoice, packing list, certificate of origin, phytosanitary, customs) and ships FOB/CFR/CIF by sea or air. Also trains producers to export.

## Operating Context
- V2 rebuild on branch `version-2`. The hero (3D Earth over matte black, glow, SVG overlay) is built by a teammate; this work covers everything below it plus subpages.
- Quote form has no backend: it opens a pre-filled WhatsApp message to +91 72496 04373, with email as fallback.

## Capabilities and Constraints
- **Future admin panel (not built yet):** every editable item (directors, certificates, products, stats, gallery, contact details, copy) must live in data modules, never hard-coded in components, so an admin can add/remove/replace items later.
- Certificates: a section that lists authorised certificates; currently no verified certificate scans exist.

## Brand Commitments
- Name: Pratibhashyam Exports Pvt Ltd. Logo at `public/img/logo.png`.
- Typeface: Plus Jakarta Sans for all text (user-specified).

## Evidence on Hand
- Stats published on the live site, approved by the user for reuse: 5000+ farmers connected, 15+ countries served, 20+ commodities, 10+ years industry experience.
- Directors (photo mapping confirmed on live site): Dr. Hemant Sonare (`director-1.jpg`), Mr. Amit Bhole (`director-2.jpg`), Mr. Sudhir Kachore (`director-3.jpg`), Mr. Deepak Wankhede (`director-4.jpg`). Individual roles are NOT mapped to names; do not assign them.
- ~150 catalogue items across 9 listing pages (`src/site/data/`), operational photos in `public/img/gallery`, `public/img/ops-*`.
- No testimonials, customer logos or certificate scans. Do not fabricate them.

## Product Principles
1. Importer-first: range, proof of process and the quote path lead; producer training is a clear second path.
2. Show the process, not adjectives: farm → inspection → paperwork → container.
3. Only publish what the company publishes; mark gaps rather than invent.
4. Everything editable from data, ready for the admin panel.
