import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchMovies, selectMovieById } from "./moviesSlice";

const MovieSinglePage = () => {
  const { jobId } = useParams();
  const movie = useSelector((state) => selectMovieById(state, Number(jobId)));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMovies());
  }, []);

  const imageUrl = movie.backdrop_path ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}` : "";
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
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt="Image not available"
              // width={350}
              // height={250}
              className="rounded-md"
            />
          </div>
          <div className="mt-6">
            <h1 className="text-xl lg:text-5xl uppercase font-bold">{movie.title}</h1>
            {movie.adult === false && <p className="text-sm md:text-lg font-extralight mt-2">Adult: No</p>}
            {movie.adult === true && <p className="text-sm md:text-lg font-extralight mt-2">Adult: Yes</p>}
            <p className="text-sm md:text-lg font-extralight mt-2">{movie.overview}</p>
            <p className="text-sm md:text-lg font-extralight mt-2"> <strong>Release Date:</strong> {movie.release_date}</p>
            <p className="text-sm md:text-lg font-extralight mt-2"> Vote: {movie.vote_count}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MovieSinglePage;
