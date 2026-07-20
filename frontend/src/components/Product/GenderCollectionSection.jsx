import React from "react";
import { Link } from "react-router-dom";

const BridalImage =
  "https://images.pexels.com/photos/19647000/pexels-photo-19647000.jpeg?auto=compress&cs=tinysrgb&w=900";
const FestiveImage =
  "https://images.pexels.com/photos/10120266/pexels-photo-10120266.jpeg?auto=compress&cs=tinysrgb&w=900";

const GenderCollectionSection = () => {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <span className="block text-naqsh-gold text-xs uppercase tracking-[0.3em] mb-3">Shop by Occasion</span>
          <h2 className="font-display text-3xl md:text-4xl text-naqsh-noir">Bridal to Everyday</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <div className="relative group overflow-hidden rounded-sm">
            <img
              src={BridalImage}
              alt="Bridal Edit"
              className="w-full h-[500px] md:h-[600px] object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-naqsh-noir/80 via-naqsh-noir/10 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8">
              <h2 className="font-display text-2xl md:text-3xl text-naqsh-ivory mb-3">Bridal Edit</h2>
              <Link
                to="/collections/all?occasion=Bridal"
                className="inline-flex items-center text-naqsh-gold hover:text-naqsh-ivory font-medium uppercase text-sm tracking-widest transition-colors duration-200"
              >
                Shop Now →
              </Link>
            </div>
          </div>

          <div className="relative group overflow-hidden rounded-sm">
            <img
              src={FestiveImage}
              alt="Festive & Eid Edit"
              className="w-full h-[500px] md:h-[600px] object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-naqsh-noir/80 via-naqsh-noir/10 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8">
              <h2 className="font-display text-2xl md:text-3xl text-naqsh-ivory mb-3">Festive & Eid Edit</h2>
              <Link
                to="/collections/all?occasion=Festive%2FEid"
                className="inline-flex items-center text-naqsh-gold hover:text-naqsh-ivory font-medium uppercase text-sm tracking-widest transition-colors duration-200"
              >
                Shop Now →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GenderCollectionSection;
