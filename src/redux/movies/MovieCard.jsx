import React from "react";

const MovieCard = ({ movie }) => {
  return (
    <section className="p-1 bg-slate-900 rounded-md transition-all ease-in-out duration-500 hover:shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] hover:shadow-sky-500">
      <div className="bg-slate-900">
        <img src="/public/poster.jpeg" alt="" className="rounded-md"/>
        <h1 className="p-2">Movie Title: <strong>{movie.title}</strong></h1>
        <p className="p-2">Movie Description: <strong>{movie.description}</strong></p>
      </div>
    </section>
  );
};

export default MovieCard;
