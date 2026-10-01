"use client";
import React, { useState } from "react";
import PropertiesList from "../../components/PropertyList";

const FILTERS = ["All", "FOR SALE", "FOR RENT", "FEATURED"];

const HomesForYou = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  return (
    <>
      {/* Hero Section */}
      <section className="bg-slate-50 px-4 pb-16 pt-28 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 shadow-2xl">
          <div className="flex flex-col items-center px-6 py-14 text-center sm:px-10 sm:py-16 md:py-20">
            <span className="mb-4 inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm text-white/90 backdrop-blur">
              12,000+ verified homes across India
            </span>
            <h1 className="text-4xl font-extrabold leading-tight text-white drop-shadow sm:text-5xl md:text-6xl">
              Make Your Dream Home a Reality
            </h1>
            <h3 className="mt-4 text-xl font-semibold text-blue-200 sm:text-2xl md:text-3xl">
              Explore Exclusive Property Listings
            </h3>
            <p className="mt-6 max-w-2xl rounded-xl bg-white/90 p-5 text-base leading-relaxed text-slate-800 shadow-lg sm:p-6 sm:text-lg">
              Discover a curated selection of beautiful homes and investment
              opportunities. Whether you're searching for a cozy family house, a
              modern apartment, or a luxurious villa, we help you find the perfect
              property to match your dreams and lifestyle.
            </p>
            <a
              href="#homes-for-you"
              className="mt-8 inline-block rounded-full bg-amber-500 px-8 py-3 font-bold text-slate-900 shadow-lg transition hover:bg-amber-400 active:scale-95"
            >
              Browse Properties
            </a>
          </div>
        </div>
      </section>

      {/* Homes For You Section */}
      <div id="homes-for-you" className="bg-[#f8fafc] px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="text-3xl font-bold text-gray-800 sm:text-4xl">Homes For You</h2>
          <p className="mt-2 text-gray-500">Based on your view history</p>
        </div>

        {/* Filter Buttons */}
        <div className="mx-auto mt-10 flex max-w-full flex-wrap justify-center gap-3 sm:gap-4">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              aria-pressed={activeFilter === filter}
              className={`rounded-full border px-5 py-2 text-sm font-semibold transition sm:px-6 sm:text-base ${
                activeFilter === filter
                  ? "border-slate-900 bg-slate-900 text-white"
                  : "border-gray-300 bg-white text-gray-700 hover:bg-indigo-50"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="mt-4">
          <PropertiesList />
        </div>
      </div>
    </>
  );
};

export default HomesForYou;