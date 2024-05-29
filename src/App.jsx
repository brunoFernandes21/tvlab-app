import Header from "./components/Header"
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import NotFound from "./pages/NotFound";
import Movies from "./redux/movies/Movies";
import MovieSinglePage from "./redux/movies/MovieSinglePage";

function App() {

  return (
    <>
    <Header/>
    <Routes>
      <Route path="/" element={<Homepage/>}/>
      <Route path="/movies" element={<Movies/>}/>
      <Route path="/movies/:jobId" element={<MovieSinglePage/>}/>
      <Route path="*" element={<NotFound/>}/>

    </Routes>

    </>
  )
}

export default App
