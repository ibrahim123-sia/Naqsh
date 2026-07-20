import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { createCheckout } from "../../redux/slices/checkoutSlice";
import { mergeCart } from "../../redux/slices/cartSlice";

const Checkout = () => {
  const [isMergingCart, setIsMergingCart] = useState(false);
  const [hasAttemptedMerge, setHasAttemptedMerge] = useState(false);
  const [payfastEnabled, setPayfastEnabled] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const { cart, loading, error } = useSelector((state) => state.cart);
  const { user, guestId } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    phone: "",
  });

  useEffect(() => {
    const checkPayFast = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/payfast/config-status`
        );
        setPayfastEnabled(Boolean(data.enabled));
      } catch {
        setPayfastEnabled(false);
      }
    };
    checkPayFast();
  }, []);

  useEffect(() => {
    if (!cart || !cart.products || cart.products.length === 0) {
      navigate("/");
    }
  }, [cart, navigate]);

  useEffect(() => {
    const mergeGuestCart = async () => {
      if (user && guestId && !hasAttemptedMerge) {
        setIsMergingCart(true);
        setHasAttemptedMerge(true);

        try {
          await dispatch(mergeCart({ guestId, userId: user._id })).unwrap();
        } catch (err) {
          console.error("Failed to merge cart:", err);
        } finally {
          setIsMergingCart(false);
        }
      }
    };

    mergeGuestCart();
  }, [user, guestId, dispatch, hasAttemptedMerge]);

  const pageWrapper = "min-h-screen bg-naqsh-ivory py-12 px-4 sm:px-6 lg:px-8";
  const formWrapper = "w-full bg-white p-8 rounded-sm border border-naqsh-sand";
  const summaryWrapper = "w-full bg-white p-8 rounded-sm border border-naqsh-sand";
  const inputClass = "w-full p-3 border border-naqsh-sand rounded-sm focus:outline-none focus:ring-1 focus:ring-naqsh-gold focus:border-naqsh-gold transition duration-200 bg-naqsh-ivory";
  const buttonPrimary = "w-full bg-naqsh-noir hover:bg-naqsh-gold text-naqsh-ivory p-3 rounded-sm font-medium uppercase text-sm tracking-widest transition duration-200";
  const buttonDisabled = "w-full bg-naqsh-umber/30 text-naqsh-ivory p-3 rounded-sm font-medium uppercase text-sm tracking-widest cursor-not-allowed";
  const labelClass = "block text-sm font-medium mb-2 text-naqsh-umber";
  const headingSecondary = "text-lg font-display text-naqsh-noir mb-4";

  const submitPayFastForm = ({ actionUrl, fields }) => {
    const form = document.createElement("form");
    form.method = "POST";
    form.action = actionUrl;

    Object.entries(fields).forEach(([key, value]) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = value;
      form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();

    if (!cart || cart.products.length === 0 || isMergingCart || isSubmitting) return;

    setIsSubmitting(true);

    try {
      const res = await dispatch(
        createCheckout({
          checkoutItems: cart.products,
          shippingAddress: {
            fullName: `${shippingAddress.firstName} ${shippingAddress.lastName}`,
            address: shippingAddress.address,
            city: shippingAddress.city,
            postalCode: shippingAddress.postalCode,
            country: shippingAddress.country,
            phone: shippingAddress.phone,
          },
          paymentMethod,
          totalPrice: cart.totalPrice,
        })
      );

      if (!res.payload || !res.payload._id) {
        setIsSubmitting(false);
        return;
      }

      const checkoutId = res.payload._id;

      if (paymentMethod === "PayFast") {
        const { data } = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/payfast/initiate`,
          { checkoutId },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            },
          }
        );
        submitPayFastForm(data);
        return;
      }

      // Cash on Delivery
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/pay`,
        {
          paymentStatus: "paid",
          paymentDetails: { method: "Cash on Delivery" },
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );

      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/finalize`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );

      navigate("/order-confirmation");
    } catch (err) {
      console.error("Order submission failed:", err);
      if (err.response?.status === 401) {
        alert("Your session has expired. Please log in again.");
        navigate("/login");
      }
      setIsSubmitting(false);
    }
  };

  if (loading || isMergingCart) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-naqsh-ivory">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-naqsh-gold mb-4"></div>
        <p className="text-naqsh-umber/70">{isMergingCart ? "Merging your cart..." : "Loading your cart..."}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-600 text-center p-4 bg-red-50 rounded-sm">
        Error: {error}
      </div>
    );
  }

  if (!cart || !cart.products || cart.products.length === 0) {
    return (
      <div className="text-center p-8 bg-white rounded-sm border border-naqsh-sand">
        <p className="text-naqsh-umber/70">Your bag is empty</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 bg-naqsh-noir text-naqsh-ivory px-4 py-2 rounded-sm uppercase text-sm tracking-widest hover:bg-naqsh-gold"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className={pageWrapper}>
      <div className="max-w-7xl mx-auto">
        <h1 className="font-display text-3xl text-center text-naqsh-noir mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className={formWrapper}>
            <form onSubmit={handleSubmitOrder}>
              <h2 className={headingSecondary}>Contact Details</h2>
              <div className="mb-6">
                <label className={labelClass}>Email</label>
                <input type="email" value={user ? user.email : ""} className={inputClass} disabled />
              </div>

              <h2 className={headingSecondary}>Delivery Information</h2>
              <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>First Name</label>
                  <input
                    type="text"
                    className={inputClass}
                    required
                    value={shippingAddress.firstName}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, firstName: e.target.value })}
                  />
                </div>
                <div>
                  <label className={labelClass}>Last Name</label>
                  <input
                    type="text"
                    className={inputClass}
                    required
                    value={shippingAddress.lastName}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, lastName: e.target.value })}
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className={labelClass}>Address</label>
                <input
                  type="text"
                  value={shippingAddress.address}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })}
                  className={inputClass}
                  required
                />
              </div>

              <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>City</label>
                  <input
                    type="text"
                    className={inputClass}
                    required
                    value={shippingAddress.city}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                  />
                </div>
                <div>
                  <label className={labelClass}>Postal Code</label>
                  <input
                    type="text"
                    className={inputClass}
                    required
                    value={shippingAddress.postalCode}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, postalCode: e.target.value })}
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className={labelClass}>Country</label>
                <input
                  type="text"
                  value={shippingAddress.country}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, country: e.target.value })}
                  className={inputClass}
                  required
                />
              </div>

              <div className="mb-8">
                <label className={labelClass}>Phone</label>
                <input
                  type="tel"
                  value={shippingAddress.phone}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
                  className={inputClass}
                  required
                />
              </div>

              <h2 className={headingSecondary}>Payment Method</h2>
              <div className="mb-8 space-y-3">
                <label className={`flex items-center gap-3 p-4 border rounded-sm cursor-pointer transition-colors ${paymentMethod === "COD" ? "border-naqsh-gold bg-naqsh-sand/20" : "border-naqsh-sand"}`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="COD"
                    checked={paymentMethod === "COD"}
                    onChange={() => setPaymentMethod("COD")}
                    className="accent-naqsh-gold"
                  />
                  <span className="text-naqsh-umber">Cash on Delivery</span>
                </label>

                {payfastEnabled && (
                  <label className={`flex items-center gap-3 p-4 border rounded-sm cursor-pointer transition-colors ${paymentMethod === "PayFast" ? "border-naqsh-gold bg-naqsh-sand/20" : "border-naqsh-sand"}`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="PayFast"
                      checked={paymentMethod === "PayFast"}
                      onChange={() => setPaymentMethod("PayFast")}
                      className="accent-naqsh-gold"
                    />
                    <span className="text-naqsh-umber">Pay Online via PayFast</span>
                  </label>
                )}
              </div>

              <button
                type="submit"
                className={isMergingCart || isSubmitting ? buttonDisabled : buttonPrimary}
                disabled={isMergingCart || isSubmitting}
              >
                {isSubmitting ? "Processing..." : "Confirm Your Order"}
              </button>
            </form>
          </div>

          <div className={summaryWrapper}>
            <h3 className={headingSecondary}>Order Summary</h3>
            <div className="space-y-4 mb-6">
              {cart.products.map((product, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-naqsh-sand rounded-sm bg-white">
                  <div className="flex items-center gap-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-sm border border-naqsh-sand"
                    />
                    <div>
                      <h3 className="text-md font-medium text-naqsh-noir">{product.name}</h3>
                      <p className="text-sm text-naqsh-umber/60">
                        {[product.material, product.size].filter(Boolean).join(" · ")}
                      </p>
                      <p className="text-sm text-naqsh-umber/60">Qty: {product.quantity}</p>
                    </div>
                  </div>
                  <p className="text-md font-semibold text-naqsh-gold">Rs. {product.price?.toLocaleString()}</p>
                </div>
              ))}
            </div>

            <div className="space-y-3 border-t border-naqsh-sand pt-4">
              <div className="flex justify-between items-center">
                <p className="text-naqsh-umber/70">Subtotal</p>
                <p className="text-naqsh-noir font-medium">Rs. {cart.totalPrice?.toLocaleString()}</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-naqsh-umber/70">Shipping</p>
                <p className="text-naqsh-gold font-medium">Free</p>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-naqsh-sand">
                <p className="text-lg font-semibold text-naqsh-noir">Total</p>
                <p className="text-xl font-bold text-naqsh-gold">Rs. {cart.totalPrice?.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
