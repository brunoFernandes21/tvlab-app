import { FaSearch, FaFilter } from "react-icons/fa";

const SearchBox = ({ handleChange, searchForm, searchMovies }) => {
  return (
    <>
      <form
        className="max-w-2xl w-full md:w-[450px] mx-auto px-2 md:px-6 lg:px-8"
        onSubmit={searchMovies}
      >
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <label htmlFor="movies" className="text-lg">Movies</label>
            <input type="radio" name="type" id="movies" value="movies" onChange={handleChange} checked={searchForm.type === "movies"} className="mb-2"/>
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="shows" className="text-lg">Shows</label>
            <input type="radio" name="type" id="shows" value="shows" onChange={handleChange} checked={searchForm.type === "shows"}  className="mb-2"/>
          </div>
        </div>
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
          <button
            type="submit"
            className="text-white absolute right-2 md:-right-24 bottom-3 md:bottom-[5px] bg-orange-400 hover:bg-orange-700 focus:ring-2 focus:outline-none focus:ring-orange-400 font-semibold rounded-lg text-sm p-2 md:px-4 md:py-3 transition-all duration-500 "
          >
            Search
          </button>
        </div>
      </form>
    </>
  );
};

export default SearchBox;
