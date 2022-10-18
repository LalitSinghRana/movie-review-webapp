import Review from '../models/Review';
import Movie from '../models/Movie';
import { Op } from 'sequelize'

class ReviewChannel {
	constructor() {
		Review;
	}

	public async getAllReviewsForAMovie(movieId: Movie['Id']) {
		return await Review.findAll({
			where: { Movie_Id: movieId },
		});
	}

	public async addANewReview(review: Review) {
		return await Review.create({
			Reviewer_Name: review.Reviewer_Name,
			Rating: review.Rating,
			Review_Comments: review.Review_Comments,
			Movie_Id: review.Movie_Id,
		});
	}

	public async searchReview(text: string) {
		return await Review.findAll({
			where: { Review_Comments: { [Op.like]: `%${text}%` } },
		});
	}

	public async deleteReviewsForMovie(movieId: Movie['Id']) {
		return await Review.destroy({
			where: { Movie_Id: movieId },
		});
	}

	public isValidRating(rating: Review['Rating']) {
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
