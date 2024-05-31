import React from "react";
import { Link } from "react-router-dom";

const MovieCard = ({ prop }) => {
  const title = prop.title ? prop.title : prop.name

  const date = prop.release_date ? prop.release_date : prop.first_air_date


  return (
    <section className=" bg-slate-900 rounded-lg transition-all ease-in-out duration-500 hover:shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] hover:shadow-sky-500 hover:scale-105 hover:border-4 hover:border-slate-300">
      <div>
        <Link to={prop.title ? `/movies/${prop.id}` : `/tv-shows/${prop.id}`}>
          <div>
            <img
              src={`https://image.tmdb.org/t/p/original/${prop.poster_path}`}
              alt="Image not available"
              className="rounded-md"
            />
          </div>
          <div className="border border-slate-600 my-4"></div>
          <div className="pb-2 px-2 truncate">
            <h1 className="text-lg lg:text-lg truncate">
              <strong>{title}</strong>
            </h1>
            <p className="py-2 lg:text-lg font-extralight">
              <strong>Release Date:</strong> {date}
            </p>
            <p className="lg:text-lg font-extralight">
              <strong>Vote: {prop.vote_count}</strong>
            </p>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default MovieCard;
