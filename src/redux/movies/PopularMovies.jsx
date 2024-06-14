//REACT
import { useState, useEffect } from "react";

//REDUX
import { useSelector, useDispatch } from "react-redux";
import {
  selectAllMovies,
  selectPages,
  selectCurrentPage,
  selectTotalResults,
  fetchMovies,
  selectStatus,
  selectSearchValue,
  setCurrentPage
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
  // movies state selection
  const popularMovies = useSelector(selectAllMovies);
  const dispatch = useDispatch();
  const movieStatus = useSelector(selectStatus);
  const movieSearchedValue = useSelector(selectSearchValue);
  const moviesPages = useSelector(selectPages);
  const moviesCurrentPage = useSelector(selectCurrentPage);
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
    if(movieSearchedValue !== searchForm.searchValue) {
      dispatch(setCurrentPage())
    }
    if (searchForm.searchValue && searchForm.type === "movies") {
      dispatch(
        fetchMovies({
          searchValue: searchForm.searchValue,
          type: searchForm.type,
        })
      );
    } else {
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
  const moviesProps = {
    moviesCurrentPage,
    moviesPages,
    resultDisplay,
    moviesTotalResults,
    movieSearchedValue,
  };
  const showsProps = {
    showsSearchedValue,
    showsPages,
    showsTotalResults,
  }
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
        {resultDisplay === "movies" &&
          moviesTotalResults > 0 &&
          movieSearchedValue !== "" && (
            <p className="uppercase text-lg md:text-lx lg:text-2xl">
              {content.length} results of {moviesTotalResults} for{" "}
              {movieSearchedValue}
            </p>
          )}
        {resultDisplay === "shows" &&
          showsTotalResults > 0 &&
          showsSearchedValue !== "" && (
            <p className="font-bold text-lg md:text-lx lg:text-2xl">
              {content.length} results of {showsTotalResults} for{" "}
              {showsSearchedValue.charAt(0).toUpperCase() +
                showsSearchedValue.slice(1)}
            </p>
          )}
      </div>
      {movieStatus === "loading" && (
        <Spinner text="Loading" loading={movieStatus} />
      )}
      <div className="container grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-auto px-2 md:px-6 lg:px-8 mt-6 md:mt-8 lg:mt-10 rounded-lg ">
        {movieStatus === "succeeded" && displayContent}
        {popularMovies.length === 0 && (
          <p className="text-xl mx-auto">Unable to find movies</p>
        )}
        {movieStatus === "failed" && (
          <p className="text-xl mx-auto">Unable to find movies</p>
        )}
      </div>
      <div className="container grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-auto px-2 md:px-6 lg:px-8 mt-6 md:mt-8 lg:mt-10">
        {movieSearchedValue !== "" && (
          <Pagination
            moviesProps={moviesProps}
            resultDisplay={resultDisplay}
            searchMoviesAndShows={searchMoviesAndShows}
          />
        )}
        {searchForm.type === "shows" && shows.length === 0 && (
          <p className="text-xl mx-auto">Unable to find shows</p>
        )}
      </div>
    </section>
  );
};

export default PopularMovies;
