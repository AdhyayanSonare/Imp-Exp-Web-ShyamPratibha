# Source content inventory: pratibhashyamexports.com

**Captured:** 18 November 2026, by direct HTTP requests to the live site (all pages returned 200 except `/textile-2/`).
**Method:** each page's HTML was fetched, scripts and styles were stripped, and text blocks and images were extracted in document order. Text repeated on 10 or more pages (header, footer, menus) was removed and is listed once under *Site-wide elements*. Product lists were extracted as image + name pairs straight from the HTML. The raw HTML is not committed.
**Purpose:** a record of everything published on the original site, organised by URL and section, to source the new pages. It also verifies the earlier audit (`pratibhashyam_exports_content_audit.md`) against the live site.

## Page discovery

- The WordPress REST API (`/wp-json/wp/v2/pages`) lists **17 published pages**: home plus the 16 pages below. Following every internal link found no other pages. `wp-sitemap.xml` exists.
- `/textile/` is live with **28 entries**. The Product page and homepage "View Products" button link to **`/textile-2/`, which returns 404**.
- No blog posts, product detail pages or downloadable catalogues are linked.

## Corrections to the earlier audit

| Earlier audit said | Live site on 18 Nov 2026 |
|---|---|
| Textile has no accessible catalogue (`/textile-2/` 404) | `/textile/` is live with 28 categories; only the link is wrong |
| Director names are not mapped to photos or roles | The About page maps names to photos and roles (see About Us below). Homepage pop-ups name each photo too |
| Global presence, stats, hero text | Unchanged and still unverified |
| Agriculture page contains travel copy | Confirmed: "Travel / Makes me Realize how much I haven't Seen…" block with three stock image boxes |
| Frozen Vegetables page label reads "Dry Spices" | Confirmed |

## Site-wide elements (header and footer, on every page)

- **Logo files:** `2026/11/cropped-Farmlogy-Global-Logo.png` and `2026/11/Farmlogy-Global-Logo-1-e1794420965567.png`. The file names say "Farmlogy Global" but the artwork reads "Pratibhashyam Exports".
- **Navigation:** Home · About Us · Product · EXIM Training · Gallery · Contact. Footer headings: Company, Our products, Training, Contact us. There is also an "Enquire Now" button.
- **Footer contact:** +91 7249604373 · 7, Deonagar Opposite Orange City Hospital, Khamla Road, Nagpur 440015 · **pratibhasyamexports@gmail.com** (misspelt: missing the "h"; the Contact page and EXIM FAQ use `pratibhashyamexports@gmail.com`).
- **Footer template text:** "Our construction business is dedicated to delivering high-quality, innovative building solutions, every project is completed". Leftover theme text, unrelated to the business.
- **Other leftovers:** "Shopping Basket" (theme cart), "Copyright © 2026 All Right Reserved".
- **Social links:** Facebook, Twitter, YouTube, Instagram and WhatsApp icons exist, but the links point to the theme vendor (`facebook.com/xpeedstudio`, `facebook.com/wpmetcom`, `twitter.com/wpmetcom`, `linkedin.com/company/wpmet`), not the company.


---

## Home (recorded for completeness; the new homepage is handled separately)

**URL:** https://pratibhashyamexports.com/  
**Status:** 200 OK (fetched 18 Nov 2026)

**Findings:**
- Hero: label 'Trusted Exporter | Worldwide'; headline 'Indian Exporter of Premium Spices and Pulses / Grains and Cereals / Agricultural Products / Textiles & Pharmaceuticals'; intro claims 'our own presence in the UAE, Thailand & Canada'; badge '4.9/5 Google Rating'.
- Stats: 5000+ Farmers Connected · 15+ Countries Served · 20+ 'Commodites' (typo) · 10+ Industry Experience. No source or date given.
- 'Our Certifications' section: the copy is cut off mid-sentence and the images are operational photos, not certificates. A separate logo strip (2026/11/1.png to 11.png and 'Add-a-little-bit-of-body-text-11 to 17') shows GMP, EPCH, FIEO, Kosher, Halal, BRCGS, HACCP, Coir Board, Pharmexcil, AEPC, Texprocil, Coconut Development Board, FSSAI, IEC, APEDA, Spices Board, ISO and GST marks, with no certificate numbers or scope.
- Director pop-ups contain template contact data: '+(423) 760 224 96', 'help@elementskit.com', 'wpmet.com'.
- 'See how we work behind the scenes … Watch our work for yourself' but no video is embedded.
- Closing line typo: 'Start Yout Export Import Journey Today !'.

**Content in page order** (site header/footer removed; see "Site-wide elements"):

- Trusted Exporter | Worldwide

*Indian Exporter of Premium*  
Spices and Pulses

Grains and Cereals

Agricultural Products

Textiles & Pharmaceuticals

is a trusted

Indian export company

supplying agricultural products, grains, cereals, pulses, spices, textiles and pharmaceuticals to buyers across the globe. With our own presence in the

UAE

,

Thailand & Canada

and a strong international network, we deliver consistent quality, compliant documentation and on-time shipments to importers and distributors worldwide.

- 4.9/5 Google Rating
- Contact Us
- 🖼 `2026/04/Untitled-design.png`

*5000+*  
Farmers Connected

*15+*  
Countries Served

*20+*  
Commodites

*10+*  
Industry Experience

**About**  
- 🖼 `2026/11/Untitled-design-1-6-e1794393372827.png`
is a reputable Indian exporter of agricultural products, grains, cereals, pulses, spices, textiles and pharmaceuticals. Led by directors Deepak Wankhede, Amit Bhole, Sudhir Kachore and Hemant Sonare, we manage the export process, from procurement and quality inspections to packaging, documentation, logistics and delivery.

With a formidable global presence and an international network of buyers and associates, we serve markets with consistent quality and punctual shipments. We encourage Farmer Producer Organisations (FPOs) and smallholder producers to enter export markets, and we organise awareness events and more, educating them on export procedures, quality standards and global opportunities.

Whether you are an importer seeking a dependable supplier or a producer prepared to explore exports, we are your gateway to the world.

- 🖼 `2026/11/Untitled-design.png`

**Our**  

**Products**  
- 🖼 `2026/11/1-3-768x533.png`
Grains, pulses, spices, cereals, lentils, and Processed Food for buyers.

- View Products
- 🖼 `2026/11/1-1-1-768x533.png`

*Nuts and Seeds*  
Premium freshly sourced Nuts and seeds directly from the farm to global buyers.

- View Products
- 🖼 `2026/11/1-3-1-768x533.png`

*Textile*  
Quality fabrics, yarn and home textiles made to international standards.

- View Products
- 🖼 `2026/11/1-4-768x533.png`

*Pharmaceuticals*  
Pharmaceutical products with complete documentation and support.

- View Products

**Our Certifications**  
- 🖼 `2026/11/Add-a-little-bit-of-body-text-11.png`
- 🖼 `2026/11/Add-a-little-bit-of-body-text-12.png`
- 🖼 `2026/11/Add-a-little-bit-of-body-text-13.png`
- 🖼 `2026/11/Add-a-little-bit-of-body-text-14.png`
- 🖼 `2026/11/Add-a-little-bit-of-body-text-15.png`
- 🖼 `2026/11/Add-a-little-bit-of-body-text-16.png`
- 🖼 `2026/11/Add-a-little-bit-of-body-text-17.png`
- 🖼 `2026/11/1.png`
- 🖼 `2026/11/2.png`
- 🖼 `2026/11/3.png`
- 🖼 `2026/11/4.png`
- 🖼 `2026/11/5-1.png`
- 🖼 `2026/11/6-1.png`
- 🖼 `2026/11/7.png`
- 🖼 `2026/11/8.png`
- 🖼 `2026/11/9.png`
- 🖼 `2026/11/10.png`
- 🖼 `2026/11/11.png`
We build quality at every stage, from farm to container. Our team works closely with farmers and FPOs, inspects products at source, coordinates with logistics partners and supervises loading at

