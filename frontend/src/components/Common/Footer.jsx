import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TbBrandMeta } from "react-icons/tb";
import { IoLogoInstagram } from "react-icons/io";
import { RiTwitterXLine } from "react-icons/ri";
import { toast } from "react-toastify";
import axios from "axios";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [alreadySubscribed, setAlreadySubscribed] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Email is required");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/subscribe`,
        { email: email.trim().toLowerCase() }
      );

      if (response.data.alreadySubscribed) {
        setAlreadySubscribed(true);
        toast.info("This email is already subscribed");
      } else {
        toast.success("Thank you for subscribing!");
        setEmail("");
      }
    } catch (error) {
      if (error.response?.status === 409) {
        setAlreadySubscribed(true);
        toast.info("You are already subscribed");
      } else {
        toast.error(error.response?.data?.message || "Subscription failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-naqsh-noir text-naqsh-ivory py-12">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4 lg:px-0">
        <div>
          <h3 className="font-display text-lg mb-4">Join Our Newsletter</h3>
          <p className="text-naqsh-ivory/60 mb-4 text-sm">
            Be the first to hear about new arrivals, festive edits and exclusive offers.
          </p>

          {alreadySubscribed ? (
            <div className="p-3 bg-naqsh-ivory/10 text-naqsh-ivory rounded-sm text-sm">
              You're subscribed! Thank you for joining us.
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex">
              <input
                type="email"
                placeholder="Your email address"
                className="p-3 w-full text-sm bg-naqsh-ivory/10 border border-naqsh-ivory/20 rounded-l-sm focus:outline-none focus:ring-1 focus:ring-naqsh-gold text-naqsh-ivory placeholder:text-naqsh-ivory/40"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                className="bg-naqsh-gold text-naqsh-noir px-4 py-3 text-sm font-medium rounded-r-sm hover:bg-naqsh-ivory transition-all disabled:opacity-70 flex-shrink-0 uppercase tracking-wide"
                disabled={loading}
              >
                {loading ? "..." : "Join"}
              </button>
            </form>
          )}
        </div>

        <div>
          <h3 className="font-display text-lg mb-4">Shop</h3>
          <ul className="space-y-3 text-naqsh-ivory/60">
            <li><Link to="/collections/all?category=Necklaces %26 Sets" className="hover:text-naqsh-gold text-sm transition-colors duration-200 block">Necklaces & Sets</Link></li>
            <li><Link to="/collections/all?category=Earrings" className="hover:text-naqsh-gold text-sm transition-colors duration-200 block">Earrings</Link></li>
            <li><Link to="/collections/all?category=Rings" className="hover:text-naqsh-gold text-sm transition-colors duration-200 block">Rings</Link></li>
            <li><Link to="/collections/all?category=Clutches %26 Evening Bags" className="hover:text-naqsh-gold text-sm transition-colors duration-200 block">Clutches & Evening Bags</Link></li>
            <li><Link to="/collections/all?category=Jewelry Organizers" className="hover:text-naqsh-gold text-sm transition-colors duration-200 block">Jewelry Organizers</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-lg mb-4">Support</h3>
          <ul className="space-y-3 text-naqsh-ivory/60">
            <li><Link to="/contact" className="hover:text-naqsh-gold text-sm transition-colors duration-200 block">Contact Us</Link></li>
            <li><Link to="/about" className="hover:text-naqsh-gold text-sm transition-colors duration-200 block">About Us</Link></li>
            <li><Link to="/faqs" className="hover:text-naqsh-gold text-sm transition-colors duration-200 block">FAQs</Link></li>
            <li><Link to="/features" className="hover:text-naqsh-gold text-sm transition-colors duration-200 block">Features</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-lg mb-4">Connect With Us</h3>
          <div className="flex items-center space-x-4 mb-6">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-naqsh-gold text-naqsh-ivory/60 transition-colors duration-200" aria-label="Facebook">
              <TbBrandMeta className="h-5 w-5" />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-naqsh-gold text-naqsh-ivory/60 transition-colors duration-200" aria-label="Instagram">
              <IoLogoInstagram className="h-5 w-5" />
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-naqsh-gold text-naqsh-ivory/60 transition-colors duration-200" aria-label="Twitter">
              <RiTwitterXLine className="h-4 w-4" />
            </a>
          </div>
          <p className="text-naqsh-ivory/60 text-sm">
            <a href="mailto:developers@yesautomotiveservices.com" className="hover:text-naqsh-gold transition-colors duration-200">
              developers@yesautomotiveservices.com
            </a>
          </p>
          <p className="text-naqsh-ivory/40 text-sm mt-2">Mon-Sat: 10AM - 7PM</p>
        </div>
      </div>

      <div className="container mx-auto mt-12 px-4 lg:px-0 border-t border-naqsh-ivory/10 pt-6">
        <p className="text-naqsh-ivory/40 text-sm text-center">
          © {new Date().getFullYear()} Naqsh. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
