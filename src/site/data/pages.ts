/* Page copy for the company and business pages, rewritten from the live site
   (see docs/source-content-inventory.md). Nothing here adds facts the site does not publish. */

import { asset } from "./catalogue";

export const COMPANY = {
  legalName: "Pratibhashyam Exports Pvt Ltd",
  shortName: "Pratibhashyam Exports",
  city: "Nagpur",
  phoneDisplay: "+91 72496 04373",
  phoneHref: "tel:+917249604373",
  phoneRaw: "7249604373",
  email: "pratibhashyamexports@gmail.com",
  addressLines: ["7, Deonagar", "Opposite Orange City Hospital", "Khamla Road, Nagpur 440015"],
  address: "7, Deonagar, Opposite Orange City Hospital, Khamla Road, Nagpur 440015",
  mapHref: "https://www.google.com/maps/search/?api=1&query=7+Deonagar+Khamla+Road+Nagpur+440015",
  mapEmbed: "https://www.google.com/maps?q=Deonagar%2C+Khamla+Road%2C+Nagpur+440015&z=15&output=embed",
};

/* ───────────── About ───────────── */

export const ABOUT = {
  title: "About Us",
  heroTitle: "Rooted in India, trusted across the world.",
  heroText:
    "Pratibhashyam Exports Pvt Ltd is an Indian export company based in Nagpur. We connect Indian farmers, producers and manufacturers with buyers around the world.",
  story: {
    eyebrow: "Our story",
    title: "An export partner that manages the whole chain.",
    paragraphs: [
      "We supply agricultural products, grains, cereals, pulses, spices, textiles and pharmaceuticals to importers and distributors worldwide. Behind every consignment is a simple idea: reliable sourcing, honest dealing and consistent quality.",
      "Our four directors oversee every stage of the export cycle themselves, from sourcing and quality checks to packaging, documentation and logistics, so each shipment reaches the buyer exactly as promised.",
      "We serve two kinds of partners. For importers we are a dependable supplier. For producers, including Farmer Producer Organisations (FPOs) and smallholders, we are a route into export markets, and we run awareness sessions on export procedures, quality standards and global opportunities.",
    ],
    badge: { value: "4", label: "directors overseeing every shipment" },
  },
  pillars: [
    { title: "Quality-checked products", text: "Inspected and graded before dispatch, against international standards and the samples our buyers approve." },
    { title: "Direct sourcing", text: "We work directly with farmers, FPOs and trusted manufacturers for traceable sourcing and fair pricing, without unnecessary middlemen." },
    { title: "Complete documentation", text: "Invoices, packing lists, certificates of origin, phytosanitary certificates and customs clearance, all handled by our team." },
    { title: "On-time shipments", text: "Sea and air freight coordinated with trusted logistics partners on FOB, CFR or CIF terms, and tracked until delivery." },
  ],
  operations: [
    { n: "01", title: "Procurement", text: "Sourcing from farmers, FPOs and manufacturers." },
    { n: "02", title: "Quality inspection", text: "Checked at source against buyer specifications." },
    { n: "03", title: "Packaging", text: "Export-grade packing for international transit." },
    { n: "04", title: "Documentation", text: "Every export document prepared and checked." },
    { n: "05", title: "Logistics & delivery", text: "Freight booked, loading supervised, shipment tracked." },
  ],
  audiences: [
    {
      title: "Trusted by buyers",
      text: "Importers, distributors and wholesalers rely on us for consistent quality and timely delivery, and can combine several product categories in one order.",
      image: asset("ops-container.jpg"),
    },
    {
      title: "Trusted by producers",
      text: "FPOs and farmers value fair, transparent dealing, and our support as they prepare to sell into export markets.",
      image: asset("ops-field.jpg"),
    },
  ],
  leadershipIntro: "Four directors, one commitment: quality exports delivered on time.",
  /* Name–photo–role mapping as published on the live About page (verify before launch). */
  leaders: [
    { name: "Dr. Hemant Sonare", role: "Strategy & standards", text: "Guides our strategy and standards, so every export or domestic consignment meets the quality our global buyers expect.", photo: asset("director-1.jpg") },
    { name: "Mr. Amit K. Bhole", role: "Buyer relationships & supply chain", text: "Builds lasting buyer relationships and keeps our supply chain reliable, transparent and on schedule.", photo: asset("director-2.jpg") },
    { name: "Mr. Sudhir Kachore", role: "Sourcing & quality", text: "Leads disciplined sourcing and quality checks, so products match approved samples and export specifications.", photo: asset("director-3.jpg") },
    { name: "Mr. Deepak Wankhede", role: "Growth & global network", text: "Drives our growth and global network, and supports FPOs and producers as they enter export markets.", photo: asset("director-4.jpg") },
  ],
  vision:
    "To be a globally trusted Indian export company, connecting farmers, producers and manufacturers with international markets through uncompromising quality, integrity and reliable service.",
  mission:
    "To deliver quality agricultural products, textiles and pharmaceuticals to buyers worldwide with honest dealing and timely shipments, while empowering FPOs and small producers to enter export markets.",
  presence: [
    { title: "India office", text: "Head office in Nagpur, Maharashtra" },
    { title: "Dubai, UAE office", text: "Presence in the UAE" },
    { title: "Export destinations", text: "An international network of buyers, distributors and partners" },
  ],
};

