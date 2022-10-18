import { Sequelize } from 'sequelize-typescript';
import Movie from '../models/Movie';
import Review from '../models/Review';

const dbConnection = new Sequelize({
	dialect: 'mysql',
	host: 'localhost',
	username: 'root',
	password: 'root',
	database: 'movie-review-site-ts',
	logging: false,
	models: [Movie, Review],
});

export default dbConnection;
