/* Product catalogue structure and category copy.
   Product names come from products.generated.ts (scraped from the live site, order preserved).
   Category copy is written at category level only. No grades, specs, packaging, MOQ, origin,
   certifications or destinations are stated unless they appear in the published product name. */

import { PRODUCTS, type Product } from "./products.generated";

export type { Product };

export const asset = (p: string): string => `${import.meta.env.BASE_URL}img/${p}`;

export type FeatureKind =
  | "mosaic"        // image mosaic of a few products beside copy
  | "basmati-matrix"
  | "forms-matrix"  // onion vs garlic forms
  | "grade-scale"   // makhana grades
  | "mix-builder"   // frozen mixes
  | "group-index"   // textile: sticky index of groups
  | "pharma-note"
  | "grow-media";

export interface ProductGroup { id: string; name: string; note: string }

export interface Category {
  slug: string;
  path: string;
  parent?: "agriculture";
  title: string;
  shortTitle: string;
  eyebrow: string;
  heroImage: string;
  lede: string;
  body: string[];
  highlights: { value: string; label: string }[];
  groups: ProductGroup[];
  feature: FeatureKind;
  featureTitle: string;
  featureText: string;
  related: string[];
  /** The original URL this page replaces. */
  sourceUrl: string;
  products: Product[];
}

const count = (slug: string) => PRODUCTS[slug].length;

const AGRI_BASE = "/products/agriculture";

