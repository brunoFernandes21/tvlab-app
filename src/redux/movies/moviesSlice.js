import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  movies: [],
  search: "",
  totalResults: 0,
  pages: 0,
  genres: [],
  nowPlayingMovies: [],
  status: "idle",
  error: null,
};

/*****************************************FETCH MOVIES ****************************/

const moviesURL = "https://api.themoviedb.org/3/discover/movie";
const searchMoviesURL = "https://api.themoviedb.org/3/search/movie";
const moviesOptions = {
  method: "GET",
  url: moviesURL,
  headers: {
    accept: "application/json",
    Authorization: `${import.meta.env.VITE_REACT_APP_API_KEY}`,
  },
};

export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async (body) => {
    if (body) {
      const response = await axios.request({
        method: "GET",
        url: `${searchMoviesURL}?query=${body.searchValue}`,
        headers: {
          accept: "application/json",
          Authorization: `${import.meta.env.VITE_REACT_APP_API_KEY}`,
        },
      });
      const data = await response.data;
     
      const returnedValue = {
        search: body.searchValue,
        movies: data.results,
        responseObject: data,
      };
      return returnedValue;
    } else {
      const response = await axios.request(moviesOptions);
      const data = await response.data;
      return data.results;
    }
  }
);

/********************************** FETCH MOVIE GENRES *****************************/

const movieGenresURL =
  "https://api.themoviedb.org/3/genre/movie/list?language=en";
const genresOptions = {
  method: "GET",
  url: movieGenresURL,
  headers: {
    accept: "application/json",
    Authorization: `${import.meta.env.VITE_REACT_APP_API_KEY}`,
  },
};

export const fetchGenres = createAsyncThunk(
  "genres/fetchGenres",
  async (body) => {
    const response = await axios.request(genresOptions);
    const data = await response.data;
    const movieGenres = body.map((id) => {
      const newGenre = data.genres.find((genre) => genre.id === id);
      return newGenre;
    });
    return movieGenres;
  }
);

/********************************** FETCH NOW PLAYING MOVIES *****************************/
const nowPlayingMoviesURL = "https://api.themoviedb.org/3/movie/now_playing?";
const nowPlayingOptions = {
  method: "GET",
  url: nowPlayingMoviesURL,
  headers: {
    accept: "application/json",
    Authorization: `${import.meta.env.VITE_REACT_APP_API_KEY}`,
  },
};

export const fetchNowPlayingMovies = createAsyncThunk(
  "movies/fetchNowPlayingMovies",
  async () => {
    const response = await axios.request(nowPlayingOptions);
    const data = await response.data;
    return data.results;
  }
);

/********************************** FETCH MOVIE SEARCH   *****************************/
// const searchMoviesURL = "https://api.themoviedb.org/3/search/movie";

// export const fetchSearchMovies = createAsyncThunk(
//   "movies/fetchSearchMovies",
//   async (searchValue) => {
//     const response = await axios.request({
//       method: "GET",
//       url: `${searchMoviesURL}?query=${searchValue}`,
//       headers: {
//         accept: "application/json",
//         Authorization: `${import.meta.env.VITE_REACT_APP_API_KEY}`,
//       },
//     });
//     const data = await response.data;
//     return data;
//   }
// );
export const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    sortMovies: (state, action) => {
      const payload = action.payload;
      const sortedMovies = [...state.movies].sort((a, b) => {
        if (payload === "title") {
          return a[payload] > b[payload] ? 0 : -1;
        } else {
          return a[payload] > b[payload] ? -1 : 0;
        }
      });
      return { ...state, movies: sortedMovies };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchMovies.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = "succeeded";

        const movies = action.payload.movies
          ? action.payload.movies
          : action.payload;
        state.movies = [...movies];

        const title = action.payload.search ? action.payload.search : "";
        state.search = title;

        const pages = action.payload.responseObject
          ? action.payload.responseObject.total_pages
          : 0;
        state.pages = pages;

        const total_results = action.payload.responseObject
          ? action.payload.responseObject.total_results
          : 0;
        state.totalResults = total_results;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchGenres.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchGenres.fulfilled, (state, action) => {
        state.status = "succeeded";
        const genres = action.payload;
        state.genres = [...genres];
      })
      .addCase(fetchGenres.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchNowPlayingMovies.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchNowPlayingMovies.fulfilled, (state, action) => {
        state.status = "succeeded";
        const nowPlaying = action.payload;
        state.nowPlayingMovies = [...nowPlaying];
      })
      .addCase(fetchNowPlayingMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectStatus = (state) => state.movies.status;
export const selectError = (state) => state.movies.error;
export const selectAllMovies = (state) => state.movies.movies;
export const selectPages = (state) => state.movies.pages;
export const selectTotalResults = (state) => state.movies.totalResults;
export const selectSearchValue = (state) => state.movies.search;
export const selectGenres = (state) => state.movies.genres;
export const selectAllNowPlayingMovies = (state) =>
  state.movies.nowPlayingMovies;
export const selectMovieById = (state, movieId) =>
  state.movies.movies.find((movie) => movie.id === movieId);
export const selectNowPlayingMovieById = (state, movieId) =>
  state.movies.nowPlayingMovies.find((movie) => movie.id === movieId);
export const { sortMovies } = moviesSlice.actions;

export default moviesSlice.reducer;
