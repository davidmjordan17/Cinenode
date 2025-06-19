import { useMovieContext } from '../../App';
import HeaderHome from '../Home/HeaderHome';

const GameStartedPage = () => {
  const { startMovie, endMovie } = useMovieContext();

  if (!startMovie || !endMovie) {
    return <div>Please select both a start and end movie before starting the game.</div>;
  }

  return (
    <>

      <div className='flex flex-col min-h-screen items-center justify-center w-full home-page'>

        <div className='flex flex-col items-center w-full max-w-6xl p-10'>
          
          <img
              src={`https://image.tmdb.org/t/p/w500${startMovie.poster_path}`}
              alt={startMovie.title}
              className="w-[100px] md:w-[200px] lg:w-[300px] rounded-lg -mt-60 md:-mt-90 lg:-mt-110 mb-5 shadow-sm"
              title="Click to change movie"
          />

          <div className='flex flex-col gap-2 p-2 md:p-20 bg-white/30 rounded w-full'>

          </div>

        </div>
      </div>
    </>
  );
};

export default GameStartedPage;