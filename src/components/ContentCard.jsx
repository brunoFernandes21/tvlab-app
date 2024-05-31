import React from "react";
import { Link } from "react-router-dom";

const MovieCard = ({ prop }) => {
  let movieTitle 
  let date;
  const movie = prop.title
  const show = prop.name
  if(movie){
    date = movie.release_date
    if(movie.length >= 30) {
      movieTitle = movie.substring(0, 35) + "..."
    } else {
      movieTitle = movie
    }
  } else if(show) {
    date = show.first_air_date
    if(show.length >= 30) {
      movieTitle = show.substring(0, 35) + "..."
    } else {
      movieTitle = show
    }
  }
  return (
    <section className=" bg-slate-900 rounded-lg transition-all ease-in-out duration-500 hover:shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] hover:shadow-sky-500 hover:scale-105 hover:border-4 hover:border-slate-300">
      <div>
        <Link to={movie ? `/movies/${prop.id}` : `/tv-shows/${prop.id}`}>
          <div className="mb-4 ">
            <img
              src={`https://image.tmdb.org/t/p/original/${prop.poster_path}`}
              alt="Image not available"
              className="rounded-md"
            />
          </div>
          <div className="border border-slate-600 my-4"></div>
          <div className="pl-4 mt-2">
            <h1 className="text-lg lg:text-lg">
              <strong>{movieTitle}</strong>
            </h1>
            <p className="py-2 lg:text-lg font-extralight">
              <strong>Release Date:</strong> {date}
            </p>
            <p className="pb-2 lg:text-lg font-extralight">
              <strong>Vote: {prop.vote_count}</strong>
            </p>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default MovieCard;
