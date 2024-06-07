import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"

const initialState = {
  shows: [],
  genres: [],
  status: "idle",
  error: null,
};

/*****************************************FETCH SHOWS ****************************/
const showsURL = `https://api.themoviedb.org/3/discover/tv?${import.meta.env.VITE_REACT_APP_API_KEY}`;
const showsOptions = {
  method: "GET",
  url: showsURL,
  headers: {
    accept: "application/json"
  }
};

export const fetchShows = createAsyncThunk("shows/fetchShows", async() => {
    const response = await axios.request(showsOptions)
    const data = await response.data
    return data.results
})

/********************************** FETCH Shows GENRES *****************************/
const movieGenresURL = "https://api.themoviedb.org/3/genre/tv/list"
const genresOptions = {
  method: 'GET',
  url: movieGenresURL,
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNDIwZmM4MGM1NGMyMjc5Yzk4ZTI0OWE3ZmQ5NDFjYyIsInN1YiI6IjY2NGYzOTM4MDViNjY3ZTNlZDA2NTQ0MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VIcsQS6zkawudRMQQTxItXEFiqGcpKmYhP_e41So2Tc'

  }
}

export const fetchGenres = createAsyncThunk("genres/fetchGenres", async(body) => {

  const response = await axios.request(genresOptions)
  const data = await response.data
  const movieGenres = body.map((id) => {
    const newGenre = data.genres.find((genre) => genre.id === id)
    return newGenre
  })
  return movieGenres
})

export const showsSlice = createSlice({
  name: "shows",
  initialState,
  reducers: {
    sortShows: (state, action) => {
      const payload = action.payload
      const sortedMovies = [...state.shows].sort((a, b) => {
        if(payload === "name"){
          return a[payload] > b[payload] ? 0 : -1
        } else {
          return a[payload] > b[payload] ? -1 : 0
        }
      })
      return {...state, shows: sortedMovies}
    }
  },
  extraReducers(builder) {
    builder
    .addCase(fetchShows.pending, (state, action) => {
        state.status = "loading"
      })
      .addCase(fetchShows.fulfilled, (state, action) => {
        state.status = "succeeded"
        const shows = action.payload
        state.shows = [...shows]
      })
      .addCase(fetchShows.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message
      })
      .addCase(fetchGenres.pending, (state, action) => {
        state.status = "loading"
      })
      .addCase(fetchGenres.fulfilled, (state, action) => {
        state.status = "succeeded"
        const genres = action.payload
        state.genres = [...genres]
      })
      .addCase(fetchGenres.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message
      })
  }
});

export const selectStatus = (state) => state.shows.status;
export const selectError = (state) => state.shows.error;
export const selectAllShows = (state) => state.shows.shows;
export const selectGenres = (state) => state.shows.genres;
export const selectShowById = (state, showId) => state.shows.shows.find((show) =>  show.id === showId)
export const { sortShows } = showsSlice.actions;
export default showsSlice.reducer;
