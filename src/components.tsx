import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { BUSINESS, NAV } from "./data";

/* ---------- scroll reveal wrapper ---------- */
export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: 0 | 1 | 2 | 3 }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && el.classList.add("visible")),
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const d = delay === 1 ? "reveal-d1" : delay === 2 ? "reveal-d2" : delay === 3 ? "reveal-d3" : "";
  return (
    <div ref={ref} className={`reveal ${d} ${className}`}>
      {children}
    </div>
  );
}

/* ---------- animated counter ---------- */
export function Counter({ value, suffix = "", decimals = 0 }: { value: number; suffix?: string; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          const t0 = performance.now();
          const dur = 1400;
          const tick = (t: number) => {
            const p = Math.min(1, (t - t0) / dur);
            const eased = 1 - Math.pow(1 - p, 3);
            setN(value * eased);
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value]);
  return (
    <span ref={ref}>
      {n.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
      {suffix}
    </span>
  );
}

/* ---------- logo ---------- */
export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-sun font-display text-xl text-ink">S</span>
      <span className={`font-display text-2xl tracking-wide uppercase ${dark ? "text-cream" : "text-ink"}`}>
        Spotless
      </span>
    </Link>
  );
}

/* ---------- header ---------- */
export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all ${scrolled ? "bg-cream/90 shadow-[0_8px_30px_-12px_rgba(22,36,29,0.25)] backdrop-blur-md" : "bg-transparent"}`}>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Logo />
        <nav className="hidden items-center gap-7 md:flex">
          {NAV.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-semibold text-ink-soft transition hover:text-ink">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <a href={BUSINESS.phoneHref} className="text-sm font-bold text-ink">
            {BUSINESS.phone}
          </a>
          <a href="#pricing" className="rounded-full bg-ink px-5 py-2.5 text-sm font-bold text-cream transition hover:-translate-y-0.5 hover:bg-ink-soft">
            Get my price
          </a>
        </div>
        <button aria-label="Menu" onClick={() => setOpen(!open)} className="grid h-10 w-10 place-items-center rounded-xl bg-ink text-cream md:hidden">
          <span className="font-display text-lg">{open ? "✕" : "☰"}</span>
        </button>
      </div>
      {open && (
        <div className="border-t border-ink/10 bg-cream px-5 py-4 md:hidden">
          {NAV.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block py-2.5 font-display text-lg tracking-wide text-ink uppercase">
              {l.label}
            </a>
          ))}
          <a href="#pricing" onClick={() => setOpen(false)} className="mt-2 block rounded-full bg-ink py-3 text-center font-bold text-cream">
            Get my price
          </a>
        </div>
      )}
    </header>
  );
}

/* ---------- mobile sticky bar ---------- */
export function MobileCallBar() {
  return (
    <div className="fixed inset-x-4 bottom-4 z-50 grid grid-cols-2 gap-3 md:hidden">
      <a href={BUSINESS.phoneHref} className="rounded-full bg-ink py-3.5 text-center font-display text-sm tracking-wider text-cream uppercase shadow-xl">
        Call now
      </a>
      <a href="#pricing" className="rounded-full bg-sun py-3.5 text-center font-display text-sm tracking-wider text-ink uppercase shadow-xl">
        Get my price
      </a>
    </div>
  );
}

/* ---------- footer ---------- */
export function Footer() {
  return (
    <footer className="bg-ink pt-16 pb-28 text-cream md:pb-10">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-4">
        <div>
          <Logo dark />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/70">
            {BUSINESS.tagline} Bonded, insured, and background-checked cleaners across {BUSINESS.city}.
          </p>
        </div>
        <div>
          <h4 className="font-display text-sm tracking-widest text-sun uppercase">Explore</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-cream/75">
            {NAV.map((l) => (
              <li key={l.href}><a href={l.href} className="transition hover:text-sun">{l.label}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-display text-sm tracking-widest text-sun uppercase">Services</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-cream/75">
            <li>Regular house cleaning</li>
            <li>Deep cleaning</li>
            <li>Move-in / move-out</li>
            <li>Office & commercial</li>
          </ul>
        </div>
        <div>
          <h4 className="font-display text-sm tracking-widest text-sun uppercase">Contact</h4>
          <a href={BUSINESS.phoneHref} className="mt-4 block font-display text-2xl text-sun">{BUSINESS.phone}</a>
          <p className="mt-3 text-sm text-cream/70">{BUSINESS.address}<br />{BUSINESS.hours}</p>
        </div>
      </div>
      <div className="mx-auto mt-12 max-w-6xl border-t border-cream/15 px-5 pt-6 text-xs text-cream/50">
        © 2026 {BUSINESS.full} · Demo website — replace with your business details.
      </div>
    </footer>
  );
}

export function ScrollToTop() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return null;
}

/* ---------- spray bottle graphic ---------- */
export function SprayBottle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 210" className={className} aria-hidden>
      {/* mist */}
      <g fill="#9fd8ff" opacity="0.85">
        <circle cx="112" cy="36" r="3.5" />
        <circle cx="104" cy="26" r="2.5" />
        <circle cx="116" cy="50" r="2.5" />
        <circle cx="96" cy="38" r="2" />
      </g>
      {/* sprayer head */}
      <rect x="38" y="40" width="58" height="26" rx="9" fill="#16241D" />
      <rect x="90" y="47" width="16" height="11" rx="4" fill="#16241D" />
      <rect x="44" y="47" width="10" height="12" rx="3" fill="#FFC82E" />
      {/* trigger */}
      <path d="M50 66 q-8 16 -4 32" stroke="#16241D" strokeWidth="9" fill="none" strokeLinecap="round" />
      {/* neck */}
      <rect x="54" y="66" width="16" height="18" fill="#16241D" />
      {/* bottle body */}
      <rect x="30" y="84" width="64" height="118" rx="16" fill="#FFC82E" />
      <rect x="30" y="84" width="64" height="118" rx="16" fill="url(#bottlegloss)" />
      {/* label */}
      <rect x="40" y="112" width="44" height="56" rx="8" fill="#FBF7EF" />
      <text x="62" y="142" textAnchor="middle" fontFamily="Arial Black, sans-serif" fontSize="26" fontWeight="900" fill="#16241D">S</text>
      <text x="62" y="158" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="8" fontWeight="700" letterSpacing="1.5" fill="#16241D">SPOTLESS</text>
      <defs>
        <linearGradient id="bottlegloss" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0.35" />
          <stop offset="0.25" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#16241D" stopOpacity="0.12" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ---------- handheld squeegee graphic ---------- */
export function Squeegee({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 170 84" className={className} aria-hidden>
      <rect x="8" y="30" width="72" height="17" rx="8.5" fill="#16241D" />
      <rect x="72" y="22" width="88" height="34" rx="8" fill="#FFC82E" />
      <rect x="72" y="48" width="88" height="9" rx="4.5" fill="#16241D" />
      <rect x="72" y="22" width="88" height="34" rx="8" fill="#fff" opacity="0.18" />
    </svg>
  );
}

/* ---------- tall wiper blade for the loader ---------- */
function LoaderWiper() {
  return (
    <svg viewBox="0 0 90 620" className="h-[105vh] w-auto drop-shadow-[0_10px_25px_rgba(22,36,29,0.35)]" aria-hidden>
      {/* handle */}
      <rect x="37" y="6" width="16" height="130" rx="8" fill="#16241D" />
      <rect x="37" y="6" width="16" height="130" rx="8" fill="#fff" opacity="0.12" />
      {/* blade channel */}
      <rect x="18" y="136" width="54" height="470" rx="10" fill="#FFC82E" />
      <rect x="18" y="136" width="54" height="470" rx="10" fill="#fff" opacity="0.2" />
      {/* rubber edge (leading) */}
      <rect x="18" y="136" width="10" height="470" rx="5" fill="#16241D" />
      {/* water droplets flung off */}
      <g fill="#9fd8ff" opacity="0.9">
        <circle cx="8" cy="220" r="5" />
        <circle cx="4" cy="330" r="3.5" />
        <circle cx="9" cy="450" r="4.5" />
        <circle cx="5" cy="540" r="3" />
      </g>
    </svg>
  );
}

/* ---------- loading screen: wiper cleans the screen ---------- */
export function Loader({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      onDone();
      return;
    }
    document.body.style.overflow = "hidden";
    const t0 = performance.now();
    const dur = 2000;
    let raf = 0;
    const tick = (t: number) => {
      const raw = Math.min(1, (t - t0) / dur);
      // easeInOut: steady wipe
      const p = raw < 0.5 ? 2 * raw * raw : 1 - Math.pow(-2 * raw + 2, 2) / 2;
      setProgress(p);
      if (raw < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setFading(true);
        setTimeout(() => {
          document.body.style.overflow = "";
          onDone();
        }, 450);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = "";
    };
  }, [onDone]);

  const pct = progress * 100;

  return (
    <div
      className={`fixed inset-0 z-[100] transition-opacity duration-500 ${fading ? "pointer-events-none opacity-0" : ""}`}
      aria-hidden
    >
      {/* dirty fog layer — gets wiped away left → right */}
      <div
        className="absolute inset-0 bg-[#ddd6c2]/95 backdrop-blur-[7px]"
        style={{ clipPath: `inset(0 0 0 ${pct}%)` }}
      >
        {/* grime smudges */}
        <div className="absolute inset-0 opacity-70" style={{ background: "radial-gradient(ellipse 35% 28% at 18% 22%, rgba(90,75,50,0.35), transparent), radial-gradient(ellipse 30% 24% at 78% 66%, rgba(90,75,50,0.32), transparent), radial-gradient(ellipse 22% 18% at 55% 88%, rgba(90,75,50,0.3), transparent), radial-gradient(ellipse 26% 20% at 88% 18%, rgba(90,75,50,0.28), transparent)" }} />
        {/* brand mark, wiped off with the grime */}
        <div className="absolute inset-0 grid place-items-center">
          <div className="text-center">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-sun font-display text-3xl text-ink shadow-lg">S</div>
            <div className="mt-3 font-display text-2xl tracking-wide text-ink uppercase">Spotless</div>
            <div className="mt-1 text-xs font-semibold tracking-[0.3em] text-ink/50 uppercase">wiping…</div>
          </div>
        </div>
      </div>

      {/* gleam trail just behind the wiper */}
      <div
        className="absolute inset-y-0 w-24 bg-gradient-to-r from-transparent via-white/50 to-transparent"
        style={{ left: `calc(${pct}% - 7rem)` }}
      />

      {/* the wiper itself */}
      <div className="absolute inset-y-0" style={{ left: `calc(${pct}% - 45px)` }}>
        <LoaderWiper />
      </div>
    </div>
  );
}
