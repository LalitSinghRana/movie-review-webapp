import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./Home.css";
import MovieType from '../../../../server/src/models/Movie';

const Home: React.FC<{ movies: MovieType[] }> = ({ movies }) => {
	const [searchTerm, setSearchTerm] = useState('');
	const navigate = useNavigate();

	const handleOnSubmit = (movieId: MovieType['Id']) => {
		navigate(`/movie/${movieId}`);
	};

	return (
		<div className='home'>
			<h2>The best movie reviews site!</h2>
			<input
				type='text'
				placeholder='Search for your favourite movie...'
				onChange={(e) => setSearchTerm(e.target.value)}
			></input>
			<div className='movies-container'>
				{movies
					.filter((movie: MovieType) => {
						if (searchTerm === '') return true;
						else if (
							movie.Name.toLowerCase().includes(searchTerm.toLowerCase())
						)
							return true;
						return false;
					})
					.map((movie: MovieType) => (
						<div
							key={movie.Id}
							className='movie-container'
							onClick={(e) => handleOnSubmit(movie.Id)}
						>
							<h3>{movie.Name}</h3>
							<p>
								<i>Released : {movie.Release_Date}</i>
							</p>
							<p>
								<b>Rating : {movie.Avg_Rating.toFixed(2)}/10</b>
							</p>
						</div>
					))}
			</div>
		</div>
	);
};

export default Home;