import { useSelector } from "react-redux";
import { selectAllMovies } from "./moviesSlice";
import MovieCard from "./MovieCard";

const Movies = () => {
  const movies = useSelector(selectAllMovies);

  const displayMovies = movies.map((movie) => (
    <MovieCard key={movie.id} movie={movie} />
  ));

  return (
    <section className="mt-10 pb-10">
      <h1 className="text-xl md:text-4xl lg:text-5xl font-bold text-center">
        All Movies
      </h1>
      <div className="max-w-7xl m-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2 mt-6 md:mt-8 lg:mt-10 px-2 md:px-6 lg:px-8">
        {displayMovies}
      </div>
    </section>
  );
};

export default Movies;
