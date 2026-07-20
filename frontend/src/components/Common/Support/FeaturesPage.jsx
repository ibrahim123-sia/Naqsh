import React from "react";
import { Link } from "react-router-dom";

const FeaturesPage = () => {
  const features = [
    {
      title: "Handcrafted Detail",
      description:
        "No shortcuts — genuine Kundan setting, Meenakari enamel work, and hand-finished stones in every piece.",
    },
    {
      title: "Clear Material Labels",
      description:
        "Every product page lists material, occasion, and color so you know exactly what you're buying before it arrives.",
    },
    {
      title: "Fast Delivery",
      description:
        "Reliable courier partners get most orders to your door within 2-4 business days across Pakistan.",
    },
    {
      title: "Easy Exchange",
      description:
        "A straightforward 7-day exchange policy on unworn pieces — no runaround.",
    },
    {
      title: "Flexible Payment",
      description:
        "Pay online via PayFast or Cash on Delivery — whichever is easier for you.",
    },
    {
      title: "Responsive Support",
      description:
        "Real answers from a real team for order, sizing, or jewellery care questions.",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-naqsh-ivory">
      <div className="text-center mb-16">
        <h1 className="font-display text-4xl md:text-5xl text-naqsh-noir mb-4">Why Choose Naqsh</h1>
        <div className="naqsh-divider mb-6">
          <span className="naqsh-divider-mark"></span>
        </div>
        <p className="text-lg text-naqsh-umber/80 max-w-2xl mx-auto">
          What sets our jewellery house apart from the rest.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white p-8 rounded-sm border border-naqsh-sand hover:border-naqsh-gold transition-all duration-300"
          >
            <h3 className="font-display text-xl text-naqsh-noir mb-4">{feature.title}</h3>
            <p className="text-naqsh-umber/80 leading-relaxed">{feature.description}</p>
          </div>
        ))}
      </div>

      <div className="bg-white border border-naqsh-sand rounded-sm p-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl text-naqsh-noir mb-6">Experience the Naqsh Difference</h2>
          <p className="text-naqsh-umber/80 mb-8 text-lg">
            A catalog built on finish quality first, with a checkout that
            respects how you actually want to shop.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/collections/all"
              className="bg-naqsh-noir text-naqsh-ivory hover:bg-naqsh-gold px-8 py-4 rounded-sm font-medium uppercase text-sm tracking-widest transition-all duration-200"
            >
              Shop Our Collections
            </Link>
            <Link
              to="/about"
              className="bg-white text-naqsh-umber px-8 py-4 rounded-sm font-medium border border-naqsh-sand hover:border-naqsh-gold uppercase text-sm tracking-widest transition-all duration-200"
            >
              Our Story
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesPage;
