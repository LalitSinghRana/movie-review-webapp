import { RequestHandler } from 'express';
import MovieChannel from '../Channels/MovieChannels';
import ReviewChannel from '../Channels/ReviewChannel';

const movieChannelInstance = new MovieChannel();
const reviewChannelInstance = new ReviewChannel();

export const postReview: RequestHandler = async (req, res) => {
  try {
		const movieId = parseInt(req.body.Movie_Id, 10);
		const rating = parseInt(req.body.Rating, 10);
		const isValidMovieId = await movieChannelInstance.isValidMovieId(movieId);
		const isValidRating = reviewChannelInstance.isValidRating(rating);

    if (!isValidMovieId || !isValidRating)
			throw new Error(`Invalid movie id`);

		let movie = (await movieChannelInstance.getAMovie(movieId))!;
    
		await reviewChannelInstance.addANewReview(req.body);

		movie.Ratings_Count = movie.Ratings_Count + 1;
		movie.Sum_Of_Ratings = movie.Sum_Of_Ratings + rating;
		movie.Avg_Rating = movie.Sum_Of_Ratings / movie.Ratings_Count;

		await movieChannelInstance.updateMovieRatings(movie);

		res.status(200).json({ message: `Added new review to ${movie.Name}` });
	} catch (err: unknown) {
		console.error(err);
		res.status(404).json({ message: `Invalid movie id` });
	}
};

export const searchInReviews: RequestHandler = async (req, res) => {
  const searchString = String(req?.body?.searchString);
	let searchResult = await reviewChannelInstance.searchReview(searchString);
	res.status(200).json(searchResult);
};