- 🖼 `2026/11/a3.png`
- 🖼 `2026/11/a-1.png`
- 🖼 `2026/11/a2-1.png`
- 🖼 `2026/05/aa.jpg`
- 🖼 `2026/04/7.png`
- 🖼 `2026/05/aa-1.jpg`
- 🖼 `2026/09/SA.png`
- 🖼 `2026/09/SA-1.png`
- 🖼 `2026/09/SA-2.png`

**Why Choose**  
for Your Global Sourcing Needs

Here is what makes us a preferred export partner for buyers worldwide

Choosing the right export partner is one of your business’s most important decisions. With so many suppliers available, it is easy to get confused. We do not just promise quality; we deliver it. From carefully sourced products and strict quality checks to compliant documentation and on-time shipments, here is what makes us a dependable choice for importers, distributors and businesses across the world.

*Quality-Assured Products*  
Every consignment is carefully inspected and graded before dispatch. We follow strict quality checks for international standards and match the samples approved by our buyers.

*Direct Sourcing from Farmers & FPOs*  
We work directly with farmers, FPOs and trusted manufacturers. This ensures traceable sourcing, fresh produce, fair practices and competitive pricing without unnecessary middlemen.

*Wide Quality Product Range*  
Agriculture products, grains, cereals, pulses, spices, textiles and pharmaceuticals, Frozen Dehydrated, all from one trusted source. Buyers can combine multiple categories.

*Complete Export Documentation*  
Our experienced team handles all export paperwork, including invoices, packing lists, certificates of origin, phytosanitary certificates and customs clearance, so every shipment moves smoothly.

*Reliable Global Logistics*  
We coordinate sea and air freight with trusted logistics partners and offer flexible terms such as FOB, CFR and CIF. Our team tracks every shipment until it reaches your destination.

*Strong & Trusted Global Network*  
Our international presence and network of buyers, distributors, Wholesalers and partners help us understand different markets, respond quickly and build long-term business relationships.

**Meet Our**  

**Directors**  
- 🖼 `2026/11/mm.png`
- Dr. Hemant Sonare
- 🖼 `2026/11/mm.png`

**Dr. Hemant Sonare**  
Phone:

- +(423) 760 224 96
Email:

- help@elementskit.com
Website:

- wpmet.com
- 🖼 `2026/11/mm-1.png`
- Mr. Amit Bhole
- 🖼 `2026/11/mm-1.png`

**Mr. Amit Bhole**  
Phone:

- +(423) 760 224 96
Email:

- help@elementskit.com
Website:

- wpmet.com
- 🖼 `2026/11/mm-2.png`
- Mr. Sudhir Kachore
- 🖼 `2026/11/mm-2.png`

**Mr. Sudhir Kachore**  
Phone:

- +(423) 760 224 96
Email:

- help@elementskit.com
Website:

- wpmet.com
- 🖼 `2026/11/Professional-South-Asian-Corporate-Headshot.png`
- Mr. Deepak Wankhede
- 🖼 `2026/11/Professional-South-Asian-Corporate-Headshot.png`

**Mr. Deepak Wankhede**  
Phone:

- +(423) 760 224 96
Email:

- help@elementskit.com
Website:

- wpmet.com

**Connect with Pratibhashyam Exports Pvt Ltd**  
Partner with us for premium quality exports. Share your requirements through the form, and our team will respond with a customised quotation and ensure a smooth, hassle free trade experience with timely delivery and trusted service.

**✅ Get a Customised Quote ✅ Reliable Support & Assistance ✅ Seamless Global Trade Solutions**  
We are here to fulfil your export needs with quality, trust and efficiency. Reach out today and let’s grow together in global trade!

See how we work behind the scenes, from

sourcing at the farm and quality checks to packing, container loading and final shipment

. At Pratibhashyam Exports, every consignment is handled with care, so our global buyers receive exactly what they ordered. Watch our work for yourself.

**Our**  

**Global**  
Presence

- Dubai, UAE office
- India office
- Export destinations

**From Farm**  
to Container

Every step matters. From carefully sourcing fresh produce to loading export-ready containers, we ensure quality at every stage.

01

*FARM SOURCING*  
- 🌱
- FRESH FROM FARM
We partner with trusted farmers and suppliers to source fresh, quality agricultural products.

02

*QUALITY CHECK*  
- 🔍
- QUALITY ASSURED
Every batch undergoes careful inspection to meet our quality and export requirements.

03

*GRADING & SORTING*  
- 🥥
- SELECTED QUALITY
Products are graded, sorted and selected according to buyer specifications.

04

*PROCESSING*  
- ⚙️
- EXPORT PREPARATION
Products are cleaned, processed and prepared according to international requirements.

05

*PACKAGING*  
- 📦
- SECURE PACKING
Export-grade packaging ensures safe handling and protection during international transit.

06

*CONTAINER LOADING*  
- 🚢
- READY TO SHIP
Goods are securely loaded into containers and prepared for global delivery.

**Start Yout Export Import Journey Today !**  
- Connect Us

---

## About Us

**URL:** https://pratibhashyamexports.com/about-us/  
**Status:** 200 OK (fetched 18 Nov 2026)

**Findings:**
- Published name → photo → role mapping: Dr. Hemant Sonare = mm.png (strategy & standards); Mr. Amit K Bhole = mm-1.png (buyer relationships & supply chain); Mr. Sudhir Kachore = mm-2.png (sourcing & quality checks); Mr. Deepak Wankhede = Professional-South-Asian-Corporate-Headshot.png (growth, global network, FPO support).
- Each director pop-up contains template placeholders: 'A small river named Duden flows by their place…', Phone '+1 (859) 254-6589', Email 'info@example.com'.
- Counters 'Quality Assurance 0%' and 'On-Time Shipment Commitment 0%' are unconfigured.
- Heading typo 'Vission & Mission'. 'six export categories' conflicts with the four categories on the Product page.

**Content in page order** (site header/footer removed; see "Site-wide elements"):


**Rooted in India,**  

**Trusted**  
Across world

Pratibhashyam Exports Pvt Ltd is an Indian export company supplying agricultural products, grains, cereals, pulses, spices, textiles and pharmaceuticals to buyers around the world. We connect Indian farmers, producers and manufacturers with international markets through reliable sourcing, honest dealing and consistent quality.

Our four directors oversee every stage of the export cycle, from sourcing and quality checks to packaging, documentation and logistics, so each consignment reaches the buyer exactly as promised.

- Quality-checked products across six export categories
- Direct sourcing from farmers, FPOs and manufacturers
- Complete export documentation and on-time shipments

**Operating Across the Globe**  
Our international network of buyers, distributors and partners lets us serve diverse markets and respond quickly to their needs.

**Trusted by Buyers & Producers**  
Importers rely on us for consistent quality and timely delivery, while FPOs and farmers trust us for fair, transparent dealing.

**Delivering**  

**Solution**  
For Global Trade

We simplify exporting for buyers and producers alike, with dependable sourcing, strict quality control and complete shipment support from start to finish.

- Quality Assurance
- 0
%

- On-Time Shipment Commitment
- 0
%

**Meet the**  

**Leadership**  
Behind Every Shipment

Four directors, one commitment: quality exports delivered on time.

