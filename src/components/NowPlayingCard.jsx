import React from 'react'
import { Link } from "react-router-dom";

const NowPlayingCard = ({ movie }) => {

  return (
    <section className=" bg-slate-900 rounded-lg transition-all ease-in-out duration-500 hover:shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] hover:shadow-sky-500 hover:scale-x-105 hover:border-4 hover:border-slate-300">
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
            <h1 className="lg:text-lg truncate ">
              <strong>{movie.title}</strong>
            </h1>
            <p className="py-2 text-sm">
           <strong> Release Date:</strong> {movie.release_date}
            </p>
            <p className="pb-2 text-sm">
              <strong>Vote: </strong>{movie.vote_count}
            </p>
          </div>
        </Link>
      </div>
    </section>
  );
}

export default NowPlayingCard