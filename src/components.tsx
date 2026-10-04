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


/* ---------- small handheld squeegee (vertical, like the reference) ---------- */
/* ---------- small 3D handheld squeegee (vertical, like the reference) ---------- */
function MiniSqueegee({ tilt = 0, height = 112 }: { tilt?: number; height?: number }) {
  const bladeH = Math.max(48, height - 58);
  const H = 58 + bladeH;
  return (
    <svg
      viewBox={`0 0 64 ${H}`}
      className="w-auto drop-shadow-[0_14px_22px_rgba(22,36,29,0.4)]"
      style={{
        height,
        transform: `rotate(${tilt}deg)`,
        transformBox: "fill-box",
        transformOrigin: "center",
        transition: "transform 0.35s cubic-bezier(0.34, 1.4, 0.64, 1), height 0.3s",
      }}
      aria-hidden
    >
      <defs>
        <linearGradient id="sqBlade" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#8a6a00" />
          <stop offset="0.16" stopColor="#FFC82E" />
          <stop offset="0.42" stopColor="#FFE89A" />
          <stop offset="0.62" stopColor="#FFC82E" />
          <stop offset="1" stopColor="#b88900" />
        </linearGradient>
        <linearGradient id="sqHandle" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#0a100d" />
          <stop offset="0.38" stopColor="#33463c" />
          <stop offset="0.52" stopColor="#4a6355" />
          <stop offset="0.68" stopColor="#223129" />
          <stop offset="1" stopColor="#0a100d" />
        </linearGradient>
        <linearGradient id="sqRubber" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#050807" />
          <stop offset="0.5" stopColor="#2e3b35" />
          <stop offset="1" stopColor="#050807" />
        </linearGradient>
      </defs>
      {/* handle */}
      <rect x="22" y="4" width="20" height="46" rx="10" fill="url(#sqHandle)" />
      <ellipse cx="32" cy="50" rx="10" ry="3.5" fill="#0a100d" opacity="0.55" />
      {/* blade channel */}
      <rect x="14" y="50" width="36" height={bladeH} rx="9" fill="url(#sqBlade)" />
      {/* rubber edge */}
      <rect x="15.5" y="54" width="9" height={bladeH - 8} rx="4.5" fill="url(#sqRubber)" />
      {/* screw dots */}
      <circle cx="32" cy={70} r="2.6" fill="#0a100d" opacity="0.5" />
      <circle cx="32" cy={50 + bladeH - 18} r="2.6" fill="#0a100d" opacity="0.5" />
    </svg>
  );
}

const GRIME =
  "radial-gradient(ellipse 35% 30% at 18% 30%, rgba(90,75,50,0.35), transparent), radial-gradient(ellipse 30% 26% at 78% 60%, rgba(90,75,50,0.32), transparent), radial-gradient(ellipse 22% 20% at 55% 85%, rgba(90,75,50,0.3), transparent)";