- 🖼 `2026/11/mm.png`
- Dr. Hemant Sonare
Director guiding our strategy and standards, so every export or domestic consignment meets the quality our global buyers expect.

- 🖼 `2026/11/mm.png`

**Dr. Hemant Sonare**  
A small river named Duden flows by their place and supplies it with the necessary

Phone:

- +1 (859) 254-6589
Email:

- info@example.com
- 🖼 `2026/11/mm-1.png`
- Mr. Amit K Bhole
Director focused on building lasting buyer relationships and keeping our supply chain reliable, transparent and on schedule.

- 🖼 `2026/11/mm-1.png`

**Mr. Amit K Bhole**  
A small river named Duden flows by their place and supplies it with the necessary

Phone:

- +1 (859) 254-6589
Email:

- info@example.com
- 🖼 `2026/11/mm-2.png`
- Mr. Sudhir Kachore
Director committed to disciplined sourcing and quality checks, ensuring products match approved samples and export specifications.

- 🖼 `2026/11/mm-2.png`

**Mr. Sudhir Kachore**  
A small river named Duden flows by their place and supplies it with the necessary

Phone:

- +1 (859) 254-6589
Email:

- info@example.com
- 🖼 `2026/11/Professional-South-Asian-Corporate-Headshot-1024x1024.png`
- Mr. Deepak Wankhede
Director driving our growth and global network, and supporting FPOs and producers as they enter export markets.

- 🖼 `2026/11/Professional-South-Asian-Corporate-Headshot-1024x1024.png`

**Mr. Deepak Wankhede**  
A small river named Duden flows by their place and supplies it with the necessary

Phone:

- +1 (859) 254-6589
Email:

- info@example.com

**Our**  

**Vission**  
& Mission

Our purpose and the promise behind every shipment we send.

*Our Vision*  
To be a globally trusted Indian export company, connecting farmers, producers and manufacturers with international markets through uncompromising quality, integrity and reliable service.

*Our Mission*  
To deliver quality agricultural products, textiles and pharmaceuticals to buyers worldwide with honest dealing and timely shipments, while empowering FPOs and small producers to enter export markets.


---

## Product (category index)

**URL:** https://pratibhashyamexports.com/product/  
**Status:** 200 OK (fetched 18 Nov 2026)

**Findings:**
- Four tiles: Agriculture (image Untitled-design-1-7), Nuts & Seeds (7-4), Textile (8-3), Pharmaceutical (9-2). The Agriculture tile has no visible heading in the HTML.
- The Textile tile links to /textile-2/ (404) instead of /textile/.

**Content in page order** (site header/footer removed; see "Site-wide elements"):


**Check Out our products**  
- 🖼 `2026/11/Untitled-design-1-7-768x533.png`
- View Products
- 🖼 `2026/11/Untitled-design-7-4-768x533.png`

*Nuts & Seeds*  
- View Products
- 🖼 `2026/11/Untitled-design-8-3-768x533.png`

*Textile*  
- View Products
- 🖼 `2026/11/Untitled-design-9-2-768x533.png`

*Pharmaceutical*  
- View Products

---

## Agriculture category index

**URL:** https://pratibhashyamexports.com/agriculture-product-page/  
**Status:** 200 OK (fetched 18 Nov 2026)

**Findings:**
- Seven sub-category tiles, in order: Fruits & Vegetables · Spices · Grains Pulses and Cereals · Frozen Vegetables · Dried & Dehydrated · Cocopeat · Makhana (Fox Nut).
- Template contamination below the tiles: 'Travel', 'Makes me Realize how much I haven't Seen', banking/insurance copy, and three stock boxes (Capture the Best Memories, Get the Awesome Tour Guide, Feel the Gratitude of Soul). Removed in the new site.

**Content in page order** (site header/footer removed; see "Site-wide elements"):


**Check Out our Agriculture Categories**  
- 🖼 `2026/11/Untitled-design-1-768x533.png`

*Fruits & Vegetables*  
- View Products
- 🖼 `2026/11/Untitled-design-1-1-768x533.png`

*Spices*  
- View Products
- 🖼 `2026/11/Untitled-design-2-768x533.png`

*Grains Pulses and Cereals*  
- View Products
- 🖼 `2026/11/Untitled-design-3-768x533.png`

*Frozen Vegetables*  
- View Products
- 🖼 `2026/11/Untitled-design-4-768x533.png`

*Dried & Dehydrated*  
- View Products
- 🖼 `2026/11/Untitled-design-5-768x533.png`

*Cocopeat*  
- View Products
- 🖼 `2026/11/Untitled-design-6-768x533.png`

*Makhana (Fox Nut)*  
- View Products
Travel

**Makes me**  

**Realize**  
how much I haven’t Seen

From banking and insurance to wealth management and securities distribution, we dedicated financial services the teams serve

- 🖼 `2026/11/Image-Box-2a-1-1-768x533.jpg`

*Capture the Best Memories*  
Enjoy every moment of your life. We’re available for travel photo assignments worldwide.

- Read More
- 🖼 `2026/11/Image-Box-2b-1-1-768x533.jpg`

*Get the Awesome Tour Guide*  
One of the most important things is to pick a tour operator or trekking agency. We will help you.

- Read More
- 🖼 `2026/11/Image-Box-2c-1-1-768x533.jpg`

*Feel the Gratitude of Soul*  
Every issue that arises will be explained in detail. It’s time to start planning your adventures.

- Read More

---

## Fruits & Vegetables

**URL:** https://pratibhashyamexports.com/fruits-vegetables/  
**Status:** 200 OK (fetched 18 Nov 2026)

**Findings:**
- Every product image has an incorrect alt text ('Green Cardamom (n)' or 'Cluster Beans (n)'). The images themselves match the product names (checked visually).

**Page label / breadcrumb text:** "Fruits & Vegetables"  
**Section heading:** "Check Out Our Products"

**Product entries: 15** (each entry is an image followed by a name; no descriptions, specifications or prices are published)

| # | Product name, exactly as published | Image file (uploads/…) | Alt text as published |
|---|---|---|---|
| 1 | Fresh Onions | `elementor/thumbs/Green-Cardamom-3.png` | Green Cardamom |
| 2 | Green Chillies | `elementor/thumbs/Green-Cardamom-1-1.png` | Green Cardamom (1) |
| 3 | Okra | `elementor/thumbs/Green-Cardamom-2-1.png` | Green Cardamom (2) |
| 4 | Drumsticks | `elementor/thumbs/Green-Cardamom-3-1.png` | Green Cardamom (3) |
| 5 | Curry Leaves | `elementor/thumbs/Green-Cardamom-4.png` | Green Cardamom (4) |
| 6 | Elephant Yam | `elementor/thumbs/Green-Cardamom-5.png` | Green Cardamom (5) |
| 7 | Fresh Ginger | `elementor/thumbs/Green-Cardamom-6.png` | Green Cardamom (6) |
| 8 | Cauliflower | `elementor/thumbs/Green-Cardamom-7.png` | Green Cardamom (7) |
| 9 | French Beans | `elementor/thumbs/Green-Cardamom-8.png` | Green Cardamom (8) |
| 10 | Cluster Beans | `elementor/thumbs/Cluster-Beans.png` | Cluster Beans |
| 11 | Fresh Garlic | `elementor/thumbs/Cluster-Beans-1.png` | Cluster Beans (1) |
| 12 | Mangoes | `elementor/thumbs/Cluster-Beans-2.png` | Cluster Beans (2) |
| 13 | Grapes | `elementor/thumbs/Cluster-Beans-3.png` | Cluster Beans (3) |
| 14 | Pomegranates | `elementor/thumbs/Cluster-Beans-4.png` | Cluster Beans (4) |
| 15 | Bananas | `elementor/thumbs/Cluster-Beans-5.png` | Cluster Beans (5) |

