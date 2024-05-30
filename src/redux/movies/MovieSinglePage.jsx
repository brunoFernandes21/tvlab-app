import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchMovies, selectMovieById, selectNowPlayingMovieById } from "./moviesSlice";

const MovieSinglePage = () => {
  const { jobId } = useParams();
  const movie = useSelector((state) => selectMovieById(state, Number(jobId)));
  const NowPlayingMovie = useSelector((state) => selectNowPlayingMovieById(state, Number(jobId)));
  const singleMovie = movie ? movie : NowPlayingMovie
  const dispatch = useDispatch();
  console.log(singleMovie);

  useEffect(() => {
    dispatch(fetchMovies());
  }, []);

  const imageUrl = singleMovie.backdrop_path ? `https://image.tmdb.org/t/p/w500${singleMovie.backdrop_path}` : `https://image.tmdb.org/t/p/w500${singleMovie.poster_path}`;
  // const imageUrl = `https://image.tmdb.org/t/p/w500${singleMovie.backdrop_path}`
  // grid grid-cols-1 md-grid-cols-[30%70%]
  return (
    <section>
      <div
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="container mx-auto mb-20"
      >
        <div className=" h-screen bg-black bg-opacity-70 py-10 md:py-20 px-2 md:px-6 lg:px-8 grid grid-col-1 gap-4 md:grid-cols-2">
          <div className="w-[250px] mx-auto lg:w-[350px]"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${singleMovie.poster_path}`}
              alt="Image not available"
              // width={350}
              // height={250}
              className="rounded-md"
            />
          </div>
          <div className="mt-6">
            <h1 className="text-xl lg:text-5xl uppercase font-bold">{singleMovie.title}</h1>
            {singleMovie.adult === false && <p className="text-sm md:text-lg font-extralight mt-2"><span className=" font-bold">Adult:</span> No</p>}
            {singleMovie.adult === true && <p className="text-sm md:text-lg font-extralight mt-2"><span className=" font-bold">Adult</span>: Yes</p>}
            <p className="text-sm md:text-lg font-extralight mt-2"> <span className=" font-bold">Overview:</span> {singleMovie.overview}</p>
            <p className="text-sm md:text-lg font-extralight mt-2"> <span className=" font-bold">Release Date:</span> {singleMovie.release_date}</p>
            <p className="text-sm md:text-lg font-extralight mt-2"><span className=" font-bold">Vote:</span> {singleMovie.vote_count}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MovieSinglePage;
