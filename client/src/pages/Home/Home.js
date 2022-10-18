import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./Home.css";

const Home = ({ movies }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleOnSubmit = (movieId) => {
    navigate(`/movie/${movieId}`);
  };
  
  return (
    <div className="home">
      <h2>The best movie reviews site!</h2>
      <input type="text" placeholder="Search for your favourite movie..." onChange={e => setSearchTerm(e.target.value)}></input>
      <div className="movies-container">
        {
          movies
            .filter(movie => {
              if (searchTerm === "") return movie;
              else if (movie.Name.toLowerCase().includes(searchTerm.toLowerCase())) return movie;
            })
            .map(movie => (
              <div key={movie.Id} className="movie-container" onClick={e => handleOnSubmit(movie.Id)}>
                <h3>{movie.Name}</h3>
                <p><i>Released : {movie.Release_Date}</i></p>
                <p><b>Rating : {movie.Avg_Rating}/10</b></p>
              </div>
            ))
        }
      </div>
    </div>
  );
}

export default Home;