import React from "react";
import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  let movieTitle 
  // = movie.title >= 20 ? movie.title.substring(0, 30) + "..." : movie.title

  let date;
  if(movie.title){
    date = movie.release_date
    if(movie.title.length >= 30) {
      movieTitle = movie.title.substring(0, 35) + "..."
    } else {
      movieTitle = movie.title
    }
  } else if(movie.name) {
    date = movie.first_air_date
    if(movie.name.length >= 30) {
      movieTitle = movie.name.substring(0, 35) + "..."
    } else {
      movieTitle = movie.name
    }
  }
  return (
    <section className=" bg-slate-900 rounded-lg transition-all ease-in-out duration-500 hover:shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] hover:shadow-sky-500 hover:scale-105 border border-slate-500">
      <div>
        <Link to={`/movies/${movie.id}`}>
          <div className="mb-4 ">
            <img
              src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
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
              <strong>Vote: {movie.vote_count}</strong>
            </p>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default MovieCard;
