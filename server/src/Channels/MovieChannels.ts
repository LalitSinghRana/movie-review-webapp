import Movie from "../models/Movie";

class MovieChannel {
	constructor() {
		Movie;
	}

	public async getAllMovies() {
		return await Movie.findAll();
	}

	public async getAMovie(id: Movie['Id']) {
		return await Movie.findOne({
			where: { Id: id },
		});
	}

	public async addANewMovie(movie: Movie) {
		return await Movie.create({
			Name: movie.Name,
			Release_Date: movie.Release_Date,
		});
	}

	public async updateMovieRatings(movie: Movie) {
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
	}

	public async deleteMovie(id: Movie['Id']) {
		return await Movie.destroy({
			where: { Id: id },
		});
	}

	public async isValidMovieId(id: Movie['Id']) {
		let movie = await this.getAMovie(id);
		if (!isNaN(id) && id > 0 && Number.isInteger(id) && movie)
			return true;
		return false;
	}
}

export default MovieChannel;
