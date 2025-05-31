import SearchResultCard from "../../Components/Movies/SearchResultCard";

const SearchSection = () => {
  return (
    <>

      {/* Search Section Container */}
      <div className="flex flex-col w-full items-center mt-10 p-5">
        
        {/* Search Header */}
        <h2 className="text-xl md:text-3xl font-bold text-white mb-4 search-header">Search for Movies</h2>
        
        {/* Search Input Field */}
        <input type="text" placeholder="Ex: Interstellar..." 
        className="bg-white w-full p-3 text-md md:w-5/7 md:p-5 md:text-xl text-black rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-200 transition duration-300"
        aria-label="Search for movies
        "/>
        
        {/* Search Results */}
        <div className="flex flex-col items-center mt-5">
          <SearchResultCard />
        </div>

      </div>
    </>
  );
};

export default SearchSection;