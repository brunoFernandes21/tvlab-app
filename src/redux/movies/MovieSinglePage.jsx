import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchMovies,
  fetchGenres,
  selectMovieById,
  selectNowPlayingMovieById,
  selectStatus,
  selectGenres,
} from "./moviesSlice";
import {
  FaExclamationTriangle,
  FaArrowCircleLeft,
  FaStar,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import Spinner from "../../components/Spinner";

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
  }, []);

  // if (!singleMovie) {
  //   return (
  //     <section className="flex items-center justify-center p-16 bg-black">
  //       <div className="flex flex-col text-center gap-6 max-w-md">
  //         <FaExclamationTriangle className="text-yellow-400 text-6xl mx-auto" />

  //         <h2 className="font-extrabold text-9xl text-slate-700 dark:text-gray-100">
  //           404
  //         </h2>
  //         <p className="text-2xl md:text-3xl dark:text-gray-300">
  //           Sorry, we couldn&apos;t find movie.
  //         </p>
  //         <Link
  //           to="/"
  //           className="px-8 py-4 text-xl font-semibold rounded-xl bg-sky-600 text-white hover:bg-sky-700"
  //         >
  //           Back to home
  //         </Link>
  //       </div>
  //     </section>
  //   );
  // }

  const backdropUrl = singleMovie.backdrop_path
    ? `https://image.tmdb.org/t/p/w500${singleMovie.backdrop_path}`
    : `https://image.tmdb.org/t/p/w500${singleMovie.poster_path}`;
  const posterUrl = singleMovie.poster_path
    ? `https://image.tmdb.org/t/p/w500${singleMovie.poster_path}`
    : "/poster.jpeg";
  // grid grid-cols-1 md-grid-cols-[30%70%]
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
                      <li className="text-sm md:text-lg font-extralight" key={genre.id}>{genre.name}</li>
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
                <button className="border mt-2 p-3 rounded-md hover:bg-white hover:text-black hover:font-bold transition-all duration-500 ">
                  <Link to="">Visit movie page</Link>
                </button>
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
