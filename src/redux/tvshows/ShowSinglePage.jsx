import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchShows, selectShowById, selectStatus } from "./showsSlice";
import Spinner from "../../components/Spinner";
import { FaExclamationTriangle, FaArrowCircleLeft} from "react-icons/fa";
import { Link } from "react-router-dom";

const ShowSinglePage = () => {
  const { showId } = useParams();
  const show = useSelector((state) => selectShowById(state, Number(showId)));
  const dispatch = useDispatch();
  const ShowStatus = useSelector(selectStatus);
  useEffect(() => {
    dispatch(fetchShows());
  }, []);

  if (!show) {
    return (
      <section className="flex items-center justify-center p-16 bg-black h-screen text-white">
        <div className="flex flex-col text-center gap-6 max-w-md">
          <FaExclamationTriangle className="text-yellow-400 text-6xl mx-auto" />

          <h2 className="font-extrabold text-9xl text-slate-700 dark:text-gray-100">
            404
          </h2>
          <p className="text-2xl md:text-3xl dark:text-gray-300">
            Sorry, we couldn&apos;t find show.
          </p>
          <Link
            to="/"
            className="px-8 py-4 text-xl font-semibold rounded-xl bg-sky-600 text-white hover:bg-sky-700"
          >
            Back to home
          </Link>
        </div>
      </section>
    );
  }

  const imageUrl = `https://image.tmdb.org/t/p/original/${show.backdrop_path}`;

  return (
    <section>
      {ShowStatus === "loading" && <Spinner />}
      {ShowStatus === "succeeded" && (
        <div
          style={{
            backgroundImage: `url(${imageUrl})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="container mx-auto"
        >
          <div className=" bg-black bg-opacity-70">
            <section className="py-6 px-6">
              <Link
                to="/tv-shows"
                className="text-gray-400 md:text-lg lg:text-xl hover:text-gray-200 flex items-center "
              >
                <FaArrowCircleLeft className="mr-2" />
                Back to Shows
              </Link>
            </section>
            <div className="py-10 md:py-20 px-2 md:px-6 lg:px-8 grid grid-col-1 gap-4 md:grid-cols-2">
              <div className="w-[250px] mx-auto lg:w-[350px]">
                <img
                  src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                  alt="Image not available"
                  // width={350}
                  // height={250}
                  className="rounded-md"
                />
              </div>
              <div className="mt-6">
                <h1 className="text-xl lg:text-5xl uppercase font-bold">
                  {show.name}
                </h1>
                {show.adult === false && (
                  <p className="text-sm md:text-lg font-extralight mt-2">
                    <span className=" font-bold">Adult:</span> No
                  </p>
                )}
                {show.adult === true && (
                  <p className="text-sm md:text-lg font-extralight mt-2">
                    <span className=" font-bold">Adult</span>: Yes
                  </p>
                )}
                <p className="text-sm md:text-lg font-extralight mt-2">
                  {" "}
                  <span className=" font-bold">Overview:</span>{" "}
                  {show.overview ? show.overview : "No overview available."}
                </p>
                <p className="text-sm md:text-lg font-extralight mt-2">
                  {" "}
                  <span className=" font-bold">Release Date:</span>{" "}
                  {show.first_air_date}
                </p>
                <p className="text-sm md:text-lg font-extralight mt-2">
                  <span className=" font-bold">Vote:</span> {show.vote_count}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      {ShowStatus === "failed" && (
        <p className="text-white text-center text-xl">Unable to find show</p>
      )}
    </section>
  );
};

export default ShowSinglePage;
