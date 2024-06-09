import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"

const initialState = {
  shows: [],
  search: "",
  pages: 0,
  totalResults: 0,
  genres: [],
  status: "idle",
  error: null,
};

/*****************************************FETCH SHOWS ****************************/
const showsURL = `https://api.themoviedb.org/3/discover/tv`;
const searchShowsURL = "https://api.themoviedb.org/3/search/tv";
const showsOptions = {
  method: "GET",
  url: showsURL,
  headers: {
    accept: "application/json",
    Authorization: `${import.meta.env.VITE_REACT_APP_API_KEY}`
  }
};

export const fetchShows = createAsyncThunk("shows/fetchShows", async(body) => {
  if(body) {
    const response = await axios.request({
      method: "GET",
      url: `${searchShowsURL}?query=${body.searchValue}`,
      headers: {
        accept: "application/json",
        Authorization: `${import.meta.env.VITE_REACT_APP_API_KEY}`,
      },
    });
    const data = await response.data;
    const returnedValue = {
      search: body.searchValue,
      shows: data.results,
      responseObject: data
    }
    return returnedValue;
  }else {
    const response = await axios.request(showsOptions)
    const data = await response.data
    return data.results
  }
})


/********************************** FETCH Shows GENRES *****************************/
const movieGenresURL = "https://api.themoviedb.org/3/genre/tv/list"
const genresOptions = {
  method: 'GET',
  url: movieGenresURL,
  headers: {
    accept: 'application/json',
    Authorization: `${import.meta.env.VITE_REACT_APP_API_KEY}`

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
        const shows = action.payload.shows ? action.payload.shows : action.payload
        state.shows = [...shows]

        const title = action.payload.search ? action.payload.search : ""
        state.search = title

        const pages = action.payload.responseObject
          ? action.payload.responseObject.total_pages
          : 0;
        state.pages = pages;

        const total_results = action.payload.responseObject
          ? action.payload.responseObject.total_results
          : 0;
        state.totalResults = total_results;
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
