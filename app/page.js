"use client";

/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  animate,
  useInView,
  useReducedMotion,
} from "framer-motion";

/* ---------- helpers ---------- */
const inr = new Intl.NumberFormat("en-IN");

function Counter({ to, suffix = "", decimals = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) return setVal(to);
    const controls = animate(0, to, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate: (v) => setVal(v),
    });
    return () => controls.stop();
  }, [inView, to, reduce]);

  return (
    <span ref={ref}>
      {decimals ? val.toFixed(decimals) : inr.format(Math.round(val))}
      {suffix}
    </span>
  );
}

/* ---------- data ---------- */
const STATS = [
  { to: 12000, suffix: "+", label: "Verified listings" },
  { to: 850, suffix: "+", label: "Expert agents" },
  { to: 25, suffix: "", label: "Cities covered" },
  { to: 4.9, suffix: "/5", label: "Client rating", decimals: 1 },
];

const WHY = [
  {
    title: "Verified Properties",
    text: "Every listing is checked on paper and on site, so what you see is what you get.",
    icon: (
      <path d="M12 3l7 3v5c0 4.5-3 8.3-7 10-4-1.7-7-5.5-7-10V6l7-3zm-1 12l5-5-1.4-1.4L11 12.2 9.4 10.6 8 12l3 3z" />
    ),
  },
  {
    title: "Expert Agents",
    text: "Local agents who know the lanes, the builders and the fair price of every street.",
    icon: (
      <path d="M12 12a4 4 0 100-8 4 4 0 000 8zm0 2c-4 0-8 2-8 5v1h16v-1c0-3-4-5-8-5z" />
    ),
  },
  {
    title: "Easy Financing",
    text: "Compare home-loan plans and see your monthly EMI before you fall in love with a flat.",
    icon: (
      <path d="M3 6h18v12H3V6zm2 2v8h14V8H5zm7 1.5a2.5 2.5 0 110 5 2.5 2.5 0 010-5z" />
    ),
  },
];

const PROPERTIES = [
  { id: 1, type: "Villa", title: "Stylish Family Home", city: "Bengaluru, India", price: 12000000, beds: 4, baths: 3, area: 2400 },
  { id: 2, type: "Apartment", title: "Sunlit 3 BHK Apartment", city: "Pune, India", price: 8500000, beds: 3, baths: 2, area: 1450 },
  { id: 3, type: "Apartment", title: "Sea-Facing Skyline Flat", city: "Mumbai, India", price: 21500000, beds: 3, baths: 3, area: 1800 },
];

const TESTIMONIALS = [
  { quote: "Found our dream house in just a week! The agents were incredibly helpful and professional.", name: "Rajesh Mehta", city: "Mumbai" },
  { quote: "Every document was verified before we even visited. That peace of mind is priceless.", name: "Ananya Iyer", city: "Bengaluru" },
  { quote: "The EMI calculator helped us set a budget we were comfortable with. No surprises later.", name: "Karan Singh", city: "Pune" },
];

const CITIES = ["Bengaluru", "Mumbai", "Pune", "Delhi NCR", "Hyderabad", "Kanpur"];
const BUDGETS = ["Any budget", "Under ₹50 L", "₹50 L – ₹1 Cr", "₹1 Cr – ₹2 Cr", "Above ₹2 Cr"];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

