//REACT
import React from "react";
//ROUTER DOM
import { Link } from "react-router-dom";
//ICONS
import { FaStar } from "react-icons/fa";


const MovieCard = ({ prop }) => {
  const title = prop.title ? prop.title : prop.name;

  const date = prop.release_date ? prop.release_date : prop.first_air_date;

  return (
    <section className=" bg-slate-900 rounded-lg transition-all ease-in-out duration-500 hover:shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] hover:shadow-blue-400 hover:scale-105 hover:border-4 hover:border-slate-300">
      <div>
        <Link to={prop.title ? `/movies/${prop.id}` : `/tv-shows/${prop.id}`}>
          <div>
            <img
              src={prop.poster_path ? `https://image.tmdb.org/t/p/w500/${prop.poster_path}` : "/original-poster.png"}
              alt="Image not available"
              className="rounded-md"
            />
          </div>
          <div className="my-4"></div>
          <div className="pb-2 px-2 truncate">
            <h1 className="lg:text-lg truncate">
              <strong>{title}</strong>
            </h1>
            <p className="py-2 text-sm">
              <strong>Release Date:</strong> {date}
            </p>
            <p className="pb-2 text-sm">
              <strong>Populatiry:</strong> {prop.popularity}
            </p>
            <p className="pb-2 text-sm flex items-center gap-2">
              <strong>Rating:</strong>
              <FaStar className="text-yellow-400" />
              <span>{prop.vote_average.toFixed()} / 10</span>
            </p>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default MovieCard;
