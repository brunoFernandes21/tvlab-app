import React from 'react'
import { Link } from "react-router-dom";

const NowPlayingCard = ({ type }) => {
  let movieTitle;
  let date;
  if(type.title){
    date = type.release_date
    if(type.title >= 20) {
      movieTitle = type.title.substring(0, 30) + "..."
    } else {
      movieTitle = type.title
    }
  } else if(type.name) {
    date = type.first_air_date
    if(type.name >= 20) {
      movieTitle = type.name.substring(0, 30) + "..."
    } else {
      movieTitle = type.name
    }
  }
  return (
    <section className=" bg-slate-900 rounded-lg transition-all ease-in-out duration-500 hover:shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] hover:shadow-sky-500 hover:scale-x-105 border border-slate-500">
      <div>
        <Link to={`/movies/${type.id}`}>
          <div className="mb-4 ">
            <img
              src={`https://image.tmdb.org/t/p/original/${type.poster_path}`}
              alt="Image not available"
              className="rounded-md"
            />
          </div>
          <div className="border border-slate-600 my-4"></div>
          <div className="pl-4 mt-2">
            <h1>
              <strong>{movieTitle}</strong>
            </h1>
            <p className="py-2 text-sm font-extralight">
              <strong>Release: {date}</strong>
            </p>
            <p className="pb-2 text-sm font-extralight">
              <strong>Vote: {type.vote_count}</strong>
            </p>
          </div>
        </Link>
      </div>
    </section>
  );
}

export default NowPlayingCard