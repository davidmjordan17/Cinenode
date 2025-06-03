import {useState} from 'react';

const MovieChoiceSection = () => {
  
  const [startMovie, setStartMovie] = useState(true);
  const [endMovie, setEndMovie] = useState(false);

  const chooseStartMovie = () => {
    setStartMovie(!startMovie);
  }

  return (
    <>
      <div className="flex flex-col gap-2 p-5 md:p-20 bg-white/30 rounded">

        <div className="flex gap-8 md:gap-15 items-center">
          
          <div className="flex flex-col text-center">
            <button className="text-black bg-gray-50 p-10 md:p-35 text-4xl md:text-7xl 
            rounded mb-2 md:mb-4 hover:cursor-pointer hover:scale-105 transition-all duration-300 shadow-sm hover:shadow-lg" onClick={chooseStartMovie}>
              +
            </button>
            <h1 className="text-white text-xl md:text-2xl start-movie">Start</h1>
          </div>

            <h1 className="text-black text-xl md:text-4xl">{`->`}</h1>
          
          <div className="flex flex-col text-center">
            <button className="text-black bg-gray-50 p-10 md:p-35 text-4xl md:text-7xl 
            rounded mb-2 md:mb-4 hover:cursor-pointer hover:scale-105 transition-all duration-300 shadow-sm hover:shadow-lg">
              +
            </button>
            <h1 className="text-white text-xl md:text-2xl start-movie">End</h1>
          </div>

        </div>
      </div>
    </>
  );
};

export default MovieChoiceSection;