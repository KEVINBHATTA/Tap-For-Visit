import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi"; 
import { Link } from "react-router-dom";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="NavBar">
      {/* Brand Logo & Title */}
      <div className="Flex Nav-Brand">
        <img className="Logo" src="/Logo.png" alt="Tap for Visit Logo" />
        <h3 className="Flex mt-3 Nav-Title">
          <span className="text-primary mr-2">TAP</span> FOR VISIT
        </h3>
      </div>

      {/*  Navigation Links */}
      <div className="Flex w-99 Nav-Links Desktop-Only">
        <p className="mt-2">Card designs</p>
        <p className="mt-2">Profile templates</p>
        <p className="mt-2">How it works</p>
      </div>

      {/* Desktop Auth & Dashboard CTA */}
      <div className="Flex w-70 Auth-Section Desktop-Only">
      <Link to="/signin" className="nav-link"><p className="mt-2">Sign In</p></Link>
        <p className="mt-2">/</p>
       <Link to="/signin" className="nav-link"><p className="mt-2">Sign Up</p></Link>
        <div className="DashBoard mt-1">DashBoard</div>
      </div>

      {/* Hamburger Button */}
      <button 
        className="Hamburger-Btn Mobile-Only" 
        onClick={toggleMenu} 
        aria-label="Toggle navigation menu"
      >
        {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
      </button>

      {/* Menu Drawer */}
      <div className={`Mobile-Menu ${isOpen ? "open" : ""}`}>
        <p onClick={() => setIsOpen(false)}>Card designs</p>
        <p onClick={() => setIsOpen(false)}>Profile templates</p>
        <p onClick={() => setIsOpen(false)}>How it works</p>
        {/* <hr className="Mobile-Divider" />  */}
        <div className="Mobile-Auth">
        <Link to="/signin" className="nav-link"> <p onClick={() => setIsOpen(false)}>Sign In</p></Link>
      <span className="mx-2">/</span>
       <Link to="/signin" className="nav-link"><p onClick={() => setIsOpen(false)}>Sign Up</p></Link>   
        </div>
        <div className="DashBoard Mobile-DashBoard" onClick={() => setIsOpen(false)}>
          DashBoard
        </div>
      </div>
    </nav>
  );
}

export default NavBar;