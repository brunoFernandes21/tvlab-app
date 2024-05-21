import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const linkClass = ({ isActive }) => {
    return isActive ? "uppercase transition ease-in-out duration-500 text-transparent hover:text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500 hover:from-pink-500 hover:to-yellow-500" : "uppercase transition ease-in-out duration-500 text-gray-500 hover:text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500 hover:from-pink-500 hover:to-yellow-500"
  }
  return (
    <nav className="sticky top-0 z-50 shadow-slate-500">
      <div className="max-w-7xl mx-auto px-2 sm-6 lg-px-8">
        <div className="h-20 flex flex-1 items-center justify-center gap-14 overflow-hidden">
          <NavLink to="/" className="flex items-center flex-shrink-0">
            <span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500 transition ease-in-out duration-500">
              TVLab
            </span>
          </NavLink>
          <div className=" gap-4 hidden md:flex">
            <NavLink to="/" className={linkClass}>Home</NavLink>
            <NavLink to="/movies" className={linkClass}>Movies</NavLink>
            <NavLink to="/tv-shows" className={linkClass}>TvShows</NavLink>
            <NavLink to="/favourites" className={linkClass}>Favourites</NavLink>
          </div>
          <div className="hidden md:flex space-x-2">
            <NavLink to="/register" className="text-gray-500 text-sm transition ease-in-out duration-500 hover:text-gray-100">Register</NavLink>
            <NavLink to="/login" className="text-gray-500 text-sm transition ease-in-out duration-500 hover:text-gray-100">Login</NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
