import { useDispatch, useSelector } from "react-redux";
import { nextPage, previousPage } from "../redux/movies/moviesSlice";
import {
  fetchMovies,
  selectPages,
  selectCurrentPage,
  selectTotalResults,
  selectSearchValue,
} from "./../redux/movies/moviesSlice";
import { FaGreaterThan, FaLessThan } from "react-icons/fa";

const Pagination = ({
  resultDisplay,
  pageChange,
  initialMoviesObject,
}) => {
  const dispatch = useDispatch();
  const movieSearchedValue = useSelector(selectSearchValue);
  const moviesPages = useSelector(selectPages);
  const moviesCurrentPage = useSelector(selectCurrentPage);
  const moviesTotalResults = useSelector(selectTotalResults);

  const initialCurrentPage = initialMoviesObject.page;
  const totalPages = initialMoviesObject.total_pages;
  const disablePrev = moviesCurrentPage === 1;
  const disableNext = moviesCurrentPage === moviesPages;

  const handlePageChange = async (event, param) => {
    if (param === "next") {
      dispatch(nextPage());
      pageChange(event, "next");
    } else {
      dispatch(previousPage());
      pageChange(event, "prev");
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={(event) => handlePageChange(event, "prev")}
          disabled={disablePrev}
          className={`flex items-center gap-2 text-lg border rounded px-3 py-2 ${
            disablePrev
              ? "bg-gray-200 text-gray-500 font-bold"
              : " cursor-pointer hover:bg-white hover:text-black hover:font-bold transition-all ease-in-out duration-500"
          } `}
        >
          <FaLessThan />
          Previous
        </button>
        {totalPages && (
          <p className="uppercase text-lg md:text-lx">
            {initialCurrentPage} of {totalPages}
          </p>
        )}
        {resultDisplay === "movies" &&
          moviesTotalResults > 0 &&
          movieSearchedValue !== "" && (
            <p className="uppercase text-lg md:text-lx">
              {moviesCurrentPage} of {moviesPages}
            </p>
          )}
        <button
          type="button"
          onClick={(event) => handlePageChange(event, "next")}
          disabled={disableNext}
          className={`flex items-center gap-2 text-lg border rounded px-3 py-2 ${
            disableNext
              ? "bg-gray-200 text-gray-500 font-bold"
              : " cursor-pointer hover:bg-white hover:text-black hover:font-bold transition-all ease-in-out duration-500"
          } `}
        >
           Next <FaGreaterThan />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
