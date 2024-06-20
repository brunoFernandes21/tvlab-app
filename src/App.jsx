// REACT
import { useEffect, useState } from "react";

// REACT ROUTER
import { Routes, Route, useNavigate } from "react-router-dom";

// REDUX
import Movies from "./features/movies/Movies";
import MovieSinglePage from "./features/movies/MovieSinglePage";
import ShowSinglePage from "./features/tvshows/ShowSinglePage";
import TvShow from "./features/tvshows/TvShows";

//FIREBASE
import { auth } from "./firebase/firebase.js";
import { signOut } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";

// COMPONENTS
import { ProtectedRoutes } from "../src/ProtectedRoutes";
import { UnProtectedRoutes } from "../src/UnprotectedRoutes";
import Header from "./components/Header";
import ScrollToTop from "./components/ScrollToTop";
import MobileNavigation from "./components/MobileNavigation.jsx";
import Background from "./components/Background.jsx";

// PAGES
import Homepage from "./pages/Homepage";
import NotFound from "./pages/NotFound";
import LandingPage from "./pages/LandingPage";
import Register from "./pages/Register";
import Login from "./pages/Login";

//EXTERNAL PACKAGES
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Favourites from "./pages/Favourites.jsx";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [showNav, setShowNav] = useState(false);
  const navigate = useNavigate();

  //prevent user from logging out after page refresh
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setCurrentUser(currentUser);
      } else {
        setCurrentUser(null);
      }
    });
    return unsubscribe;
  }, [currentUser]);

  const logout = async () => {
    await signOut(auth);
    navigate("/login");
    setCurrentUser(null);
  };

  return (
    <div className={`${showNav ? "show__nav" : ""} app`}>
      <Background showNav={showNav} />
      <Header
        currentUser={currentUser}
        logout={logout}
        setShowNav={setShowNav}
      />
      {showNav && (
        <MobileNavigation
          currentUser={currentUser}
          showNav={showNav}
          setShowNav={setShowNav}
          logout={logout}
        />
      )}
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
          <Route
            path="/favourites"
            element={
              <ProtectedRoutes user={currentUser}>
                <Favourites />
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
                <Register setCurrentUser={setCurrentUser} />
              </UnProtectedRoutes>
            }
          />
          <Route
            path="/login"
            element={
              <UnProtectedRoutes>
                <Login setCurrentUser={setCurrentUser} />
              </UnProtectedRoutes>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </ScrollToTop>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rejected
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition:Bounce
      />
    </div>
  );
}

export default App;
