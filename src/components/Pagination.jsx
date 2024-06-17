import { useDispatch, useSelector } from "react-redux";
import { nextPage, previousPage } from "../redux/movies/moviesSlice";
import {
  fetchMovies,
  selectPages,
  selectCurrentPage,
  selectTotalResults,
  selectSearchValue,
} from "./../redux/movies/moviesSlice";
const Pagination = ({
  resultDisplay,
  searchMoviesAndShows,
  initialMoviesObject,
}) => {
  const dispatch = useDispatch();
  const movieSearchedValue = useSelector(selectSearchValue);
  const moviesPages = useSelector(selectPages);
  const moviesCurrentPage = useSelector(selectCurrentPage);
  const moviesTotalResults = useSelector(selectTotalResults);
  const initialCurrentPage = initialMoviesObject.page;
  const totalPages = initialMoviesObject.total_pages;
  console.log(totalPages);
  const disablePrev = moviesCurrentPage === 1;
  const disableNext = moviesCurrentPage === moviesPages;

  const handlePageChange = async (event, param) => {
    if (param === "next") {
      dispatch(nextPage());
      searchMoviesAndShows(event);
    } else {
      dispatch(previousPage());
      searchMoviesAndShows(event);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex gap-2 mb-2">
        <button
          type="button"
          onClick={(event) => handlePageChange(event, "prev")}
          disabled={disablePrev}
          className={` border rounded px-3 py-2 ${
            disablePrev
              ? "bg-gray-200 text-gray-500 font-bold"
              : " cursor-pointer hover:bg-white hover:text-black hover:font-bold transition-all ease-in-out duration-500"
          } `}
        >
          Previous page
        </button>
        <button
          type="button"
          onClick={(event) => handlePageChange(event, "next")}
          disabled={disableNext}
          className={` border rounded px-3 py-2 ${
            disableNext
              ? "bg-gray-200 text-gray-500 font-bold"
              : " cursor-pointer hover:bg-white hover:text-black hover:font-bold transition-all ease-in-out duration-500"
          } `}
        >
          Next page
        </button>
      </div>
      {resultDisplay === "movies" &&
        moviesTotalResults > 0 &&
        movieSearchedValue !== "" && (
          <p className="uppercase text-lg md:text-lx lg:text-2xl">
            {moviesCurrentPage} of {moviesPages}
          </p>
        )}
      {totalPages && (
        <p className="uppercase text-lg md:text-lx lg:text-2xl">
          {initialCurrentPage} of {totalPages}
        </p>
      )}
    </div>
  );
};

export default Pagination;