/* ---------- sections ---------- */
function SearchBar() {
  const [mode, setMode] = useState("Buy");
  const [city, setCity] = useState(CITIES[0]);
  const [budget, setBudget] = useState(BUDGETS[0]);
  const href = `/Property?mode=${mode}&city=${encodeURIComponent(city)}&budget=${encodeURIComponent(budget)}`;

  return (
    <div className="w-full max-w-3xl mt-10">
      <div className="inline-flex rounded-t-xl bg-white/10 p-1 backdrop-blur">
        {["Buy", "Rent"].map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`px-5 py-2 text-sm font-semibold rounded-lg transition ${
              mode === m ? "bg-white text-slate-900" : "text-white/80 hover:text-white"
            }`}
          >
            {m}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_auto] gap-3 rounded-2xl rounded-tl-none bg-white p-3 shadow-2xl">
        <label className="flex flex-col px-3 py-1 text-left">
          <span className="text-xs font-medium text-slate-500">Location</span>
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="bg-transparent text-slate-900 font-semibold outline-none py-1"
          >
            {CITIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </label>
        <label className="flex flex-col px-3 py-1 text-left sm:border-l sm:border-slate-200">
          <span className="text-xs font-medium text-slate-500">Budget</span>
          <select
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="bg-transparent text-slate-900 font-semibold outline-none py-1"
          >
            {BUDGETS.map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>
        </label>
        <Link
          href={href}
          className="flex items-center justify-center rounded-xl bg-amber-500 px-8 py-3 font-bold text-slate-900 transition hover:bg-amber-400 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300"
        >
          Search homes
        </Link>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section
      style={{
        backgroundImage:
          "url('https://cdn.prod.website-files.com/59e16042ec229e00016d3a66/6048524064e040800db65285_Blog-hero_final%20(1).gif')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      className="relative flex min-h-[92vh] items-center text-white"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950/90 via-slate-900/80 to-blue-950/80" />
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12 py-24">
        <motion.div
          initial="hidden"
          animate="show"
          transition={{ staggerChildren: 0.12 }}
          className="max-w-3xl"
        >
          <motion.p variants={fadeUp} className="mb-4 inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm backdrop-blur">
            12,000+ verified homes across 25 cities
          </motion.p>
          <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight">
            Don't just find a house.
            <br />
            Find the one that <span className="text-amber-400">feels like home.</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-6 max-w-xl text-base sm:text-lg lg:text-xl text-slate-200">
            Browse verified properties, talk to local experts and know your monthly EMI, all in one place.
          </motion.p>
          <motion.div variants={fadeUp}>
            <SearchBar />
          </motion.div>
          <motion.div variants={fadeUp} className="mt-6 flex flex-wrap gap-4 text-sm">
            <Link href="/Property" className="font-semibold text-white underline-offset-4 hover:underline">
              Browse all properties →
            </Link>
            <Link href="/agents" className="text-slate-300 underline-offset-4 hover:text-white hover:underline">
              Talk to an agent
            </Link>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        aria-hidden
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.8 }}
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 text-white/60 md:block"
      >
        ↓
      </motion.div>
    </section>
  );
}

function Stats() {
  return (
    <section className="relative z-20 -mt-12 px-5 sm:px-8">
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 rounded-2xl bg-white p-6 shadow-xl sm:p-8 md:grid-cols-4">
        {STATS.map((s) => (
          <div key={s.label} className="text-center">
            <p className="text-3xl font-extrabold text-blue-700 sm:text-4xl">
              <Counter to={s.to} suffix={s.suffix} decimals={s.decimals} />
            </p>
            <p className="mt-1 text-sm text-slate-500">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function WhyUs() {
  return (
    <section className="px-5 py-20 sm:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Buying a home shouldn't feel like a gamble
          </h2>
          <p className="mt-4 text-slate-600">
            Three promises we keep on every single listing.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {WHY.map((w, i) => (
            <motion.div
              key={w.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -6 }}
              className="group rounded-2xl border border-slate-200 bg-white p-8 transition-shadow hover:shadow-xl"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white transition group-hover:bg-amber-500 group-hover:text-slate-900">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                  {w.icon}
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900">{w.title}</h3>
              <p className="mt-2 text-slate-600">{w.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Featured() {
  const [filter, setFilter] = useState("All");
  const [saved, setSaved] = useState([]);
  const list = PROPERTIES.filter((p) => filter === "All" || p.type === filter);
  const toggle = (id) =>
    setSaved((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  return (
    <section className="bg-slate-100 px-5 py-20 sm:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Homes people are talking about
            </h2>
            <p className="mt-3 text-slate-600">Hand-picked this week. Tap the heart to save one.</p>
          </div>
          <div className="flex gap-2">
            {["All", "Villa", "Apartment"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  filter === f
                    ? "bg-slate-900 text-white"
                    : "bg-white text-slate-700 hover:bg-slate-200"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {list.map((p) => (
              <motion.article
                layout
                key={p.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="group overflow-hidden rounded-2xl bg-white shadow-lg transition-shadow hover:shadow-2xl"
              >
                <div className="relative h-56 overflow-hidden bg-gradient-to-br from-blue-200 to-slate-300">
                  <Image
                    src={`/property${p.id}.jpg`}
                    width={500}
                    height={300}
                    alt={p.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-800">
                    {p.type}
                  </span>
                  <button
                    onClick={() => toggle(p.id)}
                    aria-label={saved.includes(p.id) ? "Remove from saved" : "Save property"}
                    className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 transition hover:scale-110 active:scale-90"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className={`h-5 w-5 ${saved.includes(p.id) ? "fill-red-500 stroke-red-500" : "fill-none stroke-slate-700"}`}
                      strokeWidth="2"
                    >
                      <path d="M12 21s-7-4.6-9.3-9A5.3 5.3 0 0112 6a5.3 5.3 0 019.3 6c-2.3 4.4-9.3 9-9.3 9z" />
                    </svg>
                  </button>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-semibold text-slate-900">{p.title}</h3>
                  <p className="text-slate-500">{p.city}</p>
                  <div className="mt-3 flex gap-4 text-sm text-slate-600">
                    <span>{p.beds} beds</span>
                    <span>{p.baths} baths</span>
                    <span>{inr.format(p.area)} sq ft</span>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <p className="text-lg font-bold text-blue-700">₹{inr.format(p.price)}</p>
                    <Link href="/Property" className="font-medium text-indigo-600 hover:underline">
                      View Details →
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
        {saved.length > 0 && (
          <p className="mt-6 text-center text-sm text-slate-600">
            You've saved {saved.length} {saved.length === 1 ? "home" : "homes"}.
          </p>
        )}
      </div>
    </section>
  );
}

function EmiCalculator() {
  const [amount, setAmount] = useState(8000000);
  const [rate, setRate] = useState(8.5);
  const [years, setYears] = useState(20);

  const r = rate / 12 / 100;
  const n = years * 12;
  const emi = (amount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const total = emi * n;
  const interestPct = Math.round(((total - amount) / total) * 100);

  const Slider = ({ label, value, set, min, max, step, format }) => (
    <div>
      <div className="mb-2 flex justify-between text-sm">
        <span className="text-slate-300">{label}</span>
        <span className="font-semibold text-white">{format(value)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => set(Number(e.target.value))}
        className="w-full accent-amber-500"
      />
    </div>
  );

  return (
    <section className="bg-slate-900 px-5 py-20 text-white sm:px-8 lg:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Know your EMI before you fall in love with a flat
          </h2>
          <p className="mt-4 max-w-md text-slate-300">
            Move the sliders and see what a home loan really costs each month. Our advisors can then match you with the right bank.
          </p>
          <Link
            href="/agents"
            className="mt-8 inline-block rounded-xl bg-amber-500 px-6 py-3 font-bold text-slate-900 transition hover:bg-amber-400 active:scale-95"
          >
            Get loan advice
          </Link>
        </div>

        <div className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10 sm:p-8">
          <div className="space-y-6">
            <Slider label="Loan amount" value={amount} set={setAmount} min={500000} max={50000000} step={100000} format={(v) => `₹${inr.format(v)}`} />
            <Slider label="Interest rate" value={rate} set={setRate} min={6} max={15} step={0.1} format={(v) => `${v.toFixed(1)}%`} />
            <Slider label="Tenure" value={years} set={setYears} min={1} max={30} step={1} format={(v) => `${v} yrs`} />
          </div>
          <div className="mt-8 rounded-xl bg-white/10 p-5 text-center">
            <p className="text-sm text-slate-300">Your monthly EMI</p>
            <p className="mt-1 text-4xl font-extrabold text-amber-400 sm:text-5xl">
              ₹{inr.format(Math.round(emi))}
            </p>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full bg-amber-500"
                animate={{ width: `${100 - interestPct}%` }}
                transition={{ type: "spring", stiffness: 120, damping: 20 }}
              />
            </div>
            <p className="mt-2 text-xs text-slate-400">
              {100 - interestPct}% principal · {interestPct}% interest over {years} years
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="px-5 py-20 sm:px-8 lg:py-28">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          About Buy Your Dream
        </h2>
        <p className="mt-6 text-base leading-relaxed text-slate-600 sm:text-lg">
          At <strong className="text-slate-900">Buy Your Dream</strong>, we help you find a place you'll love to live. From affordable flats to luxury estates, our listings are curated with your needs in mind. Whether you're buying your first home or searching for a dream retirement location, we're here every step of the way.
        </p>
      </div>
    </section>
  );
}

function Testimonials() {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setI((x) => (x + 1) % TESTIMONIALS.length), 5500);
    return () => clearInterval(t);
  }, [reduce, i]);

  const t = TESTIMONIALS[i];
  return (
    <section className="bg-slate-100 px-5 py-20 sm:px-8 lg:py-28">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          What clients say
        </h2>
        <div className="mt-10 min-h-[190px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.35 }}
            >
              <blockquote className="text-xl italic leading-relaxed text-slate-700 sm:text-2xl">
                "{t.quote}"
              </blockquote>
              <p className="mt-6 font-semibold text-slate-900">
                {t.name}, {t.city}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="mt-6 flex justify-center gap-2">
          {TESTIMONIALS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              aria-label={`Show testimonial ${idx + 1}`}
              className={`h-2.5 rounded-full transition-all ${
                idx === i ? "w-8 bg-blue-600" : "w-2.5 bg-slate-300 hover:bg-slate-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="px-5 py-20 sm:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mx-auto max-w-5xl rounded-3xl bg-gradient-to-br from-blue-700 to-slate-900 px-6 py-14 text-center text-white sm:px-12 sm:py-20"
      >
        <h2 className="text-3xl font-extrabold tracking-tight sm:text-5xl">
          Your keys are closer than you think.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-blue-100">
          Tell us what you're looking for. An agent will call you back the same day.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/Property"
            className="rounded-xl bg-amber-500 px-8 py-3 text-lg font-bold text-slate-900 transition hover:bg-amber-400 active:scale-95"
          >
            Find Home
          </Link>
          <Link
            href="/agents"
            className="rounded-xl border border-white/40 px-8 py-3 text-lg font-semibold transition hover:bg-white/10 active:scale-95"
          >
            Contact Us
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

/* ---------- page ---------- */
export default function Home() {
  return (
    <main className="overflow-x-hidden bg-white text-slate-800 antialiased">
      <Hero />
      <Stats />
      <WhyUs />
      <Featured />
      <EmiCalculator />
      <About />
      <Testimonials />
      <FinalCta />
    </main>
  );
}