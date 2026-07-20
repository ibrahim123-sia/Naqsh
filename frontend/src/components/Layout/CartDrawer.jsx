import React, { useEffect, useRef } from "react";
import { IoMdClose } from "react-icons/io";
import CartContents from "../Cart/CartContents";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const CartDrawer = ({ drawerOpen, toggleCartDrawer }) => {
  const { user, guestId } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  const userId = user ? user._id : null;

  const navigate = useNavigate();
  const drawerRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target) && drawerOpen) {
        toggleCartDrawer();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [drawerOpen, toggleCartDrawer]);

  const handleCheckout = () => {
    toggleCartDrawer();
    if (user) {
      navigate("/checkout");
    } else {
      navigate("/register?redirect=/checkout");
    }
  };

  const calculateSubtotal = () => {
    if (cart?.products && cart.products.length > 0) {
      const subtotal = cart.products.reduce(
        (total, product) => total + product.price * product.quantity,
        0
      );
      return subtotal.toFixed(2);
    }
    return "0.00";
  };

  const subtotal = calculateSubtotal();

  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ease-in-out ${
          drawerOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      <div
        ref={drawerRef}
        className={`fixed top-0 right-0 w-full sm:w-96 h-full bg-naqsh-ivory shadow-xl transform transition-all duration-300 ease-in-out flex flex-col z-50 ${
          drawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-6 border-b border-naqsh-sand">
          <h2 className="font-display text-xl text-naqsh-noir">Your Bag</h2>
          <button
            onClick={toggleCartDrawer}
            className="text-naqsh-umber hover:text-naqsh-gold transition-colors duration-200 p-1 rounded-full"
            aria-label="Close cart"
          >
            <IoMdClose className="h-6 w-6" />
          </button>
        </div>

        <div className="flex-grow p-6 overflow-y-auto">
          {cart?.products?.length > 0 ? (
            <CartContents cart={cart} userId={userId} guestId={guestId} />
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <p className="text-naqsh-umber/60 mb-4 text-lg">Your bag is empty</p>
              <button
                onClick={toggleCartDrawer}
                className="text-naqsh-gold hover:text-naqsh-umber font-medium uppercase text-sm tracking-widest transition-colors duration-200"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>

        {cart?.products?.length > 0 && (
          <div className="p-6 border-t border-naqsh-sand bg-naqsh-ivory sticky bottom-0">
            <div className="flex justify-between mb-4">
              <span className="text-naqsh-umber/70">Subtotal</span>
              <span className="font-medium text-naqsh-noir">Rs. {subtotal}</span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full bg-naqsh-noir hover:bg-naqsh-gold text-naqsh-ivory py-3 rounded-sm font-medium uppercase text-sm tracking-widest transition-all duration-200"
            >
              Proceed to Checkout
            </button>
            <p className="text-xs text-naqsh-umber/50 mt-3 text-center">
              Shipping and payment calculated at checkout.
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