---

## Dry Spices

**URL:** https://pratibhashyamexports.com/dry-spices/  
**Status:** 200 OK (fetched 18 Nov 2026)

**Findings:**
- 'Musterd Seeds' typo (shown as 'Mustard Seeds' in the new site; the original label is kept in data as `source`). Alt texts are file names ('1-1.png').

**Page label / breadcrumb text:** "Dry Spices"  
**Section heading:** "Check Out our products"

**Product entries: 12** (each entry is an image followed by a name; no descriptions, specifications or prices are published)

| # | Product name, exactly as published | Image file (uploads/…) | Alt text as published |
|---|---|---|---|
| 1 | Dry Red Chillies | `elementor/thumbs/1-1.png` | 1-1.png |
| 2 | Raw Turmeric | `elementor/thumbs/2-1.png` | 2-1.png |
| 3 | Cumin Seeds | `elementor/thumbs/3-1.png` | 3-1.png |
| 4 | Coriander Seeds | `elementor/thumbs/4-1.png` | 4-1.png |
| 5 | Dry Onion | `elementor/thumbs/5.png` | 5.png |
| 6 | Dry Ginger | `elementor/thumbs/6.png` | 6.png |
| 7 | Green Cardamom | `elementor/thumbs/Green-Cardamom.png` | Green Cardamom |
| 8 | Black Cardamom | `elementor/thumbs/Green-Cardamom-1.png` | Green Cardamom (1) |
| 9 | Fenugreek Seeds | `elementor/thumbs/Green-Cardamom-2.png` | Green Cardamom (2) |
| 10 | Fennel Seeds | `elementor/thumbs/Fennel-Seeds.png` | Fennel Seeds |
| 11 | Musterd Seeds | `elementor/thumbs/musterd-seeds.png` | musterd seeds |
| 12 | Nutmeg | `elementor/thumbs/Nutmeg.png` | Nutmeg |

---

## Grains (Grains, Pulses & Cereals)

**URL:** https://pratibhashyamexports.com/grains/  
**Status:** 200 OK (fetched 18 Nov 2026)

**Findings:**
- All but one image use the alt text 'Cluster Beans'; the images show the correct grains. Spacing inconsistencies such as '1509 Basmati Rice ( Sella Rice )'. 1401 entries are appended at the end, out of variety order.

**Page label / breadcrumb text:** "Grains"  
**Section heading:** "Check Out Our Products"

**Product entries: 33** (each entry is an image followed by a name; no descriptions, specifications or prices are published)

| # | Product name, exactly as published | Image file (uploads/…) | Alt text as published |
|---|---|---|---|
| 1 | 1121 Basmati (Creamy Sella) | `elementor/thumbs/Cluster-Beans-6.png` | Cluster Beans (6) |
| 2 | 1121 Basmati (Golden Sella) | `elementor/thumbs/Cluster-Beans-7.png` | Cluster Beans (7) |
| 3 | 1121 Basmati Rice (Steam Rice) | `elementor/thumbs/Cluster-Beans-8.png` | Cluster Beans (8) |
| 4 | 1121 Basmati Rice (Raw Rice) | `elementor/thumbs/Cluster-Beans-9.png` | Cluster Beans (9) |
| 5 | 1509 Basmati Rice ( Sella Rice ) | `elementor/thumbs/Cluster-Beans-10.png` | Cluster Beans |
| 6 | 1509 Basmati (Golden Sella) | `elementor/thumbs/Cluster-Beans-1-1.png` | Cluster Beans (1) |
| 7 | 1509 Basmati (Steam Rice) | `elementor/thumbs/Cluster-Beans-2-1.png` | Cluster Beans (2) |
| 8 | 100% Broken Rice (Brewing, animal feed & flour) | `elementor/thumbs/Cluster-Beans-15.png` | Cluster Beans |
| 9 | Pusa Basmati Rice | `elementor/thumbs/1121-Pusa-Basmati-Rice.jpg` | 1121-Pusa-Basmati-Rice. |
| 10 | IR-64 Parboiled (5% broken) - Non-Basmati Rice | `elementor/thumbs/Cluster-Beans-16.png` | Cluster Beans |
| 11 | IR-64 Raw (25% broken) - Non-Basmati Rice | `elementor/thumbs/Cluster-Beans-1-5.png` | Cluster Beans (1) |
| 12 | Sona Masoori (Steam) - Non Basmati Rice | `elementor/thumbs/Cluster-Beans-2-3.png` | Cluster Beans (2) |
| 13 | Sona Masoori (Raw) - Non Basmati Rice | `elementor/thumbs/Cluster-Beans-3-2.png` | Cluster Beans (3) |
| 14 | Swarna ( Parboiled ) - Non Basmati | `elementor/thumbs/Cluster-Beans-1-4.png` | Cluster Beans (1) |
| 15 | Horse Gram | `elementor/thumbs/Cluster-Beans-11.png` | Cluster Beans |
| 16 | Milling Wheat (Sharbati, Lokwan, Durum) | `elementor/thumbs/Cluster-Beans-14.png` | Cluster Beans (14) |
| 17 | Yellow Maize (Food Grade & Animal Feed Grade) | `elementor/thumbs/Cluster-Beans-13.png` | Cluster Beans (13) |
| 18 | White Maize (human dietary staple) | `elementor/thumbs/Cluster-Beans-12.png` | Cluster Beans (12) |
| 19 | Indian Pearl Millet (Indian Bajra) | `elementor/thumbs/Cluster-Beans-11-1.png` | Cluster Beans (11) |
| 20 | Sorghum (Jowar) White, Yellow | `elementor/thumbs/Cluster-Beans-10-1.png` | Cluster Beans (10) |
| 21 | Indian Finger Millet (Ragi / Nachni) | `elementor/thumbs/Cluster-Beans-9-1.png` | Cluster Beans (9) |
| 22 | Chickpeas (Kabuli Chana) | `elementor/thumbs/Cluster-Beans-8-1.png` | Cluster Beans (8) |
| 23 | Bengal Gram (Desi Chana) | `elementor/thumbs/Cluster-Beans-7-1.png` | Cluster Beans (7) |
| 24 | Pigeon Peas (Toor Dal) | `elementor/thumbs/Cluster-Beans-6-1.png` | Cluster Beans (6) |
| 25 | Green Gram (Moong Dal) - Whole and Split | `elementor/thumbs/Cluster-Beans-5-1.png` | Cluster Beans (5) |
| 26 | Black Gram (Urad Dal) - Whole and Split | `elementor/thumbs/Cluster-Beans-4-1.png` | Cluster Beans (4) |
| 27 | Kidney Beans (Rajma) - Red, Chitra, and White | `elementor/thumbs/Cluster-Beans-3-1.png` | Cluster Beans (3) |
| 28 | Red Lentils (Masoor Dal) | `elementor/thumbs/Cluster-Beans-2-2.png` | Cluster Beans (2) |
| 29 | Black-Eyed Peas | `elementor/thumbs/Cluster-Beans-1-2.png` | Cluster Beans (1) |
| 30 | 1401 Steam Basmati Rice | `elementor/thumbs/Cluster-Beans-2-4.png` | Cluster Beans (2) |
| 31 | 1401 Sella Basmati Rice | `elementor/thumbs/Cluster-Beans-1-6.png` | Cluster Beans (1) |
| 32 | 1401 Golden Sella Basmati | `elementor/thumbs/Cluster-Beans-18.png` | Cluster Beans |
| 33 | 1401 Raw Basmati Rice | `elementor/thumbs/Cluster-Beans-17.png` | Cluster Beans |

