import HeaderHome from "./HeaderHome";
import SearchSection from "./SearchSection";

const HomePage = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen bg-blue-100 items-center w-full">

        <div className="flex flex-col items-center w-full min-h-screen max-w-6xl mx-auto p-5 md:p-15 bg-gray-900 bg-opacity-90 rounded-lg shadow-lg">
          
          {/* Header Section */}
          <HeaderHome />

          {/* Seach Section */}
          <SearchSection />
        
        </div>

      </div>
    </>
  );
};

export default HomePage;