export const FARM_TO_CONTAINER = [
  { n: "01", title: "Farm sourcing", tag: "Fresh from farm", text: "We partner with trusted farmers and suppliers to source fresh, quality agricultural products." },
  { n: "02", title: "Quality check", tag: "Quality assured", text: "Every batch is inspected against our quality and export requirements." },
  { n: "03", title: "Grading & sorting", tag: "Selected quality", text: "Products are graded, sorted and selected to the buyer's specification." },
  { n: "04", title: "Processing", tag: "Export preparation", text: "Products are cleaned, processed and prepared to international requirements." },
  { n: "05", title: "Packaging", tag: "Secure packing", text: "Export-grade packaging protects goods in international transit." },
  { n: "06", title: "Container loading", tag: "Ready to ship", text: "Goods are securely loaded into containers and prepared for delivery." },
];

/* ───────────── Products overview ───────────── */

export const PRODUCTS_PAGE = {
  heroTitle: "One supplier, four export categories.",
  heroText:
    "Agriculture, nuts and seeds, textiles and pharmaceuticals. Buyers can combine several categories in a single order and deal with one team from enquiry to delivery.",
  capabilities: [
    { title: "Combine categories", text: "Mix agriculture, nuts and seeds, textiles or pharmaceuticals in one consolidated order." },
    { title: "Export documentation", text: "Invoices, packing lists, certificates of origin, phytosanitary certificates and customs clearance." },
    { title: "Flexible terms", text: "Sea and air freight on FOB, CFR or CIF terms, tracked until delivery." },
  ],
};

/* ───────────── Agriculture overview ───────────── */

export const AGRICULTURE_PAGE = {
  heroTitle: "Agriculture, from field to container.",
  heroText:
    "Seven product lines grown and processed across India: fresh produce, spices, staples, frozen and dehydrated vegetables, coir grow-media and makhana.",
  introTitle: "What we export from Indian farms",
  introText:
    "Agriculture is the core of our business. We work closely with farmers and FPOs, inspect produce at source and grade it to each buyer's approved sample, then pack, document and load it for export.",
};

/* ───────────── EXIM Training ───────────── */

