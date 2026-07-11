import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Phone, MapPin, Clock, MessageCircle, ArrowRight, ArrowUp, Send,
  Award, Users, GraduationCap, Sparkles, ShieldCheck, Cpu, Keyboard,
  Calculator, Wifi, Printer, FileSpreadsheet, MonitorSmartphone,
  BookOpen, Presentation, Wrench, Globe2, Star, ChevronDown,
  Building2, Timer, Rocket, Menu, X, Sun, Moon, Mail, CheckCircle2,
} from "lucide-react";
import { useReveal, useCountUp } from "@/hooks/use-reveal";
import { useContent } from "@/lib/site-content";
import { Lightbox } from "@/components/lightbox";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "EducationalOrganization",
          name: "New Pitman Institute",
          description: "Government registered computer training institute in Najafgarh, Delhi.",
          telephone: ["+91-9911152004", "+91-9911152003"],
          address: {
            "@type": "PostalAddress",
            streetAddress: "28 Feet Road, Near Shiv Shakti Properties, Main Gopal Nagar, Prem Nagar",
            addressLocality: "Najafgarh",
            addressRegion: "Delhi",
            postalCode: "110043",
            addressCountry: "IN",
          },
        }),
      },
    ],
  }),
});

function Index() {
  const c = useContent();
  const LOGO_URL = c.brand.logo;
  const PHONE_1 = c.contact.phone1;
  const WHATSAPP = c.contact.whatsapp;
  useReveal();
  const [dark, setDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const y = window.scrollY;
        setScrolled(y > 12);
        const h = document.documentElement;
        const p = y / (h.scrollHeight - h.clientHeight);
        setProgress(Math.min(1, Math.max(0, p)));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); if (raf) cancelAnimationFrame(raf); };
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      {/* Page loader */}
      <div
        className={`fixed inset-0 z-[100] grid place-items-center bg-gradient-hero transition-opacity duration-500 ${loading ? "opacity-100" : "pointer-events-none opacity-0"}`}
      >
        <div className="flex flex-col items-center gap-4 text-white">
          <div className="relative h-20 w-20">
            <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-[var(--gold)] border-r-[var(--gold)]/40" />
            <img src={LOGO_URL} alt="New Pitman Institute" className="absolute inset-1.5 h-[calc(100%-12px)] w-[calc(100%-12px)] rounded-full object-cover bg-white" />
          </div>
          <div className="font-display text-sm tracking-[0.3em]">{c.brand.name}</div>
        </div>
      </div>

      {/* Scroll progress */}
      <div className="fixed inset-x-0 top-0 z-[80] h-[3px] bg-transparent">
        <div className="h-full bg-gradient-brand" style={{ width: `${progress * 100}%` }} />
      </div>

      <Navbar dark={dark} setDark={setDark} scrolled={scrolled} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Hero />
      <Stats />
      <Marquee />
      <About />
      <WhyUs />
      <Courses />
      <Process />
      <Facilities />
      <Teachers />
      <Testimonials />
      <Gallery />
      <FAQ />
      <InquiryAndContact />
      <Footer />

      {/* Floating side buttons */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3">
        <a
          href={`https://wa.me/${WHATSAPP}?text=Hi%20New%20Pitman%20Institute%2C%20I%20want%20to%20know%20about%20your%20courses.`}
          target="_blank"
          rel="noreferrer"
          aria-label="Chat on WhatsApp"
          className="magnetic-btn grid h-12 w-12 place-items-center rounded-full bg-[#25D366] text-white shadow-elegant"
        >
          <MessageCircle className="h-6 w-6" />
          <span className="absolute inset-0 rounded-full pulse-ring" />
        </a>
        <a
          href={`tel:${PHONE_1}`}
          aria-label="Call institute"
          className="magnetic-btn grid h-12 w-12 place-items-center rounded-full bg-gradient-brand text-white shadow-elegant"
        >
          <Phone className="h-5 w-5" />
        </a>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className={`magnetic-btn grid h-11 w-11 place-items-center rounded-full glass text-foreground shadow-soft transition ${progress > 0.15 ? "opacity-100" : "pointer-events-none opacity-0"}`}
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

/* ---------- NAVBAR ---------- */
const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#courses", label: "Courses" },
  { href: "#why", label: "Why Us" },
  { href: "#faculty", label: "Faculty" },
  { href: "#gallery", label: "Gallery" },
  { href: "#contact", label: "Contact" },
];

