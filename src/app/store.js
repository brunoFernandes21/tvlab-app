import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "../features/movies/moviesSlice"
import showsReducer from "../features/tvshows/showsSlice"

export default configureStore({
    reducer: {
        movies: moviesReducer,
        shows: showsReducer
    }
})