export const EXIM = {
  heroTitle: "Learn to export from people who export.",
  heroText:
    "A practical export–import training programme in Nagpur for complete beginners, run by a practising export business. Real documents, live consignments and actual case studies.",
  services: [
    { title: "Export Import Training", text: "Practical training in documentation, logistics and trade processes.", icon: "cap" },
    { title: "EXIM Documents", text: "Complete export–import documentation support, from sourcing to shipment delivery.", icon: "file" },
    { title: "Trade Consultancy", text: "Guidance on product selection and entering international markets.", icon: "globe" },
  ],
  facts: [
    { value: "20", label: "curriculum modules" },
    { value: "3", label: "batch timings: morning, evening, weekend" },
    { value: "2", label: "modes: classroom and online" },
  ],
  audience: ["Students", "Farmers", "Traders", "Manufacturers", "Business owners", "Working professionals"],
  outcomes: [
    "Register and set up an export–import business",
    "Choose products and find genuine international buyers",
    "Price, document and ship an export order correctly",
    "Handle customs, payments, GST and government schemes",
  ],
  phases: [
    { title: "Foundations", range: [1, 3] },
    { title: "Products, buyers & pricing", range: [4, 6] },
    { title: "Documentation & customs", range: [7, 9] },
    { title: "Shipping, terms & payments", range: [10, 13] },
    { title: "Benefits, tax & compliance", range: [14, 16] },
    { title: "Build your business", range: [17, 20] },
  ] as { title: string; range: [number, number] }[],
  curriculum: [
    { title: "Introduction to Export Import Business", text: "How international trade and global markets work, India's position in world trade, opportunities for Nagpur and Vidarbha entrepreneurs, and the difference between a merchant exporter and a manufacturer exporter." },
    { title: "India's EXIM Policy & Trade Regulations", text: "India's Foreign Trade Policy (FTP), an overview of the DGFT, export–import regulations, prohibited and restricted items, special economic zones (SEZ) and important trade notifications." },
    { title: "Business Setup & Government Registrations", text: "IEC (Importer Exporter Code), GSTIN for exporters, MSME/Udyam registration, AD Code registration, RCMC (Registration Cum Membership Certificate), and choosing between a company and a proprietorship." },
    { title: "Product Selection & Market Research", text: "Identifying the right export product, analysing global demand, HS code identification, competition research, and niche product opportunities from the Nagpur and Vidarbha region." },
    { title: "International Buyer Sourcing & Marketing", text: "Finding genuine buyers on Alibaba, TradeIndia, IndiaMART and Global Linker, trade fairs and exhibitions, cold email outreach, embassy trade desks, and buyer verification techniques." },
    { title: "Export Pricing, Costing & Profit Calculation", text: "Calculating an export price, FOB, CIF and C&F pricing, adding freight, insurance and margins, competitive pricing strategy, preparing a proforma invoice, and protecting your margin on every deal." },
    { title: "Export Documentation: Complete Mastery", text: "Commercial invoice, packing list, shipping bill, bill of lading, certificate of origin, phytosanitary certificate, quality certificate and GSP certificate, and how to prepare each one correctly." },
    { title: "Import Documentation & Procedures", text: "Bill of entry, import licence, advance authorisation, imports under OGL, clearing imported goods through customs, and an import documentation checklist for new importers." },
    { title: "Customs Clearance & Duty Structure", text: "How customs clearance works in India, the role of the customs broker (CHA), duty types (BCD, IGST, SWS), exemptions and concessions, avoiding delays and penalties, and a practical filing walkthrough." },
    { title: "Logistics, Freight & Shipping Management", text: "Sea freight, air freight and courier exports, FCL and LCL shipments, booking with shipping lines, the role of the freight forwarder, CFS procedures, port handling and shipment tracking." },
    { title: "Incoterms: International Trade Terms", text: "All 11 Incoterms (EXW, FOB, CIF, DAP, DDP and more), which to use when, where risk and cost transfer, and how the wrong choice can cost a business money." },
    { title: "Export Finance & Banking Procedures", text: "Pre-shipment and post-shipment finance, packing credit, export credit from banks, approaching a bank as a new exporter, ECGC export credit insurance, and opening an export current account." },
    { title: "Foreign Exchange & International Payments", text: "Receiving international payments safely, letters of credit in detail, SWIFT/TT payments, advance payment terms, documents against payment (DP), FEMA compliance and realising foreign exchange." },
    { title: "DGFT Schemes & Government Export Benefits", text: "The RoDTEP scheme, Advance Authorisation, EPCG (Export Promotion Capital Goods), duty drawback and Star Export House status, and how to claim each benefit." },
    { title: "GST for Exporters & Importers", text: "Zero-rated exports, filing an LUT (Letter of Undertaking), the IGST refund process, GST on imports, input tax credit for exporters, and common GST mistakes." },
    { title: "Quality Control, Packaging & Compliance", text: "Export quality standards, BIS, FSSAI and APEDA compliance for agri exports, EIA norms, international packaging standards, labelling requirements by country, and pre-shipment inspection agencies." },
    { title: "Import Business: Sourcing from Global Markets", text: "Importing from China, the UAE, the USA and Europe, finding and evaluating overseas suppliers, import duty calculation, landed cost analysis, and profitable products to import into India." },
    { title: "Starting & Scaling Your Export Import Company", text: "Registering a trading company, choosing the right structure, building a brand for international markets, creating an export catalogue, setting up an export office, and scaling from the first shipment to consistent business." },
    { title: "Digital Presence for Exporters", text: "Building a basic export website, writing effective product listings, using LinkedIn to reach international buyers, WhatsApp Business for trade communication, and digital marketing basics." },
    { title: "Your First Export Deal from Start to Finish", text: "An end-to-end simulation of a real export transaction: product selection, buyer identification, proforma invoice, order confirmation, documentation, customs filing, shipment and payment realisation. Students complete it as their final practical project." },
  ],
  faqs: [
    { q: "What is the export–import course about?", a: "It is a completely practical, business-focused programme that helps entrepreneurs, traders, manufacturers and business owners in Nagpur start and run their own export–import business from scratch." },
    { q: "Do I need any prior experience?", a: "No. The course is designed for complete beginners. Whether you are a student, farmer, trader or business owner, we start from the basics and work up to a fully operational export–import business." },
    { q: "How long is the course?", a: "Batch timings, course duration and schedule details are shared during a free demo session. Call 7249604373 for current batch information." },
    { q: "Will I receive a certificate?", a: "Yes. On successful completion you receive a course completion certificate covering international trade, customs procedures, documentation and export–import operations." },
    { q: "Can I start my own export business after the course?", a: "Yes, that is the purpose of the training. You will learn registrations, documentation, buyer sourcing, logistics, customs and international payments, and we help you set up your business after training." },
    { q: "Which products can I export from Nagpur?", a: "The Nagpur and Vidarbha region offers opportunities in spices, pulses, cereals, oranges, cotton, textiles and other agri-commodities. The course includes guidance on choosing products that suit your business and budget." },
    { q: "Are weekend batches available?", a: "Yes. Morning, evening and weekend batches are offered for students, working professionals, farmers and business owners, in both offline classroom and online modes." },
    { q: "How is this programme different?", a: "It is run by a practising export–import professional with more than ten years of trading experience. Training is based on live consignments, real documents and actual business cases, not just theory." },
    { q: "How do I enrol?", a: "Call 7249604373 or email pratibhashyamexports@gmail.com. Attend an enquiry session, meet our director in person, understand the course in detail, and then decide." },
  ],
};

