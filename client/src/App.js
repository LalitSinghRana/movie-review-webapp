import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Home from "./pages/Home/Home"
import Movie from "./pages/Movie/Movie"
import Header from "./pages/Header/Header"
import Footer from "./pages/Footer/Footer"

function App() {
  const [movies, setMovies] = useState([]);

  const loadData = async () => {
    const response = await axios.get("http://localhost:5000/movie");
    setMovies(response.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Header movies={movies} />
        <Routes>
          <Route path="/" element={<Home movies={movies} />} />
          <Route path="movie/:movieId" element={<Movie />} />

        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
