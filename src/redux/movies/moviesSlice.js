import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const initialState = {
    movies: [{"id": "1", title: "Batman", description: "Great action movie"}, {"id": "2", title: "Avengers", description: "One of the best all of time"}, {"id": "3", title: "Avengers", description: "One of the best all of time"}, {"id": "4", title: "Avengers", description: "One of the best all of time"}],
    popularMovies: [{"id": "1", title: "Spiderman3", description: "Embark on an amazing adventure"}, {"id": "2", title: "Hulk", description: "Embark on an amazing adventure"}, {"id": "3", title: "Hulk", description: "Embark on an amazing adventure"}, {"id": "4", title: "Hulk", description: "Embark on an amazing adventure"}],
    status: "idle",
    error: null
}


// const apiUrl = "/api/..."


export const moviesSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {

    }
})

export const selectStatus = (state) => state.movies.status;
export const selectError = (state) => state.movies.error;
export const selectAllMovies = (state) => state.movies.movies;
export const selectAllPopularMovies = (state) => state.movies.popularMovies;
// export const { } = jobsSlice.actions;

export default moviesSlice.reducer;