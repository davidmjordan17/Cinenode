import React, { useEffect, useState } from 'react';
import { useMovieContext } from '../../App';
import { ArrowRight } from 'lucide-react';

const GameStartedPage = () => {
  const { startMovie, endMovie, setStartMovie } = useMovieContext();
  const [currentMovie, setCurrentMovie] = useState(startMovie);
  const [cast, setCast] = useState([]);
  const [selectedActor, setSelectedActor] = useState(null);
  const [actorMovies, setActorMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [steps, setSteps] = useState(0);
  const [actorMoviesPage, setActorMoviesPage] = useState(0);
  const moviesPerPage = 18;

  // Fetch cast for the current movie
  useEffect(() => {
    if (!currentMovie) return;

    const fetchCast = async () => {
      setLoading(true);
      const url = `https://api.themoviedb.org/3/movie/${currentMovie.id}/credits?language=en-US`;
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
  }, [currentMovie]);

  // Fetch movies for the selected actor
  useEffect(() => {
    if (!selectedActor) return;

    const fetchActorMovies = async () => {
      setLoading(true);
      const url = `https://api.themoviedb.org/3/person/${selectedActor.id}/movie_credits?language=en-US`;
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
        setActorMovies(data.cast || []);
      } catch (err) {
        console.error(err);
        setActorMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchActorMovies();
  }, [selectedActor]);

  const paginatedActorMovies = actorMovies.slice(
    actorMoviesPage * moviesPerPage,
    (actorMoviesPage + 1) * moviesPerPage
  );

  if (!startMovie || !endMovie) {
    return <div>Please select both a start and end movie before starting the game.</div>;
  }

  return (
    <>
      <div className='flex flex-col min-h-screen items-center justify-center w-full home-page p-5 sm:px-20 md:px-30 xl:px-50'>
        <div className='w-full max-w-6xl flex flex-col items-center justify-center'>
          <h1 className='md:-mt-50 lg:-mt-90 text-5xl'>{steps}</h1>
        </div>

        <div className='flex items-center justify-between w-full max-w-6xl p-10 mt-70'>
          <img
            src={`https://image.tmdb.org/t/p/w500${currentMovie.poster_path}`}
            alt={currentMovie.title}
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
          {selectedActor ? `${selectedActor.name}'s Filmography` : `${currentMovie.title} Cast`}
        </h2>

        <div className='flex flex-col gap-2 p-2 bg-white/30 rounded w-full max-w-6xl'>
          <div className="flex flex-col items-center">
            <div className="w-full rounded">
              {loading ? (
                <div>Loading...</div>
              ) : selectedActor ? (
                <>
                  <button
                    className="mb-4 px-4 py-2 bg-yellow-400 text-black rounded hover:bg-yellow-300 transition"
                    onClick={() => {
                      setSelectedActor(null);
                      setActorMovies([]);
                    }}
                  >
                    &larr; Back to Cast
                  </button>
                  {actorMovies.length > 0 ? (
                    <>
                      <ul className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                        {paginatedActorMovies.map((movie) => (
                          <li
                            key={movie.credit_id}
                            className="flex flex-col items-center justify-center hover:scale-105 hover:shadow-2xs hover:cursor-pointer duration-300 transition-all"
                            onClick={() => {
                              setSteps(steps + 1);
                              setCurrentMovie(movie);
                              setSelectedActor(null);
                              setActorMovies([]);
                              setActorMoviesPage(0);
                            }}
                          >
                            {movie.poster_path && (
                              <img
                                src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                                alt={movie.title}
                                className="w-[100px] rounded"
                              />
                            )}
                            <span className='text-black text-sm md:text-md actors-names font-semibold text-center'>{movie.title}</span>
                          </li>
                        ))}
                      </ul>
                      {actorMovies.length > moviesPerPage && (
                        <div className="flex justify-between mt-4">
                          <button
                            className={`px-4 py-2 rounded bg-gray-300 text-black font-semibold transition-all duration-200 ${actorMoviesPage === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-400'}`}
                            onClick={() => setActorMoviesPage(actorMoviesPage - 1)}
                            disabled={actorMoviesPage === 0}
                          >
                            Previous
                          </button>
                          <button
                            className={`px-4 py-2 rounded bg-gray-300 text-black font-semibold transition-all duration-200 ${(actorMoviesPage + 1) * moviesPerPage >= actorMovies.length ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-400'}`}
                            onClick={() => setActorMoviesPage(actorMoviesPage + 1)}
                            disabled={(actorMoviesPage + 1) * moviesPerPage >= actorMovies.length}
                          >
                            Next
                          </button>
                        </div>
                      )}
                    </>
                  ) : (
                    <div>No movies found for this actor.</div>
                  )}
                </>
              ) : cast.length > 0 ? (
                <ul className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                  {cast.slice(0, 12).map((actor) => (
                    <li
                      key={actor.cast_id}
                      className="flex flex-col items-center justify-center hover:scale-105 hover:shadow-2xs hover:cursor-pointer duration-300 transition-all"
                      onClick={() => {
                        setSelectedActor(actor);
                        setActorMoviesPage(0);
                      }}
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