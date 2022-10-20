import Review from '@models/Review';
import Movie from '@models/Movie';
import { Op } from 'sequelize';

class ReviewChannel {
	constructor() {}

	public getAllReviewsForAMovie = async (movieId: Movie['Id']) => {
		return await Review.findAll({
			where: { Movie_Id: movieId },
		});
	}

	public addANewReview = async (review: Review) => {
		return await Review.create({
			Reviewer_Name: review.Reviewer_Name,
			Rating: review.Rating,
			Review_Comments: review.Review_Comments,
			Movie_Id: review.Movie_Id,
		});
	}

	public searchReview = async (text: string) => {
		return await Review.findAll({
			where: { Review_Comments: { [Op.like]: `%${text}%` } },
		});
	}

	public deleteReviewsForMovie = async (movieId: Movie['Id']) => {
		return await Review.destroy({
			where: { Movie_Id: movieId },
		});
	}

	public isValidRating = (rating: Review['Rating']) => {
		if (
			!isNaN(rating) &&
			rating >= 0 &&
			rating <= 10 &&
			Number.isInteger(rating)
		)
			return true;
		return false;
	}
}

export default ReviewChannel;