/* ---------- loading screen: small squeegee wipes 3 bands ---------- */
export function Loader({ onDone }: { onDone: () => void }) {
  const [p, setP] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      onDone();
      return;
    }
    document.body.style.overflow = "hidden";
    const t0 = performance.now();
    const dur = 2500;
    let raf = 0;
    const tick = (t: number) => {
      const r = Math.min(1, (t - t0) / dur);
      setP(r);
      if (r < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setFading(true);
        setTimeout(() => {
          document.body.style.overflow = "";
          onDone();
        }, 400);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = "";
    };
  }, [onDone]);

  // wiper path: L→R (top third) → down → R→L (middle third) → down → L→R (bottom third)
  const segs: Array<[number, number, number, number, number, number]> = [
    [0.0, 0.3, 0.03, 1 / 6, 0.97, 1 / 6],
    [0.3, 0.36, 0.97, 1 / 6, 0.97, 0.5],
    [0.36, 0.62, 0.97, 0.5, 0.03, 0.5],
    [0.62, 0.68, 0.03, 0.5, 0.03, 5 / 6],
    [0.68, 1.0, 0.03, 5 / 6, 0.97, 5 / 6],
  ];
  let wx = 0.03;
  let wy = 1 / 6;
  let dir = 1;
  for (const [a, b, x0, y0, x1, y1] of segs) {
    if (p <= b) {
      const q = Math.min(1, Math.max(0, (p - a) / (b - a)));
      wx = x0 + (x1 - x0) * q;
      wy = y0 + (y1 - y0) * q;
      dir = x1 < x0 ? -1 : 1;
      break;
    }
  }

  const q1 = Math.min(1, p / 0.3);
  const q2 = Math.min(1, Math.max(0, (p - 0.36) / 0.26));
  const q3 = Math.min(1, Math.max(0, (p - 0.68) / 0.32));
  const fog = "bg-[#ddd6c2]/95 backdrop-blur-[4px]";

  return (
    <div
      className={`fixed inset-0 z-[100] transition-opacity duration-500 ${fading ? "pointer-events-none opacity-0" : ""}`}
      aria-hidden
    >
      {/* band 1: top third — wiped left → right */}
      <div className={`absolute inset-x-0 top-0 h-[33.333%] ${fog}`} style={{ clipPath: `inset(0 0 0 ${q1 * 100}%)` }}>
        <div className="absolute inset-0 opacity-70" style={{ background: GRIME }} />
      </div>
      {/* band 2: middle third — wiped right → left */}
      <div className={`absolute inset-x-0 top-[33.333%] h-[33.333%] ${fog}`} style={{ clipPath: `inset(0 ${q2 * 100}% 0 0)` }}>
        <div className="absolute inset-0 opacity-70" style={{ background: GRIME }} />
      </div>
      {/* band 3: bottom third — wiped left → right */}
      <div className={`absolute inset-x-0 top-[66.666%] h-[33.334%] ${fog}`} style={{ clipPath: `inset(0 0 0 ${q3 * 100}%)` }}>
        <div className="absolute inset-0 opacity-70" style={{ background: GRIME }} />
      </div>

      {/* brand mark, fades as the wipe progresses */}
      <div className="absolute inset-0 grid place-items-center" style={{ opacity: Math.max(0, 1 - p * 1.4) }}>
        <div className="text-center">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-sun font-display text-3xl text-ink shadow-lg">S</div>
          <div className="mt-3 font-display text-2xl tracking-wide text-ink uppercase">Spotless</div>
          <div className="mt-1 text-xs font-semibold tracking-[0.3em] text-ink/50 uppercase">wiping…</div>
        </div>
      </div>

      {/* the little wiper — sized to the third it's cleaning, leaning into the stroke */}
      <div className="absolute" style={{ left: `${wx * 100}%`, top: `${wy * 100}%`, transform: "translate(-50%, -50%)" }}>
        <MiniSqueegee
          tilt={dir * 14}
          height={typeof window !== "undefined" ? window.innerHeight / 3 : 240}
        />
      </div>
    </div>
  );
}

/* ---------- animated circular stat ring (hero badge) ---------- */
export function StatRing({ value = 98, label = "would rebook" }: { value?: number; label?: string }) {
  const [p, setP] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setP(value);
      return;
    }
    const io = new IntersectionObserver(
      (es) => {
        if (!es[0].isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const dur = 1500;
        const tick = (t: number) => {
          const r = Math.min(1, (t - t0) / dur);
          // easeOutBack — overshoots like a spring
          const c1 = 1.70158;
          const c3 = c1 + 1;
          const e = 1 + c3 * Math.pow(r - 1, 3) + c1 * Math.pow(r - 1, 2);
          setP(e * value);
          if (r < 1) requestAnimationFrame(tick);
          else setP(value);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value]);

  const R = 52;
  const C = 2 * Math.PI * R;
  const shown = Math.max(0, Math.min(value * 1.02, p));

  return (
    <div ref={ref} className="relative h-32 w-32 sm:h-36 sm:w-36">
      <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90 drop-shadow-[0_14px_24px_rgba(22,36,29,0.4)]">
        <circle cx="60" cy="60" r="58" fill="#16241D" />
        <circle cx="60" cy="60" r={R} fill="none" stroke="#FBF7EF" strokeOpacity="0.14" strokeWidth="10" />
        <circle
          cx="60" cy="60" r={R} fill="none" stroke="#FFC82E" strokeWidth="10" strokeLinecap="round"
          strokeDasharray={C}
          strokeDashoffset={C - (C * shown) / 100}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">
        <div>
          <div className="font-display text-3xl text-sun sm:text-4xl">{Math.round(shown)}%</div>
          <div className="px-5 text-[9px] leading-tight font-bold tracking-[0.16em] text-cream/70 uppercase">{label}</div>
        </div>
      </div>
    </div>
  );
}
