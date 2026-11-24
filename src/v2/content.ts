/* V2 editable content. Everything a future admin panel should change lives in data, never in components:
   this file plus src/site/data/pages.ts (COMPANY, ABOUT, CONTACT_PAGE) and src/site/data/catalogue.ts. */

import { ABOUT, COMPANY } from "../site/data/pages";
import { asset } from "../site/data/catalogue";

export { COMPANY };

/* Published on the live homepage; approved for reuse (PRODUCT.md › Evidence). */
export const STATS = [
  { value: 5000, suffix: "+", label: "Farmers connected" },
  { value: 15, suffix: "+", label: "Countries served" },
  { value: 20, suffix: "+", label: "Commodities" },
  { value: 10, suffix: "+", label: "Years in the trade" },
];

export const ABOUT_INTRO = {
  title: "Rooted in India. *Trusted by buyers worldwide.*",
  text: "Pratibhashyam Exports Pvt Ltd sources from Indian farmers, FPOs and manufacturers and handles procurement, inspection, packing, paperwork and freight in-house, so importers deal with one team from enquiry to delivery.",
  photos: [asset("ops-loading.jpg"), asset("ops-field.jpg"), asset("ops-port-team.jpg")],
};

export interface Director { name: string; role: string; text: string; photo: string }
/* Name–photo mapping confirmed on the live homepage; roles as published on the live About page. */
export const DIRECTORS: Director[] = ABOUT.leaders;

export interface Certificate { name: string; issuer: string; image?: string; href?: string }
/* No verified certificate scans yet. Add real ones here (or via the admin panel); the section shows an empty state until then. */
export const CERTIFICATES: Certificate[] = [];

export const WHY_US = [
  { title: "Quality-assured products", text: "Every consignment is inspected and graded before dispatch, against international standards and the sample you approved." },
  { title: "Direct from farmers & FPOs", text: "We buy from farmers, FPOs and trusted manufacturers, so produce is traceable, fresh and fairly priced without extra middlemen." },
  { title: "One supplier, many categories", text: "Agriculture, grains, pulses, spices, frozen and dehydrated lines, textiles and pharmaceuticals, combined in a single order." },
  { title: "Complete export paperwork", text: "Invoices, packing lists, certificates of origin, phytosanitary certificates and customs clearance, prepared by our team." },
  { title: "Sea and air, tracked", text: "Freight booked with trusted partners on FOB, CFR or CIF terms and tracked until the container reaches you." },
  { title: "A network that answers", text: "International buyers, distributors and partners who help us read markets and respond quickly." },
];

export const PRESENCE = [
  { title: "Nagpur, India", text: "Head office", lon: 79.09, lat: 21.15 },
  { title: "Dubai, UAE", text: "Office", lon: 55.27, lat: 25.2 },
];

export const QUOTE = {
  title: "Share your requirement. *Get a customised quote.*",
  text: "Tell us the product, grade, quantity and destination port, and our team will come back with a quotation.",
  points: ["Customised quotation", "Reliable support and assistance", "FOB, CFR or CIF terms"],
  products: ["Agriculture", "Fruits & Vegetables", "Dry Spices", "Grains, Pulses & Cereals", "Frozen Vegetables", "Dried & Dehydrated", "Cocopeat", "Makhana", "Nuts & Seeds", "Textile", "Pharmaceuticals", "EXIM Training"],
  whatsapp: "917249604373",
};
