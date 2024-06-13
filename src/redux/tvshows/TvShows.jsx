// REACT
import { useEffect } from "react";

//REDUX
import { useSelector, useDispatch } from "react-redux";
import {
  selectAllShows,
  fetchShows,
  selectStatus,
  selectError,
} from "./showsSlice";

//COMPONENTS
import Spinner from "../../components/Spinner";
import ShowCard from "../../components/ContentCard";
import SortBy from "../../components/SortBy";

const TvShows = () => {
  const shows = useSelector(selectAllShows);
  const dispatch = useDispatch();
  const showStatus = useSelector(selectStatus);
  const showError = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchShows());
  }, []);

  const content = shows.map((show) => <ShowCard key={show.id} prop={show} />);

  return (
    <section className="mt-10 pb-10 ">
      <h1 className="text-xl md:text-4xl lg:text-5xl font-bold text-center">
        Popular Tv Shows
      </h1>
      <SortBy source="shows" />
      {showStatus === "loading" && (
        <Spinner text="Loading" loading={showStatus} />
      )}
      <div className="container m-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6 md:mt-8 lg:mt-10 px-2 md:px-6 lg:px-8">
        {showStatus === "succeeded" && content}
        {showStatus === "failed" && (
          <p className="text-xl text-center">Unable to find shows</p>
        )}
      </div>
    </section>
  );
};

export default TvShows;
