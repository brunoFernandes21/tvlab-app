import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import NotFound from "./pages/NotFound";
import Movies from "./redux/movies/Movies";
import MovieSinglePage from "./redux/movies/MovieSinglePage";
import ShowSinglePage from "./redux/tvshows/ShowSinglePage";
import TvShow from "./redux/tvshows/TvShows";
import Header from "./components/Header";
import ScrollToTop from "./components/ScrollToTop";
import LandingPage from "./pages/LandingPage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { useState } from "react";
import { auth } from "./firebase/firebase.js";
import { signOut } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { ProtectedRoutes } from "../src/ProtectedRoutes";
import { UnProtectedRoutes } from "../src/UnprotectedRoutes";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [userName, setUserName] = useState(null);

  const logout = async () => {
    await signOut(auth);
    setCurrentUser(null);
    setUserName(null);
  };

  return (
    <>
      <Header username={userName} currentUser={currentUser} logout={logout} />
      <ScrollToTop>
        <Routes>
          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoutes user={currentUser}>
                <Homepage currentUser={currentUser} />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/movies"
            element={
              <ProtectedRoutes user={currentUser}>
                <Movies />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/movies/:movieId"
            element={
              <ProtectedRoutes user={currentUser}>
                <MovieSinglePage />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/tv-shows/:showId"
            element={
              <ProtectedRoutes user={currentUser}>
                <ShowSinglePage />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/tv-shows"
            element={
              <ProtectedRoutes user={currentUser}>
                <TvShow />
              </ProtectedRoutes>
            }
          />

          {/* Unprotected Routes */}
          <Route
            path="/landing-page"
            element={
              <UnProtectedRoutes user={currentUser}>
                <LandingPage />
              </UnProtectedRoutes>
            }
          />
          <Route
            path="/register"
            element={
              <UnProtectedRoutes user={currentUser}>
                <Register
                  setCurrentUser={setCurrentUser}
                  setUserName={setUserName}
                />
              </UnProtectedRoutes>
            }
          />
          <Route
            path="/login"
            element={
              <UnProtectedRoutes>
                <Login
                  setUserName={setUserName}
                  setCurrentUser={setCurrentUser}
                />
              </UnProtectedRoutes>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </ScrollToTop>
    </>
  );
}

export default App;
