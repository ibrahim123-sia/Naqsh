import React from "react";
import { Link } from "react-router-dom";

const HeroImg =
  "https://images.pexels.com/photos/35528689/pexels-photo-35528689.jpeg?auto=compress&cs=tinysrgb&w=1600";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-naqsh-noir">
      <div className="relative w-full h-[75vh] min-h-[520px] max-h-[800px]">
        <img
          src={HeroImg}
          alt="Naqsh jewellery"
          className="w-full h-full object-cover object-center opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-naqsh-noir via-naqsh-noir/40 to-naqsh-noir/10" />
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="container mx-auto px-6 text-center">
          <span className="block text-naqsh-gold text-xs uppercase tracking-[0.3em] mb-6">
            The Festive Edit
          </span>
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-naqsh-ivory mb-6 leading-tight">
            Jewellery for Every Mehndi & Milaad
          </h1>
          <div className="naqsh-divider mb-8">
            <span className="naqsh-divider-mark"></span>
          </div>
          <p className="text-lg md:text-xl text-naqsh-ivory/70 mb-10 max-w-2xl mx-auto">
            Kundan, Meenakari and Polki pieces, statement clutches, and the
            organizers to keep it all safe between functions.
          </p>

          <Link
            to="/collections/all"
            className="inline-block border border-naqsh-gold text-naqsh-gold hover:bg-naqsh-gold hover:text-naqsh-noir px-8 py-3 rounded-sm font-medium uppercase text-sm tracking-widest transition-all duration-300"
          >
            Explore the Collection
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
