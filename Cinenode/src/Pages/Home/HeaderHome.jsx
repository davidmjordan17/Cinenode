const HeaderHome = () => {
  return (
    <>
      
      {/* Header Container */}
      <div className="flex flex-col items-center w-full p-2">
        
        {/* Title and Instruction Section */}
        <h1 className="font-bold text-gray-900 py-10 cinenode-header
          text-5xl md:text-7xl"
        >
          Cinenode
        </h1>
        <p className="text-white text-sm md:text-4xl mb-5 text-center header-text">
          Choose a starting and an ending movie, and connect them through a series of movies that share actors.
        </p>

      </div>

    </>
  );
};

export default HeaderHome;