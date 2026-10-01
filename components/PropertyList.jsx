"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CURRENCY = "₹"; // change to "$" if your data is in dollars
const FALLBACK_IMG = "/placeholder-property.jpg";
const BED_FILTERS = [0, 1, 2, 3, 4];

export default function PropertiesList() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null); // renamed to avoid conflicts

  // UI controls
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("default");
  const [minBeds, setMinBeds] = useState(0);
  const [saved, setSaved] = useState([]);

  useEffect(() => {
    let cancelled = false; // avoid state updates after unmount

    async function fetchProperties() {
      try {
        const res = await fetch("/api/properties", { method: "GET" });

        if (!res.ok) {
          throw new Error(`Failed to fetch properties. HTTP ${res.status}`);
        }

        const data = await res.json();

        if (cancelled) return;

        if (data?.success && Array.isArray(data.properties)) {
          setProperties(data.properties);
        } else {
          setErrorMsg(data?.error || "Failed to fetch properties.");
        }
      } catch (err) {
        if (cancelled) return;
        setErrorMsg(
          "Network error: " + (err instanceof Error ? err.message : String(err))
        );
      } finally {
        if (cancelled) return;
        setLoading(false);
      }
    }

    fetchProperties();

    return () => {
      cancelled = true;
    };
  }, []);

  // Search + filter + sort (hooks must stay above the early returns)
  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = (properties || []).filter((p) => {
      const text = `${p?.title ?? ""} ${p?.location ?? ""}`.toLowerCase();
      const beds = Number(p?.bedrooms ?? 0);
      return (!q || text.includes(q)) && beds >= minBeds;
    });
    if (sort === "low") list = [...list].sort((a, b) => Number(a?.price ?? 0) - Number(b?.price ?? 0));
    if (sort === "high") list = [...list].sort((a, b) => Number(b?.price ?? 0) - Number(a?.price ?? 0));
    return list;
  }, [properties, query, sort, minBeds]);

  const toggleSaved = (id) =>
    setSaved((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  const clearFilters = () => {
    setQuery("");
    setSort("default");
    setMinBeds(0);
  };

  // Loading state (skeleton cards)
  if (loading) {
    return (
      <section className="bg-slate-50 px-5 pb-16 pt-28 sm:px-8">
        <div className="mx-auto max-w-7xl" role="status" aria-label="Loading properties">
          <div className="mb-8 h-9 w-64 animate-pulse rounded-lg bg-slate-200" />
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                <div className="h-52 animate-pulse bg-slate-200" />
                <div className="space-y-3 p-5">
                  <div className="h-5 w-3/4 animate-pulse rounded bg-slate-200" />
                  <div className="h-4 w-1/2 animate-pulse rounded bg-slate-200" />
                  <div className="h-10 w-full animate-pulse rounded bg-slate-200" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (errorMsg) {
    return (
      <section className="flex min-h-[60vh] flex-col items-center justify-center bg-slate-50 px-5 pt-24 text-center">
        <p className="max-w-md text-red-600">{errorMsg}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-5 rounded-xl bg-slate-900 px-6 py-2.5 font-semibold text-white transition hover:bg-slate-700 active:scale-95"
        >
          Try again
        </button>
      </section>
    );
  }

  // No properties found
  if (!properties || properties.length === 0) {
    return (
      <section className="flex min-h-[60vh] flex-col items-center justify-center bg-slate-50 px-5 pt-24 text-center">
        <p className="text-lg font-semibold text-slate-800">No properties listed yet</p>
        <p className="mt-1 text-slate-500">New homes are added every day. Check back soon.</p>
        <Link
          href="/"
          className="mt-5 rounded-xl bg-amber-500 px-6 py-2.5 font-bold text-slate-900 transition hover:bg-amber-400 active:scale-95"
        >
          Back to home
        </Link>
      </section>
    );
  }

  return (
    <section className="bg-slate-50 px-5 pb-16 pt-28 sm:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Find your next home
          </h1>
          <p className="mt-2 text-slate-600">
            {visible.length} of {properties.length} properties
            {saved.length > 0 && ` · ${saved.length} saved`}
          </p>
        </div>

        {/* Controls */}
        <div className="mb-10 grid gap-4 rounded-2xl bg-white p-4 shadow-md sm:p-5 lg:grid-cols-[1fr_auto_auto] lg:items-center">
          <label className="relative block">
            <span className="sr-only">Search properties</span>
            <svg
              viewBox="0 0 24 24"
              className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 fill-none stroke-slate-400"
              strokeWidth="2"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-3.5-3.5" strokeLinecap="round" />
            </svg>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by title or location"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </label>

          <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Minimum bedrooms">
            {BED_FILTERS.map((b) => (
              <button
                key={b}
                onClick={() => setMinBeds(b)}
                aria-pressed={minBeds === b}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  minBeds === b
                    ? "bg-slate-900 text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {b === 0 ? "Any beds" : `${b}+ beds`}
              </button>
            ))}
          </div>

          <label className="block">
            <span className="sr-only">Sort properties</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 font-medium text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            >
              <option value="default">Sort: Featured</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
            </select>
          </label>
        </div>

        {/* No matches after filtering */}
        {visible.length === 0 ? (
          <div className="rounded-2xl bg-white py-16 text-center shadow-md">
            <p className="text-lg font-semibold text-slate-800">No homes match those filters</p>
            <p className="mt-1 text-slate-500">Try a different location or fewer bedrooms.</p>
            <button
              onClick={clearFilters}
              className="mt-5 rounded-xl bg-amber-500 px-6 py-2.5 font-bold text-slate-900 transition hover:bg-amber-400 active:scale-95"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {visible.map((p) => {
                const {
                  _id,
                  title = "Untitled Property",
                  location = "Unknown location",
                  price,
                  bedrooms,
                  bathrooms,
                  image,
                } = p || {};

                // Fallback price formatting (handles string or undefined)
                const displayPrice =
                  typeof price === "number"
                    ? price.toLocaleString("en-IN")
                    : Number(price ?? 0).toLocaleString("en-IN");

                const isSaved = saved.includes(_id);

                return (
                  <motion.article
                    layout
                    key={_id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md transition-shadow duration-300 hover:shadow-2xl"
                  >
                    <div className="relative h-52 overflow-hidden bg-gradient-to-br from-blue-200 to-slate-300">
                      <img
                        src={image || FALLBACK_IMG}
                        alt={title}
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = FALLBACK_IMG;
                        }}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                      />
                      <button
                        type="button"
                        onClick={() => toggleSaved(_id)}
                        aria-pressed={isSaved}
                        aria-label={isSaved ? "Remove from saved" : "Save property"}
                        className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow transition hover:scale-110 active:scale-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                          className={`h-5 w-5 ${isSaved ? "fill-red-500 stroke-red-500" : "fill-none stroke-slate-700"}`}
                        >
                          <path d="M12 21s-7-4.6-9.3-9A5.3 5.3 0 0112 6a5.3 5.3 0 019.3 6c-2.3 4.4-9.3 9-9.3 9z" />
                        </svg>
                      </button>
                    </div>

                    <div className="flex flex-1 flex-col p-5">
                      <h2 className="line-clamp-1 text-xl font-bold text-slate-900">{title}</h2>
                      <p className="mb-3 line-clamp-1 text-slate-500">{location}</p>
                      <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
                        <span className="text-lg font-extrabold text-blue-700">
                          {CURRENCY}
                          {displayPrice}
                        </span>
                        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                          {bedrooms ?? "?"} Beds • {bathrooms ?? "?"} Baths
                        </span>
                      </div>
                      <Link
                        href={`/properties/${_id}`}
                        className="mt-auto rounded-xl bg-slate-900 px-4 py-2.5 text-center font-semibold text-white transition hover:bg-blue-700 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                      >
                        View Details
                      </Link>
                    </div>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
}