function Navbar({ dark, setDark, scrolled, menuOpen, setMenuOpen }: {
  dark: boolean; setDark: (v: boolean) => void; scrolled: boolean; menuOpen: boolean; setMenuOpen: (v: boolean) => void;
}) {
  return (
    <header
      className={`fixed inset-x-0 top-0 z-[70] transition-all duration-500 ${scrolled ? "translate-y-2" : "translate-y-0"}`}
    >
      <nav
        className={`mx-auto flex max-w-7xl items-center justify-between rounded-2xl px-4 py-3 transition-all duration-500 md:px-6 ${scrolled ? "mx-3 glass shadow-soft md:mx-auto" : "bg-transparent"}`}
      >
        <a href="#top" className="flex items-center gap-2.5">
          <div className="relative h-11 w-11 overflow-hidden rounded-xl bg-white shadow-elegant ring-1 ring-border">
            <img src={LOGO_URL} alt="New Pitman Institute logo" className="h-full w-full object-cover" />
          </div>
          <div className="leading-tight">
            <div className="font-display text-[15px] font-extrabold tracking-tight text-foreground">NEW PITMAN</div>
            <div className="text-[10px] font-semibold tracking-[0.2em] text-muted-foreground">INSTITUTE · GOVT. REGD.</div>
          </div>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="group relative rounded-lg px-3 py-2 text-sm font-medium text-foreground/80 transition hover:text-foreground"
              >
                {l.label}
                <span className="absolute inset-x-3 -bottom-0.5 h-0.5 origin-left scale-x-0 rounded bg-gradient-brand transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            aria-label="Toggle theme"
            onClick={() => setDark(!dark)}
            className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-card text-foreground shadow-soft transition hover:scale-105"
          >
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <a
            href="#inquiry"
            className="magnetic-btn hidden rounded-xl bg-gradient-brand px-4 py-2.5 text-sm font-semibold text-white shadow-elegant md:inline-flex"
          >
            Apply Now
          </a>
          <button
            aria-label="Menu"
            className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-card lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`mx-3 mt-2 overflow-hidden rounded-2xl glass shadow-soft transition-all duration-300 lg:hidden ${menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <ul className="flex flex-col p-3">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="block rounded-lg px-3 py-2.5 text-sm font-medium text-foreground/90 hover:bg-muted"
              >
                {l.label}
              </a>
            </li>
          ))}
          <a
            href="#inquiry"
            onClick={() => setMenuOpen(false)}
            className="mt-2 rounded-xl bg-gradient-brand px-4 py-2.5 text-center text-sm font-semibold text-white"
          >
            Apply Now
          </a>
        </ul>
      </div>
    </header>
  );
}

/* ---------- HERO ---------- */
function Hero() {
  const words = ["Career", "Skills", "Future", "Confidence"];
  const [wi, setWi] = useState(0);
  const [txt, setTxt] = useState("");
  const [del, setDel] = useState(false);
  useEffect(() => {
    const current = words[wi];
    let t: ReturnType<typeof setTimeout>;
    if (!del && txt !== current) {
      t = setTimeout(() => setTxt(current.slice(0, txt.length + 1)), 90);
    } else if (!del && txt === current) {
      t = setTimeout(() => setDel(true), 1400);
    } else if (del && txt !== "") {
      t = setTimeout(() => setTxt(current.slice(0, txt.length - 1)), 45);
    } else {
      setDel(false);
      setWi((wi + 1) % words.length);
    }
    return () => clearTimeout(t);
  });

  return (
    <section id="top" className="relative overflow-hidden bg-gradient-hero pb-24 pt-32 text-white lg:pb-32 lg:pt-40">
      <div className="absolute inset-0 hero-grid-bg" />
      {/* Floating shapes */}
      <div className="pointer-events-none absolute -left-24 top-24 h-72 w-72 bg-[#2563eb]/40 blur-3xl blob-anim" />
      <div className="pointer-events-none absolute -right-24 top-1/3 h-80 w-80 bg-[#f59e0b]/30 blur-3xl blob-anim [animation-delay:-6s]" />
      <div className="pointer-events-none absolute left-1/2 bottom-0 h-56 w-56 -translate-x-1/2 bg-white/10 blur-3xl blob-anim [animation-delay:-12s]" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 md:px-6 lg:grid-cols-[1.05fr_1fr]">
        <div>
          <div className="reveal inline-flex items-center gap-2 rounded-full glass-dark px-3 py-1.5 text-xs font-semibold text-white/90">
            <ShieldCheck className="h-3.5 w-3.5 text-[var(--gold)]" />
            Government Registered · Since 2014
          </div>
          <h1 className="reveal mt-5 font-display text-4xl font-black leading-[1.05] tracking-tight md:text-6xl lg:text-[68px]">
            Build Your{" "}
            <span className="text-gradient-accent type-caret inline-block">{txt}</span>
            <br />
            with Professional
            <br />
            Computer Education
          </h1>
          <p className="reveal mt-6 max-w-xl text-base leading-relaxed text-white/80 md:text-lg">
            Practical training in MS Office, Tally Prime with GST, Advanced Excel, Typing, DTP,
            Hardware and career skills — taught in English & Hindi at our Najafgarh campus.
          </p>

          <div className="reveal mt-8 flex flex-wrap items-center gap-3">
            <a href="#inquiry" className="magnetic-btn ripple inline-flex items-center gap-2 rounded-xl bg-gradient-accent px-6 py-3.5 font-semibold text-black shadow-glow">
              Apply Now <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#courses" className="magnetic-btn inline-flex items-center gap-2 rounded-xl glass-dark px-6 py-3.5 font-semibold text-white">
              Explore Courses
            </a>
            <a href={`tel:${PHONE_1}`} className="magnetic-btn inline-flex items-center gap-2 rounded-xl border border-white/20 px-6 py-3.5 font-semibold text-white/90 hover:bg-white/10">
              <Phone className="h-4 w-4" /> Call Now
            </a>
          </div>

          <div className="reveal mt-10 flex flex-wrap items-center gap-6 text-sm text-white/70">
            <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[var(--gold)]" /> Small batch size</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[var(--gold)]" /> Certificate on completion</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[var(--gold)]" /> Flexible timings</div>
          </div>
        </div>

        <div className="reveal-zoom relative">
          <div className="absolute -inset-6 rounded-[2rem] bg-gradient-accent opacity-20 blur-3xl" />
          <div className="animated-border relative overflow-hidden rounded-[1.75rem] shadow-elegant">
            <img
              src={heroImg}
              alt="Students learning at New Pitman Institute computer lab"
              width={1600}
              height={1104}
              className="h-[520px] w-full object-cover"
            />
            {/* floating info card */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3 rounded-2xl glass p-3 text-foreground shadow-soft">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-brand text-white">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Live batches</div>
                  <div className="text-sm font-semibold">Admissions Open</div>
                </div>
              </div>
              <a href="#inquiry" className="rounded-lg bg-gradient-brand px-3 py-2 text-xs font-semibold text-white">Enroll</a>
            </div>
          </div>

          {/* floating icons */}
          <div className="pointer-events-none absolute -left-6 top-8 grid h-14 w-14 place-items-center rounded-2xl glass shadow-soft float-y">
            <FileSpreadsheet className="h-7 w-7 text-[var(--brand)]" />
          </div>
          <div className="pointer-events-none absolute -right-4 top-1/3 grid h-14 w-14 place-items-center rounded-2xl glass shadow-soft float-y [animation-delay:-2s]">
            <Keyboard className="h-7 w-7 text-[var(--brand-2)]" />
          </div>
          <div className="pointer-events-none absolute -right-6 bottom-24 grid h-14 w-14 place-items-center rounded-2xl glass shadow-soft float-y [animation-delay:-4s]">
            <Calculator className="h-7 w-7 text-[var(--gold)]" />
          </div>
        </div>
      </div>

      {/* wave divider */}
      <svg className="absolute inset-x-0 bottom-0 h-16 w-full text-background" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden>
        <path fill="currentColor" d="M0,32L60,37.3C120,43,240,53,360,53.3C480,53,600,43,720,37.3C840,32,960,32,1080,37.3C1200,43,1320,53,1380,58.7L1440,64L1440,80L0,80Z" />
      </svg>
    </section>
  );
}

/* ---------- MARQUEE ---------- */
function Marquee() {
  const items = ["MS Office", "Tally Prime + GST", "Advanced Excel", "Typing English", "Typing Hindi", "DTP", "Hardware", "CCC", "Digital Skills", "Accounting"];
  const row = [...items, ...items];
  return (
    <div className="border-y border-border bg-card py-4 overflow-hidden">
      <div className="marquee-track flex w-max gap-10 whitespace-nowrap">
        {row.map((it, i) => (
          <div key={i} className="flex items-center gap-3 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            <Sparkles className="h-4 w-4 text-[var(--gold)]" /> {it}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- STATS ---------- */
function Stats() {
  const stats = [
    { n: 1000, suffix: "+", label: "Students Trained", icon: Users },
    { n: 25, suffix: "+", label: "Professional Courses", icon: BookOpen },
    { n: 10, suffix: "+", label: "Years of Experience", icon: Award },
    { n: 95, suffix: "%", label: "Student Satisfaction", icon: Star },
  ];
  return (
    <section className="mx-auto -mt-8 max-w-7xl px-4 md:px-6">
      <div className="reveal relative z-10 grid grid-cols-2 gap-4 rounded-3xl border border-border bg-card p-6 shadow-elegant md:grid-cols-4 md:p-8">
        {stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>
    </section>
  );
}
function StatCard({ n, suffix, label, icon: Icon }: { n: number; suffix: string; label: string; icon: any }) {
  const ref = useRef<HTMLSpanElement>(null);
  useCountUp(ref, n);
  return (
    <div className="group flex items-center gap-4">
      <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-muted text-[var(--brand)] transition group-hover:bg-gradient-brand group-hover:text-white">
        <Icon className="h-6 w-6" />
      </div>
      <div className="min-w-0">
        <div className="font-display text-3xl font-black text-foreground md:text-4xl">
          <span ref={ref}>0</span>
          <span className="text-gradient-accent">{suffix}</span>
        </div>
        <div className="text-xs font-medium uppercase tracking-widest text-muted-foreground">{label}</div>
      </div>
    </div>
  );
}

/* ---------- ABOUT ---------- */
function About() {
  const points = [
    { icon: Award, title: "Govt. Registered", desc: "Officially recognised institute." },
    { icon: Presentation, title: "Practical Learning", desc: "Hands-on training on every module." },
    { icon: Users, title: "Experienced Trainers", desc: "Friendly mentors with industry background." },
    { icon: Rocket, title: "Career Guidance", desc: "Placement assistance & job-ready portfolio." },
  ];
  return (
    <section id="about" className="mx-auto max-w-7xl px-4 py-24 md:px-6">
      <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div className="reveal-left">
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-brand opacity-10 blur-2xl" />
            <img
              src={galleryClass}
              alt="Digital classroom at New Pitman Institute"
              width={1200} height={900}
              loading="lazy"
              className="relative rounded-3xl shadow-elegant tilt"
            />
            <div className="absolute -bottom-6 -right-6 hidden rounded-2xl bg-card p-5 shadow-elegant md:block">
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-accent text-black"><Award className="h-6 w-6" /></div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">Since</div>
                  <div className="font-display text-2xl font-black">2014</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="reveal-right">
          <SectionEyebrow>About the institute</SectionEyebrow>
          <h2 className="mt-3 font-display text-4xl font-black leading-tight md:text-5xl">
            A <span className="text-gradient-brand">trusted</span> name in computer<br />
            education across Najafgarh.
          </h2>
          <p className="mt-5 max-w-xl text-muted-foreground">
            New Pitman Institute is a Government registered training centre delivering practical,
            career-oriented computer education. Our mission is simple — every student should walk out
            job-ready with skills that matter.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {points.map((p) => (
              <div key={p.title} className="card-lift group flex items-start gap-4 rounded-2xl border border-border bg-card p-5">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-muted text-[var(--brand)] transition group-hover:bg-gradient-brand group-hover:text-white">
                  <p.icon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <div className="font-display font-semibold">{p.title}</div>
                  <div className="text-sm text-muted-foreground">{p.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="rounded-2xl bg-gradient-brand p-5 text-white shadow-elegant">
              <div className="text-xs uppercase tracking-widest text-white/80">Our Mission</div>
              <p className="mt-2 text-sm">Empower every learner with practical digital skills that unlock real careers.</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Our Vision</div>
              <p className="mt-2 text-sm">Be Delhi's most trusted neighbourhood institute for job-ready computer education.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- WHY US ---------- */
function WhyUs() {
  const items = [
    { icon: ShieldCheck, title: "Government Registered", desc: "Official recognition & authentic certificates." },
    { icon: Users, title: "Experienced Faculty", desc: "Patient, friendly and highly qualified mentors." },
    { icon: Cpu, title: "Live Practical Training", desc: "Real assignments on live software daily." },
    { icon: Timer, title: "Affordable Fees", desc: "Best value in Najafgarh with easy installments." },
    { icon: Clock, title: "Flexible Timing", desc: "Morning, afternoon & evening batches." },
    { icon: Award, title: "Certification", desc: "Industry-recognised course completion certificate." },
    { icon: MonitorSmartphone, title: "Latest Computers", desc: "Modern hardware and current software versions." },
    { icon: Rocket, title: "Career Guidance", desc: "Resume building and interview preparation." },
    { icon: Building2, title: "Placement Assistance", desc: "Referrals to hiring partners in Delhi NCR." },
    { icon: Users, title: "Small Batches", desc: "Personal attention for every learner." },
    { icon: Star, title: "Personal Attention", desc: "1:1 doubt clearing sessions on demand." },
    { icon: Sparkles, title: "Friendly Environment", desc: "Welcoming space where students thrive." },
  ];
  return (
    <section id="why" className="relative overflow-hidden bg-muted/60 py-24">
      <div className="pointer-events-none absolute -top-20 left-1/2 h-80 w-[80%] -translate-x-1/2 rounded-full bg-gradient-brand opacity-10 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 md:px-6">
        <div className="reveal mx-auto max-w-2xl text-center">
          <SectionEyebrow center>Why choose us</SectionEyebrow>
          <h2 className="mt-3 font-display text-4xl font-black md:text-5xl">
            Everything you need to <span className="text-gradient-brand">succeed</span>.
          </h2>
          <p className="mt-4 text-muted-foreground">Twelve reasons students and parents in Najafgarh keep choosing New Pitman Institute.</p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((it, i) => (
            <div key={it.title} className="reveal card-lift group rounded-2xl border border-border bg-card p-6" style={{ animationDelay: `${i * 40}ms` }}>
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-brand text-white shadow-soft transition group-hover:scale-110">
                <it.icon className="h-6 w-6" />
              </div>
              <div className="mt-4 font-display text-lg font-bold">{it.title}</div>
              <div className="mt-1 text-sm text-muted-foreground">{it.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- COURSES ---------- */
const COURSES = [
  { icon: Cpu, name: "Basic Computer", dur: "2 Months", desc: "Windows, files, internet & digital fundamentals.", features: ["Fundamentals", "Windows", "Internet"] },
  { icon: FileSpreadsheet, name: "MS Office", dur: "3 Months", desc: "Word, Excel, PowerPoint & Outlook for office work.", features: ["Word", "Excel", "PowerPoint"] },
  { icon: FileSpreadsheet, name: "Advanced Excel", dur: "2 Months", desc: "Formulas, pivots, dashboards, VBA basics.", features: ["Formulas", "Pivot", "Dashboards"] },
  { icon: Calculator, name: "Tally Prime with GST", dur: "3 Months", desc: "Complete accounting, inventory, GST returns.", features: ["Accounting", "GST", "Payroll"] },
  { icon: Keyboard, name: "Typing English", dur: "1–3 Months", desc: "Speed & accuracy on standard keyboard.", features: ["30–60 WPM", "Accuracy", "Tests"] },
  { icon: Keyboard, name: "Typing Hindi", dur: "1–3 Months", desc: "Krutidev / Mangal typing with speed tests.", features: ["Krutidev", "Mangal", "Practice"] },
  { icon: Printer, name: "DTP", dur: "3 Months", desc: "Photoshop, CorelDraw, InDesign for print design.", features: ["Photoshop", "Corel", "InDesign"] },
  { icon: Wrench, name: "Computer Hardware", dur: "3 Months", desc: "Assembly, troubleshooting, OS installation.", features: ["Assembly", "Repair", "OS Install"] },
  { icon: Wifi, name: "Internet Skills", dur: "1 Month", desc: "Email, cloud, safe browsing, productivity.", features: ["Email", "Cloud", "Safety"] },
  { icon: Globe2, name: "Digital Skills", dur: "2 Months", desc: "Digital India certifications & everyday apps.", features: ["UPI", "e-Gov", "DigiLocker"] },
  { icon: Calculator, name: "Accounting Software", dur: "2 Months", desc: "BUSY / Marg / QuickBooks fundamentals.", features: ["BUSY", "Marg", "QB"] },
  { icon: BookOpen, name: "CCC Preparation", dur: "1 Month", desc: "Focused prep for NIELIT CCC examination.", features: ["Syllabus", "Practice", "Mock"] },
];

function Courses() {
  return (
    <section id="courses" className="mx-auto max-w-7xl px-4 py-24 md:px-6">
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <div className="reveal max-w-2xl">
          <SectionEyebrow>Featured courses</SectionEyebrow>
          <h2 className="mt-3 font-display text-4xl font-black md:text-5xl">
            Job-ready programs, <span className="text-gradient-brand">taught practically</span>.
          </h2>
        </div>
        <a href="#inquiry" className="magnetic-btn inline-flex items-center gap-2 rounded-xl bg-gradient-brand px-5 py-3 text-sm font-semibold text-white shadow-elegant">
          Get Fees & Syllabus <ArrowRight className="h-4 w-4" />
        </a>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {COURSES.map((c, i) => (
          <div key={c.name} className="reveal card-lift group relative overflow-hidden rounded-2xl border border-border bg-card p-6" style={{ animationDelay: `${i * 30}ms` }}>
            <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-brand opacity-0 blur-3xl transition group-hover:opacity-20" />
            <div className="flex items-center justify-between">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-brand text-white shadow-soft">
                <c.icon className="h-6 w-6" />
              </div>
              <span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground">{c.dur}</span>
            </div>
            <h3 className="mt-5 font-display text-xl font-bold">{c.name}</h3>
            <p className="mt-1.5 text-sm text-muted-foreground">{c.desc}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {c.features.map((f) => (
                <li key={f} className="rounded-md bg-muted px-2.5 py-1 text-xs font-medium text-foreground/80">{f}</li>
              ))}
            </ul>
            <div className="mt-6 flex items-center justify-between">
              <a href="#inquiry" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--brand-2)]">
                Enroll <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </a>
              <a href={`tel:${PHONE_1}`} className="text-xs font-semibold text-muted-foreground hover:text-foreground">Call for details</a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- PROCESS ---------- */
function Process() {
  const steps = [
    { n: "01", title: "Admission", desc: "Choose your course, complete quick registration." },
    { n: "02", title: "Training", desc: "Structured classes with theory + demonstration." },
    { n: "03", title: "Practice", desc: "Daily lab practice with mentor support." },
    { n: "04", title: "Certification", desc: "Assessment and official certificate." },
    { n: "05", title: "Career Growth", desc: "Resume, interview prep and placement help." },
  ];
  return (
    <section className="relative overflow-hidden bg-gradient-hero py-24 text-white">
      <div className="absolute inset-0 hero-grid-bg" />
      <div className="relative mx-auto max-w-7xl px-4 md:px-6">
        <div className="reveal max-w-2xl">
          <SectionEyebrow light>Learning process</SectionEyebrow>
          <h2 className="mt-3 font-display text-4xl font-black md:text-5xl">
            A clear path from <span className="text-gradient-accent">enrollment</span> to your first job.
          </h2>
        </div>
        <div className="mt-14 grid gap-5 md:grid-cols-5">
          {steps.map((s, i) => (
            <div key={s.n} className="reveal relative rounded-2xl glass-dark p-6" style={{ animationDelay: `${i * 80}ms` }}>
              <div className="font-display text-4xl font-black text-gradient-accent">{s.n}</div>
              <div className="mt-3 font-display text-lg font-bold">{s.title}</div>
              <div className="mt-1 text-sm text-white/70">{s.desc}</div>
              {i < steps.length - 1 && (
                <ArrowRight className="absolute -right-4 top-1/2 hidden h-6 w-6 -translate-y-1/2 text-[var(--gold)] md:block" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- FACILITIES ---------- */
function Facilities() {
  const items = [
    "Modern Computer Lab", "AC Classroom", "Projector", "High-Speed Internet",
    "Latest Software", "Practical Sessions", "Digital Classroom", "Individual Attention",
    "Library", "Career Counseling",
  ];
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 md:px-6">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div className="reveal-left">
          <SectionEyebrow>Facilities</SectionEyebrow>
          <h2 className="mt-3 font-display text-4xl font-black md:text-5xl">
            A campus built for <span className="text-gradient-brand">focused learning</span>.
          </h2>
          <p className="mt-4 max-w-lg text-muted-foreground">
            Everything a modern computer learner needs — right in the heart of Najafgarh.
          </p>
          <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {items.map((f) => (
              <li key={f} className="flex items-center gap-3 rounded-xl border border-border bg-card p-3.5">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-[var(--brand-2)]" />
                <span className="text-sm font-medium">{f}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="reveal-right grid grid-cols-2 gap-4">
          <img src={galleryLab} alt="Computer lab" width={1200} height={900} loading="lazy" className="col-span-2 h-64 rounded-2xl object-cover shadow-elegant tilt" />
          <img src={galleryTyping} alt="Typing practice" width={1000} height={1300} loading="lazy" className="h-72 rounded-2xl object-cover shadow-soft tilt" />
          <img src={galleryCert} alt="Certification" width={1000} height={1200} loading="lazy" className="h-72 rounded-2xl object-cover shadow-soft tilt" />
        </div>
      </div>
    </section>
  );
}

/* ---------- TEACHERS ---------- */
function Teachers() {
  const list = [
    { img: teacher1, name: "Rajesh Kumar", role: "Head — Computer Applications", exp: "12+ yrs", tags: ["MS Office", "Excel", "CCC"] },
    { img: teacher2, name: "Priya Sharma", role: "Sr. Accounting Trainer", exp: "9+ yrs", tags: ["Tally Prime", "GST", "BUSY"] },
    { img: teacher3, name: "Aman Verma", role: "Typing & DTP Expert", exp: "7+ yrs", tags: ["Typing", "Photoshop", "Corel"] },
  ];
  return (
    <section id="faculty" className="bg-muted/60 py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="reveal mx-auto max-w-2xl text-center">
          <SectionEyebrow center>Our faculty</SectionEyebrow>
          <h2 className="mt-3 font-display text-4xl font-black md:text-5xl">
            Mentors who care about your <span className="text-gradient-brand">progress</span>.
          </h2>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {list.map((t) => (
            <div key={t.name} className="reveal card-lift group overflow-hidden rounded-3xl bg-card shadow-soft">
              <div className="relative h-80 overflow-hidden">
                <img src={t.img} alt={t.name} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                  <div>
                    <div className="font-display text-lg font-bold">{t.name}</div>
                    <div className="text-xs text-white/80">{t.role}</div>
                  </div>
                  <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold backdrop-blur">{t.exp}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 p-5">
                {t.tags.map((tag) => (
                  <span key={tag} className="rounded-md bg-muted px-2.5 py-1 text-xs font-medium">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- TESTIMONIALS ---------- */
function Testimonials() {
  const reviews = [
    { name: "Neha Kumari", course: "Tally Prime + GST", text: "The teachers explain everything patiently. I cleared my Tally basics in just 2 months and got a job at a local firm." },
    { name: "Rohit Singh", course: "Advanced Excel", text: "Pivot tables and dashboards felt scary before. Now I use them daily at work. Best decision I made." },
    { name: "Aarti Devi", course: "Typing Hindi", text: "Speed jumped from 15 to 40 WPM in Krutidev. Staff is very supportive and batches are small." },
    { name: "Mohammad Salman", course: "DTP", text: "Learned Photoshop and CorelDraw hands-on. Started freelancing during the course itself." },
  ];
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % reviews.length), 4500);
    return () => clearInterval(t);
  }, [reviews.length]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-24 md:px-6">
      <div className="reveal mx-auto max-w-2xl text-center">
        <SectionEyebrow center>Student stories</SectionEyebrow>
        <h2 className="mt-3 font-display text-4xl font-black md:text-5xl">
          Real students. <span className="text-gradient-brand">Real results.</span>
        </h2>
      </div>

      <div className="reveal mt-14 grid gap-6 md:grid-cols-2">
        {reviews.map((r, idx) => (
          <div key={r.name} className={`card-lift rounded-3xl border border-border bg-card p-8 shadow-soft transition ${idx === i ? "ring-2 ring-[var(--brand-2)]/40" : ""}`}>
            <div className="flex items-center gap-1 text-[var(--gold)]">
              {Array.from({ length: 5 }).map((_, k) => <Star key={k} className="h-4 w-4 fill-current" />)}
            </div>
            <p className="mt-4 text-[15px] leading-relaxed text-foreground/90">"{r.text}"</p>
            <div className="mt-6 flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-full bg-gradient-brand font-display font-bold text-white">
                {r.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
              </div>
              <div>
                <div className="font-display font-semibold">{r.name}</div>
                <div className="text-xs text-muted-foreground">{r.course}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- GALLERY ---------- */
function Gallery() {
  const imgs = [
    { src: galleryLab, label: "Computer Lab", h: "h-72" },
    { src: galleryTyping, label: "Typing Practice", h: "h-96" },
    { src: galleryClass, label: "Classroom", h: "h-64" },
    { src: galleryCert, label: "Certificates", h: "h-96" },
    { src: heroImg, label: "Students", h: "h-72" },
    { src: galleryClass, label: "Events", h: "h-64" },
  ];
  return (
    <section id="gallery" className="bg-muted/60 py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="reveal mx-auto max-w-2xl text-center">
          <SectionEyebrow center>Gallery</SectionEyebrow>
          <h2 className="mt-3 font-display text-4xl font-black md:text-5xl">
            Life at <span className="text-gradient-brand">New Pitman Institute</span>.
          </h2>
        </div>
        <div className="mt-14 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4 [&>*]:break-inside-avoid">
          {imgs.map((im, i) => (
            <div key={i} className="reveal-zoom group relative overflow-hidden rounded-2xl shadow-soft">
              <img src={im.src} alt={im.label} loading="lazy" className={`${im.h} w-full object-cover transition duration-700 group-hover:scale-110`} />
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 via-transparent p-4 opacity-0 transition group-hover:opacity-100">
                <span className="font-display text-sm font-semibold text-white">{im.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */
function FAQ() {
  const items = [
    { q: "Is New Pitman Institute government registered?", a: "Yes, we are a Government registered training institute. All certificates issued are authentic." },
    { q: "Do you offer classes in Hindi and English?", a: "Yes. Every course is available in both Hindi and English medium as per student comfort." },
    { q: "Are the batches small?", a: "Yes. We keep batches small so every student gets personal attention from the trainer." },
    { q: "Do you help with placement?", a: "We provide career guidance, resume building, interview prep, and referrals to hiring partners in Delhi NCR." },
    { q: "What are the timings and how do I enroll?", a: "Morning, afternoon and evening batches available. Fill the inquiry form or call us — admission takes a few minutes." },
    { q: "Where is the institute located?", a: "28 Feet Road, Near Shiv Shakti Properties, Main Gopal Nagar, Prem Nagar, Najafgarh, Delhi 110043." },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="mx-auto max-w-4xl px-4 py-24 md:px-6">
      <div className="reveal text-center">
        <SectionEyebrow center>FAQ</SectionEyebrow>
        <h2 className="mt-3 font-display text-4xl font-black md:text-5xl">Questions, answered.</h2>
      </div>
      <div className="reveal mt-12 space-y-3">
        {items.map((it, i) => (
          <div key={i} className="overflow-hidden rounded-2xl border border-border bg-card">
            <button
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              onClick={() => setOpen(open === i ? null : i)}
              aria-expanded={open === i}
            >
              <span className="font-display font-semibold">{it.q}</span>
              <ChevronDown className={`h-5 w-5 shrink-0 transition ${open === i ? "rotate-180 text-[var(--brand-2)]" : ""}`} />
            </button>
            <div
              className="grid transition-[grid-template-rows] duration-300 ease-out"
              style={{ gridTemplateRows: open === i ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <p className="px-6 pb-5 text-sm text-muted-foreground">{it.a}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- INQUIRY + CONTACT ---------- */
function InquiryAndContact() {
  return (
    <section id="contact" className="relative overflow-hidden py-24">
      <div className="pointer-events-none absolute -top-24 right-0 h-96 w-96 rounded-full bg-gradient-brand opacity-10 blur-3xl" />
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 md:px-6 lg:grid-cols-[1.05fr_1fr]">
        <div id="inquiry" className="reveal-left">
          <SectionEyebrow>Inquiry</SectionEyebrow>
          <h2 className="mt-3 font-display text-4xl font-black md:text-5xl">
            Book your <span className="text-gradient-brand">free counseling</span> session.
          </h2>
          <p className="mt-3 max-w-lg text-muted-foreground">Fill this quick form. Our team will call you within business hours.</p>
          <InquiryForm />
        </div>

        <div className="reveal-right space-y-4">
          <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-elegant">
            <iframe
              title="New Pitman Institute location"
              src="https://www.google.com/maps?q=Main+Gopal+Nagar+Prem+Nagar+Najafgarh+Delhi+110043&output=embed"
              className="h-72 w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <InfoCard icon={MapPin} title="Address" lines={["28 Feet Road, Near Shiv Shakti Properties,", "Main Gopal Nagar, Prem Nagar,", "Najafgarh, Delhi — 110043"]} />
            <InfoCard icon={Clock} title="Working Hours" lines={["Mon – Sat: 9:00 AM – 8:00 PM", "Sunday: Closed"]} />
            <a href={`tel:${PHONE_1}`} className="card-lift rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-brand text-white"><Phone className="h-5 w-5" /></div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">Call</div>
                  <div className="font-display font-semibold">{PHONE_1}</div>
                  <div className="font-display text-sm">{PHONE_2}</div>
                </div>
              </div>
            </a>
            <a
              href={`https://wa.me/${WHATSAPP}`}
              target="_blank" rel="noreferrer"
              className="card-lift rounded-2xl border border-border bg-card p-5"
            >
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-[#25D366] text-white"><MessageCircle className="h-5 w-5" /></div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">WhatsApp</div>
                  <div className="font-display font-semibold">Chat with us</div>
                  <div className="text-xs text-muted-foreground">Quick replies · Mon–Sat</div>
                </div>
              </div>
            </a>
          </div>

          <a
            href="https://www.google.com/maps/dir/?api=1&destination=Main+Gopal+Nagar+Prem+Nagar+Najafgarh+Delhi+110043"
            target="_blank" rel="noreferrer"
            className="magnetic-btn inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-brand px-5 py-4 font-semibold text-white shadow-elegant"
          >
            Get Directions <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

function InfoCard({ icon: Icon, title, lines }: { icon: any; title: string; lines: string[] }) {
  return (
    <div className="card-lift rounded-2xl border border-border bg-card p-5">
      <div className="flex items-start gap-3">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-muted text-[var(--brand)]"><Icon className="h-5 w-5" /></div>
        <div>
          <div className="text-xs uppercase tracking-widest text-muted-foreground">{title}</div>
          {lines.map((l) => <div key={l} className="text-sm">{l}</div>)}
        </div>
      </div>
    </div>
  );
}

function InquiryForm() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", course: "MS Office", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (form.name.trim().length < 2) errs.name = "Please enter your full name";
    if (!/^\d{10}$/.test(form.phone.trim())) errs.phone = "Enter a valid 10-digit phone";
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) errs.email = "Enter a valid email";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    const text = encodeURIComponent(
      `Hi, I want to enroll.\nName: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\nCourse: ${form.course}\nMessage: ${form.message}`
    );
    window.open(`https://wa.me/${WHATSAPP}?text=${text}`, "_blank");
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  }

  const input = "w-full rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none transition focus:border-[var(--brand-2)] focus:ring-4 focus:ring-[var(--brand-2)]/10";

  return (
    <form onSubmit={submit} className="mt-8 space-y-4 rounded-3xl border border-border bg-card p-6 shadow-elegant md:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Full Name" error={errors.name}>
          <input className={input} value={form.name} maxLength={80} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" />
        </Field>
        <Field label="Phone" error={errors.phone}>
          <input className={input} inputMode="numeric" value={form.phone} maxLength={10} onChange={(e) => setForm({ ...form, phone: e.target.value.replace(/\D/g, "") })} placeholder="10-digit mobile" />
        </Field>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Email (optional)" error={errors.email}>
          <input className={input} value={form.email} maxLength={120} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@email.com" />
        </Field>
        <Field label="Course">
          <select className={input} value={form.course} onChange={(e) => setForm({ ...form, course: e.target.value })}>
            {COURSES.map((c) => <option key={c.name}>{c.name}</option>)}
          </select>
        </Field>
      </div>
      <Field label="Message">
        <textarea className={`${input} min-h-[110px]`} value={form.message} maxLength={500} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Anything you'd like us to know" />
      </Field>
      <div className="flex flex-wrap items-center gap-3">
        <button type="submit" className="magnetic-btn inline-flex items-center gap-2 rounded-xl bg-gradient-brand px-6 py-3.5 font-semibold text-white shadow-elegant">
          Send Inquiry <Send className="h-4 w-4" />
        </button>
        <a href={`tel:${PHONE_1}`} className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-3.5 text-sm font-semibold text-foreground hover:bg-muted">
          <Phone className="h-4 w-4" /> Or call {PHONE_1}
        </a>
      </div>

      {sent && (
        <div className="flex items-center gap-3 rounded-xl bg-[color-mix(in_oklab,#22c55e_15%,transparent)] px-4 py-3 text-sm font-semibold text-emerald-700">
          <CheckCircle2 className="h-4 w-4" /> Thanks! Opening WhatsApp with your details…
        </div>
      )}
    </form>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="mb-1.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground">{label}</div>
      {children}
      {error && <div className="mt-1 text-xs font-medium text-destructive">{error}</div>}
    </label>
  );
}

