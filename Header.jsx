import React from "react";
import logo from "../assets/logo.png";

const Header = () => {
  return (
    <header className="container mx-auto max-w-7xl px-5 pt-6 flex sm:flex-row gap-4 justify-between items-center">
      <div className="items-center gap-5 sm:gap-10">
        <img
          src={logo}
          alt="Planet Education Logo"
          className="h-9 sm:h-14 w-auto"
        />
      </div>
    </header>
  );
};

export default Header;
