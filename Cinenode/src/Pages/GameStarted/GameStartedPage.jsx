import React, { useEffect, useState } from 'react';
import { useMovieContext } from '../../App';
import { ArrowRight} from 'lucide-react';

const GameStartedPage = () => {
  const { startMovie, endMovie, setStartMovie } = useMovieContext();
  const [cast, setCast] = useState([]);
  const [selectedActor, setSelectedActor] = useState(null);
  const [loading, setLoading] = useState(true);

  const chooseActor = () => {
    setActor(actor);
  }

  useEffect(() => {
    if (!startMovie) return;

    const fetchCast = async () => {
      setLoading(true);
      const url = `https://api.themoviedb.org/3/movie/${startMovie.id}/credits?language=en-US`;
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_BEARER_TOKEN}`
        }
      };

      try {
        const res = await fetch(url, options);
        const data = await res.json();
        setCast(data.cast || []);
      } catch (err) {
        console.error(err);
        setCast([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCast();
  }, [startMovie]);

  if (!startMovie || !endMovie) {
    return <div>Please select both a start and end movie before starting the game.</div>;
  }

  return (
    <>

      <div className='flex flex-col min-h-screen items-center justify-center w-full home-page p-5 md:px-50'>

        <div className='flex items-center justify-between w-full max-w-6xl p-10 mt-50'>
          
          <img
              src={`https://image.tmdb.org/t/p/w500${startMovie.poster_path}`}
              alt={startMovie.title}
              className="w-[100px] md:w-[200px] lg:w-[300px] -mt-60 md:-mt-90 lg:-mt-110 rounded-lg mb-5 animate-pulse transition-all duration-100 shadow-sm ring-2 ring-green-100"
              onClick={() => setStartMovie(null)}
              title="Click to change movie"
          />

          <h1 className="text-black text-xl md:text-7xl -mt-60 md:-mt-90 lg:-mt-110"><ArrowRight /></h1>

           <img
              src={`https://image.tmdb.org/t/p/w500${endMovie.poster_path}`}
              alt={endMovie.title}
              className="w-[100px] md:w-[200px] lg:w-[300px] rounded-lg -mt-60 md:-mt-90 lg:-mt-110 mb-5 shadow-sm"
              title="Click to change movie"
          />
          

        </div>

        <h2 className="text-xl font-bold text-white header-above-cast mb-2">
          {selectedActor ? `${selectedActor.name}'s Filmography` : `${startMovie.title} Cast`}
        </h2>

        <div className='flex flex-col gap-2 p-2 bg-white/30 rounded w-full max-w-6xl'>
          <div className="flex flex-col items-center">
      <div className="w-full rounded">
        {loading ? (
          <div>Loading cast...</div>
        ) : cast.length > 0 ? (
          <ul className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {cast.slice(0, 12).map((actor) => (
              <li key={actor.cast_id} className="flex flex-col items-center justify-center hover:scale-105 
              hover:shadow-2xs hover:cursor-pointer duration-300 transition-all"
              onClick={() => setSelectedActor(actor)}
              >
                {actor.profile_path && (
                  <img
                    src={`https://image.tmdb.org/t/p/w92${actor.profile_path}`}
                    alt={actor.name}
                    className="w-[100px] rounded"
                  />
                )}
                <span className='text-white text-sm md:text-md actors-names font-semibold'>{actor.name}</span>
              </li>
            ))}
          </ul>
        ) : (
          <div>No cast found.</div>
        )}
      </div>
    </div>
        </div>

      </div>
    </>
  );
};

export default GameStartedPage;