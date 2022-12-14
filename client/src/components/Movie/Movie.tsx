import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Movie.css";
import axios from "axios";
import MovieType from '../../../../server/src/models/Movie';
import ReviewType from '../../../../server/src/models/Review';
import { GET_MOVIE_DETAILS_URL } from "../../constants/server-side";

const Home = () => {
  const [movie, setMovie] = useState<MovieType>();
  const [reviews, setReviews] = useState<ReviewType[]>([]);
  let { movieId } = useParams();

	useEffect(() => {
		const loadData = async () => {
			const url = GET_MOVIE_DETAILS_URL.replace(':movieId', movieId!);
			const response = await axios.get(url);
			setMovie(response.data.movieData);
			setReviews(response.data.reviewData);
		};

		loadData();
	}, [movieId]);

  return (
		<div className='movie'>
			<div className='movie-data-container'>
				<p>{movie?.Name}</p>
				<p>{movie?.Avg_Rating.toFixed(2)}/10</p>
			</div>
			<div className='reviews-container'>
				{reviews.map((review) => (
					<div key={review.Id} className='review-container'>
						<div>
							<p>{review.Review_Comments}</p>
							<p>
								<i>By {review.Reviewer_Name}</i>
							</p>
						</div>
						<p>
							<b>{review.Rating}/10</b>
						</p>
					</div>
				))}
			</div>
		</div>
	);
}

export default Home;