const defs: Omit<Category, "products">[] = [
  {
    slug: "fruits-vegetables",
    path: `${AGRI_BASE}/fruits-vegetables`,
    parent: "agriculture",
    title: "Fresh Fruits & Vegetables",
    shortTitle: "Fruits & Vegetables",
    eyebrow: "Agriculture · Fresh produce",
    heroImage: asset("agri/fruits-vegetables.jpg"),
    lede: "Everyday Indian vegetables and well-loved fruits, sourced fresh from growers and prepared for export.",
    body: [
      "Our fresh produce line covers the vegetables that Indian and international kitchens use every day, from onions, garlic, ginger and green chillies to okra, drumsticks, beans and curry leaves, alongside fruits such as mangoes, grapes, pomegranates and bananas.",
      "Fresh produce is perishable, so availability depends on the season and the harvest. Share the products, quantities and destination you need, and our team will confirm what can be sourced, graded and shipped for your order.",
    ],
    highlights: [
      { value: String(count("fruits-vegetables")), label: "fresh products listed" },
      { value: "11", label: "vegetables & herbs" },
      { value: "4", label: "fruits" },
    ],
    groups: [
      { id: "vegetables", name: "Vegetables & herbs", note: "Kitchen staples, beans, roots and leaves" },
      { id: "fruits", name: "Fruits", note: "Mangoes, grapes, pomegranates and bananas" },
    ],
    feature: "mosaic",
    featureTitle: "Sourced fresh, graded before dispatch",
    featureText: "We work directly with farmers and FPOs, inspect produce at source and grade it to the buyer's approved sample before it is packed.",
    related: ["frozen-vegetables", "dried-dehydrated", "dry-spices"],
    sourceUrl: "https://pratibhashyamexports.com/fruits-vegetables/",
  },
  {
    slug: "dry-spices",
    path: `${AGRI_BASE}/dry-spices`,
    parent: "agriculture",
    title: "Dry Spices",
    shortTitle: "Dry Spices",
    eyebrow: "Agriculture · Spices",
    heroImage: asset("agri/dry-spices.jpg"),
    lede: "Whole Indian spices, from chillies and turmeric to cardamom, seed spices and nutmeg.",
    body: [
      "India's spice trade spans heat, colour and aroma. Our dry spice range brings these together in one list: dry red chillies and raw turmeric, dried onion and ginger, the seed spices that form the base of most masalas, and aromatics such as green and black cardamom and nutmeg.",
      "Spice buyers usually work to their own specifications. Tell us the spice, the form and the standard you need, and we will confirm sourcing and grading for your order.",
    ],
    highlights: [
      { value: String(count("dry-spices")), label: "spices listed" },
      { value: "5", label: "seed spices" },
      { value: "3", label: "aromatics" },
    ],
    groups: [
      { id: "chillies-roots", name: "Chillies, roots & bulbs", note: "Heat and colour" },
      { id: "seed-spices", name: "Seed spices", note: "Cumin, coriander, fenugreek, fennel, mustard" },
      { id: "aromatics", name: "Aromatics", note: "Cardamom and nutmeg" },
    ],
    feature: "mosaic",
    featureTitle: "One supplier for the whole spice shelf",
    featureText: "Combine several spices in a single consignment, together with grains, pulses or dehydrated products from our agriculture range.",
    related: ["dried-dehydrated", "grains", "nuts-seeds"],
    sourceUrl: "https://pratibhashyamexports.com/dry-spices/",
  },
  {
    slug: "grains",
    path: `${AGRI_BASE}/grains-pulses-cereals`,
    parent: "agriculture",
    title: "Grains, Pulses & Cereals",
    shortTitle: "Grains, Pulses & Cereals",
    eyebrow: "Agriculture · Staples",
    heroImage: asset("agri/grains.jpg"),
    lede: "Basmati and non-basmati rice, wheat, maize and millets, and the pulses at the heart of Indian food.",
    body: [
      "This is our largest agriculture catalogue. It includes four basmati varieties (1121, 1509, 1401 and Pusa) in raw, steam and sella finishes; non-basmati rice such as IR-64, Sona Masoori and Swarna; milling wheat, maize, sorghum and millets; and a full range of pulses, from chickpeas and toor dal to moong, urad, rajma and masoor.",
      "Rice is listed by variety and finish exactly as published in our catalogue. For other grains and pulses, share the grade or type you need, and we will confirm availability for your order.",
    ],
    highlights: [
      { value: String(count("grains")), label: "staples listed" },
      { value: "4", label: "basmati varieties" },
      { value: "9", label: "pulses" },
    ],
    groups: [
      { id: "basmati", name: "Basmati rice", note: "1121, 1509, 1401 and Pusa" },
      { id: "non-basmati", name: "Non-basmati rice", note: "IR-64, Sona Masoori, Swarna, broken rice" },
      { id: "cereals-millets", name: "Cereals & millets", note: "Wheat, maize, bajra, jowar, ragi" },
      { id: "pulses", name: "Pulses & beans", note: "Chana, dal, rajma, lentils, gram" },
    ],
    feature: "basmati-matrix",
    featureTitle: "Basmati, by variety and finish",
    featureText: "Every basmati line we list, as published. Ask for the variety and finish your market prefers.",
    related: ["dry-spices", "makhana", "nuts-seeds"],
    sourceUrl: "https://pratibhashyamexports.com/grains/",
  },
  {
    slug: "frozen-vegetables",
    path: `${AGRI_BASE}/frozen-vegetables`,
    parent: "agriculture",
    title: "Frozen Vegetables",
    shortTitle: "Frozen Vegetables",
    eyebrow: "Agriculture · Frozen",
    heroImage: asset("agri/frozen-vegetables.jpg"),
    lede: "Cut, diced and sliced vegetables, kitchen-ready cubes and mixes, frozen for longer reach.",
    body: [
      "Freezing lets Indian vegetables travel further and stay usable for longer. Our frozen range covers familiar staples such as green peas, sweet corn, broccoli and cauliflower, Indian favourites such as drumsticks, okra, bitter gourd, ivy gourd and pointed gourd, and convenience formats such as diced onion, peeled and crushed garlic, and spinach and fenugreek cubes.",
      "Three ready-made vegetable mixes and a black plum pulp complete the range. Frozen goods ship in temperature-controlled logistics, which we coordinate with our freight partners.",
    ],
    highlights: [
      { value: String(count("frozen-vegetables")), label: "frozen lines" },
      { value: "3", label: "vegetable mixes" },
      { value: "24", label: "single-vegetable cuts" },
    ],
    groups: [
      { id: "cut-diced", name: "Cut, diced & cubed", note: "Single vegetables in kitchen-ready cuts" },
      { id: "pulp", name: "Fruit pulp", note: "Black plum (jamun) pulp" },
      { id: "mixes", name: "Vegetable mixes", note: "Ready-made combinations" },
    ],
    feature: "mix-builder",
    featureTitle: "Three ready mixes",
    featureText: "Each mix combines vegetables from our single-cut range, exactly as listed.",
    related: ["fruits-vegetables", "dried-dehydrated", "makhana"],
    sourceUrl: "https://pratibhashyamexports.com/frozen-vegetables/",
  },
  {
    slug: "dried-dehydrated",
    path: `${AGRI_BASE}/dried-dehydrated`,
    parent: "agriculture",
    title: "Dried & Dehydrated",
    shortTitle: "Dried & Dehydrated",
    eyebrow: "Agriculture · Dehydrated",
    heroImage: asset("agri/dried-dehydrated.jpg"),
    lede: "Dehydrated onion and garlic in every common format, from flakes to powder, plus crispy fried onion.",
    body: [
      "Dehydrated onion and garlic are pantry essentials for food manufacturers, spice blenders, caterers and retailers. Drying keeps them light and shelf-stable, so they travel well.",
      "We list onion in flakes, chopped, minced, two granule sizes and powder, plus golden and red/pink crispy fried onion. Garlic comes minced, in two granule sizes and as powder. Choose the format your process needs.",
    ],
    highlights: [
      { value: String(count("dried-dehydrated")), label: "dehydrated lines" },
      { value: "8", label: "onion formats" },
      { value: "4", label: "garlic formats" },
    ],
    groups: [
      { id: "onion", name: "Onion", note: "Flakes to powder, and crispy fried" },
      { id: "garlic", name: "Garlic", note: "Minced, granules and powder" },
    ],
    feature: "forms-matrix",
    featureTitle: "Pick your format",
    featureText: "Onion and garlic side by side, by the formats we list.",
    related: ["dry-spices", "frozen-vegetables", "fruits-vegetables"],
    sourceUrl: "https://pratibhashyamexports.com/dried-dehydrated/",
  },
  {
    slug: "cocopeat",
    path: `${AGRI_BASE}/cocopeat`,
    parent: "agriculture",
    title: "Cocopeat & Coir Products",
    shortTitle: "Cocopeat",
    eyebrow: "Agriculture · Grow media",
    heroImage: asset("agri/cocopeat.jpg"),
    lede: "Coco peat blocks, coco chips, coir discs, pots and buffered coir pith for growers.",
    body: [
      "Cocopeat is made from coconut husk, a by-product of the coconut industry. It is widely used by nurseries, greenhouses and home gardeners as a soil-free growing medium and soil conditioner.",
      "Our range covers compressed blocks in 5 kg and 1 kg sizes, a 1 kg coco chips block and buffered coir pith, together with grow-ready formats: round coir discs (nude and netted 'jiffy' type) and round and square coir pots.",
    ],
    highlights: [
      { value: String(count("cocopeat")), label: "coir products" },
      { value: "4", label: "blocks & pith" },
      { value: "4", label: "discs & pots" },
    ],
    groups: [
      { id: "blocks", name: "Blocks & pith", note: "Compressed growing media" },
      { id: "grow-media", name: "Discs & pots", note: "Ready-to-plant coir formats" },
    ],
    feature: "grow-media",
    featureTitle: "From block to pot",
    featureText: "Compressed media for bulk growers, ready-to-plant formats for nurseries.",
    related: ["fruits-vegetables", "makhana", "textile"],
    sourceUrl: "https://pratibhashyamexports.com/cocopeat/",
  },
  {
    slug: "makhana",
    path: `${AGRI_BASE}/makhana`,
    parent: "agriculture",
    title: "Makhana (Fox Nut)",
    shortTitle: "Makhana",
    eyebrow: "Agriculture · Makhana",
    heroImage: asset("agri/makhana.jpg"),
    lede: "Plain makhana in four size grades, and a range of nine ready-to-eat flavours.",
    body: [
      "Makhana, also called fox nut or lotus seed, is the popped seed of the Euryale ferox water plant. Traditionally eaten across India, it is now popular worldwide as a light, crunchy snack.",
      "We offer plain makhana graded by size (4+, 5+ and 6+, plus an assorted mix grade) for buyers who roast, flavour or pack it themselves, and nine flavoured varieties, from Peri Peri and Himalayan Salt & Pepper to Cream & Onion, for snack retail.",
    ],
    highlights: [
      { value: String(count("makhana")), label: "makhana lines" },
      { value: "4", label: "size grades" },
      { value: "9", label: "flavours" },
    ],
    groups: [
      { id: "grades", name: "Plain makhana grades", note: "Sized for roasters and packers" },
      { id: "flavoured", name: "Flavoured makhana", note: "Ready-to-eat snack range" },
    ],
    feature: "grade-scale",
    featureTitle: "Graded by size",
    featureText: "Size bands as published on our catalogue.",
    related: ["nuts-seeds", "grains", "dry-spices"],
    sourceUrl: "https://pratibhashyamexports.com/makhana/",
  },
  {
    slug: "nuts-seeds",
    path: "/products/nuts-seeds",
    title: "Nuts & Seeds",
    shortTitle: "Nuts & Seeds",
    eyebrow: "Product category",
    heroImage: asset("cat-nuts.jpg"),
    lede: "Cashew kernels, peanuts and betel nuts, oilseeds, and the edible seeds behind today's health foods.",
    body: [
      "Freshly sourced nuts and seeds, supplied from the farm to buyers worldwide. The range has three parts: nuts such as cashew kernels, betel nuts and peanuts; oilseeds such as sesame, mustard, flax, sunflower, niger and castor; and edible and health seeds such as psyllium (isabgol), pumpkin, watermelon, chia and basil seeds.",
      "These products serve food processors, oil millers, snack and bakery brands, and health-food retailers. Tell us the product and the grade you need, and we will confirm sourcing.",
    ],
    highlights: [
      { value: String(count("nuts-seeds")), label: "products listed" },
      { value: "6", label: "oilseeds" },
      { value: "5", label: "health seeds" },
    ],
    groups: [
      { id: "nuts", name: "Nuts", note: "Cashew, betel nut, peanut" },
      { id: "oilseeds", name: "Oilseeds", note: "For crushing, cooking and industry" },
      { id: "health-seeds", name: "Edible & health seeds", note: "Superfood and fibre seeds" },
    ],
    feature: "mosaic",
    featureTitle: "Freshly sourced, farm to buyer",
    featureText: "Sourced directly where possible, graded before dispatch and shipped with complete export documentation.",
    related: ["makhana", "dry-spices", "grains"],
    sourceUrl: "https://pratibhashyamexports.com/nuts-seeds/",
  },
  {
    slug: "textile",
    path: "/products/textile",
    title: "Textiles",
    shortTitle: "Textile",
    eyebrow: "Product category",
    heroImage: asset("cat-textile.jpg"),
    lede: "From yarn and fabric to finished apparel, home textiles, rugs and technical textiles.",
    body: [
      "India is one of the world's great textile producers, with traditions that run from handloom weaving to modern technical fabrics. Our textile catalogue follows that chain: natural, synthetic and blended yarns; cotton, denim, knitted, linen, silk and handloom fabrics; men's, women's, kids', active and work wear; bed, bath, kitchen and table linen; carpets, dhurries and natural-fibre mats; and jute and technical textiles for medical, agricultural, protective, packaging and industrial uses.",
      "Textile orders are usually built to a buyer's specification. Share the category, construction and quantity you need, and we will confirm sourcing for your order.",
    ],
    highlights: [
      { value: String(count("textile")), label: "textile categories" },
      { value: "6", label: "product families" },
      { value: "5", label: "technical textile segments" },
    ],
    groups: [
      { id: "yarns", name: "Yarns", note: "Cotton, synthetic, blended, natural, silk & wool" },
      { id: "fabrics", name: "Fabrics", note: "Woven, knitted, denim and heritage" },
      { id: "apparel", name: "Apparel", note: "Men's, women's, kids', active and workwear" },
      { id: "home", name: "Home textiles", note: "Bed, bath, kitchen and table" },
      { id: "rugs", name: "Rugs & floor coverings", note: "Carpets, dhurries and mats" },
      { id: "technical", name: "Jute & technical textiles", note: "Industrial, medical, agri, protective, packaging" },
    ],
    feature: "group-index",
    featureTitle: "Six families, one sourcing partner",
    featureText: "Jump to the family you need.",
    related: ["cocopeat", "pharmaceuticals", "nuts-seeds"],
    sourceUrl: "https://pratibhashyamexports.com/textile/",
  },
  {
    slug: "pharmaceuticals",
    path: "/products/pharmaceuticals",
    title: "Pharmaceuticals",
    shortTitle: "Pharmaceuticals",
    eyebrow: "Product category",
    heroImage: asset("cat-pharma.jpg"),
    lede: "Pharmaceutical categories from therapeutic medicines to APIs, vaccines and consumer health, with complete documentation support.",
    body: [
      "Our pharmaceutical range is organised by category: therapeutic medicines from pain relief and fever to diabetes, cardiovascular, gastrointestinal, anti-infective, oncology and critical care; vaccines and immunisation products; active pharmaceutical ingredients and raw materials; and over-the-counter and nutritional products.",
      "Pharmaceutical trade is tightly regulated, and requirements differ by destination. Every enquiry is handled individually: product availability, documentation and import eligibility for your market are confirmed before any quotation.",
    ],
    highlights: [
      { value: String(count("pharmaceuticals")), label: "product categories" },
      { value: "9", label: "therapeutic areas" },
      { value: "2", label: "ingredient categories" },
    ],
    groups: [
      { id: "therapeutic", name: "Therapeutic medicines", note: "Prescription and treatment categories" },
      { id: "vaccines", name: "Vaccines & immunisation", note: "Preventive care" },
      { id: "ingredients", name: "APIs & raw materials", note: "For formulators and manufacturers" },
      { id: "consumer", name: "Consumer health", note: "OTC and nutritional products" },
    ],
    feature: "pharma-note",
    featureTitle: "Documentation first",
    featureText: "We confirm the paperwork your market requires before we quote.",
    related: ["textile", "nuts-seeds", "grains"],
    sourceUrl: "https://pratibhashyamexports.com/pharmaceuticals/",
  },
];

