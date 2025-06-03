import {useState} from 'react';
import { ArrowRight } from 'lucide-react';

const MovieChoiceSection = () => {
  
  const [startMovie, setStartMovie] = useState(true);
  const [endMovie, setEndMovie] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(0); // <-- Add page state

  const chooseStartMovie = () => {
    setStartMovie(!startMovie);
  }

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
      setPage(0); // Reset to first page on new search
    } catch (err) {
      console.error("Fetch failed:", err);
    }
  };

  // Pagination logic
  const resultsPerPage = 6;
  const startIdx = page * resultsPerPage;
  const endIdx = startIdx + resultsPerPage;
  const paginatedResults = results.slice(startIdx, endIdx);

  const hasPrev = page > 0;
  const hasNext = endIdx < results.length;

  return (
    <>
      <div className="flex flex-col gap-2 p-5 md:p-20 bg-white/30 rounded">

        <div className="flex gap-8 md:gap-15 items-center">
          
          <div className="flex flex-col text-center">
            <button className="text-black bg-gray-50 p-10 md:p-35 text-4xl md:text-7xl 
            rounded mb-2 md:mb-4 hover:cursor-pointer hover:scale-105 
            transition-all duration-300 shadow-sm hover:shadow-lg active:bg-white/50" onClick={chooseStartMovie}>
              +
            </button>
            <h1 className="text-white text-xl md:text-2xl start-movie">Start</h1>
          </div>

            <h1 className="text-black text-xl md:text-4xl"><ArrowRight /></h1>
          
          <div className="flex flex-col text-center">
            <button className="text-black bg-gray-50 p-10 md:p-35 text-4xl md:text-7xl 
            rounded mb-2 md:mb-4 hover:cursor-pointer hover:scale-105 
            transition-all duration-300 shadow-sm hover:shadow-lg active:bg-white/50" onClick={chooseStartMovie}>
              +
            </button>
            <h1 className="text-white text-xl md:text-2xl start-movie">End</h1>
          </div>

        </div>
      
      </div >

      <div className={`flex flex-col bg-black/50 absolute top-65 md:top-75 p-4 md:p-10 
        rounded w-xs md:w-2xl backdrop-blur-3xl ${startMovie ? 'opacity-0 invisble' : 'opacity-100 visible'} transition-all duration-300`}>
        
        <div className='flex gap-10 items-center justify-center'>
          <input 
            type="text" 
            placeholder="Ex: Interstellar..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-2 bg-white w-full p-3 text-md md:w-7/9 md:p-5 md:text-xl text-black rounded-lg shadow-md focus:outline-none transition duration-300 search-movie"
            aria-label="Search for movies
            "/>
          <button className="p-2 bg-white text-sm rounded-lg md:text-lg md:p-3 hover:cursor-pointer search-btn transition-all duration-300 hover:bg-green-300" onClick={handleSearch}>
            Search
          </button>

        </div>

        <div className='w-full grid grid-cols-3 md:grid-cols-3 gap-2 md:gap-4 mt-2'>
          {paginatedResults.map((movie) => (
          <div key={movie.id} className="flex flex-col items-center justify-center text-center 
           mb-1 rounded-lg transition-all duration-300 hover:scale-105 hover:cursor-pointer">
            <img 
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
              alt={movie.title} 
              className="w-[80px] h-[120px] md:w-full md:h-auto rounded-lg mb-2"
            />
            {/* <h3 className="text-xs md:text-lg text-white font-semibold search-results">{movie.title}</h3> */}
          </div>
        ))}
        </div>

        {/* Pagination Buttons */}
        {results.length > resultsPerPage && (
          <div className="flex justify-between mt-4">
            <button
              className={`px-4 py-2 rounded bg-gray-300 text-black font-semibold transition-all duration-200 ${!hasPrev ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-400'}`}
              onClick={() => setPage(page - 1)}
              disabled={!hasPrev}
            >
              Previous
            </button>
            <button
              className={`px-4 py-2 rounded bg-gray-300 text-black font-semibold transition-all duration-200 ${!hasNext ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-400'}`}
              onClick={() => setPage(page + 1)}
              disabled={!hasNext}
            >
              Next
            </button>
          </div>
        )}

      </div>

    </>
  );
};

export default MovieChoiceSection;