"use client";

import React, { useState } from "react";

const CURRENCY = "₹"; // change to "$" if your data is in dollars
const FALLBACK_IMG = "/placeholder-property.jpg";

const PropertyItems = ({ image, title, description, bedrooms, bathrooms, price, location }) => {
  const [saved, setSaved] = useState(false);

  const src = (Array.isArray(image) ? image[0] : image) || FALLBACK_IMG;
  const displayPrice = Number(price ?? 0).toLocaleString("en-IN");

  return (
    <article className="group flex h-full w-full max-w-sm flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-2xl">
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-blue-200 to-slate-300 sm:h-52">
        <img
          src={src}
          alt={title || "Property"}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = FALLBACK_IMG;
          }}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/50 to-transparent" />

        <button
          type="button"
          onClick={() => setSaved((s) => !s)}
          aria-pressed={saved}
          aria-label={saved ? "Remove from saved" : "Save property"}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow transition hover:scale-110 active:scale-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
        >
          <svg
            viewBox="0 0 24 24"
            strokeWidth="2"
            className={`h-5 w-5 ${saved ? "fill-red-500 stroke-red-500" : "fill-none stroke-slate-700"}`}
          >
            <path d="M12 21s-7-4.6-9.3-9A5.3 5.3 0 0112 6a5.3 5.3 0 019.3 6c-2.3 4.4-9.3 9-9.3 9z" />
          </svg>
        </button>

        <p className="absolute bottom-3 left-3 text-lg font-extrabold text-white drop-shadow">
          {CURRENCY}
          {displayPrice}
        </p>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3 className="line-clamp-1 text-lg font-bold text-slate-900">{title}</h3>
        <p className="mt-0.5 flex items-center gap-1 text-sm text-slate-500">
          <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 fill-current" aria-hidden="true">
            <path d="M12 2a7 7 0 00-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 00-7-7zm0 9.5A2.5 2.5 0 1112 6a2.5 2.5 0 010 5.5z" />
          </svg>
          <span className="line-clamp-1">{location}</span>
        </p>
        <p className="mt-2 line-clamp-2 text-sm text-slate-500">{description}</p>

        <div className="mt-auto flex flex-wrap gap-2 pt-4 text-sm">
          <span className="rounded-full bg-blue-50 px-3 py-1 font-medium text-blue-700">
            🛏 {bedrooms ?? "?"} Beds
          </span>
          <span className="rounded-full bg-blue-50 px-3 py-1 font-medium text-blue-700">
            🛁 {bathrooms ?? "?"} Baths
          </span>
        </div>
      </div>
    </article>
  );
};

export default PropertyItems;