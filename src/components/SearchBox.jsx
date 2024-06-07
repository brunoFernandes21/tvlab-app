import { FaSearch, FaFilter  } from "react-icons/fa";

const SearchBox = ({ handleChange, searchValue }) => {
    

  return (
    <>
      <form
        className="max-w-2xl w-full md:w-[450px] mx-auto px-2 md:px-6 lg:px-8"
      >
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <FaSearch  className={`w-4 h-4  ${searchValue ? "text-orange-400" : "text-gray-500"}`} />
          </div>
          <input
            type="search"
            className="w-full p-4 ps-10  border-b-2 outline-none rounded-none  border-transparent border-b-orange-300 bg-black focus:outline-none focus:border-b-orange-400 placeholder-gray-500  focus:text-orange-400 "
            placeholder="Filter movies by keyword"
            value={searchValue}
            onChange={handleChange}
          />
          {/* {searchValue && (
            <IoMdCloseCircle
              className="absolute cursor-pointer -mt-10 right-28 text-xl"
              onClick={() => setSearchValue("")}
            />
          )} */}
        </div>
      </form>
    </>
  );
};

export default SearchBox;
