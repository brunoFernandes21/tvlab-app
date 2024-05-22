import React from "react";
import { NavLink } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { IoLogInOutline } from "react-icons/io5";
import { IoMdMenu } from "react-icons/io";

const Header = () => {
  const linkClass = ({ isActive }) => {
    return isActive ? "md:text-md lg:text-xl uppercase transition ease-in-out duration-500 text-transparent hover:text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500 hover:from-pink-500 hover:to-yellow-500" : "md:text-md lg:text-xl uppercase transition ease-in-out duration-500 text-gray-500 hover:text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500 hover:from-pink-500 hover:to-yellow-500"
  }
  return (
    <nav className="sticky top-0 z-50 shadow-slate-500">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="border h-20 flex flex-1 items-center justify-between lg:justify-center gap-10 lg:gap-14 overflow-hidden">
          <NavLink to="/" className="flex items-center flex-shrink-0">
            <span className="text-2xl md:text-3xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500 transition ease-in-out duration-500">
              TVSync
            </span>
          </NavLink>
          <div className="md:flex md:gap-2 lg:gap-6 hidden ">
            <NavLink to="/" className={linkClass}>Home</NavLink>
            <NavLink to="/movies" className={linkClass}>Movies</NavLink>
            <NavLink to="/tv-shows" className={linkClass}>TvShows</NavLink>
            <NavLink to="/favourites" className={linkClass}>Favourites</NavLink>
          </div>
          <div className="flex gap-2 lg:gap-4 items-center">
            <NavLink to="/register" className="text-gray-500 text-sm transition ease-in-out duration-500 hover:text-gray-100 hidden md:block">Register</NavLink>
            <NavLink to="/login" className="text-gray-500 text-sm transition ease-in-out duration-500 hover:text-gray-100 flex items-center gap-1">
              <FaUser className="md:hidden text-xl text-slate-100"/>
              <span className="hidden md:block">Login</span>
              </NavLink>
            <NavLink to="/login" className="text-gray-500 text-sm transition ease-in-out duration-500 hover:text-gray-100">
            <IoLogInOutline className="md:hidden text-2xl text-slate-100"/>
            <span className="hidden md:block">Log out</span>
            </NavLink>
            <IoMdMenu className="md:hidden text-slate-100 text-2xl transition ease-in-out duration-500 hover:text-gray-100"/>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
