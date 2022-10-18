import { RequestHandler } from 'express';
import MovieChannel from '../Channels/MovieChannels';
import ReviewChannel from '../Channels/ReviewChannel';

const movieChannelInstance = new MovieChannel();
const reviewChannelInstance = new ReviewChannel();

export const getAllMovies: RequestHandler = async (req, res) => {
  const data = await movieChannelInstance.getAllMovies();
	res.json(data);
};

export const getMovieAndItsReviews: RequestHandler = async (req, res) => {
  try {
    const movieId = parseInt(req.params.movieId, 10);
    const isValidMovieId = await movieChannelInstance.isValidMovieId(movieId);

    if (!isValidMovieId) throw new Error(`Invalid movie id`);

    const movieData = await movieChannelInstance.getAMovie(movieId);
    const reviewData = await reviewChannelInstance.getAllReviewsForAMovie(movieId);
    
    res.status(200).json({
			movieData,
			reviewData,
		});
  } catch (err: unknown) {
    console.error(err);
    res.status(404).json({ message: `Invalid movie id` });
  }
};

export const postMovie: RequestHandler = async (req, res) => {
  await movieChannelInstance.addANewMovie(req.body);
  res.status(200).json({ message: `Added new movied to DB` });
}

export const deleteMovie: RequestHandler = async (req, res) => {
  try {
		const movieId = parseInt(req.params.movieId, 10);
		const isValidMovieId = await movieChannelInstance.isValidMovieId(movieId);

		if (!isValidMovieId) throw new Error(`Invalid movie id`);
    
		await reviewChannelInstance.deleteReviewsForMovie(movieId);
		await movieChannelInstance.deleteMovie(movieId);
		res.status(200).json({ message: `Deleted movie and it's related reviews` });
	} catch (err: unknown) {
		console.error(err);
		res.status(404).json({ message: `Invalid movie id` });
	}
};