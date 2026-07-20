import React from "react";
import { Link } from "react-router-dom";

const AboutUsPage = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-naqsh-ivory">
      <div className="text-center mb-16">
        <h1 className="font-display text-4xl md:text-5xl text-naqsh-noir mb-6">Our Story</h1>
        <div className="naqsh-divider mb-8">
          <span className="naqsh-divider-mark"></span>
        </div>
        <p className="text-lg text-naqsh-umber/80 max-w-2xl mx-auto">
          Naqsh began with a simple idea: fashion jewellery for the Pakistani
          bride and everyday wearer alike should feel considered, not
          mass-produced. Every piece we sell is chosen for its detail, not
          just its price tag.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
        <div>
          <h2 className="font-display text-3xl text-naqsh-noir mb-6">Who We Are</h2>
          <p className="text-naqsh-umber/80 mb-6 leading-relaxed">
            Founded to bring a more considered approach to artificial jewellery
            retail, Naqsh curates Kundan, Meenakari, and stone-studded pieces,
            statement clutches, and jewellery organizers that reward a closer
            look — real craftsmanship without the real-gold price tag.
          </p>
          <p className="text-naqsh-umber/80 mb-6 leading-relaxed">
            Each listing lists the material, occasion, and finish so you know
            exactly what you're choosing — no surprises when the box arrives.
          </p>
          <Link
            to="/collections/all"
            className="inline-block bg-naqsh-noir text-naqsh-ivory hover:bg-naqsh-gold px-6 py-3 rounded-sm font-medium uppercase text-sm tracking-widest transition-all duration-200"
          >
            Explore the Collection
          </Link>
        </div>
        <div className="bg-naqsh-sand h-96 rounded-sm overflow-hidden">
          <img
            src="https://images.pexels.com/photos/34260692/pexels-photo-34260692.jpeg?auto=compress&cs=tinysrgb&w=800"
            alt="Naqsh jewellery studio"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-20">
        <div className="bg-white p-8 rounded-sm border border-naqsh-sand">
          <h3 className="font-display text-xl text-naqsh-noir mb-4">Our Mission</h3>
          <p className="text-naqsh-umber/80 leading-relaxed">
            To make well-made fashion jewellery approachable — clear
            materials, honest pricing, and a catalog built on finish quality
            first.
          </p>
        </div>
        <div className="bg-white p-8 rounded-sm border border-naqsh-sand">
          <h3 className="font-display text-xl text-naqsh-noir mb-4">Craftsmanship</h3>
          <p className="text-naqsh-umber/80 leading-relaxed">
            We work directly with artisans skilled in Kundan setting and
            Meenakari enamel work, so every bridal and festive piece holds up
            to a full function, not just a photo.
          </p>
        </div>
        <div className="bg-white p-8 rounded-sm border border-naqsh-sand">
          <h3 className="font-display text-xl text-naqsh-noir mb-4">Customer First</h3>
          <p className="text-naqsh-umber/80 leading-relaxed">
            Straightforward exchanges, real support, and a checkout that
            respects how you actually want to pay — online, or cash on
            delivery.
          </p>
        </div>
      </div>

      <div className="bg-naqsh-noir rounded-sm p-10 text-center text-naqsh-ivory">
        <h2 className="font-display text-3xl mb-4">Ready to Find Your Signature Piece?</h2>
        <p className="text-naqsh-ivory/70 mb-8 max-w-2xl mx-auto">
          Browse the full collection and find jewellery built around the
          occasion you're actually shopping for.
        </p>
        <Link
          to="/collections/all"
          className="inline-block bg-naqsh-gold text-naqsh-noir px-8 py-3 rounded-sm font-semibold uppercase text-sm tracking-widest hover:bg-naqsh-ivory transition-colors duration-200"
        >
          Shop Now
        </Link>
      </div>
    </div>
  );
};

export default AboutUsPage;