---

## Frozen Vegetables

**URL:** https://pratibhashyamexports.com/frozen-vegetables/  
**Status:** 200 OK (fetched 18 Nov 2026)

**Findings:**
- The page label/breadcrumb reads 'Dry Spices' (copy-paste error). Alt texts are 'Cluster Beans (n)'.

**Page label / breadcrumb text:** "Dry Spices"  
**Section heading:** "Check Out our products"

**Product entries: 28** (each entry is an image followed by a name; no descriptions, specifications or prices are published)

| # | Product name, exactly as published | Image file (uploads/…) | Alt text as published |
|---|---|---|---|
| 1 | Frozen Green Peas | `elementor/thumbs/Cluster-Beans-3-3.png` | Cluster Beans (3) |
| 2 | Frozen Sweet Corn | `elementor/thumbs/Cluster-Beans-4-2.png` | Cluster Beans (4) |
| 3 | Frozen Apple Gourd Dice | `elementor/thumbs/Cluster-Beans-19.png` | Cluster Beans |
| 4 | Frozen Broccoli Florets | `elementor/thumbs/Cluster-Beans-1-7.png` | Cluster Beans (1) |
| 5 | Frozen Capsicum Cut | `elementor/thumbs/Cluster-Beans-2-5.png` | Cluster Beans (2) |
| 6 | Frozen White Onion Dice | `elementor/thumbs/Cluster-Beans-3-4.png` | Cluster Beans (3) |
| 7 | Frozen Ginger Dice | `elementor/thumbs/Cluster-Beans-7-2.png` | Cluster Beans (7) |
| 8 | Frozen Cauliflower Florets | `elementor/thumbs/Cluster-Beans-4-3.png` | Cluster Beans (4) |
| 9 | Frozen Radish Cut | `elementor/thumbs/Cluster-Beans-5-2.png` | Cluster Beans (5) |
| 10 | Frozen Beetroot Dice | `elementor/thumbs/Cluster-Beans-6-2.png` | Cluster Beans (6) |
| 11 | Frozen Drumsticks Cut | `elementor/thumbs/Cluster-Beans-8-2.png` | Cluster Beans (8) |
| 12 | Frozen Okra Slice | `elementor/thumbs/Cluster-Beans-9-2.png` | Cluster Beans (9) |
| 13 | Frozen Carrot Slice | `elementor/thumbs/Cluster-Beans-10-2.png` | Cluster Beans (10) |
| 14 | Frozen Tomato Dice | `elementor/thumbs/Cluster-Beans-12-1.png` | Cluster Beans (12) |
| 15 | Frozen Red Onion Dice | `elementor/thumbs/Cluster-Beans-11-2.png` | Cluster Beans (11) |
| 16 | Frozen Green Chillies | `elementor/thumbs/Cluster-Beans-13-1.png` | Cluster Beans (13) |
| 17 | Frozen Peeled Garlic Cloves | `elementor/thumbs/Cluster-Beans-14-1.png` | Cluster Beans (14) |
| 18 | Frozen French Bean Slices | `elementor/thumbs/Cluster-Beans-15-1.png` | Cluster Beans (15) |
| 19 | Frozen Bitter Gourd Slices | `elementor/thumbs/Cluster-Beans-16-1.png` | Cluster Beans (16) |
| 20 | Frozen Crushed Garlic | `elementor/thumbs/Cluster-Beans-17-1.png` | Cluster Beans (17) |
| 21 | Frozen Black Plum Pulp | `elementor/thumbs/Cluster-Beans-18-1.png` | Cluster Beans (18) |
| 22 | Frozen Spinach Cubes | `elementor/thumbs/Cluster-Beans-6-3.png` | Cluster Beans (6) |
| 23 | Frozen Pointed Gourd Slices | `elementor/thumbs/Cluster-Beans-5-3.png` | Cluster Beans (5) |
| 24 | Frozen Fenugreek Cubes | `elementor/thumbs/Cluster-Beans-4-4.png` | Cluster Beans (4) |
| 25 | Frozen Ivy Gourd Slices | `elementor/thumbs/Cluster-Beans-3-5.png` | Cluster Beans (3) |
| 26 | Frozen Mix Veg (green peas, capsicum dice, French beans, and cauliflower florets) | `elementor/thumbs/Cluster-Beans-1-8.png` | Cluster Beans (1) |
| 27 | Frozen Mix Veg (green peas, capsicum dice, and cauliflower florets) | `elementor/thumbs/Cluster-Beans-2-6.png` | Cluster Beans (2) |
| 28 | Frozen Mix Veg ( green peas, capsicum dice, and French beans) | `elementor/thumbs/Cluster-Beans-20.png` | Cluster Beans |

---

## Dried & Dehydrated

**URL:** https://pratibhashyamexports.com/dried-dehydrated/  
**Status:** 200 OK (fetched 18 Nov 2026)

**Findings:**
- Every alt text reads 'Dried Onion Chopped', including the garlic products.

**Page label / breadcrumb text:** "Dried & Dehydrated"  
**Section heading:** "Check Out our products"

**Product entries: 12** (each entry is an image followed by a name; no descriptions, specifications or prices are published)

| # | Product name, exactly as published | Image file (uploads/…) | Alt text as published |
|---|---|---|---|
| 1 | Dried Onion Flakes | `elementor/thumbs/Dried-Onion-Chopped-1.png` | Dried Onion Chopped (1) |
| 2 | Dried Onion Chopped | `elementor/thumbs/Dried-Onion-Chopped.png` | Dried Onion Chopped |
| 3 | Dried Onion Minced | `elementor/thumbs/Dried-Onion-Chopped-2.png` | Dried Onion Chopped |
| 4 | Dried Onion Granules Big | `elementor/thumbs/Dried-Onion-Chopped-3.png` | Dried Onion Chopped |
| 5 | Dried Onion Granules Small | `elementor/thumbs/Dried-Onion-Chopped-4.png` | Dried Onion Chopped |
| 6 | Dried Onion Powder | `elementor/thumbs/Dried-Onion-Chopped-5.png` | Dried Onion Chopped |
| 7 | Crispy Golden Fried Onion | `elementor/thumbs/Dried-Onion-Chopped-6.png` | Dried Onion Chopped |
| 8 | Crispy Red / Pink Fried Onion | `elementor/thumbs/Dried-Onion-Chopped-7.png` | Dried Onion Chopped |
| 9 | Dried Garlic Minced | `elementor/thumbs/Dried-Onion-Chopped-8.png` | Dried Onion Chopped |
| 10 | Dried Garlic Granules Big | `elementor/thumbs/Dried-Onion-Chopped-9.png` | Dried Onion Chopped |
| 11 | Dried Garlic Granules Small | `elementor/thumbs/Dried-Onion-Chopped-10.png` | Dried Onion Chopped |
| 12 | Dried Garlic Powder | `elementor/thumbs/Dried-Onion-Chopped-11.png` | Dried Onion Chopped |

---

## Cocopeat

**URL:** https://pratibhashyamexports.com/cocopeat/  
**Status:** 200 OK (fetched 18 Nov 2026)

**Findings:**
- Page label reads 'Coco Peat'. Product images are packaging mock-ups with sizes printed on the pack.

**Page label / breadcrumb text:** "Coco Peat"  
**Section heading:** "Check Out our products"

**Product entries: 8** (each entry is an image followed by a name; no descriptions, specifications or prices are published)

