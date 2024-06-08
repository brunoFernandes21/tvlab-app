import React, {useState, useEffect } from "react";
import { selectAllMovies, selectPages,
  selectTotalResults, fetchMovies, selectStatus, selectSearchValue } from "./moviesSlice";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../../components/Spinner";
import MovieCard from "../../components/ContentCard";
import SearchBox from "../../components/SearchBox";

const PopularMovies = () => {
  const popularMovies = useSelector(selectAllMovies);
  const dispatch = useDispatch()
  const movieStatus = useSelector(selectStatus)
  const searchedValue = useSelector(selectSearchValue)
  const pages = useSelector(selectPages)
  const totalResults = useSelector(selectTotalResults)
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
      dispatch(fetchMovies())
  },[])

  const handleChange = (event) => {
    setSearchValue(event.target.value)
  }
  const searchMovies = (event) => {
    event.preventDefault()
    if(searchValue){
      dispatch(fetchMovies(searchValue))
    }
  }

  // const filteredMovies = popularMovies.filter((movie) => (
  //   movie.title.toLowerCase().includes(searchValue.toLocaleLowerCase())
  // ))
  const displayPopularMovies = popularMovies.map((movie) => (
      <MovieCard key={movie.id} prop={movie} />
  ));
  console.log(searchedValue);
  return (
    <section className="mt-10 md:mt-16">
      {movieStatus !== "loading" && movieStatus !== "failed" && <h1 className="text-xl md:text-4xl lg:text-5xl font-bold text-center mb-6 md:mb-8 lg:mb-10">Popular Movies</h1>}
      {movieStatus !== "loading" && movieStatus !== "failed" && <SearchBox searchValue={searchValue} handleChange={handleChange} searchMovies={searchMovies}/>}
      <div className="container grid mx-auto px-2 md:px-6 lg:px-8 mt-6 md:mt-8 lg:mt-10">
       {totalResults > 0 && searchedValue !== "" && <p className="font-bold text-lg md:text-lx lg:text-2xl">
          {popularMovies.length} of {totalResults} for {searchedValue.charAt(0).toUpperCase() + searchedValue.slice(1)}
        </p>}
      </div>
      <div className="container grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-auto px-2 md:px-6 lg:px-8 mt-6 md:mt-8 lg:mt-10 rounded-lg ">
        
      { movieStatus === "loading" && (<Spinner text="Loading" loading={movieStatus}/>) }
      { movieStatus === "succeeded" && (displayPopularMovies)}
      {popularMovies.length === 0 && (<p className="text-xl mx-auto">Unable to find movies</p>)}
      { movieStatus === "failed" && (<p className="text-xl mx-auto">Unable to find movies</p>)}
      </div>
    </section>
  );
};

export default PopularMovies;
