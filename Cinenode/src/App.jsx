import React, { createContext, useContext, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './Pages/Home/HomePage';
import GameStartedPage from './Pages/GameStarted/GameStartedPage';
// Import other pages as needed

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
  const [startMovie, setStartMovie] = useState(() => {
    const saved = localStorage.getItem('startMovie');
    return saved ? JSON.parse(saved) : null;
  });
  const [endMovie, setEndMovie] = useState(() => {
    const saved = localStorage.getItem('endMovie');
    return saved ? JSON.parse(saved) : null;
  });

  // Save to localStorage when changed
  const saveStartMovie = (movie) => {
    setStartMovie(movie);
    localStorage.setItem('startMovie', JSON.stringify(movie));
  };
  const saveEndMovie = (movie) => {
    setEndMovie(movie);
    localStorage.setItem('endMovie', JSON.stringify(movie));
  };

  return (
    <MovieContext.Provider value={{
      startMovie,
      setStartMovie,
      saveStartMovie,
      endMovie,
      setEndMovie,
      saveEndMovie
    }}>
      {children}
    </MovieContext.Provider>
  );
};

function App() {
  return (
    <MovieProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/GameStarted" element={<GameStartedPage/>} />
        </Routes>
      </BrowserRouter>
    </MovieProvider>
  );
}

export default App;
