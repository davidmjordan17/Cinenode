import React, { useEffect, useState } from 'react';
import { useMovieContext } from '../../App';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const GameStartedPage = () => {
  const navigate = useNavigate();
  const { startMovie, endMovie, setStartMovie, setEndMovie } = useMovieContext();
  const [currentMovie, setCurrentMovie] = useState(startMovie);
  const [cast, setCast] = useState([]);
  const [selectedActor, setSelectedActor] = useState(null);
  const [actorMovies, setActorMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [steps, setSteps] = useState(0);
  const [actorMoviesPage, setActorMoviesPage] = useState(0);
  const [gameFinished, setGameFinished] = useState(false);
  const moviesPerPage = 12;

  // Redirect if movies are not selected
  useEffect(() => {
    if (!startMovie || !endMovie) {
      navigate('/');
    }
  }, [startMovie, endMovie, navigate]);

  // Fetch cast for the current movie
  useEffect(() => {
    if (!currentMovie) return;

    const fetchCast = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:5000/api/movie-credits?movieId=${currentMovie.id}`);
        if (!res.ok) throw new Error(`Error: ${res.status}`);
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
      try {
        const res = await fetch(`http://localhost:5000/api/person-movie-credits?personId=${selectedActor.id}`);
        if (!res.ok) throw new Error(`Error: ${res.status}`);
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

  const handleRestart = () => {
    setCurrentMovie(startMovie);
    setCast([]);
    setSelectedActor(null);
    setActorMovies([]);
    setLoading(true);
    setActorMoviesPage(0);
    setGameFinished(false);
  };

  if (!startMovie || !endMovie) {
    return <div>Please select both a start and end movie before starting the game.</div>;
  }

  return (
    <>
      <div className='flex flex-col min-h-screen items-center justify-center w-full home-page p-5 sm:px-20 md:px-30 xl:px-50'>
        <div className='w-full max-w-6xl flex flex-col items-center justify-center md:mt-30'>
          <h1 className='text-5xl md:-mt-50 lg:-mt-55 md:text-6xl lg:text-9xl text-white'>{steps}</h1>
        </div>

        <div className='flex items-center justify-between w-full max-w-6xl p-10 mt-50 md:mt-60'>
          <img
            src={`https://image.tmdb.org/t/p/w500${currentMovie.poster_path}`}
            alt={currentMovie.title}
            className="w-[100px] md:w-[200px] lg:w-[300px] -mt-60 md:-mt-90 lg:-mt-110 rounded-lg mb-5 animate-pulse transition-all duration-100 shadow-sm ring-2 ring-green-100"
            onClick={() => setStartMovie(null)}
            title="Click to change movie"
          />

          <h1 className="text-white text-xl md:text-7xl -mt-60 md:-mt-90 lg:-mt-110"><ArrowRight /></h1>

          <img
            src={`https://image.tmdb.org/t/p/w500${endMovie.poster_path}`}
            alt={endMovie.title}
            className="w-[100px] md:w-[200px] lg:w-[300px] rounded-lg -mt-60 md:-mt-90 lg:-mt-110 mb-5 shadow-sm"
            title="Click to change movie"
          />
        </div>

        <h2 className="text-2xl md:text-5xl font-bold text-white header-above-cast mb-2 -mt-20 md:-mt-10">
          {selectedActor ? `${selectedActor.name}'s Filmography` : `${currentMovie.title} Cast`}
        </h2>

        <div className='flex flex-col bg-white/5 rounded w-full max-w-6xl p-2 '>
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
                      <ul className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 md:gap-2">
                        {paginatedActorMovies.map((movie) => (
                          <li
                            key={movie.credit_id}
                            className="flex flex-col items-center justify-center hover:scale-105 hover:shadow-2xs hover:cursor-pointer duration-300 transition-all"
                            onClick={() => {
                              if (movie.id === endMovie.id) {
                                setGameFinished(true);
                              } else {
                                setSteps(steps + 1);
                                setCurrentMovie(movie);
                                setSelectedActor(null);
                                setActorMovies([]);
                                setActorMoviesPage(0);
                              }
                            }}
                          >
                            {movie.poster_path && (
                              <img
                                src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`}
                                alt={movie.title}
                                className="w-[100px] md:w-[200px] rounded mt-2"
                              />
                            )}
                            
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
                <ul className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-y-1 md:gap-2">
                  {cast.slice(0, 12).map((actor) => (
                    <li
                      key={actor.cast_id}
                      className="flex items-center justify-center hover:animate-pulse hover:cursor-pointer duration-300 transition-all"
                      onClick={() => {
                        setSelectedActor(actor);
                        setActorMoviesPage(0);
                      }}
                    >
                      {actor.profile_path && (
                        <img
                          src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                          alt={actor.name}
                          className="w-[73px] md:w-[150px] border-2 border-white/30"
                        />
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <div>No cast found.</div>
              )}
            </div>
          </div>
        </div>

        {gameFinished && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-10">
            <div className="flex flex-col items-center justify-center bg-white rounded-2xl shadow-2xl p-10 max-w-md w-full">
              <h2 className="text-2xl md:text-4xl font-bold text-green-600 mb-4">🎉 You Win! 🎉</h2>
              <p className="text-lg md:text-xl text-black mb-2">You took {steps + 1} mov(ies)!</p>
              <img
                src={`https://image.tmdb.org/t/p/w500${endMovie.poster_path}`}
                alt={endMovie.title}
                className="w-[200px] rounded-lg shadow-lg mb-4"
              />
              <button
                className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-500 transition"
                onClick={() => {
                  setStartMovie(null);
                  setEndMovie(null);
                  localStorage.removeItem('startMovie');
                  localStorage.removeItem('endMovie');
                  navigate('/');
                }}
              >
                Play Again
              </button>
            </div>
          </div>
        )}

        {!gameFinished && (
          // Stuck? Restart Button
          <button
            className="mb-4 px-4 py-2 bg-red-500/10 text-white rounded hover:bg-red-400 transition font-bold self-center mt-5"
            onClick={handleRestart}
          >
            Stuck? Restart from Beginning
          </button>
        )}
      </div>
    </>
  );
};

export default GameStartedPage;