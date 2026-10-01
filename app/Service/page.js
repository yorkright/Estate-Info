// pages/services.tsx

import React from "react";

const services = [
  {
    title: "Property Buying",
    description: "We help you find and purchase your dream home at the best market value.",
    icon: "🏠",
  },
  {
    title: "Property Selling",
    description: "List your property and attract serious buyers with our expert marketing.",
    icon: "📈",
  },
  {
    title: "Rental Services",
    description: "Find quality rental homes or tenants quickly and easily.",
    icon: "🏢",
  },
  {
    title: "Property Management",
    description: "We manage everything from rent collection to maintenance for landlords.",
    icon: "🛠️",
  },
  {
    title: "Legal Assistance",
    description: "Get expert legal advice for smooth property transactions.",
    icon: "⚖️",
  },
  {
    title: "Home Loan Assistance",
    description: "We connect you with banks and simplify the loan process.",
    icon: "💰",
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section — pt-28 clears the fixed white navbar on this page */}
      <section className="bg-gradient-to-r  px-6 pb-16 pt-28 text-center text-black sm:pt-32">
        <h1 className="text-3xl font-bold mb-4 sm:text-4xl">Our Real Estate Services</h1>
        <p className="text-base max-w-2xl mx-auto sm:text-lg">
          We provide a complete suite of services for buying, selling, and managing properties.
        </p>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {services.map((service, idx) => (
            <div
              key={idx}
              className="bg-white shadow-md rounded-2xl p-6 text-center hover:shadow-lg transition"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-white py-12 text-center">
        <h2 className="text-2xl font-semibold mb-4">Need a Custom Service?</h2>
        <p className="text-gray-700 mb-6">Contact us today for a personalized consultation.</p>
        <a
          href="/contact"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition"
        >
          Get in Touch
        </a>
      </section>
    </div>
  );
}