import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Header.css";
import 'react-dropdown/style.css';

const Header = ({movies}) => {
  const [movieModal, setMovieModal] = useState(false);

  const toggleMovieModal = () => {
    setMovieModal(!movieModal);
  };

  const addNewMovie = async () => {
    let tempMovie = {
      "Name": document.getElementById("movieName").value,
      "Release_Date": document.getElementById("releaseDate").value,
    };

    toggleMovieModal();
    await axios.post("http://localhost:5000/movie/add", tempMovie);
  };

  const [reviewModal, setReviewModal] = useState(false);

  const toggleReviewModal = () => {
    setReviewModal(!reviewModal);
  };

  const addNewReview = async () => {
    let tempReview = {
      "Reviewer_Name": document.getElementById("reviewerName").value,
      "Rating": document.getElementById("rating").value,
      "Review_Comments": document.getElementById("reviewComments").value,
      "Movie_Id": document.getElementById("selectMovie").value
    };

    toggleReviewModal();
    await axios.post("http://localhost:5000/review/add", tempReview);
  };

  const selectHandler = () => {
    console.log(document.getElementById("selectMovie").value);
  };

  useEffect(() => {
    if (reviewModal) {
      var select = document.getElementById("selectMovie");

      movies.forEach(x => {
        var el = document.createElement("option");
        el.textContent = x.Name;
        el.value = x.Id;
        select.appendChild(el);
      });
    }
  }, [reviewModal, movies]);

  return (
    <div className="header">
      <h2>MOVIECRITIC</h2>
      <div>
        <button onClick={toggleMovieModal}>Add new movie</button>

        {movieModal && (
          <div className="modal">
            <div onClick={toggleMovieModal} className="overlay"></div>
            <div className="modal-content">
              <h2>Add new movie</h2>
              <input type="text" id="movieName" placeholder="Name" />
              <input type="date" id="releaseDate" placeholder="Release date" />
              <button onClick={addNewMovie} >Create movie</button>
            </div>
          </div>
        )}

        <button onClick={toggleReviewModal}>Add new review</button>

        {reviewModal && (
          <div className="modal">
            <div onClick={toggleReviewModal} className="overlay"></div>
            <div className="modal-content">
              <h2>Add new review</h2>
              <select id="selectMovie">
                <option value="0">Select a movie</option>
              </select>
              <input type="text" id="reviewerName" placeholder="Your Name" />
              <input type="number" id="rating" min="1" max="10" step="1" placeholder="Rating out of 10" />
              <textarea type="text" id="reviewComments" placeholder="Review comments" />
              <button onClick={addNewReview}>Add review</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;