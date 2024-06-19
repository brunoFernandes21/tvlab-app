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
import MovieCard from "../../components/ContentCard";
import SearchBox from "../../components/SearchBox";
import Pagination from "../../components/Pagination";
const PopularMovies = () => {
  // //Initial data object
  const initialMoviesObject = useSelector(selectInitialMoviesData);
  const moviesPerPage = initialMoviesObject.results;
  const initialResults = initialMoviesObject.total_results;

  // Search results
  const popularMovies = useSelector(selectAllMovies);
  const dispatch = useDispatch();
  const movieStatus = useSelector(selectStatus);
  const movieSearchedValue = useSelector(selectSearchValue);
  const moviesTotalResults = useSelector(selectTotalResults);

  // shows state selection
  const shows = useSelector(selectAllShows);
  const showsSearchedValue = useSelector(selectShowsSearchValue);
  const showsPages = useSelector(selectShowsPages);
  const showsTotalResults = useSelector(selectShowsTotalResults);
  const [searchForm, setSearchForm] = useState({ searchValue: "", type: "" });

  useEffect(() => {
    dispatch(fetchMovies());
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
  const searchMoviesAndShows = (event) => {
    event.preventDefault();
    // if(searchForm.searchValue === "" || searchForm.type === "") {
    //   alert("Please Enter Title And Select Type!")
    //   return
    // }

    if (movieSearchedValue !== searchForm.searchValue) {
      dispatch(setCurrentPage());
    }
    if (initialMoviesObject) {
      dispatch(fetchMovies());
    }

    if (searchForm.searchValue && searchForm.type === "movies") {
      dispatch(
        fetchMovies({
          searchValue: searchForm.searchValue,
          type: searchForm.type,
        })
      );
    } else if (searchForm.searchValue && searchForm.type === "shows") {
      dispatch(
        fetchShows({
          searchValue: searchForm.searchValue,
          type: searchForm.type,
        })
      );
    }
  };

  const content =
    searchForm.searchValue && searchForm.type === "shows"
      ? shows
      : popularMovies;

  let resultDisplay = "";
  const filteredContent = content.filter((item) => {
    if (item.name) {
      resultDisplay = "shows";
      return item.name
        .toLowerCase()
        .includes(searchForm.searchValue.toLocaleLowerCase());
    } else {
      resultDisplay = "movies";
      return item.title
        .toLowerCase()
        .includes(searchForm.searchValue.toLocaleLowerCase());
    }
  });

  const displayContent = filteredContent.map((movie) => (
    <MovieCard key={movie.id} prop={movie} />
  ));

  const showsProps = {
    showsSearchedValue,
    showsPages,
    showsTotalResults,
  };
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
      <div className="container grid mx-auto px-2 md:px-6 lg:px-8 mt-6 md:mt-8 lg:mt-10">
        {initialResults && searchForm.searchValue === "" && (
          <p className="uppercase text-lg md:text-lx lg:text-2xl">
            {moviesPerPage.length} of {initialResults} total results
          </p>
        )}
        {resultDisplay === "movies" &&
          moviesTotalResults > 0 &&
          movieSearchedValue !== "" && (
            <p className="uppercase text-lg md:text-lx lg:text-2xl">
              {displayContent.length} of {moviesTotalResults} total results for{" "}
              {movieSearchedValue}
            </p>
          )}
        {resultDisplay === "shows" &&
          showsTotalResults > 0 &&
          showsSearchedValue !== "" && (
            <p className="font-bold text-lg md:text-lx lg:text-2xl">
              {displayContent.length} results of {showsTotalResults} for{" "}
              {showsSearchedValue.charAt(0).toUpperCase() +
                showsSearchedValue.slice(1)}
            </p>
          )}
        {}
      </div>
      {movieStatus === "loading" && (
        <Spinner text="Loading" loading={movieStatus} />
      )}
      <div className="container grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-auto px-2 md:px-6 lg:px-8 mt-6 md:mt-8 lg:mt-10 rounded-lg ">
        {displayContent.length > 0 && displayContent}
      </div>
      {displayContent.length === 0 && searchForm.type === "" && (
        <p className="text-xl mx-auto text-center">
          Unable to find movies. Select type and click search to search in the
          API
        </p>
      )}
      <div className="container grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-auto px-2 md:px-6 lg:px-8 mt-6 md:mt-8 lg:mt-10">
        {displayContent.length > 0 && (
          <Pagination
            initialMoviesObject={initialMoviesObject}
            resultDisplay={resultDisplay}
            searchMoviesAndShows={searchMoviesAndShows}
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
