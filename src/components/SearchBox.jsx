//SPEECH RECOGNITION
import Speech from "./SpeechRecognition";

//ICONS
import { FaSearch } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";

const SearchBox = ({
  handleChange,
  searchForm,
  setSearchForm,
  searchMovies,
}) => {
  const handleTranscript = (transcript) => {
    setSearchForm((prevState) => {
      return {
        ...prevState,
        searchValue: transcript
      }
    })
  };

  return (
    <div className="max-w-2xl w-full md:w-[450px] mx-auto px-8 md:px-6 lg:px-8">
      <div className="flex items-center gap-8 justify-center md:justify-start">
        <div className="flex items-center gap-2">
          <label htmlFor="movies" className="text-lg">
            Movies
          </label>
          <input
            type="radio"
            name="type"
            id="movies"
            value="movies"
            onChange={handleChange}
            checked={searchForm.type === "movies"}
            className="mb-2"
          />
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="shows" className="text-lg">
            Shows
          </label>
          <input
            type="radio"
            name="type"
            id="shows"
            value="shows"
            onChange={handleChange}
            checked={searchForm.type === "shows"}
            className="mb-2"
          />
        </div>
      <Speech handleTranscript={handleTranscript} />
      </div>
      <form
        onSubmit={searchMovies}
      >
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <FaSearch
              className={`w-4 h-4  ${
                searchForm.searchValue ? "text-orange-400" : "text-gray-500"
              }`}
            />
          </div>
          <input
            type="search"
            className="w-full p-4 ps-10  border-b-2 outline-none rounded-none  border-transparent border-b-orange-300 bg-black focus:outline-none focus:border-b-orange-400 placeholder-gray-500  focus:text-orange-400 "
            placeholder="Search..."
            name="searchValue"
            value={searchForm.searchValue}
            onChange={handleChange}
          />
          {searchForm.searchValue && (
            <IoMdCloseCircle
              className="absolute cursor-pointer -mt-14 right-4 text-xl text-orange-500 "
              onClick={() => setSearchForm((prev)=>{return{...prev, searchValue: "" }})}
            />
          )}
          <button
            // onClick={searchMovies}
            className="text-white absolute right-2 md:-right-24 bottom-3 md:bottom-[5px] bg-orange-400 hover:bg-orange-700 focus:ring-2 focus:outline-none focus:ring-orange-400 font-semibold rounded-lg text-sm p-2 md:px-4 md:py-3 transition-all duration-500 "
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBox;
