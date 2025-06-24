import { useState } from 'react';

const HeaderHome = () => {

  const [isShowing, setShowing] = useState(true);
  
  const showInstructions = () => {
    setShowing(!isShowing);
  };

  return (
    <>
      
      {/* Header Container */}
      <div className="flex items-center justify-center w-full">
        
        {/* Title and Instruction Section */}
        <h1 className="font-bold text-gray-900 cinenode-header
          text-xl md:text-2xl md:-mt-10"
        >
          Cinenode
        </h1>
        <h1 className="absolute right-3 lg:right-8 top-5 text-white text-xl md:text-3xl hover:cursor-pointer hover:text-yellow-500" onClick={showInstructions}>?</h1>
        {<div className={`p-3 instructions text-sm md:text-xl transition duration-300 ease-in-out ${isShowing ? 'opacity-0' : 'opacity-100'} rounded text-center absolute md:right-8 top-15 bg-gray-200/90 p-2 md:p-5`}
        style={{color:"black"}}
        >
          Choose a starting and ending movie. Connect a path using the actors. Use as few moves as possible! *TMDB API may not display the entire cast*
        </div>}

      </div>

    </>
  );
};

export default HeaderHome;