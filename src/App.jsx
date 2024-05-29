import Header from "./components/Header"
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import NotFound from "./pages/NotFound";
import Movies from "./redux/movies/Movies";
import TvShow from "./redux/tvshows/TvShows"
function App() {

  return (
    <>
    <Header/>
    <Routes>
      <Route path="/" element={<Homepage/>}/>
      <Route path="/movies" element={<Movies/>}/>
      <Route path="/tv-shows" element={<TvShow/>}/>
      <Route path="*" element={<NotFound/>}/>

    </Routes>

    </>
  )
}

export default App
