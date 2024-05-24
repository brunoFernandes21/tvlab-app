import React, { useEffect } from "react";
import { selectAllPopularMovies, selectStatus, fetchMovies } from "./moviesSlice";
import { useSelector, useDispatch } from "react-redux";
import MovieCard from "./MovieCard";

const PopularMovies = () => {
  const PopularMovies = useSelector(selectAllPopularMovies);
  const movieStatus = useSelector(selectStatus)
  const dispatch = useDispatch()

  useEffect(() => {
    if(movieStatus === "idle") {
      dispatch(fetchMovies())
    }
  },[])

  // console.log(PopularMovies);
  const displayPopularMovies = PopularMovies.map((movie) => (
      <MovieCard key={movie.id} movie={movie} />
  ));
  return (
    <section className="mt-10">
      <h1 className="text-xl md:text-4xl lg:text-5xl font-bold text-center">Popular Movies</h1>
      <div className=" max-w-7xl grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2 mx-auto px-2 md:px-6 lg:px-8 mt-6 md:mt-8 lg:mt-10 ">
      {displayPopularMovies}
      </div>
    </section>
  );
};

export default PopularMovies;