| # | Product name, exactly as published | Image file (uploads/…) | Alt text as published |
|---|---|---|---|
| 1 | Coco Peat 5 Kg Block | `elementor/thumbs/Coco-Peat-5-kg.png` | Coco Peat 5 kg |
| 2 | Coco Peat 1 Kg Block | `elementor/thumbs/Coco-Peat-1-kg.png` | Coco Peat 1 kg |
| 3 | Coco Chips 1 Kg Block | `elementor/thumbs/Coco-chips-1-kg.png` | Coco chips 1 kg |
| 4 | Coir Disk Round Nude | `elementor/thumbs/Coir-Disk.png` | Coir Disk |
| 5 | Coir Disk Round Net / Jiffy | `elementor/thumbs/Coir-Disk-1.png` | Coir Disk (1) |
| 6 | Coir Pot | `elementor/thumbs/Coir-pot.png` | Coir pot |
| 7 | Coir Pot Square | `elementor/thumbs/Coir-square-pot.png` | Coir square pot |
| 8 | Buffered Coir Pith | `elementor/thumbs/Buffered-Coir-pith.png` | Buffered Coir pith |

---

## Makhana

**URL:** https://pratibhashyamexports.com/makhana/  
**Status:** 200 OK (fetched 18 Nov 2026)

**Findings:**
- 'Mint Makhana' uses image 'Simply-Salt-1'; the image shows green (mint-coloured) makhana, so the file name is the only mismatch. Grade names spaced as '12- 15 mm'.

**Page label / breadcrumb text:** "Makhana"  
**Section heading:** "Check Out our products"

**Product entries: 13** (each entry is an image followed by a name; no descriptions, specifications or prices are published)

| # | Product name, exactly as published | Image file (uploads/…) | Alt text as published |
|---|---|---|---|
| 1 | Makhana (Fox Nut) 4+ Grade 12- 15 mm | `elementor/thumbs/Cluster-Beans-7-3.png` | Cluster Beans (7) |
| 2 | Makhana (Fox Nut) 5+ Grade 12- 18 mm | `elementor/thumbs/Cluster-Beans-21.png` | Cluster Beans |
| 3 | Makhana (Fox Nut) 6+ Grade >19 mm | `elementor/thumbs/Cluster-Beans-22.png` | Cluster Beans |
| 4 | Makhana (Fox Nut) Assorted Mix Grade | `elementor/thumbs/Cluster-Beans-1-9.png` | Cluster Beans (1) |
| 5 | Tangy Tomato Makhana | `elementor/thumbs/Tangy-Tomato.png` | Tangy Tomato |
| 6 | Mint Makhana | `elementor/thumbs/Simply-Salt-1.png` | Simply Salt (1) |
| 7 | Himalayan Salt & Pepper | `elementor/thumbs/Himalayan-Salt-Pepper.png` | Himalayan Salt & Pepper |
| 8 | Peri Peri | `elementor/thumbs/Peri-Peri.png` | Peri Peri |
| 9 | Barbeque | `elementor/thumbs/Barbeque.png` | Barbeque |
| 10 | Chatpata Masala | `elementor/thumbs/Chatpata-Masala.png` | Chatpata Masala |
| 11 | Cheese & Chilli | `elementor/thumbs/Cheese-Chilly.png` | Cheese & Chilly |
| 12 | Cream & Onion | `elementor/thumbs/Cream-Onion.png` | Cream & Onion |
| 13 | Simply Salt | `elementor/thumbs/Simply-Salt.png` | Simply Salt |

---

## Nuts & Seeds

**URL:** https://pratibhashyamexports.com/nuts-seeds/  
**Status:** 200 OK (fetched 18 Nov 2026)

**Findings:**
- Alt texts read 'Untitled design (n)'. 'Mustard Seeds' appears here as well as under Dry Spices.

**Page label / breadcrumb text:** "Nuts & Seeds"  
**Section heading:** "Check Out Our Products"

**Product entries: 14** (each entry is an image followed by a name; no descriptions, specifications or prices are published)

| # | Product name, exactly as published | Image file (uploads/…) | Alt text as published |
|---|---|---|---|
| 1 | Cashew Kernels | `elementor/thumbs/Untitled-design-18.png` | Untitled design |
| 2 | Betel Nuts | `elementor/thumbs/Untitled-design-1-4.png` | Untitled design (1) |
| 3 | Peanuts | `elementor/thumbs/Untitled-design-2-3.png` | Untitled design (2) |
| 4 | Sesame Seeds | `elementor/thumbs/Untitled-design-3-3.png` | Untitled design (3) |
| 5 | Mustard Seeds | `elementor/thumbs/Untitled-design-4-3.png` | Untitled design (4) |
| 6 | Flax Seeds | `elementor/thumbs/Untitled-design-5-3.png` | Untitled design (5) |
| 7 | Sunflower Seeds | `elementor/thumbs/Untitled-design-6-3.png` | Untitled design (6) |
| 8 | Niger Seeds | `elementor/thumbs/Untitled-design-7-3.png` | Untitled design (7) |
| 9 | Castor Seeds | `elementor/thumbs/Untitled-design-8-2.png` | Untitled design (8) |
| 10 | Psyllium (Isabgol) | `elementor/thumbs/Untitled-design-19.png` | Untitled design |
| 11 | Pumpkin Seeds | `elementor/thumbs/Untitled-design-1-5.png` | Untitled design (1) |
| 12 | Watermelon Seeds | `elementor/thumbs/Untitled-design-2-4.png` | Untitled design (2) |
| 13 | Chia Seeds | `elementor/thumbs/Untitled-design-3-4.png` | Untitled design (3) |
| 14 | Basil Seeds | `elementor/thumbs/Untitled-design-4-4.png` | Untitled design (4) |

---

## Textile

**URL:** https://pratibhashyamexports.com/textile/  
**Status:** 200 OK (fetched 18 Nov 2026)

**Findings:**
- 28 entries; alt texts are AI-generator file names ('Gemini_Generated_Image_…'). Several images are AI-generated product visuals (labelled yarn balls).
- Not linked correctly from /product/ or the homepage.

**Page label / breadcrumb text:** "Textile"  
**Section heading:** "Check Out Our Products"

**Product entries: 28** (each entry is an image followed by a name; no descriptions, specifications or prices are published)

