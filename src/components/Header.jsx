import React from "react";
import { NavLink } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { IoLogInOutline } from "react-icons/io5";
import { IoMdMenu } from "react-icons/io";

const Header = () => {
  const linkClass = ({ isActive }) => {
    return isActive ? "text-xl uppercase transition ease-in-out duration-500 text-transparent hover:text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500 hover:from-pink-500 hover:to-yellow-500" : "text-xl uppercase transition ease-in-out duration-500 text-gray-500 hover:text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500 hover:from-pink-500 hover:to-yellow-500"
  }
  return (
    <nav className="sticky top-0 z-50 shadow-slate-500">
      <div className="max-w-7xl mx-auto px-4 sm-6 lg-px-8">
        <div className="h-20 flex flex-1 items-center justify-between md:justify-center gap-14 overflow-hidden">
          <NavLink to="/" className="flex items-center flex-shrink-0">
            <span className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500 transition ease-in-out duration-500">
              TVSync
            </span>
          </NavLink>
          <div className=" gap-4 hidden md:flex">
            <NavLink to="/" className={linkClass}>Home</NavLink>
            <NavLink to="/movies" className={linkClass}>Movies</NavLink>
            <NavLink to="/tv-shows" className={linkClass}>TvShows</NavLink>
            <NavLink to="/favourites" className={linkClass}>Favourites</NavLink>
          </div>
          <div className="flex gap-4 items-center">
            <NavLink to="/register" className="text-gray-500 text-sm transition ease-in-out duration-500 hover:text-gray-100 hidden md:block">Register</NavLink>
            <NavLink to="/login" className="text-gray-500 text-sm transition ease-in-out duration-500 hover:text-gray-100 flex items-center gap-1">
              <FaUser className="md:hidden text-xl"/>
              <span className="hidden md:block">Login</span>
              </NavLink>
            <NavLink to="/login" className="text-gray-500 text-sm transition ease-in-out duration-500 hover:text-gray-100">
            <IoLogInOutline className="md:hidden text-2xl"/>
            <span className="hidden md:block">Log out</span>
            </NavLink>
            <IoMdMenu className="md:hidden text-gray-500 text-2xl transition ease-in-out duration-500 hover:text-gray-100"/>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
