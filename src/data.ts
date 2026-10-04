// Spotless Cleaning Co. — generic demo template
// Prices reflect 2026 US national averages (Angi, Housecall Pro, HomeAdvisor).

export const BUSINESS = {
  name: "Spotless",
  full: "Spotless Cleaning Co.",
  tagline: "House cleaning, priced in 30 seconds.",
  phone: "(555) 234-5678",
  phoneHref: "tel:+15552345678",
  email: "hello@spotlessclean.co",
  city: "Denver, CO",
  address: "1200 17th St, Denver, CO 80202",
  hours: "Mon–Sat, 8:00 AM – 6:00 PM",
};

export const NAV = [
  { label: "Services", href: "#services" },
  { label: "Pricing", href: "#pricing" },
  { label: "Reviews", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
];

export type Service = {
  slug: string;
  name: string;
  blurb: string;
  from: string;
  img: string;
  includes: string[];
};

export const SERVICES: Service[] = [
  {
    slug: "regular",
    name: "Regular House Cleaning",
    blurb: "Weekly, bi-weekly or monthly upkeep. Same cleaner every visit, your home stays effortlessly clean.",
    from: "$120",
    img: "bedroom",
    includes: ["All rooms dusted & vacuumed", "Kitchen & baths sanitized", "Mirrors & fixtures shined", "Trash out, beds made"],
  },
  {
    slug: "deep",
    name: "Deep Cleaning",
    blurb: "The top-to-bottom reset. Baseboards, grout, vents, inside cabinets — everything the regular clean doesn't reach.",
    from: "$200",
    img: "deep",
    includes: ["Everything in regular", "Baseboards & vents hand-wiped", "Grout & tile scrubbed", "Inside cabinets & drawers"],
  },
  {
    slug: "move",
    name: "Move-In / Move-Out",
    blurb: "Deposit-grade cleaning for empty homes. Landlord checklists welcome — we clean to pass inspection.",
    from: "$280",
    img: "moveout",
    includes: ["Inside fridge & oven", "Inside all cabinets", "Wall spot-cleaning", "Appliance pull-out clean"],
  },
  {
    slug: "airbnb",
    name: "Airbnb Turnover",
    blurb: "Hotel-grade flips between guests. Linens, restock, photos — ready for 5-star reviews every time.",
    from: "$110",
    img: "airbnb",
    includes: ["Same-day turnovers", "Linen & towel service", "Restock essentials", "Photo report per stay"],
  },
  {
    slug: "construction",
    name: "Post-Construction",
    blurb: "Dust is everywhere after a remodel. We detail the fine layer contractors leave behind.",
    from: "$350",
    img: "window",
    includes: ["Fine dust removal", "Sticker & paint speck removal", "Vent & fixture detailing", "Final walkthrough polish"],
  },
  {
    slug: "office",
    name: "Office & Commercial",
    blurb: "Nightly or weekly janitorial for offices, retail and clinics. Custom plans, one invoice.",
    from: "$180",
    img: "office",
    includes: ["Desks & common areas", "Restroom sanitizing", "Trash & recycling", "Floor care programs"],
  },
  {
    slug: "carpet",
    name: "Carpet & Upholstery",
    blurb: "Hot-water extraction that pulls out what vacuums leave behind. Stains, pet odors, all of it.",
    from: "$49",
    img: "carpet",
    includes: ["Per-room pricing", "Pet stain treatment", "Sofa & sectional care", "Fast dry times"],
  },
  {
    slug: "extras",
    name: "Add-Ons & Extras",
    blurb: "Inside fridge, inside oven, laundry & fold, dishes, pet hair detail — bolt onto any clean.",
    from: "$25",
    img: "kitchen",
    includes: ["Inside fridge / oven", "Laundry & fold", "Dishes & organization", "Eco products on request"],
  },
];

// ---- price calculator ----
export const BED_BASE: Record<string, { label: string; base: number }> = {
  studio: { label: "Studio", base: 110 },
  b1: { label: "1 bed", base: 130 },
  b2: { label: "2 bed", base: 165 },
  b3: { label: "3 bed", base: 210 },
  b4: { label: "4 bed", base: 265 },
  b5: { label: "5 bed", base: 320 },
};

export const CLEAN_TYPES = [
  { id: "standard", label: "Standard", mult: 1, note: "Maintenance clean" },
  { id: "deep", label: "Deep", mult: 1.55, note: "Top-to-bottom reset" },
  { id: "move", label: "Move in/out", mult: 1.75, note: "Empty-home detail" },
] as const;

export const FREQUENCIES = [
  { id: "once", label: "One-time", mult: 1 },
  { id: "monthly", label: "Monthly", mult: 0.92 },
  { id: "biweekly", label: "Every 2 weeks", mult: 0.88 },
  { id: "weekly", label: "Weekly", mult: 0.82 },
] as const;

export function estimate(bedId: string, baths: number, typeId: string, freqId: string) {
  const bed = BED_BASE[bedId] ?? BED_BASE.b2;
  const type = CLEAN_TYPES.find((t) => t.id === typeId) ?? CLEAN_TYPES[0];
  const freq = FREQUENCIES.find((f) => f.id === freqId) ?? FREQUENCIES[0];
  const raw = (bed.base + Math.max(0, baths - 1) * 22) * type.mult * freq.mult;
  const mid = Math.round(raw / 5) * 5;
  return { low: Math.max(49, Math.round((mid * 0.9) / 5) * 5), high: Math.round((mid * 1.1) / 5) * 5 };
}

export const STATS = [
  { value: 12400, suffix: "+", label: "Cleans completed" },
  { value: 4.9, suffix: "★", label: "Average rating", decimals: 1 },
  { value: 98, suffix: "%", label: "Clients rebook" },
  { value: 40, suffix: "+", label: "Vetted cleaners" },
];

export const REVIEWS = [
  { name: "Rachel M.", town: "Denver", text: "Booked at 9am, cleaners at 1pm, and my kitchen has never looked this good. The instant pricing was exactly what I paid — no surprises." },
  { name: "Devon K.", town: "Aurora", text: "We use them bi-weekly and it's the best money we spend. Same cleaner every time, she knows our house better than we do." },
  { name: "Priya S.", town: "Lakewood", text: "Move-out clean passed the landlord inspection on the first walkthrough. Got my full deposit back. Worth every penny." },
  { name: "Marcus T.", town: "Littleton", text: "They handle turnovers for our two Airbnbs. Photo report after every clean, restocked every time. Our ratings went up." },
  { name: "Elena R.", town: "Arvada", text: "Deep clean before the holidays — baseboards, vents, inside the oven, everything. It felt like moving into a new house." },
  { name: "James W.", town: "Westminster", text: "Our office has them weekly. Restrooms spotless, trash never missed, one simple invoice. Zero complaints in eight months." },
];

export const FAQS = [
  { q: "Do I need to provide supplies or equipment?", a: "No — we bring everything: commercial-grade vacuums, microfiber systems, and eco-friendly products. If you prefer we use your products, just leave them out." },
  { q: "Are your cleaners insured and background-checked?", a: "Yes. Every cleaner is background-checked, bonded, and insured up to $2M. You're fully covered on every visit." },
  { q: "What if I'm not happy with the clean?", a: "Tell us within 24 hours and we come back and re-clean the missed areas free. That's the guarantee, in writing." },
  { q: "How does the instant pricing work?", a: "Pick your bedrooms, bathrooms, clean type and frequency above — the price updates live from real 2026 market rates. What you see is what you pay." },
  { q: "Do I need to be home during the clean?", a: "Nope. Most clients give us a door code or hide a key. You'll get a text when we arrive and a photo report when we're done." },
  { q: "Can I get the same cleaner every time?", a: "Yes — recurring clients are matched with a dedicated cleaner who learns your home and your preferences." },
];

export const CITIES = [
  "Denver", "Aurora", "Lakewood", "Littleton", "Arvada",
  "Westminster", "Thornton", "Centennial", "Boulder", "Highlands Ranch",
];

export const MARQUEE = [
  "Bonded & insured",
  "5-star rated",
  "Background-checked cleaners",
  "Eco-friendly products",
  "24-hour happiness guarantee",
  "Instant online pricing",
];
