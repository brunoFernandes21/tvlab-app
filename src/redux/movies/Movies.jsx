// REACT
import { useEffect } from "react";

//REDUX
import { useSelector, useDispatch } from "react-redux";
import {
  selectAllMovies,
  fetchMovies,
  selectStatus,
  selectError,
} from "./moviesSlice";

// COMPONENTS
import MovieCard from "../../components/ContentCard";
import Spinner from "../../components/Spinner";
import SortBy from "../../components/SortBy";

const Movies = () => {
  const movies = useSelector(selectAllMovies);
  const dispatch = useDispatch();
  const movieStatus = useSelector(selectStatus);
  const movieError = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchMovies());
  }, []);

  const content = movies.map((movie) => (
    <MovieCard key={movie.id} prop={movie} />
  ));

  return (
    <section className="mt-10 pb-10">
      <h1 className="text-xl md:text-4xl lg:text-5xl font-bold text-center">
        Popular Movies
      </h1>
      <SortBy source="movies" />
      {movieStatus === "loading" && (
        <Spinner text="Loading" loading={movieStatus} />
      )}
      <div className="container m-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6 md:mt-8 lg:mt-10 px-2 md:px-6 lg:px-8">
        {movieStatus === "succeeded" && content}
        {movieStatus === "failed" && (
          <p className="text-xl text-center">Unable to find movies</p>
        )}
      </div>
    </section>
  );
};

export default Movies;