/* ---------- FOOTER ---------- */
function Footer() {
  return (
    <footer className="relative overflow-hidden bg-gradient-hero text-white">
      <div className="absolute inset-0 hero-grid-bg" />
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-16 md:grid-cols-4 md:px-6">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 overflow-hidden rounded-xl bg-white shadow-glow ring-1 ring-white/20">
              <img src={LOGO_URL} alt="New Pitman Institute" className="h-full w-full object-cover" />
            </div>
            <div>
              <div className="font-display text-lg font-extrabold">NEW PITMAN INSTITUTE</div>
              <div className="text-xs tracking-widest text-white/70">GOVT. REGISTERED · NAJAFGARH, DELHI</div>
            </div>
          </div>
          <p className="mt-4 max-w-md text-sm text-white/80">
            Practical computer education for real careers. English & Hindi medium. Small batches.
            Trusted by families across Najafgarh since 2014.
          </p>
          <div className="mt-6 flex gap-3">
            <a href={`tel:${PHONE_1}`} aria-label="Call" className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 hover:bg-white/20"><Phone className="h-4 w-4" /></a>
            <a href={`https://wa.me/${WHATSAPP}`} aria-label="WhatsApp" className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 hover:bg-white/20"><MessageCircle className="h-4 w-4" /></a>
            <a href="mailto:info@newpitmaninstitute.in" aria-label="Email" className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 hover:bg-white/20"><Mail className="h-4 w-4" /></a>
          </div>
        </div>

        <div>
          <div className="font-display text-sm font-semibold tracking-widest text-white/70">QUICK LINKS</div>
          <ul className="mt-4 space-y-2 text-sm">
            {NAV_LINKS.map((l) => (
              <li key={l.href}><a href={l.href} className="text-white/85 transition hover:text-[var(--gold)]">{l.label}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <div className="font-display text-sm font-semibold tracking-widest text-white/70">POPULAR COURSES</div>
          <ul className="mt-4 space-y-2 text-sm">
            {["Tally Prime + GST", "Advanced Excel", "MS Office", "DTP", "Typing English", "CCC Preparation"].map((c) => (
              <li key={c}><a href="#courses" className="text-white/85 transition hover:text-[var(--gold)]">{c}</a></li>
            ))}
          </ul>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 text-xs text-white/70 md:flex-row md:px-6">
          <div>© {new Date().getFullYear()} New Pitman Institute. All rights reserved.</div>
          <div className="flex gap-5">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ---------- SHARED ---------- */
function SectionEyebrow({ children, center, light }: { children: React.ReactNode; center?: boolean; light?: boolean }) {
  return (
    <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] ${center ? "mx-auto" : ""} ${light ? "bg-white/10 text-white" : "bg-muted text-[var(--brand)]"}`}>
      <Sparkles className="h-3 w-3 text-[var(--gold)]" /> {children}
    </div>
  );
}
