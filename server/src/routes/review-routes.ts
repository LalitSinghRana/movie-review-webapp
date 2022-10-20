import { Router } from 'express';
import { postReview, searchInReviews } from '@controller/review-controller';

const reviewRouter = Router();

// search a text in all reviews' comments
reviewRouter.get('/search', searchInReviews);

// add a new review to a movie
reviewRouter.post('/add', postReview);

export default reviewRouter;
