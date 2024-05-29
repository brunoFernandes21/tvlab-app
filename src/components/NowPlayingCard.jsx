import React from 'react'
import { Link } from "react-router-dom";

const NowPlayingCard = ({ movie }) => {
  let movieTitle = movie.title.length >= 20 ? movie.title.substring(0, 30) + "..." : movie.title
  console.log(movieTitle);

  return (
    <section className=" bg-slate-900 rounded-lg transition-all ease-in-out duration-500 hover:shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] hover:shadow-sky-500 hover:scale-x-105 border border-slate-500">
      <div >
        <Link to={`/movies/${movie.id}`}>
          <div>
            <img
              src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
              alt="Image not available"
              className="rounded-md"
            />
          </div>
          <div className="border border-slate-600 my-4"></div>
          <div className="px-2 mt-2">
            <h className="text-lg">
              <strong>{movieTitle}</strong>
            </h>
            <p className="py-2 lg:text-lg font-extralight">
              <strong>Release Date: {movie.release_date}</strong>
            </p>
            <p className="pb-2 lg:text-lg font-extralight">
              <strong>Vote: {movie.vote_count}</strong>
            </p>
          </div>
        </Link>
      </div>
    </section>
  );
}

export default NowPlayingCard