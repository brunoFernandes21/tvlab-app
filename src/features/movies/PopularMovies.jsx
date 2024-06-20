//REACT
import { useState, useEffect } from "react";

//REDUX
import { useSelector, useDispatch } from "react-redux";
import {
  selectAllMovies,
  selectInitialMoviesData,
  selectTotalResults,
  fetchMovies,
  selectStatus,
  selectSearchValue,
  setCurrentPage,
  selectCurrentPage,
} from "./moviesSlice";
import {
  fetchShows,
  selectAllShows,
  selectShowsPages,
  selectShowsTotalResults,
  selectShowsSearchValue,
} from "../tvshows/showsSlice";

//COMPONENTS
import Spinner from "../../components/Spinner";
import ContentCard from "../../components/ContentCard";
import SearchBox from "../../components/SearchBox";
import Pagination from "../../components/Pagination";

import { toast } from "react-toastify";
const PopularMovies = () => {
  // //Initial data object
  const initialMoviesObject = useSelector(selectInitialMoviesData);
  const moviesPerPage = initialMoviesObject.results
  const initialResults = initialMoviesObject.total_results;

  // Search results
  const popularMovies = useSelector(selectAllMovies);
  const dispatch = useDispatch();
  const movieStatus = useSelector(selectStatus);
  const movieSearchedValue = useSelector(selectSearchValue);
  const moviesTotalResults = useSelector(selectTotalResults);
  const moviesCurrentPage = useSelector(selectCurrentPage);



  // shows state selection
  const shows = useSelector(selectAllShows);
  const showsSearchedValue = useSelector(selectShowsSearchValue);
  // const showsPages = useSelector(selectShowsPages);
  const showsTotalResults = useSelector(selectShowsTotalResults);
  const [searchForm, setSearchForm] = useState({ searchValue: "", type: "movies" });

  useEffect(() => {
    dispatch(fetchMovies());
    dispatch(fetchShows());
  }, [dispatch]);
  
  const handleChange = (event) => {
    const { value, type, name, checked } = event.target;
    setSearchForm((prevState) => {
      return {
        ...prevState,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  };

  const contentType = (type = "movies") => {
    if (type === "shows") {
      dispatch(
        fetchShows({
          searchValue: searchForm.searchValue,
          type: searchForm.type,
        })
      );
      return
    }
    dispatch(
      fetchMovies({
        searchValue: searchForm.searchValue,
        type: searchForm.type,
      })
    );
  };
  
  const content = searchForm.type === "shows" ? shows : popularMovies;

  const searchMoviesAndShows = (event, param) => {
    event.preventDefault();

    if (movieSearchedValue !== searchForm.searchValue) {
      dispatch(setCurrentPage());
    }

    if (param && searchForm.searchValue === "") {
      dispatch(fetchMovies());
    } else {
      if (searchForm.searchValue === "" || searchForm.type === "") {
        toast.error("Please Enter Title And Select Type!");
        return;
      }
    }
    if (searchForm.searchValue && searchForm.type === "movies") {
      contentType("movies");
    } else {
      contentType("shows");
    }
  };

  let resultDisplay;

  content.forEach((item) => {
    if(item.name){
      resultDisplay = "shows";
    } else {
      resultDisplay = "movies";
    }
  })

  const displayContent = content.map((movie) => (
    <ContentCard key={movie.id} prop={movie} />
  ));

  return (
    <section className="mt-10 md:mt-16">
      {movieStatus !== "loading" && movieStatus !== "failed" && (
        <h1 className="text-xl md:text-4xl lg:text-5xl font-bold text-center mb-6 md:mb-8 lg:mb-10">
          Popular Movies
        </h1>
      )}
      {movieStatus !== "loading" && movieStatus !== "failed" && (
        <SearchBox
          searchForm={searchForm}
          setSearchForm={setSearchForm}
          handleChange={handleChange}
          searchMovies={searchMoviesAndShows}
        />
      )}
      <div className="container grid mx-auto px-8 md:px-6 lg:px-8 mt-6 md:mt-8 lg:mt-10">
        {initialResults && searchForm.type === "movies" && (
          <div className="flex items-center justify-between">
          <p className="capitalized text-lg md:text-lx lg:text-2xl">
            {initialResults} Movies results <br />
            {/* Page {moviesCurrentPage} {moviesPerPage.length} of {initialResults} total results */}
          </p>
          <p className="capitalized text-lg md:text-lx lg:text-2xl">Page {moviesCurrentPage}</p>
          </div>
        )}
        {resultDisplay === "movies" && moviesTotalResults > 0 &&
          movieSearchedValue !== "" && (
            <div className="flex items-center justify-between">
            <p className="text-lg md:text-lx lg:text-2xl">
              {moviesTotalResults} Total results for{" "} {movieSearchedValue} <br />
              {/* {displayContent.length} of {moviesTotalResults} total results for{" "} */}
            </p>
            <p className="capitalized text-lg md:text-lx lg:text-2xl">Page {moviesCurrentPage} </p>
            </div>
          )}
        {resultDisplay === "shows" && showsTotalResults > 0 &&
          showsSearchedValue !== "" && (
            <div className="flex items-center justify-between">
            <p className="capitalized text-lg md:text-lx lg:text-2xl">
              {showsTotalResults} Total results for{" "}
              {showsSearchedValue}
            </p>
            {/* <p className="capitalized text-lg md:text-lx lg:text-2xl">Page {moviesCurrentPage} </p> */}
            </div>
          )}
        {}
      </div>
      {movieStatus === "loading" && (
        <Spinner text="Loading" loading={movieStatus} />
      )}
      {/* grid-cols-1 md:grid-cols-3 */}
      <div className="contentCard container gap-4 mx-auto px-8 md:px-6 lg:px-8 mt-6 md:mt-8 lg:mt-10 rounded-lg ">
        {/* {displayContent.length > 0 && displayContent} */}
        {displayContent}
      </div>
      {displayContent.length === 0 && searchForm.type === "" && (
        <p className="text-xl mx-auto text-center">
          Unable to find movies. Select type and click search to search in the
          API
        </p>
      )}
      <div className="container grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-auto px-2 md:px-4 mt-6 md:mt-8 lg:mt-10">
        {displayContent.length > 0 && searchForm.type === "movies" && (
          <Pagination
            initialMoviesObject={initialMoviesObject}
            resultDisplay={resultDisplay}
            pageChange={searchMoviesAndShows}
          />
        )}
        {showsSearchedValue &&
          searchForm.type === "shows" &&
          displayContent.length === 0 && (
            <p className="text-xl mx-auto">Unable to find shows</p>
          )}
        {movieSearchedValue &&
          searchForm.type === "movies" &&
          displayContent.length === 0 && (
            <p className="text-xl mx-auto">Unable to find movies</p>
          )}
      </div>
    </section>
  );
};

export default PopularMovies;
