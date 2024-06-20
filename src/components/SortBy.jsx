//REDUX
import { useDispatch } from "react-redux";
import { sortMovies } from "../features/movies/moviesSlice";
import { sortShows } from "../features/tvshows/showsSlice";

//ICONS
import { FaCalendarAlt, FaUser, FaStar } from "react-icons/fa";
import { BiSolidUpvote } from "react-icons/bi";

const SortBy = ({ source }) => {
  const dispatch = useDispatch();
  return (
    <section className="w-[300px] md:w-[650px] lg:w-[950px] mx-auto z-10 shadow-xl mb-8 p-2 rounded-lg flex items-center justify-center mt-6 md:mt-8 lg:mt-10">
      <p className="hidden md:block text-gray-500 font-bold w-36 md:text-xl">
        Sort by
      </p>
      <section className="flex items-center justify-end">
        <button
          onClick={() =>
            source === "movies"
              ? dispatch(sortMovies("title"))
              : dispatch(sortShows("name"))
          }
          className="group relative px-4 md:px-8 flex items-center gap-1 text-gray-500 "
        >
          <FaUser className="hidden md:block md:text-xl" />
          <span className="text-gray-500 px-2 md:text-xl">Title</span>
          <span className=" absolute group-hover:opacity-90 transition-opacity bg-gray-700 text-white px-4 py-1 rounded opacity-0 mb-20">
            Title
          </span>
        </button>
        <button
          onClick={() =>
            source === "movies"
              ? dispatch(sortMovies("release_date"))
              : dispatch(sortShows("first_air_date"))
          }
          className=" group relative px-4 md:px-8 flex items-center gap-1 text-gray-500"
        >
          <span className="absolute group-hover:opacity-90 transition-opacity bg-gray-700 text-white px-4 py-1 rounded opacity-0 mb-20">
            Date
          </span>

          <FaCalendarAlt className="hidden md:block md:text-xl" />
          <span className="text-gray-500 px-2 md:text-xl">Date</span>
        </button>

        <button
          onClick={() =>
            source === "movies"
              ? dispatch(sortMovies("vote_count"))
              : dispatch(sortShows("vote_count"))
          }
          className=" group relative px-4 md:px-8 flex items-center gap-1 text-gray-500"
        >
          <span className="absolute group-hover:opacity-90 transition-opacity bg-gray-700 text-white px-4 py-1 rounded opacity-0 mb-20">
            Vote
          </span>
          <BiSolidUpvote className="hidden md:block md:text-xl" />
          <span className="text-gray-500 px-2 md:text-xl">Vote</span>
        </button>
        <button
          onClick={() =>
            source === "movies"
              ? dispatch(sortMovies("vote_average"))
              : dispatch(sortShows("vote_average"))
          }
          className=" group relative px-4 md:px-8 flex items-center gap-1 text-gray-500"
        >
          <span className="absolute group-hover:opacity-90 transition-opacity bg-gray-700 text-white px-4 py-1 rounded opacity-0 mb-20">
            Rating
          </span>
          <FaStar className="hidden md:block md:text-xl" />
          <span className="text-gray-500 px-2 md:text-xl">Rating</span>
        </button>
      </section>
    </section>
  );
};

export default SortBy;
