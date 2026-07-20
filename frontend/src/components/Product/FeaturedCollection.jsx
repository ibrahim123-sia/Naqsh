import React from "react";
import { Link } from "react-router-dom";

const feature =
  "https://images.pexels.com/photos/17555295/pexels-photo-17555295.jpeg?auto=compress&cs=tinysrgb&w=1200";

const FeaturedCollection = () => {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center bg-white border border-naqsh-sand rounded-sm overflow-hidden">
        <div className="lg:w-1/2 p-8 md:p-12 lg:p-16 text-center lg:text-left">
          <span className="inline-block text-xs font-semibold text-naqsh-gold uppercase tracking-widest mb-3">
            Handcrafted Detail, Honest Prices
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-naqsh-noir mb-6 leading-tight">
            Jewellery Built for the Whole Wedding Season
          </h2>
          <p className="text-lg text-naqsh-umber/80 mb-8 max-w-lg mx-auto lg:mx-0">
            From the mehndi to the walima, every Kundan and Meenakari piece in
            our Bridal Edit is hand-finished and sized for real Pakistani functions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link
              to="/collections/all"
              className="bg-naqsh-noir hover:bg-naqsh-gold text-naqsh-ivory px-8 py-3 rounded-sm font-medium uppercase text-sm tracking-widest transition-all duration-300"
            >
              Shop Collection
            </Link>
            <Link
              to="/collections/all?category=Clutches %26 Evening Bags"
              className="border border-naqsh-sand hover:border-naqsh-gold text-naqsh-umber px-8 py-3 rounded-sm font-medium uppercase text-sm tracking-widest transition-all duration-300"
            >
              Clutches & Bags
            </Link>
          </div>
        </div>

        <div className="lg:w-1/2 h-full">
          <img
            src={feature}
            alt="Featured Naqsh jewellery"
            className="w-full h-full max-h-[500px] object-cover object-center"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollection;
