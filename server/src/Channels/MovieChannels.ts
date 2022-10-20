import Movie from '@models/Movie';

class MovieChannel {
	constructor() {}

	public getAllMovies = async () => {
		return await Movie.findAll();
	};

	public getAMovie = async (id: Movie['Id']) => {
		return await Movie.findOne({
			where: { Id: id },
		});
	};

	public addANewMovie = async (movie: Movie) => {
		return await Movie.create({
			Name: movie.Name,
			Release_Date: movie.Release_Date,
		});
	};

	public updateMovieRatings = async (movie: Movie) => {
		await Movie.update(
			{
				Avg_Rating: movie.Avg_Rating,
				Sum_Of_Ratings: movie.Sum_Of_Ratings,
				Ratings_Count: movie.Ratings_Count,
			},
			{
				where: { Id: movie.Id },
			}
		);
	};

	public deleteMovie = async (id: Movie['Id']) => {
		return await Movie.destroy({
			where: { Id: id },
		});
	};

	public isValidMovieId = async (id: Movie['Id']) => {
		let movie = await this.getAMovie(id);
		if (!isNaN(id) && id > 0 && Number.isInteger(id) && movie) return true;
		return false;
	};
}

export default MovieChannel;