| # | Product name, exactly as published | Image file (uploads/…) | Alt text as published |
|---|---|---|---|
| 1 | Cotton Yarn | `elementor/thumbs/Gemini_Generated_Image_rj58rarj58rarj58.png` | Gemini_Generated_Image_rj58rarj58rarj58 |
| 2 | Synthetic Yarns | `elementor/thumbs/Gemini_Generated_Image_x7e189x7e189x7e1.png` | Gemini_Generated_Image_x7e189x7e189x7e1 |
| 3 | Blended Yarns | `elementor/thumbs/Gemini_Generated_Image_65nbdv65nbdv65nb.png` | Gemini_Generated_Image_65nbdv65nbdv65nb |
| 4 | Natural Fiber Yarns | `elementor/thumbs/Gemini_Generated_Image_6c7ww86c7ww86c7w.png` | Gemini_Generated_Image_6c7ww86c7ww86c7w |
| 5 | Silk & Wool Yarn | `elementor/thumbs/Gemini_Generated_Image_g8e943g8e943g8e9.png` | Gemini_Generated_Image_g8e943g8e943g8e9 |
| 6 | Cotton Fabrics | `elementor/thumbs/Untitled-design-7.png` | Untitled design |
| 7 | Denim | `elementor/thumbs/Untitled-design-1-2.png` | Untitled design (1) |
| 8 | Knitted Fabrics | `elementor/thumbs/Untitled-design-2-1.png` | Untitled design (2) |
| 9 | Synthetic & Blended Fabrics | `elementor/thumbs/Neatly-Stacked-and-Draped-Fabrics.png` | Neatly Stacked and Draped Fabrics |
| 10 | Handloom & Heritage Fabrics | `elementor/thumbs/Untitled-design-3-1.png` | Untitled design (3) |
| 11 | Linen & Silk Fabrics | `elementor/thumbs/Untitled-design-4-1.png` | Untitled design (4) |
| 12 | Men’s Wear | `elementor/thumbs/Untitled-design-5-1.png` | Untitled design (5) |
| 13 | Women’s Wear | `elementor/thumbs/Untitled-design-6-1.png` | Untitled design (6) |
| 14 | Kids’ & Infant Wear | `elementor/thumbs/Untitled-design-7-1.png` | Untitled design (7) |
| 15 | Activewear & Sportswear | `elementor/thumbs/Untitled-design-8.png` | Untitled design (8) |
| 16 | Workwear & Uniforms | `elementor/thumbs/Untitled-design-9.png` | Untitled design (9) |
| 17 | Bed Linen | `elementor/thumbs/Untitled-design-10.png` | Untitled design (10) |
| 18 | Bath Linen | `elementor/thumbs/Untitled-design-11.png` | Untitled design (11) |
| 19 | Kitchen & Table Linen | `elementor/thumbs/Untitled-design-12.png` | Untitled design (12) |
| 20 | Hand-Knotted & Hand-Tufted Carpets | `elementor/thumbs/Elegant-Floral-Medallion-Rug-in-Modern-Living-Room.png` | Elegant Floral Medallion Rug in Modern Living Room |
| 21 | Flat-Weave Rugs & Dhurries | `elementor/thumbs/Geometric-Dhurrie-Rug-Living-Room.png` | Geometric Dhurrie Rug Living Room |
| 22 | Natural Fiber Mats | `elementor/thumbs/Untitled-design-13.png` | Untitled design (13) |
| 23 | Industrial Jute | `elementor/thumbs/Untitled-design-14.png` | Untitled design (14) |
| 24 | Consumer Bags | `elementor/thumbs/Untitled-design-15.png` | Untitled design (15) |
| 25 | Medtech (Medical) | `elementor/thumbs/Untitled-design-16.png` | Untitled design (16) |
| 26 | Agrotech (Agriculture) | `elementor/thumbs/Untitled-design-17.png` | Untitled design |
| 27 | Protech (Protective) | `elementor/thumbs/Untitled-design-1-3.png` | Untitled design (1) |
| 28 | Packtech & Indutech | `elementor/thumbs/Textiles-Yarn-and-Cotton-Still-Life.png` | Textiles, Yarn, and Cotton Still Life |

---

## Pharmaceuticals

**URL:** https://pratibhashyamexports.com/pharmaceuticals/  
**Status:** 200 OK (fetched 18 Nov 2026)

**Findings:**
- Page label reads 'Pharmaceutical' (singular). Images are generic stock-style visuals; some have medical text overlays (e.g. 'Oncology').

**Page label / breadcrumb text:** "Pharmaceutical"  
**Section heading:** "Check Out our products"

**Product entries: 15** (each entry is an image followed by a name; no descriptions, specifications or prices are published)

| # | Product name, exactly as published | Image file (uploads/…) | Alt text as published |
|---|---|---|---|
| 1 | Pain Relievers | `elementor/thumbs/Untitled-design-2-2.png` | Untitled design (2) |
| 2 | Antipyretics | `elementor/thumbs/Untitled-design-3-2.png` | Untitled design (3) |
| 3 | Diabetes Medications | `elementor/thumbs/Untitled-design-4-2.png` | Untitled design (4) |
| 4 | Cardiovascular Drugs | `elementor/thumbs/Untitled-design-5-2.png` | Untitled design (5) |
| 5 | Gastrointestinal Drugs | `elementor/thumbs/Untitled-design-6-2.png` | Untitled design (6) |
| 6 | Antibiotics | `elementor/thumbs/Untitled-design-7-2.png` | Untitled design (7) |
| 7 | Anti Infectives | `elementor/thumbs/Untitled-design-8-1.png` | Untitled design (8) |
| 8 | Active Pharmaceutical Ingredients | `elementor/thumbs/Untitled-design-9-1.png` | Untitled design (9) |
| 9 | Raw Materials | `elementor/thumbs/Untitled-design-10-1.png` | Untitled design (10) |
| 10 | Oncology | `elementor/thumbs/Untitled-design-11-1.png` | Untitled design (11) |
| 11 | Critical Care Medicines | `elementor/thumbs/Untitled-design-12-1.png` | Untitled design (12) |
| 12 | Vaccines | `elementor/thumbs/Untitled-design-13-1.png` | Untitled design (13) |
| 13 | Immunization Products | `elementor/thumbs/Untitled-design-14-1.png` | Untitled design (14) |
| 14 | Over-the-Counter (OTC) | `elementor/thumbs/Untitled-design-15-1.png` | Untitled design (15) |
| 15 | Nutritional Products | `elementor/thumbs/Untitled-design-16-1.png` | Untitled design (16) |

---

## EXIM Training

**URL:** https://pratibhashyamexports.com/exim-training/  
**Status:** 200 OK (fetched 18 Nov 2026)

**Findings:**
- Promotional strip: '✅ Export Import Business Setup Program ✅ Start Your Export Import Business in 60 Days ✅ Recognized by DGFT, RCMC, FIEO, MSME ✅ Certificate After Course Completion ✅ Lifetime Support by Industry Experts'.
- FAQ uses 'Pratibhasyam' (missing h) once, mentions 'AD Overseas', and calls the email address a website. No images on the page besides the logo.

**Content in page order** (site header/footer removed; see "Site-wide elements"):


**Our**  

**Export Import Business**  
Course Curriculum

- Introduction to Export Import Business
What is international trade, how global markets work, India’s position in world trade, opportunities for Nagpur & Vidarbha entrepreneurs, difference between merchant exporter vs manufacturer exporter

- India's EXIM Policy & Trade Regulations
Foreign Trade Policy (FTP) of India, DGFT overview, export-import regulations, prohibited & restricted items, special economic zones (SEZ), important trade notifications

- Business Setup & Government Registrations
IEC (Importer Exporter Code) registration, GSTIN for exporters, MSME/Udyam registration, AD Code registration, RCMC (Registration Cum Membership Certificate), company vs proprietorship for EXIM

- Product Selection & Market Research
How to identify the right product for export, demand analysis in global markets, HS code identification, competition research, niche product opportunities from Nagpur & Vidarbha region

- International Buyer Sourcing & Marketing
How to find genuine international buyers on Alibaba, TradeIndia, IndiaMART, Global Linker, Trade fairs & exhibitions, cold email outreach, embassy trade desks, buyer verification techniques

- Export Pricing, Costing & Profit Calculation
How to calculate export price, understanding FOB, CIF, C&F pricing, adding freight, insurance & margins, competitive pricing strategy, proforma invoice preparation, how to never lose money on a deal

- Export Documentation — Complete Mastery
Commercial invoice, packing list, shipping bill, bill of lading, certificate of origin, phytosanitary certificate, quality certificate, GSP certificate — how to prepare every document correctly

- Import Documentation & Procedures
Bill of entry, import license, advance authorization, import under OGL, how to clear imported goods from customs, import documentation checklist for new importers

- Customs Clearance & Duty Structure
How customs clearance works in India, role of customs broker (CHA), duty types (BCD, IGST, SWS), exemptions & concessions, how to avoid customs delays & penalties, practical customs filing walkthrough

