import { useSelector, useDispatch } from "react-redux";
import {
  selectAllShows,
  fetchShows,
  selectStatus,
  selectError,
} from "./showsSlice";
import { useEffect } from "react";
import Spinner from "../../components/Spinner";
import ShowCard from "../../components/ContentCard";

const TvShows = () => {
  const shows = useSelector(selectAllShows);
  const dispatch = useDispatch();
  const showStatus = useSelector(selectStatus);
  const showError = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchShows());
  }, []);

  const content = shows.map((show) => <ShowCard key={show.id} movie={show} />);

  return (
    <section className="mt-10 pb-10 ">
      <h1 className="text-xl md:text-4xl lg:text-5xl font-bold text-center">
        All Tv Shows
      </h1>
      <div className="container m-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6 md:mt-8 lg:mt-10 px-2 md:px-6 lg:px-8">
        {showStatus === "loading" && (
          <Spinner text="Loading" loading={showStatus} />
        )}
        {showStatus === "succeeded" && content}
        {showStatus === "failed" && (
          <p className="text-xl text-center">Unable to find shows</p>
        )}
      </div>
    </section>
  );
};

export default TvShows;
