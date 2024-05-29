import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "../redux/movies/moviesSlice"
import showsReducer from "../redux/tvshows/showsSlice"

export default configureStore({
    reducer: {
        movies: moviesReducer,
        shows: showsReducer
    }
})