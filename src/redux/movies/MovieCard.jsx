import React from "react";

const MovieCard = ({ movie }) => {
  console.log(movie);
  return (
    <section className="p-1 bg-slate-900 rounded-md transition-all ease-in-out duration-500 hover:shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] hover:shadow-sky-500 hover:scale-x-105">
      <div className="bg-slate-900">
        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="Image not available" className="rounded-md"/>
        <h1 className="p-2">Title: <strong>{movie.title}</strong></h1>
        <p className="p-2">Release Date: <strong>{movie.release_date}</strong></p>
      </div>
    </section>
  );
};

export default MovieCard;
