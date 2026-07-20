import React, { useEffect } from "react";
import MyOrdersPage from "./MyOrdersPage";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/slices/authSlice";
import { clearCart } from "../redux/slices/cartSlice";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    navigate("/login");
  };

  const pageWrapper = "min-h-screen bg-naqsh-ivory py-12 px-4 sm:px-6 lg:px-8";
  const sidebarWrapper = "w-full bg-white p-8 rounded-sm shadow-sm border border-naqsh-sand h-fit";
  const buttonOutline = "w-full border border-naqsh-umber/30 text-naqsh-umber hover:border-naqsh-gold hover:text-naqsh-gold py-3 px-4 rounded-sm font-medium uppercase text-sm tracking-widest transition duration-200";
  const buttonSolid = "w-full bg-naqsh-noir text-naqsh-ivory hover:bg-naqsh-gold py-3 px-4 rounded-sm font-medium uppercase text-sm tracking-widest transition duration-200";

  return (
    <div className={pageWrapper}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/4">
            <div className={sidebarWrapper}>
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-naqsh-noir rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-display text-naqsh-gold">
                    {user?.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <h1 className="font-display text-2xl text-naqsh-noir mb-2">{user?.name}</h1>
                <p className="text-naqsh-umber/70 text-sm">{user?.email}</p>
                {user?.role === "admin" && (
                  <span className="inline-block mt-2 bg-naqsh-sand text-naqsh-umber text-xs uppercase tracking-widest px-3 py-1 rounded-sm">
                    Admin
                  </span>
                )}
              </div>

              <div className="space-y-4 border-t border-naqsh-sand pt-6">
                <button onClick={() => navigate("/collections/all")} className={buttonSolid}>
                  Continue Shopping
                </button>

                <button onClick={handleLogout} className={buttonOutline}>
                  Logout
                </button>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-3/4">
            <MyOrdersPage />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
