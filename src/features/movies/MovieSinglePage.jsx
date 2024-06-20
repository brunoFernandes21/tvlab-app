// REACT
import { useEffect } from "react";

// REACT DOM
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import {
  // fetchMovieById,
  fetchGenres,
  selectMovieById,
  selectNowPlayingMovieById,
  selectStatus,
  selectGenres,
} from "./moviesSlice";

// COMPONENTS
import Spinner from "../../components/Spinner";

// ICONS
import { FaArrowCircleLeft, FaStar } from "react-icons/fa";

const MovieSinglePage = () => {
  const { movieId } = useParams();
  const movie = useSelector((state) => selectMovieById(state, Number(movieId)));
  const NowPlayingMovie = useSelector((state) =>
    selectNowPlayingMovieById(state, Number(movieId))
  );
  const genres = useSelector(selectGenres);
  const movieStatus = useSelector(selectStatus);
  //if movie is not found in the movies array, find it in the nowPlayingMovies array and use it instead
  const singleMovie = movie ? movie : NowPlayingMovie;
  const dispatch = useDispatch();
  const movieGenres = singleMovie.genre_ids;

  useEffect(() => {
    //MODIFY THIS TO FETCH SINGLE MOVIE BASED ON ID
    dispatch(fetchGenres(movieGenres));
    // dispatch(fetchMovies());
  }, [dispatch, movieGenres]);

  const backdropUrl = singleMovie.backdrop_path
    ? `https://image.tmdb.org/t/p/w500${singleMovie.backdrop_path}`
    : `https://image.tmdb.org/t/p/w500${singleMovie.poster_path}`;
  const posterUrl = singleMovie.poster_path
    ? `https://image.tmdb.org/t/p/w500${singleMovie.poster_path}`
    : "/poster.jpeg";
  return (
    <section>
      {movieStatus === "loading" && <Spinner />}
      {movieStatus === "succeeded" && (
        <div
          style={{
            backgroundImage: `url(${backdropUrl})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="container mx-auto"
        >
          <div className=" bg-black bg-opacity-70">
            <section className="py-6 px-6">
              <Link
                to="/movies"
                className="text-gray-400 md:text-lg lg:text-xl hover:text-gray-200 flex items-center "
              >
                <FaArrowCircleLeft className="mr-2" />
                Back to Movies
              </Link>
            </section>
            <div className=" py-10 md:py-20 px-2 md:px-6 lg:px-8 grid grid-col-1 gap-4 md:grid-cols-2">
              <div className="w-[250px] mx-auto lg:w-[350px]">
                <img
                  src={posterUrl}
                  alt="Image not available"
                  // width={350}
                  // height={250}
                  className="rounded-md"
                />
              </div>
              <div className="mt-6">
                <h1 className="text-xl lg:text-5xl uppercase font-bold mb-8">
                  {singleMovie.title}
                </h1>

                <p className="flex items-center gap-2 text-sm md:text-lg font-extralight mt-2">
                  <span className=" font-bold">Rating:</span>
                  <FaStar className="text-yellow-400" />
                  <span>{singleMovie.vote_average.toFixed()} / 10</span>
                </p>
                <p className="text-sm md:text-lg font-extralight mt-2">
                  <span className=" font-bold">Vote:</span>{" "}
                  {singleMovie.vote_count}
                </p>

                {singleMovie.adult === false && (
                  <p className="text-sm md:text-lg font-extralight mt-2">
                    <span className=" font-bold">Adult:</span> No
                  </p>
                )}
                {singleMovie.adult === true && (
                  <p className="text-sm md:text-lg font-extralight mt-2">
                    <span className=" font-bold">Adult</span>: Yes
                  </p>
                )}
                <div className="flex items-center mt-2 gap-1">
                  <p className="text-sm md:text-lg font-extralight">
                    <span className="font-bold">Genres:</span>
                  </p>
                  <ul className="flex items-center gap-2">
                    {genres.map((genre) => (
                      <li
                        className="text-sm md:text-lg font-extralight"
                        key={genre.id}
                      >
                        {genre.name}
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="text-sm md:text-lg font-extralight mt-2">
                  {" "}
                  <span className=" font-bold">Release Date:</span>{" "}
                  {singleMovie.release_date}
                </p>
                <p className="text-sm md:text-lg font-extralight mt-2">
                  {" "}
                  <span className=" font-bold">Overview:</span>{" "}
                  {singleMovie.overview}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      {movieStatus === "failed" && (
        <p className="text-white text-center text-xl">Unable to find movie</p>
      )}
    </section>
  );
};

export default MovieSinglePage;