/* ───────────── Gallery ───────────── */

export const GALLERY_PAGE = {
  heroTitle: "Our work, behind the scenes.",
  heroText: "Photographs from our operations: sourcing visits, packing, container loading, port visits and trade events.",
  groups: [
    { id: "logistics", title: "Containers & logistics", images: ["logistics-01", "logistics-02", "logistics-03", "logistics-04", "logistics-05", "logistics-06", "logistics-07"] },
    { id: "packing", title: "Packing & warehouse", images: ["packing-01", "packing-02", "packing-03"] },
    { id: "field", title: "Field, site & port visits", images: ["field-01", "field-02", "field-03", "field-04", "field-05"] },
    { id: "meetings", title: "Meetings & events", images: ["meetings-01", "meetings-02", "meetings-03", "meetings-04", "meetings-05", "meetings-06", "meetings-07"] },
  ],
};

/* ───────────── Contact ───────────── */

export const CONTACT_PAGE = {
  heroTitle: "Get in touch with our team.",
  heroText: "Share your requirement for a customised quotation, or ask us about export–import training. We are here to help.",
  faqs: [
    { q: "What can I buy from Pratibhashyam Exports?", a: "Agricultural products (fresh produce, dry spices, grains, pulses and cereals, frozen and dehydrated vegetables, cocopeat and makhana), nuts and seeds, textiles and pharmaceuticals." },
    { q: "Can I combine several categories in one order?", a: "Yes. Buyers can combine multiple product categories from our range in a single order." },
    { q: "What should I include in a quote request?", a: "The product, the grade or specification, the quantity, your destination port or country, and your preferred shipping terms. The more detail you share, the faster we can respond." },
    { q: "Which shipping terms do you work on?", a: "We coordinate sea and air freight with trusted logistics partners and offer FOB, CFR and CIF terms, tracking every shipment until it reaches you." },
    { q: "Do you handle export documentation?", a: "Yes. Our team prepares invoices, packing lists, certificates of origin and phytosanitary certificates, and handles customs clearance." },
    { q: "How do I join the EXIM training course?", a: "Call 7249604373 to book a free demo session and learn about current batches." },
  ],
  offices: [
    { title: "Nagpur, India", text: "Head office", lon: 79.09, lat: 21.15 },
    { title: "Dubai, UAE", text: "Office", lon: 55.27, lat: 25.2 },
  ],
};
