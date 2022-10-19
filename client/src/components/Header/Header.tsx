import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Header.css';
import MovieType from '../../../../server/src/models/Movie';
import { useNavigate } from 'react-router-dom';

const Header: React.FC<{ movies: MovieType[] }> = ({ movies }) => {
	const [movieModal, setMovieModal] = useState(false);
	const navigate = useNavigate();

	const toggleMovieModal = () => {
		setMovieModal(!movieModal);
	};

	const addNewMovie = async () => {
		const movieName = document.getElementById('movieName') as HTMLInputElement;
		const releaseDate = document.getElementById(
			'releaseDate'
		) as HTMLInputElement;

		if (movieName && releaseDate && movieName.value && releaseDate.value) {
			let tempMovie = {
				Name: movieName.value,
				Release_Date: releaseDate.value,
			};

			toggleMovieModal();
			await axios.post('http://localhost:5000/movie/add', tempMovie);
		}
	};

	const [reviewModal, setReviewModal] = useState(false);

	const toggleReviewModal = () => {
		setReviewModal(!reviewModal);
	};

	const addNewReview = async () => {
		const reviewerName = document.getElementById(
			'reviewerName'
		) as HTMLInputElement;
		const rating = document.getElementById('rating') as HTMLInputElement;
		const reviewComments = document.getElementById(
			'reviewComments'
		) as HTMLInputElement;
		const selectMovie = document.getElementById(
			'selectMovie'
		) as HTMLInputElement;

		if (
			reviewerName &&
			rating &&
			reviewComments &&
			selectMovie &&
			rating.value &&
			reviewComments.value &&
			selectMovie.value &&
			selectMovie.value !== '0'
		) {
			let tempReview = {
				Reviewer_Name: reviewerName.value,
				Rating: rating.value,
				Review_Comments: reviewComments.value,
				Movie_Id: selectMovie.value,
			};

			toggleReviewModal();
			await axios.post('http://localhost:5000/review/add', tempReview);
		}
	};

	useEffect(() => {
		if (reviewModal) {
			var select = document.getElementById('selectMovie')!;

			movies.forEach((movie) => {
				var el = document.createElement('option');
				el.textContent = movie.Name;
				el.value = movie.Id!.toString();
				select.appendChild(el);
			});
		}
	}, [reviewModal, movies]);

	return (
		<div className='header'>
			<h2 onClick={() => navigate('/')}>MOVIECRITIC</h2>
			<div>
				<button onClick={toggleMovieModal}>Add new movie</button>

				{movieModal && (
					<div className='modal'>
						<div onClick={toggleMovieModal} className='overlay'></div>
						<div className='modal-content'>
							<h2>Add new movie</h2>
							<input type='text' id='movieName' placeholder='Name' required />
							<input
								type='date'
								id='releaseDate'
								placeholder='Release date'
								required
							/>
							<button onClick={addNewMovie}>Create movie</button>
						</div>
					</div>
				)}

				<button onClick={toggleReviewModal}>Add new review</button>

				{reviewModal && (
					<div className='modal'>
						<div onClick={toggleReviewModal} className='overlay'></div>
						<div className='modal-content'>
							<h2>Add new review</h2>
							<select id='selectMovie'>
								<option value='0'>Select a movie</option>
							</select>
							<input type='text' id='reviewerName' placeholder='Your Name' />
							<input
								type='number'
								id='rating'
								min='1'
								max='10'
								step='1'
								placeholder='Rating out of 10'
							/>
							<textarea
								rows={4}
								// type='text'
								id='reviewComments'
								placeholder='Review comments'
							/>
							<button onClick={addNewReview}>Add review</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Header;
