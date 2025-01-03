"use client";

import React from "react";
import Link from "next/link"; // Adjust if you're not using Next.js
import "../globals.css"; // Import your CSS file

// import "../pages";
const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          {/* Logo */}
          <div className="logo">
            <h1>
              <Link href="/">Booking App</Link>
            </h1>
          </div>

          {/* Navigation Links */}
          <div className="nav-links">
            <Link href="/" className="nav-link">
              Home
            </Link>
            <Link href="/registration" className="nav-link">
              Registration
            </Link>
            <Link href="/track-booking" className="nav-link">
              Track Booking
            </Link>
            <Link href="/delete-booking" className="nav-link">
              Delete Booking
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
