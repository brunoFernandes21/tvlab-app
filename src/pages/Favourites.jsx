import React from "react";
import { Link } from "react-router-dom";
const Favourites = () => {
  return (
    <div className="container max-7xl mt-10 md:mt-16 mx-auto">
      <h1 className="text-xl md:text-4xl lg:text-5xl font-bold text-center mb-6 md:mb-8 lg:mb-10">
        Favourites
      </h1>
      <section className="grid justify-center grid-cols-1 md:grid-cols-2 gap-4 mx-auto px-2 md:px-6 lg:px-8 mt-6 md:mt-8 lg:mt-10 rounded-lg ">
        <div className=" bg-slate-900 rounded-lg transition-all ease-in-out duration-500 hover:shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] hover:shadow-blue-400 hover:scale-105 hover:border-4 hover:border-slate-300 h-[530px] flex items-center justify-center max-w-[530px]">
          <Link>View Favourite Movies</Link>
        </div>
        <div className=" bg-slate-900 rounded-lg transition-all ease-in-out duration-500 hover:shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] hover:shadow-blue-400 hover:scale-105 hover:border-4 hover:border-slate-300 flex items-center justify-center max-w-[530px]">
          <Link>View Favourite Tv Shows</Link>
        </div>
      </section>
    </div>
  );
};

export default Favourites;
