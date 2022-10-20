import { Router } from 'express';
import { deleteMovie, getAllMovies, getMovieAndItsReviews, postMovie } from '@controller/movie-controller';

const movieRouter = Router();

// get all movies
movieRouter.get('/', getAllMovies);

// get movie data and all reviews for a given movie
movieRouter.get('/:movieId', getMovieAndItsReviews);

// add a new movie to the list
movieRouter.post('/add', postMovie);

// delete a movie and all relared reviews
movieRouter.post('/delete/:movieId', deleteMovie);

export default movieRouter;
