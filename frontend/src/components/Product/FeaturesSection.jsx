import React from "react";
import { HiArrowPathRoundedSquare, HiOutlineCreditCard, HiTruck } from "react-icons/hi2";

const FeaturesSection = () => {
  const features = [
    {
      icon: <HiArrowPathRoundedSquare className="h-7 w-7" />,
      title: "7 DAY EXCHANGE",
      description: "Easy exchange on unworn, unopened pieces",
    },
    {
      icon: <HiOutlineCreditCard className="h-7 w-7" />,
      title: "PAYFAST OR COD",
      description: "Pay securely online or cash on delivery",
    },
    {
      icon: <HiTruck className="h-7 w-7" />,
      title: "FAST DELIVERY",
      description: "2-4 business days across Pakistan",
    },
  ];

  return (
    <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-naqsh-ivory">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-sm border border-naqsh-sand hover:border-naqsh-gold transition-all duration-300 flex flex-col items-center text-center"
            >
              <div className="p-4 rounded-full mb-5 text-naqsh-gold bg-naqsh-sand/40">
                {feature.icon}
              </div>
              <h4 className="text-sm font-semibold text-naqsh-noir mb-3 uppercase tracking-widest">
                {feature.title}
              </h4>
              <p className="text-naqsh-umber/70 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
