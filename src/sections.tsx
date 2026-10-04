import { useEffect, useRef, useState } from "react";
import {
  BUSINESS, SERVICES, STATS, REVIEWS, FAQS, CITIES, MARQUEE,
  BED_BASE, CLEAN_TYPES, FREQUENCIES, estimate,
} from "./data";
import { IMG } from "./images";
import { Reveal, Counter, SprayBottle, Squeegee } from "./components";

/* ---------- word-by-word animated headline ---------- */
function Words({ text, base = 0 }: { text: string; base?: number }) {
  const parts = text.split(" ");
  return (
    <>
      {parts.map((w, i) => (
        <span key={i} className="word-mask">
          <span className="word-up" style={{ animationDelay: `${base + i * 0.09}s` }}>
            {w}
          </span>
          {i < parts.length - 1 ? " " : ""}
        </span>
      ))}
    </>
  );
}

function Highlight({ children, delay = 900 }: { children: React.ReactNode; delay?: number }) {
  const [go, setGo] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setGo(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  return <span className={`hl ${go ? "go" : ""}`}>{children}</span>;
}

/* ================= HERO ================= */
export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-2">
        <div>
          <p className="hero-in hero-in-1 inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white/60 px-4 py-1.5 text-xs font-bold tracking-[0.18em] uppercase">
            <span className="h-2 w-2 rounded-full bg-leaf" /> Denver&apos;s 5-star cleaning crew
          </p>
          <h1 className="mt-6 font-display text-[13vw] leading-[0.95] uppercase sm:text-6xl lg:text-7xl">
            <Words text="House cleaning," base={0.1} />
            <br />
            <Words text="priced in" base={0.35} />{" "}
            <Highlight delay={1100}>30 seconds.</Highlight>
          </h1>
          <p className="hero-in hero-in-3 mt-6 max-w-md text-lg leading-relaxed text-muted">
            {BUSINESS.full} sends vetted, background-checked cleaners to your door across {BUSINESS.city}.
            See your exact price below — <strong className="text-ink">then pick a time.</strong>
          </p>
          <div className="hero-in hero-in-4 mt-8 flex flex-wrap gap-3">
            <a href="#pricing" className="rounded-full bg-sun px-8 py-4 font-display text-base tracking-wider text-ink uppercase shadow-[0_14px_30px_-10px_rgba(245,180,0,0.6)] transition hover:-translate-y-1">
              Get my price
            </a>
            <a href={BUSINESS.phoneHref} className="rounded-full border-2 border-ink px-8 py-4 font-display text-base tracking-wider text-ink uppercase transition hover:-translate-y-1 hover:bg-ink hover:text-cream">
              {BUSINESS.phone}
            </a>
          </div>
          <div className="hero-in hero-in-5 mt-8 flex items-center gap-4 text-sm text-muted">
            <span className="tracking-widest text-sun-deep">★★★★★</span>
            <span><strong className="text-ink">4.9/5</strong> from 2,300+ Denver reviews</span>
          </div>
        </div>

        <div className="hero-in hero-in-3 relative">
          <div className="overflow-hidden rounded-[2rem] shadow-2xl">
            <img src={IMG.hero} alt="Professional cleaner at work in a bright living room" className="aspect-[4/5] w-full object-cover sm:aspect-square" />
          </div>
          <div className="floaty absolute -left-4 top-8 rounded-2xl bg-ink px-5 py-4 text-cream shadow-xl sm:-left-8">
            <div className="font-display text-3xl text-sun">$165</div>
            <div className="text-xs tracking-wide uppercase opacity-75">avg. 3-bed clean</div>
          </div>
          <div className="floaty absolute -right-3 bottom-10 rounded-2xl bg-white px-5 py-4 shadow-xl [animation-delay:1.2s] sm:-right-6">
            <div className="text-sm font-bold">✓ Bonded & insured</div>
            <div className="text-xs text-muted">Every cleaner, every visit</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================= MARQUEE ================= */
export function Marquee() {
  const items = [...MARQUEE, ...MARQUEE];
  return (
    <div className="overflow-hidden border-y-2 border-ink bg-sun py-3.5">
      <div className="marquee-track flex w-max items-center gap-8 pr-8">
        {items.map((m, i) => (
          <span key={i} className="flex items-center gap-8 font-display text-sm tracking-[0.2em] whitespace-nowrap text-ink uppercase">
            {m} <span>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ================= STATS ================= */
export function Stats() {
  return (
    <section className="bg-ink py-14 text-cream">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-5 lg:grid-cols-4">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={(i % 4) as 0 | 1 | 2 | 3} className="text-center">
            <div className="font-display text-5xl text-sun">
              <Counter value={s.value} suffix={s.suffix} decimals={s.decimals ?? 0} />
            </div>
            <div className="mt-2 text-xs font-semibold tracking-[0.2em] text-cream/70 uppercase">{s.label}</div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ================= CALCULATOR ================= */
export function Calculator() {
  const [bed, setBed] = useState("b3");
  const [baths, setBaths] = useState(2);
  const [type, setType] = useState<string>("standard");
  const [freq, setFreq] = useState<string>("once");
  const [tick, setTick] = useState(0);
  const { low, high } = estimate(bed, baths, type, freq);

  const change = (fn: () => void) => {
    fn();
    setTick((t) => t + 1);
  };

  return (
    <section id="pricing" className="scroll-mt-24 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-bold tracking-[0.3em] text-leaf uppercase">Instant pricing</p>
          <h2 className="mt-3 font-display text-4xl uppercase sm:text-6xl">
            Your exact price, <br />then <Highlight delay={400}>pick a time.</Highlight>
          </h2>
          <p className="mt-4 text-muted">No phone tag. No &ldquo;we&apos;ll call you back with a quote.&rdquo; Built from real 2026 US market rates.</p>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_380px]">
          <Reveal className="rounded-[2rem] border-2 border-ink/10 bg-white p-6 shadow-xl sm:p-10">
            <div>
              <h3 className="font-display text-lg tracking-wide uppercase">Bedrooms</h3>
              <div className="mt-4 flex flex-wrap gap-2.5">
                {Object.entries(BED_BASE).map(([id, b]) => (
                  <button
                    key={id}
                    onClick={() => change(() => setBed(id))}
                    className={`rounded-full px-5 py-2.5 text-sm font-bold transition ${bed === id ? "bg-ink text-cream" : "bg-cream-dark text-ink hover:bg-sun/60"}`}
                  >
                    {b.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <h3 className="font-display text-lg tracking-wide uppercase">Bathrooms</h3>
              <div className="mt-4 flex items-center gap-4">
                <button aria-label="Fewer bathrooms" onClick={() => change(() => setBaths(Math.max(1, baths - 1)))} className="grid h-12 w-12 place-items-center rounded-full bg-cream-dark font-display text-2xl transition hover:bg-sun">−</button>
                <span className="min-w-16 text-center font-display text-4xl">{baths}</span>
                <button aria-label="More bathrooms" onClick={() => change(() => setBaths(Math.min(6, baths + 1)))} className="grid h-12 w-12 place-items-center rounded-full bg-cream-dark font-display text-2xl transition hover:bg-sun">+</button>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="font-display text-lg tracking-wide uppercase">Clean type</h3>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {CLEAN_TYPES.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => change(() => setType(t.id))}
                    className={`rounded-2xl border-2 p-4 text-left transition ${type === t.id ? "border-ink bg-sun/25" : "border-ink/10 bg-cream hover:border-ink/30"}`}
                  >
                    <div className="font-bold">{t.label}</div>
                    <div className="mt-1 text-xs text-muted">{t.note}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <h3 className="font-display text-lg tracking-wide uppercase">How often?</h3>
              <div className="mt-4 flex flex-wrap gap-2.5">
                {FREQUENCIES.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => change(() => setFreq(f.id))}
                    className={`rounded-full px-5 py-2.5 text-sm font-bold transition ${freq === f.id ? "bg-ink text-cream" : "bg-cream-dark text-ink hover:bg-sun/60"}`}
                  >
                    {f.label}
                    {f.mult < 1 && <span className="ml-1.5 text-xs text-leaf">−{Math.round((1 - f.mult) * 100)}%</span>}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={1} className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-[2rem] bg-ink p-8 text-cream shadow-2xl">
              <p className="text-xs font-bold tracking-[0.25em] text-sun uppercase">Your estimate</p>
              <div key={tick} className="price-pop mt-4 font-display text-6xl text-sun">
                ${low}–${high}
              </div>
              <p className="mt-2 text-sm text-cream/70">per visit · final price confirmed before we start</p>
              <ul className="mt-6 space-y-2.5 text-sm text-cream/85">
                {["All supplies & equipment included", "Bonded, insured cleaners", "24-hour happiness guarantee", "Free rescheduling up to 24h before"].map((li) => (
                  <li key={li} className="flex gap-2.5"><span className="text-sun">✓</span>{li}</li>
                ))}
              </ul>
              <a href="#book" className="mt-8 block rounded-full bg-sun py-4 text-center font-display text-base tracking-wider text-ink uppercase transition hover:-translate-y-0.5">
                Pick a time
              </a>
              <a href={BUSINESS.phoneHref} className="mt-3 block text-center text-sm font-bold text-cream/80 hover:text-sun">
                or call {BUSINESS.phone}
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ================= SERVICES ================= */
export function ServicesGrid() {
  return (
    <section id="services" className="scroll-mt-24 bg-cream-dark/60 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-bold tracking-[0.3em] text-leaf uppercase">Everything in cleaning</p>
          <h2 className="mt-3 font-display text-4xl uppercase sm:text-6xl">
            One crew. <Highlight delay={400}>Every mess.</Highlight>
          </h2>
          <p className="mt-4 text-muted">From weekly upkeep to post-construction disasters — if it needs cleaning, we do it.</p>
        </Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 4) as 0 | 1 | 2 | 3}>
              <article className="lift group h-full overflow-hidden rounded-[1.5rem] border border-ink/10 bg-white">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={IMG[s.img]} alt={s.name} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                  <span className="absolute top-3 left-3 rounded-full bg-sun px-3.5 py-1.5 text-xs font-bold text-ink uppercase">from {s.from}</span>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl tracking-wide uppercase">{s.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{s.blurb}</p>
                  <ul className="mt-4 space-y-1.5 text-sm">
                    {s.includes.slice(0, 3).map((inc) => (
                      <li key={inc} className="flex gap-2 text-ink-soft"><span className="text-leaf">✓</span>{inc}</li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================= HOW IT WORKS ================= */
const STEPS = [
  { n: "01", title: "Get your price", text: "Tap through the calculator above. Thirty seconds, no email required, no sales call after." },
  { n: "02", title: "Pick a time", text: "Choose a slot that suits you — same-day and weekend appointments available across Denver." },
  { n: "03", title: "Come home to clean", text: "A vetted, background-checked cleaner arrives with everything needed. You get a photo report when it's done." },
];

export function HowItWorks() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="text-center">
          <p className="text-xs font-bold tracking-[0.3em] text-leaf uppercase">How it works</p>
          <h2 className="mt-3 font-display text-4xl uppercase sm:text-6xl">Clean in <Highlight delay={400}>three taps.</Highlight></h2>
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i as 0 | 1 | 2}>
              <div className="lift h-full rounded-[1.5rem] bg-ink p-8 text-cream">
                <div className="font-display text-5xl text-sun">{s.n}</div>
                <h3 className="mt-4 font-display text-2xl tracking-wide uppercase">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-cream/75">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================= REVIEWS ================= */
export function Reviews() {
  return (
    <section id="reviews" className="scroll-mt-24 bg-cream-dark/60 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-xs font-bold tracking-[0.3em] text-leaf uppercase">Reviews</p>
            <h2 className="mt-3 font-display text-4xl uppercase sm:text-6xl">Denver <Highlight delay={400}>loves us.</Highlight></h2>
          </div>
          <div className="flex items-center gap-3 rounded-2xl bg-white px-5 py-3 shadow">
            <span className="font-display text-3xl">4.9</span>
            <div className="text-xs text-muted"><span className="tracking-widest text-sun-deep">★★★★★</span><br />2,300+ Google reviews</div>
          </div>
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <Reveal key={r.name} delay={(i % 3) as 0 | 1 | 2}>
              <figure className="lift h-full rounded-[1.5rem] border border-ink/10 bg-white p-7">
                <div className="tracking-widest text-sun-deep">★★★★★</div>
                <blockquote className="mt-4 text-[15px] leading-relaxed text-ink-soft">“{r.text}”</blockquote>
                <figcaption className="mt-5">
                  <div className="font-display tracking-wide uppercase">{r.name}</div>
                  <div className="text-xs text-muted">{r.town}, CO · Verified clean</div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================= SERVICE AREAS ================= */
export function ServiceAreas() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-bold tracking-[0.3em] text-leaf uppercase">Where we clean</p>
          <h2 className="mt-3 font-display text-4xl uppercase sm:text-6xl">Serving greater <Highlight delay={400}>Denver.</Highlight></h2>
          <p className="mt-4 text-muted">Same-day slots available in most neighborhoods. Don&apos;t see your town? Call — we probably cover it.</p>
        </Reveal>
        <Reveal delay={1} className="mt-10 flex flex-wrap gap-3">
          {CITIES.map((c) => (
            <span key={c} className="flex items-center gap-2 rounded-full border border-ink/15 bg-white px-5 py-2.5 text-sm font-semibold">
              <span className="text-leaf">✓</span> {c}
            </span>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ================= FAQ ================= */
export function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="scroll-mt-24 bg-cream-dark/60 py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-5">
        <Reveal className="text-center">
          <p className="text-xs font-bold tracking-[0.3em] text-leaf uppercase">FAQ</p>
          <h2 className="mt-3 font-display text-4xl uppercase sm:text-6xl">Good <Highlight delay={400}>questions.</Highlight></h2>
        </Reveal>
        <div className="mt-10 space-y-3">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={0}>
                <div className={`overflow-hidden rounded-2xl border bg-white transition ${isOpen ? "border-ink" : "border-ink/10"}`}>
                  <button onClick={() => setOpen(isOpen ? -1 : i)} className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left">
                    <span className="font-bold">{f.q}</span>
                    <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full font-display text-lg transition ${isOpen ? "bg-sun text-ink" : "bg-cream-dark text-ink"}`}>
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                  <div className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                    <div className="overflow-hidden">
                      <p className="px-6 pb-6 text-[15px] leading-relaxed text-muted">{f.a}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ================= BOOKING / CTA ================= */
export function BookCta() {
  const [sent, setSent] = useState(false);
  return (
    <section id="book" className="scroll-mt-24 bg-ink py-20 text-cream md:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-2">
        <Reveal>
          <p className="text-xs font-bold tracking-[0.3em] text-sun uppercase">Book now</p>
          <h2 className="mt-3 font-display text-5xl leading-[0.95] uppercase sm:text-7xl">
            Come home<br />to <span className="text-sun">clean.</span>
          </h2>
          <p className="mt-5 max-w-md text-cream/75">
            Tell us where to show up. We confirm your slot by text within 15 minutes during {BUSINESS.hours}.
          </p>
          <a href={BUSINESS.phoneHref} className="mt-6 inline-block font-display text-3xl text-sun sm:text-4xl">{BUSINESS.phone}</a>
        </Reveal>
        <Reveal delay={1}>
          {sent ? (
            <div className="rounded-[2rem] bg-cream p-10 text-center text-ink">
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-leaf text-3xl text-cream">✓</div>
              <h3 className="mt-5 font-display text-3xl uppercase">Request received!</h3>
              <p className="mt-3 text-muted">We&apos;ll text you within 15 minutes to confirm your slot.</p>
            </div>
          ) : (
            <form
              onSubmit={(e) => { e.preventDefault(); setSent(true); }}
              className="rounded-[2rem] bg-cream p-7 text-ink sm:p-9"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { id: "name", label: "Name", type: "text" },
                  { id: "phone", label: "Phone", type: "tel" },
                ].map((f) => (
                  <div key={f.id}>
                    <label htmlFor={`bk-${f.id}`} className="text-xs font-bold tracking-wide uppercase">{f.label}</label>
                    <input id={`bk-${f.id}`} type={f.type} required className="mt-1.5 w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm outline-none focus:border-sun-deep" />
                  </div>
                ))}
                <div className="sm:col-span-2">
                  <label htmlFor="bk-service" className="text-xs font-bold tracking-wide uppercase">Service needed</label>
                  <select id="bk-service" className="mt-1.5 w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm outline-none focus:border-sun-deep">
                    {SERVICES.map((s) => <option key={s.slug}>{s.name}</option>)}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="bk-when" className="text-xs font-bold tracking-wide uppercase">Preferred day</label>
                  <select id="bk-when" className="mt-1.5 w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm outline-none focus:border-sun-deep">
                    {["As soon as possible", "Tomorrow", "This weekend", "Next week"].map((d) => <option key={d}>{d}</option>)}
                  </select>
                </div>
              </div>
              <button type="submit" className="mt-6 w-full rounded-full bg-sun py-4 font-display text-base tracking-wider text-ink uppercase shadow-[0_14px_30px_-10px_rgba(245,180,0,0.6)] transition hover:-translate-y-0.5">
                Book my clean
              </button>
              <p className="mt-3 text-center text-xs text-muted">No payment due today · Free rescheduling up to 24h before</p>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}

/* ================= BEFORE / AFTER ================= */
function useScrollSway() {
  const [rot, setRot] = useState(0);
  useEffect(() => {
    let raf = 0;
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setRot(Math.sin(window.scrollY / 220) * 16));
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => {
      window.removeEventListener("scroll", on);
      cancelAnimationFrame(raf);
    };
  }, []);
  return rot;
}

export function BeforeAfter() {
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);
  const box = useRef<HTMLDivElement>(null);
  const sway = useScrollSway();

  const move = (clientX: number) => {
    const el = box.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos(Math.min(94, Math.max(6, ((clientX - r.left) / r.width) * 100)));
  };

  return (
    <section className="overflow-hidden py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold tracking-[0.3em] text-leaf uppercase">Proof, not promises</p>
          <h2 className="mt-3 font-display text-4xl uppercase sm:text-6xl">
            Drag to see the <Highlight delay={400}>difference.</Highlight>
          </h2>
          <p className="mt-4 text-muted">One visit. Same kitchen. This is what a Spotless deep clean does.</p>
        </Reveal>

        <Reveal delay={1} className="relative mx-auto mt-12 max-w-4xl">
          {/* spray bottle — sways left/right as you scroll */}
          <div
            className="pointer-events-none absolute -top-10 right-2 z-20 w-20 sm:-top-14 sm:right-8 sm:w-28"
            style={{ transform: `rotate(${sway}deg)`, transformOrigin: "50% 20%" }}
            aria-hidden
          >
            <SprayBottle className="w-full drop-shadow-[0_16px_20px_rgba(22,36,29,0.3)]" />
          </div>
          {/* wiper resting by the slider */}
          <div className="floaty pointer-events-none absolute -bottom-8 left-2 z-20 w-36 sm:-bottom-10 sm:left-10 sm:w-48" aria-hidden>
            <Squeegee className="w-full drop-shadow-[0_16px_20px_rgba(22,36,29,0.3)]" />
          </div>

          <div
            ref={box}
            className="relative aspect-[16/11] cursor-ew-resize touch-none overflow-hidden rounded-[2rem] shadow-2xl select-none sm:aspect-[16/9]"
            onPointerDown={(e) => {
              dragging.current = true;
              (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
              move(e.clientX);
            }}
            onPointerMove={(e) => dragging.current && move(e.clientX)}
            onPointerUp={() => (dragging.current = false)}
            onPointerCancel={() => (dragging.current = false)}
          >
            {/* AFTER (clean) — base layer */}
            <img src={IMG.kitchen} alt="Kitchen after Spotless deep clean" className="absolute inset-0 h-full w-full object-cover" draggable={false} />
            {/* BEFORE (dirty) — clipped to the left of the handle */}
            <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
              <img
                src={IMG.kitchen}
                alt="Kitchen before cleaning"
                draggable={false}
                className="h-full w-full object-cover"
                style={{ filter: "sepia(0.5) brightness(0.58) saturate(0.5) contrast(0.94)" }}
              />
              <div
                className="absolute inset-0 opacity-70"
                style={{ background: "radial-gradient(ellipse 32% 26% at 22% 68%, rgba(58,44,20,0.6), transparent), radial-gradient(ellipse 26% 22% at 74% 28%, rgba(58,44,20,0.55), transparent), radial-gradient(ellipse 20% 16% at 56% 88%, rgba(48,36,16,0.55), transparent), radial-gradient(ellipse 18% 14% at 88% 78%, rgba(58,44,20,0.5), transparent)" }}
              />
            </div>

            {/* tags */}
            <span className="absolute top-4 left-4 rounded-full bg-ink/85 px-4 py-1.5 font-display text-xs tracking-[0.2em] text-cream uppercase">Before</span>
            <span className="absolute top-4 right-4 rounded-full bg-sun px-4 py-1.5 font-display text-xs tracking-[0.2em] text-ink uppercase">After</span>

            {/* handle */}
            <div className="absolute inset-y-0" style={{ left: `${pos}%` }}>
              <div className="absolute inset-y-0 w-1 -translate-x-1/2 bg-cream shadow-[0_0_12px_rgba(0,0,0,0.4)]" />
              <div className="absolute top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-4 border-sun bg-ink font-display text-lg text-cream shadow-xl">
                ↔
              </div>
            </div>
          </div>

          <p className="mt-5 text-center text-sm text-muted">Illustrative demo — drag the handle left and right.</p>
        </Reveal>
      </div>
    </section>
  );
}
