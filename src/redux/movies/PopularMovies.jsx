import React, {useState, useEffect } from "react";
import { selectAllMovies, fetchMovies, selectStatus, selectError } from "./moviesSlice";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../../components/Spinner";
import MovieCard from "../../components/ContentCard";
import SearchBox from "../../components/SearchBox";

const PopularMovies = () => {
  const popularMovies = useSelector(selectAllMovies);
  const dispatch = useDispatch()
  const movieStatus = useSelector(selectStatus)
  const movieError = useSelector(selectError)
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
      dispatch(fetchMovies())
  },[])
  const sortedMovies = [...popularMovies].sort((a, b) => {
    return a["vote_count"] > b["vote_count"] ? -1 : 0
  }) 

  const handleChange = (event) => {
    setSearchValue(event.target.value)
  }

  const filteredMovies = sortedMovies.filter((movie) => (
    movie.title.toLowerCase().includes(searchValue.toLocaleLowerCase())
  ))
  const displayPopularMovies = filteredMovies.map((movie) => (
      <MovieCard key={movie.id} prop={movie} />
  ));
  return (
    <section className="mt-10 md:mt-16">
      {movieStatus !== "loading" && movieStatus !== "failed" && <h1 className="text-xl md:text-4xl lg:text-5xl font-bold text-center mb-6 md:mb-8 lg:mb-10">Popular Movies</h1>}
      {movieStatus !== "loading" && movieStatus !== "failed" && <SearchBox searchValue={searchValue} handleChange={handleChange}/>}
      <div className="container grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-auto px-2 md:px-6 lg:px-8 mt-6 md:mt-8 lg:mt-10 rounded-lg ">
        
      { movieStatus === "loading" && (<Spinner text="Loading" loading={movieStatus}/>) }
      { movieStatus === "succeeded" && (displayPopularMovies)}
      { movieStatus === "failed" && (<p className="text-xl mx-auto">Unable to find movies</p>)}
      </div>
    </section>
  );
};

export default PopularMovies;