export const CATEGORIES: Category[] = defs.map((d) => ({ ...d, products: PRODUCTS[d.slug] }));

export const getCategory = (slug: string): Category => {
  const c = CATEGORIES.find((x) => x.slug === slug);
  if (!c) throw new Error(`Unknown category ${slug}`);
  return c;
};

export const AGRI_CATEGORIES = CATEGORIES.filter((c) => c.parent === "agriculture");
export const AGRI_TOTAL = AGRI_CATEGORIES.reduce((n, c) => n + c.products.length, 0);
export const CATALOGUE_TOTAL = CATEGORIES.filter((c) => c.slug !== "textile").reduce((n, c) => n + c.products.length, 0);

/* Four top-level business categories (Product page on the live site). */
export interface TopCategory {
  slug: "agriculture" | "nuts-seeds" | "textile" | "pharmaceuticals";
  path: string;
  title: string;
  image: string;
  summary: string;
  description: string;
  count: number;
  countLabel: string;
  children?: { title: string; path: string }[];
}

export const TOP_CATEGORIES: TopCategory[] = [
  {
    slug: "agriculture",
    path: AGRI_BASE,
    title: "Agriculture",
    image: asset("cat-agri.jpg"),
    summary: "Grains, pulses, spices, cereals and processed food.",
    description: "Seven product lines covering fresh produce, dry spices, grains, pulses and cereals, frozen vegetables, dehydrated onion and garlic, cocopeat and makhana.",
    count: AGRI_TOTAL,
    countLabel: "products across 7 lines",
    children: AGRI_CATEGORIES.map((c) => ({ title: c.shortTitle, path: c.path })),
  },
  {
    slug: "nuts-seeds",
    path: "/products/nuts-seeds",
    title: "Nuts & Seeds",
    image: asset("cat-nuts.jpg"),
    summary: "Freshly sourced nuts and seeds, from the farm to global buyers.",
    description: "Cashew kernels, betel nuts and peanuts, six oilseeds, and edible and health seeds such as psyllium, chia and basil.",
    count: count("nuts-seeds"),
    countLabel: "products",
  },
  {
    slug: "textile",
    path: "/products/textile",
    title: "Textile",
    image: asset("cat-textile.jpg"),
    summary: "Fabrics, yarn and home textiles made to international standards.",
    description: "Yarns, fabrics, apparel, home textiles, rugs and technical textiles, from handloom heritage to industrial use.",
    count: count("textile"),
    countLabel: "categories in 6 families",
  },
  {
    slug: "pharmaceuticals",
    path: "/products/pharmaceuticals",
    title: "Pharmaceuticals",
    image: asset("cat-pharma.jpg"),
    summary: "Pharmaceutical products with complete documentation and support.",
    description: "Therapeutic medicines, vaccines, APIs and raw materials, and consumer health products, handled with destination-specific documentation.",
    count: count("pharmaceuticals"),
    countLabel: "categories",
  },
];
