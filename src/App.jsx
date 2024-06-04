import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import NotFound from "./pages/NotFound";
import Movies from "./redux/movies/Movies";
import MovieSinglePage from "./redux/movies/MovieSinglePage";
import ShowSinglePage from "./redux/tvshows/ShowSinglePage";
import TvShow from "./redux/tvshows/TvShows";
import Header from "./components/Header";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <>
      <Header />
      <ScrollToTop>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movies/:movieId" element={<MovieSinglePage />} />
          <Route path="/tv-shows/:showId" element={<ShowSinglePage />} />
          <Route path="/tv-shows" element={<TvShow />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ScrollToTop>
    </>
  );
}

export default App;
