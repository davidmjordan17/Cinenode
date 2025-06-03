import HeaderHome from "./HeaderHome";
import MovieChoiceSection from "./MovieChoiceSection";
import SearchSection from "./SearchSection";

const HomePage = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen items-center w-full home-page">

        <div className="flex flex-col items-center w-full min-h-screen max-w-6xl mx-auto p-5 md:p-15 rounded-lg">
          
          {/* Header Section */}
          <HeaderHome />

          <div className="flex items-center justify-center w-full max-w-6xl min-h-svh">
          {/* Seach Section 
          <SearchSection />*/}
            <MovieChoiceSection />
          </div>
        
        </div>

      </div>
    </>
  );
};

export default HomePage;