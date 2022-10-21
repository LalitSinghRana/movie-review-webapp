import { useState, useEffect } from 'react';
import { HOME_URL } from './constants/server-side';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Home from './components/Home/Home';
import Movie from './components/Movie/Movie';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import MovieType from '../../server/src/models/Movie';

function App() {
	const [movies, setMovies] = useState<MovieType[]>([]);

	const loadData = async () => {
		const response = await axios.get(HOME_URL);
		setMovies(response.data);
	};

	useEffect(() => {
		loadData();
	}, []);

	return (
		<BrowserRouter>
			<div className='App'>
				<Header movies={movies} />
				<Routes>
					<Route path='/' element={<Home movies={movies} />} />
					<Route path='movie/:movieId' element={<Movie />} />
				</Routes>
				<Footer />
			</div>
		</BrowserRouter>
	);
}

export default App;
