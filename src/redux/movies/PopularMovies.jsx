import React, { useEffect } from "react";
import { selectAllMovies, fetchMovies, selectStatus, selectError } from "./moviesSlice";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../../components/Spinner";
import MovieCard from "../../components/ContentCard";

const PopularMovies = () => {
  const PopularMovies = useSelector(selectAllMovies);
  const dispatch = useDispatch()
  const movieStatus = useSelector(selectStatus)
  const movieError = useSelector(selectError)

  useEffect(() => {
      dispatch(fetchMovies())
  },[])

  const displayPopularMovies = PopularMovies.map((movie) => (
      <MovieCard key={movie.id} movie={movie} />
  ));
  return (
    <section className="mt-10">
      <h1 className="text-xl md:text-4xl lg:text-5xl font-bold text-center">Popular Movies</h1>
      <div className="container grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-auto px-2 md:px-6 lg:px-8 mt-6 md:mt-8 lg:mt-10 rounded-lg ">
      { movieStatus === "loading" && (<Spinner text="Loading" loading={movieStatus}/>) }
      { movieStatus === "succeeded" && (displayPopularMovies)}
      { movieStatus === "failed" && (<p className="text-xl mx-auto">Unable to find movies</p>)}
      </div>
    </section>
  );
};

export default PopularMovies;