- Logistics, Freight & Shipping Management
Sea freight vs air freight vs courier exports, FCL vs LCL shipments, booking freight with shipping lines, role of freight forwarder, CFS (Container Freight Station) procedures, port handling, tracking shipments

- Incoterms - International Trade Terms
Complete guide to all 11 Incoterms (EXW, FOB, CIF, DAP, DDP etc.), which Incoterm to use when, risk & cost transfer points, how wrong Incoterm choice can cost your business money

- Export Finance & Banking Procedures
Pre-shipment & post-shipment finance, packing credit, export credit from banks, how to approach a bank as a new exporter, ECGC (export credit insurance), opening an export current account

- Foreign Exchange & International Payments
How to receive international payments safely, Letter of Credit (LC) in detail, SWIFT/TT payments, advance payment terms, Documents Against Payment (DP), FEMA compliance for exporters, realizing foreign exchange

- DGFT Schemes & Government Export Benefits
RoDTEP scheme, Advance Authorization Scheme, EPCG (Export Promotion Capital Goods), Duty Drawback, Star Export House status — how to claim every benefit the government offers exporters

- GST for Exporters & Importers
GST zero-rating on exports, LUT (Letter of Undertaking) filing, IGST refund process, GST on imports, input tax credit for exporters, common GST mistakes exporters make

- Quality Control, Packaging & Compliance
Export quality standards, BIS, FSSAI, APEDA compliance for agri exports, EIA norms, international packaging standards, labelling requirements by country, pre-shipment inspection agencies

- Import Business - Sourcing from Global Markets
How to import products from China, UAE, USA & Europe, finding reliable overseas suppliers, evaluating supplier credibility, import duty calculation, landed cost analysis, profitable products to import into India

- Starting & Scaling Your Export Import Company
How to register your trading company, choosing the right business structure, building your brand for international markets, creating an export catalogue, setting up your export office, scaling from first shipment to consistent business

- Digital Presence for Exporters
How to build a basic export business website, creating an effective export product listing, using LinkedIn to connect with international buyers, WhatsApp Business for trade communication, digital marketing basics for exporters

- Your First Export Deal from Start to Finish
End-to-end simulation of a real export transaction — product selection → buyer identification → proforma invoice → order confirmation → documentation → customs filing → shipment → payment realization. Students complete this as their final practical project.

*Export Import Training*  
Practical training, documentation, logistics, and trade processes

*EXIM Documents*  
Complete export-import solutions from sourcing to shipment delivery

*Trade Consultancy*  
Expert guidance for product selection and international market entry

**Institute of Export Import Management in Nagpur**  
Start your Exim Journey – Limited Seats Available

**✅ Export Import Business Setup Program ✅ Start Your Export Import Business in 60 Days ✅ Recognized by DGFT, RCMC, FIEO, MSME ✅ Certificate After Course Completion ✅ Lifetime Support by Industry Experts**  

*Frequently Asked Questions*  
- What is the Pratibhasyam Exports Pvt Ltd Export Import Course about?
Pratibhashyam Exports Pvt Ltd Export Import Course is a completely practical, business-focused training program designed to help entrepreneurs, traders, manufacturers, and business owners from Nagpur start and run their own export import business successfully from scratch.

- Do I need any prior experience to join this course?
No prior experience is required at all. Our Export Import Training in Nagpur is designed for complete beginners. Whether you are a student, farmer, trader, or business owner, we start from the very basics and take you to a fully operational export import business.

- What is the duration of the Export Import Course at AD Overseas?
Our Export Import Business Course in Nagpur is structured to give you complete practical knowledge within a focused duration. Batch timings, course duration, and schedule details are shared during your free demo session. Contact us on 7249604373 for current batch information.

- Will I get a certificate after completing the course?
Yes. After successfully completing the Export Import Training at Pratibhashyam Exports Pvt Ltd, you receive a recognized course completion certificate that validates your knowledge of international trade, customs procedures, documentation, and export import business operations.

- Can I start my own export business after completing this course?
Absolutely yes — that is exactly the purpose of our training. Pratibhashyam Exports Pvt Ltd is specifically designed to help you start your own export import business. After completing the course, you will have full knowledge of registrations, documentation, buyer sourcing, logistics, customs, and international payments.

- Which products can I export from Nagpur after this training?
Nagpur and Vidarbha region offer excellent export opportunities in spices, pulses, cereals, oranges, cotton, textiles, agri-commodities, and more. Our course includes dedicated guidance on product selection and identifying the most profitable export products suited to your business and budget.

- Are batches available on weekends for working professionals and business owners?
Yes. Pratibhashyam Exports Pvt Ltd offers flexible Morning, Evening, and Weekend batches to ensure our Export Import Course in Nagpur is accessible for students, working professionals, farmers, and busy business owners alike. Both offline classroom and online modes are available.

- How is Pratibhashyam Exports Pvt Ltd different from other export import institutes in Nagpur?
Pratibhashyam Exports Pvt Ltd is run by a practicing export import professional with 10+ years of real trading experience. Our training is based on live consignments, real documents, and actual business case studies — not just theory. We also help you set up your business after training.

- How do I enroll in the Export Import Course at Pratibhashyam Exports Pvt Ltd?
Enrolling is simple. Call us on

7249604373

or visit our website at

pratibhashyamexports@gmail.com

to Enroll. Attend the enquiry, meet our director personally, understand the course in detail, and then make your enrollment decision with full confidence.


---

## Gallery

**URL:** https://pratibhashyamexports.com/gallery/  
**Status:** 200 OK (fetched 18 Nov 2026)

**Findings:**
- 15 images, all with the alt text 'gallery grid image'; no captions. Two near-duplicate event photographs (9-1, 10-1).

**Content in page order** (site header/footer removed; see "Site-wide elements"):

- 🖼 `2026/11/9-1.png` (alt: "gallery grid image")
- 🖼 `2026/11/10-1.png` (alt: "gallery grid image")
- 🖼 `2026/11/12.png` (alt: "gallery grid image")
- 🖼 `2026/11/11-1.png` (alt: "gallery grid image")
- 🖼 `2026/11/13.png` (alt: "gallery grid image")
- 🖼 `2026/11/14.png` (alt: "gallery grid image")
- 🖼 `2026/11/15.png` (alt: "gallery grid image")
- 🖼 `2026/11/1-2.png` (alt: "gallery grid image")
- 🖼 `2026/11/2-2.png` (alt: "gallery grid image")
- 🖼 `2026/11/3-2.png` (alt: "gallery grid image")
- 🖼 `2026/11/4-2.png` (alt: "gallery grid image")
- 🖼 `2026/11/5-2.png` (alt: "gallery grid image")
- 🖼 `2026/11/6-2.png` (alt: "gallery grid image")
- 🖼 `2026/11/7-1.png` (alt: "gallery grid image")
- 🖼 `2026/11/8-1.png` (alt: "gallery grid image")

---

## Contact

**URL:** https://pratibhashyamexports.com/contact/  
**Status:** 200 OK (fetched 18 Nov 2026)

**Findings:**
- Email shown: pratibhashyamexports@gmail.com. The phone and address headings are present, but their values come only from the footer.
- Google Maps embed query: 'deonagar nagpur', zoom 12 (an area, not an exact pin).
- Social icons use theme vendor links.

**Content in page order** (site header/footer removed; see "Site-wide elements"):


**Contact Us**  

**Feel Free To**  
& Get In Touch!

**Email Address :**  
pratibhashyamexports@gmail.com

**Phone Number :**  

**Location Address :**  

**Follow us on social media :**  
- Facebook
- Twitter
- Youtube
- Instagram
- Whatsapp

---

**Total product entries across the ten product pages: 178** (150 on the nine non-textile pages + 28 textile categories).

