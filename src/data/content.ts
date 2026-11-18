/* Content sourced from the live site via pratibhashyam_exports_content_audit.md.
   Figures marked `verify` are published on the current site but unconfirmed (audit §3.2). */

export const img = (name: string): string => `${import.meta.env.BASE_URL}img/${name}`;

export const CONTACT = {
  phoneDisplay: "+91 72496 04373",
  phoneHref: "tel:+917249604373",
  email: "pratibhashyamexports@gmail.com",
  address: "7, Deonagar, opposite Orange City Hospital, Khamla Road, Nagpur 440015",
  mapHref: "https://maps.google.com/?q=7+Deonagar+Khamla+Road+Nagpur+440015",
} as const;

export const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#products", label: "Products" },
  { href: "#process", label: "How we work" },
  { href: "#training", label: "EXIM Training" },
  { href: "#contact", label: "Contact" },
] as const;

export type AgriKey = "fruits" | "spices" | "grains" | "frozen" | "dried" | "cocopeat" | "makhana";

export interface AgriLine {
  key: AgriKey;
  tab: string;
  title: string;
  count: number;
  image: string;
  items: string[];
}

export const AGRI_LINES: AgriLine[] = [
  { key: "fruits", tab: "Fruits & Veg", title: "Fruits & Vegetables", count: 15, image: img("cat-agri.jpg"),
    items: ["Fresh Onions", "Green Chillies", "Drumsticks", "Fresh Garlic", "Pomegranates", "Mangoes", "Grapes"] },
  { key: "spices", tab: "Dry Spices", title: "Dry Spices", count: 12, image: img("spices.jpg"),
    items: ["Dry Red Chillies", "Raw Turmeric", "Cumin Seeds", "Coriander Seeds", "Green Cardamom", "Fennel Seeds", "Nutmeg"] },
  { key: "grains", tab: "Grains & Pulses", title: "Grains, Pulses & Cereals", count: 33, image: img("cat-grains.jpg"),
    items: ["1121 Basmati", "Sona Masoori", "IR-64 Parboiled", "Milling Wheat", "Kabuli Chana", "Toor Dal", "Yellow Maize"] },
  { key: "frozen", tab: "Frozen", title: "Frozen Vegetables", count: 28, image: img("cat-agri.jpg"),
    items: ["Green Peas", "Sweet Corn", "Broccoli Florets", "Okra Slice", "Spinach Cubes", "Peeled Garlic", "Mix Veg"] },
  { key: "dried", tab: "Dehydrated", title: "Dried & Dehydrated", count: 12, image: img("spice-trays.jpg"),
    items: ["Onion Flakes", "Onion Powder", "Crispy Fried Onion", "Garlic Granules", "Garlic Minced", "Garlic Powder"] },
  { key: "cocopeat", tab: "Cocopeat", title: "Cocopeat", count: 8, image: img("cat-agri.jpg"),
    items: ["Coco Peat 5 kg Block", "Coco Chips 1 kg Block", "Coir Disk (Jiffy)", "Coir Pots", "Buffered Coir Pith"] },
  { key: "makhana", tab: "Makhana", title: "Makhana (Fox Nut)", count: 13, image: img("makhana.jpg"),
    items: ["4+ Grade 12–15 mm", "5+ Grade 12–18 mm", "6+ Grade >19 mm", "Peri Peri", "Himalayan Salt & Pepper", "Cream & Onion"] },
];

/** Items per catalogue page, for the mini bar chart (sums to 150). */
export const CATALOGUE_COUNTS = [33, 28, 15, 15, 14, 13, 12, 12, 8];

export const PROCESS_STEPS = [
  { title: "Farm sourcing", text: "Fresh produce from trusted farmers and suppliers." },
  { title: "Quality check", text: "Every batch inspected against export requirements." },
  { title: "Grading & sorting", text: "Selected to the buyer's specification." },
  { title: "Processing", text: "Cleaned and prepared to international norms." },
  { title: "Packaging", text: "Export-grade packing that survives transit." },
  { title: "Container loading", text: "Secured, sealed and ready to sail." },
];

export const EXPORT_DOCS = [
  "Commercial invoice",
  "Packing list",
  "Certificate of origin",
  "Phytosanitary certificate",
  "Customs clearance",
];

/* Name-to-photo mapping is unconfirmed (audit §3.7): names are shown as a group, not under photos. */
export const DIRECTOR_NAMES = ["Deepak Wankhede", "Amit Bhole", "Sudhir Kachore", "Hemant Sonare"];
export const DIRECTOR_PHOTOS = ["director-1.jpg", "director-2.jpg", "director-3.jpg", "director-4.jpg"].map(img);
export const DIRECTOR_ROLES = ["Strategy & standards", "Buyer relationships", "Sourcing & quality", "Growth & FPO network"];

export const TRAINING_MODULES = [
  "IEC & registrations", "HS codes", "Buyer sourcing", "Export pricing", "FOB / CIF costing", "Bill of lading",
  "Customs clearance", "All 11 Incoterms", "Letters of credit", "RoDTEP & drawback", "GST & LUT",
  "APEDA · FSSAI · BIS", "Your first export deal",
];

export const GALLERY = [
  { src: img("ops-loading.jpg"), caption: "Container loading" },
  { src: img("ops-warehouse.jpg"), caption: "Packed export cartons" },
  { src: img("ops-port-team.jpg"), caption: "Team at the port" },
  { src: img("ops-bags.jpg"), caption: "Bagged cargo, ready to seal" },
  { src: img("ops-trailer.jpg"), caption: "Outbound trailer" },
];

export const QUOTE_CATEGORIES = [
  "Agriculture", "Grains & Pulses", "Spices", "Makhana", "Nuts & Seeds", "Frozen Vegetables", "Textiles", "Pharmaceuticals",
];
export const QUOTE_QUANTITIES = ["1 × 20 ft FCL", "1 × 40 ft FCL", "Multiple containers", "LCL / trial order"];

export const TAGLINE =
  "Indian produce, sourced at the farm and checked at source, with complete export paperwork and shipments that leave on schedule.";
