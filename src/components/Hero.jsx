// REACT
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

//REDUX
import {
  fetchNowPlayingMovies,
  selectAllNowPlayingMovies,
  selectStatus,
  selectError,
} from "../redux/movies/moviesSlice";

//SWIPER PACKAGE
import { register } from "swiper/element/bundle";
register();

//COMPONENTS
import MovieCard from "./NowPlayingCard";
import Spinner from "./Spinner";

const Hero = () => {
  const dispatch = useDispatch();
  const nowPlayingMovies = useSelector(selectAllNowPlayingMovies);
  const movieStatus = useSelector(selectStatus);
  const movieError = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchNowPlayingMovies());
  }, []);

  const nowPlaying = nowPlayingMovies.map((movie) => (
    <swiper-slide key={movie.id}>
      <MovieCard movie={movie} />
    </swiper-slide>
  ));
  return (
    <section className=" bg-[url('/carousel-2.jpg')] bg-no-repeat bg-cover z-0 min-h-52">
      {movieStatus !== "loading" && movieStatus !== "failed" && (
        <div className="bg-black bg-opacity-80 w-full h-full px-2 md:px-6 lg:px-8 ">
          <h1 className="text-xl md:text-4xl lg:text-5xl font-bold text-center py-4 md:py-8 lg:py-10">
            Now Playing
          </h1>

          <swiper-container
            style={{
              "--swiper-navigation-color": "#fff",
              "--swiper-pagination-color": "#000",
            }}
            scrollbar="true"
            space-between={20}
            speed="500"
            css-mode="true"
            navigation="true"
            pagination="false"
            draggable="true"
            autoplay-delay="3000"
            // height="1184"
            // width="1184"
            //   className="flex pb-4 md:py-6"
            //   autoplay
            breakpoints={JSON.stringify({
              640: {
                slidesPerView: 1,
                // spaceBetween: 10,
              },

              768: {
                slidesPerView: 3,
                // spaceBetween: 10,
              },

              1574: {
                slidesPerView: 5,
                // spaceBetween: 20,
              },
            })}
          >
            {movieStatus === "loading" && (
              <Spinner text="Loading" loading={movieStatus} />
            )}
            {movieStatus === "succeeded" && nowPlaying}
            {movieStatus === "failed" && (
              <p className="text-xl mx-auto">Unable to find movies</p>
            )}
          </swiper-container>
        </div>
      )}
    </section>
  );
};

export default Hero;
