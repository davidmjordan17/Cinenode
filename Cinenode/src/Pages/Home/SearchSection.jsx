import { useState } from "react";

const SearchSection = () => {

  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    if (!searchTerm) return;

    const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(searchTerm)}&include_adult=false&language=en-US&page=1`;

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_BEARER_TOKEN}` // use your env variable
      }
    };

    try {
      const res = await fetch(url, options);
      if (!res.ok) throw new Error(`Error: ${res.status}`);
      const data = await res.json();
      setResults(data.results); // array of movies
    } catch (err) {
      console.error("Fetch failed:", err);
    }
  };

  return (
    <>

      {/* Search Section Container */}
      <div className="flex flex-col w-full items-center p-5">
        
        {/* Search Header */}
        <h2 className="text-xl md:text-3xl font-bold text-white mb-4 search-header">Choose Your Starting Movie</h2>
        
        {/* Search Input Field */}
        <div className="flex p-2 gap-1 md:justify-center md:gap-5 items-center w-full">

          <input 
          type="text" 
          placeholder="Ex: Interstellar..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-2 bg-white w-full p-3 text-md md:w-5/7 md:p-5 md:text-xl text-black rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-200 transition duration-300 search-movie"
          aria-label="Search for movies
          "/>
          
          <button className="p-2 bg-white text-sm rounded-4xl md:text-2xl md:p-3 hover:cursor-pointer search-btn" onClick={handleSearch}>
            Search
          </button>

        </div>

        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 mt-2">
        {results.map((movie) => (
          <div key={movie.id} className="flex flex-col items-center justify-center text-center 
          p-2 mb-1 bg-gray-800 rounded-lg shadow-lg md:p-5 hover:shadow-xl transition-all duration-300 hover:scale-105 hover:cursor-pointer">
            <img 
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
              alt={movie.title} 
              className="w-full h-auto rounded-lg mb-2"
            />
            <h3 className="text-sm md:text-xl text-white font-bold search-results">{movie.title}</h3>
          </div>
        ))}
      </div>

      </div>
    </>
  );
};

export default SearchSection;