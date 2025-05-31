const SearchResultCard = () => {


  const getMovie = () => {
    console.log("Movie button clicked");
  };
  
  return (
    <>
      <button onClick={getMovie} className="bg-white p-5 rounded-xl text-2xl">Movie Test</button>
    </>
  );
};

export default SearchResultCard;