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
