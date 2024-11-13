import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo Image Link */}
        <Link to="/">
          <div className="flex items-center space-x-2 cursor-pointer">
            <img
              src="/images/logo.png"
              alt="OpnTask Logo"
              width={50}
              height={50}
              className="w-12 h-12"
            />
            <span className="text-2xl font-bold text-blue-500">OpnTask</span>
          </div>
        </Link>

        <div className="flex space-x-6">
          <Link to="/user?canisterId=br5f7-7uaaa-aaaaa-qaaca-cai">
            <span className="flex items-center text-white bg-blue-500 border border-blue-500 rounded-full px-4 py-2 hover:bg-blue-600 transition duration-300 ease-in-out space-x-1">
              <span>Connect Wallet</span>
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
