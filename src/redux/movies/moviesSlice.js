import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"
const initialState = {
    movies: [],
    nowPlayingMovies: [],
    status: "idle",
    error: null
}

/*****************************************FETCH MOVIES ****************************/

const moviesURL = `https://api.themoviedb.org/3/discover/movie?${import.meta.env.VITE_REACT_APP_API_KEY}`
const moviesOptions =  {
  method: 'GET',
  url: moviesURL,
  headers: {
    accept: 'application/json',
  }
};

export const fetchMovies = createAsyncThunk("movies/fetchMovies", async() => {
  const response = await axios.request(moviesOptions)
  const data = await response.data
  return data.results
})

/********************************** FETCH NOW PLAYING MOVIES *****************************/
 const nowPlayingMoviesURL = `https://api.themoviedb.org/3/movie/now_playing?${import.meta.env.VITE_REACT_APP_API_KEY}`
const nowPlayingOptions = {
  method: 'GET',
  url: nowPlayingMoviesURL,
  headers: {
    accept: 'application/json',
  }
};

export const fetchNowPlayingMovies = createAsyncThunk("movies/fetchNowPlayingMovies", async() => {
  const response = await axios.request(nowPlayingOptions)
  const data = await response.data
  return data.results
})


export const moviesSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {
      sortMovies: (state, action) => {
        const payload = action.payload
        const sortedMovies = [...state.movies].sort((a, b) => {
          return a[payload] > b[payload] ? 0 : -1
        })
        return {...state, movies: sortedMovies}
      }

    }, 
    extraReducers(builder) {
      builder
      .addCase(fetchMovies.pending, (state, action) => {
        state.status = "loading"
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = "succeeded"
        const movies = action.payload
        state.movies = [...movies]
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message
      })
      .addCase(fetchNowPlayingMovies.pending, (state, action) => {
        state.status = "loading"
      })
      .addCase(fetchNowPlayingMovies.fulfilled, (state, action) => {
        state.status = "succeeded"
        const nowPlaying = action.payload
        state.nowPlayingMovies = [...nowPlaying]
      })
      .addCase(fetchNowPlayingMovies.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message
      })
    }
})

export const selectStatus = (state) => state.movies.status;
export const selectError = (state) => state.movies.error;
export const selectAllMovies = (state) => state.movies.movies;
export const selectAllNowPlayingMovies = (state) => state.movies.nowPlayingMovies;
export const selectMovieById = (state, movieId) => state.movies.movies.find((movie) =>  movie.id === movieId)
export const selectNowPlayingMovieById = (state, movieId) => state.movies.nowPlayingMovies.find((movie) =>  movie.id === movieId)
export const { sortMovies } = moviesSlice.actions;

export default moviesSlice.reducer;