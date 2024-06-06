import { AiOutlineClose } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { IoLogInOutline } from "react-icons/io5";

const MobileNavigation = ({ setShowNav, logout }) => {
  const linkClass = ({ isActive }) => {
    return isActive
      ? "md:text-md lg:text-xl uppercase transition ease-in-out duration-500 text-transparent hover:text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500 hover:from-pink-500 hover:to-yellow-500"
      : "md:text-md lg:text-xl uppercase transition ease-in-out duration-500 text-gray-500 hover:text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500 hover:from-pink-500 hover:to-yellow-500";
  };
  return (
    <>
      <ul
        className={`header__links__mobile flex justify-center items-center gap-8`}
      >
        <AiOutlineClose
          onClick={() => setShowNav(false)}
          className="close__nav cursor-pointer text-4xl text-slate-400"
        />
        <li
          onClick={() => setShowNav(false)}
          className="text-lg text-slate-500 transition ease-in-out cursor-pointer font-bold"
        >
          <NavLink
            to="/"
            
            className={linkClass}         >
            <span>Home</span>
          </NavLink>
        </li>
        <li
          onClick={() => setShowNav(false)}
          className="text-lg text-slate-500 transition ease-in-out cursor-pointer font-bold"
        >
          <NavLink
            to="/movies"
            
            className={linkClass}>
            <span>Movies</span>
          </NavLink>
        </li>
        <li
          onClick={() => setShowNav(false)}
          className="text-lg text-slate-500 transition ease-in-out cursor-pointer font-bold"
        >
          <NavLink
            to="/tv-shows"
            
            className={linkClass}         
            >
            <span>Tv Shows</span>
          </NavLink>
        </li>
        <li
          onClick={() => setShowNav(false)}
          className="text-lg text-slate-500 transition ease-in-out cursor-pointer font-bold"
        >
          <NavLink
            to="/favourites"
            className={linkClass}
            >
            <span>Favourites</span>
          </NavLink>
        </li>
        <li  onClick={() => setShowNav(false)}>
          <NavLink
            to="/landing-page"
            onClick={logout}
            className="text-gray-400 flex items-center gap-2 transition ease-in-out duration-500 hover:text-gray-100"
          >
            <IoLogInOutline
              className="md:hidden text-4xl text-slate-400"
             
            />
            <span>Log out</span>
          </NavLink>
        </li>
        {/* 
        <section className="social__icons__mobile flex flex-col justify-center items-center gap-2 mt-10 p-2">
          <div>
            <span className="font-bold text-xl">Socials</span>
          </div>
          <div className="flex justify-center items-center gap-4">
          <Link to="https://github.com/brunoFernandes21" target="_blank">
            <FaGithub className="text-3xl" />
          </Link>
          <Link
            to="https://linkedin.com/in/bruno-fernandes-879b0725a"
            target="_blank"
          >
            <FaLinkedin className="text-3xl" />
          </Link>
          </div>
        </section> */}
      </ul>
    </>
  );
};

export default MobileNavigation;
