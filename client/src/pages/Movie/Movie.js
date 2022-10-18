import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Movie.css";
import axios from "axios";

const URL = "http://localhost:5000/movie/";

const Home = () => {
  const [movie, setMovie] = useState([]);
  const [reviews, setReviews] = useState([]);
  let { movieId } = useParams();

  const loadData = async () => {
    const response = await axios.get(URL + movieId);
    setMovie(response.data.movieData);
    setReviews(response.data.reviewData);
  }

  useEffect(() => { loadData(); }, []);

  return (
    <div className="movie">
      <div className="movie-data-container">
        <p>{movie.Name}</p>
        <p>{ movie.Avg_Rating }/10</p>
      </div>
      <div className="reviews-container">
        {
          reviews
            .map(review => (
              <div key={review.Id} className="review-container">
                <div>
                  <p>{review.Review_Comments}</p>
                  <p><i>By {review.Reviewer_Name}</i></p>
                </div>
                <p><b>{review.Rating}/10</b></p>
              </div>
            ))
        }
      </div>
    </div>
  );
}

export default Home;