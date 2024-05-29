import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"

const initialState = {
  shows: [],
  status: "idle",
  error: null,
};

/*****************************************FETCH MOVIES ****************************/
const showsURL = `https://api.themoviedb.org/3/discover/tv?${
  import.meta.env.VITE_REACT_APP_API_KEY
}`;
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
export const showsSlice = createSlice({
  name: "shows",
  initialState,
  reducers: {},
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
  }
});

export const selectStatus = (state) => state.shows.status;
export const selectError = (state) => state.shows.error;
export const selectAllShows = (state) => state.shows.shows;

export default showsSlice.reducer;
