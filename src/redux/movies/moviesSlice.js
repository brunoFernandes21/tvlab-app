import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"
// console.log(import.meta.env.VITE_REACT_APP_API_KEY)
const initialState = {
    movies: [{"id": "1", title: "Batman", description: "Great action movie", poster_path:"/poster.jpeg"}, {"id": "2", title: "Avengers", description: "One of the best all of time", poster_path:"/poster.jpeg"}, {"id": "3", title: "Avengers", description: "One of the best all of time", poster_path: "/poster.jpeg"}, {"id": "4", title: "Avengers", description: "One of the best all of time", poster_path:"/poster.jpeg"}],
    popularMovies: [],
    status: "idle",
    error: null
}

/*****************************************GET POPULAR MOVIES ****************************/
//ENDPOINT FOR POPULAR MOVIES
const popularMoviesURL = "https://api.themoviedb.org/3/movie/popular"
const options = {
    method: 'GET',
    url: popularMoviesURL,
    headers: {
      accept: 'application/json',
      Authorization: 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNDIwZmM4MGM1NGMyMjc5Yzk4ZTI0OWE3ZmQ5NDFjYyIsInN1YiI6IjY2NGYzOTM4MDViNjY3ZTNlZDA2NTQ0MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VIcsQS6zkawudRMQQTxItXEFiqGcpKmYhP_e41So2Tc'
    }
  };

export const fetchMovies = createAsyncThunk("movies/fetchMovies", async() => {
    const response = await axios.request(options)
    const data = await response.data
    // console.log(data.results);
    return data.results
})
export const moviesSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {

    }, 
    extraReducers(builder) {
      builder
      .addCase(fetchMovies.pending, (state, action) => {
        state.status = "loading"
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = "succeeded"
        const popMovies = action.payload
        state.popularMovies = [...popMovies]
      })
    }
})

export const selectStatus = (state) => state.movies.status;
export const selectError = (state) => state.movies.error;
export const selectAllMovies = (state) => state.movies.movies;
export const selectAllPopularMovies = (state) => state.movies.popularMovies;
// export const { } = moviesSlice.actions;

export default moviesSlice.reducer;