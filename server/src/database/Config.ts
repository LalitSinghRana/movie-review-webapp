import config from 'config';
import { Sequelize } from 'sequelize-typescript';
import Movie from '../models/Movie';
import Review from '../models/Review';
import defaultJson from '../config/default.json';
import { Dialect } from 'sequelize/types/sequelize';

const DbConfig = config.get<typeof defaultJson.DbConfig>('DbConfig');

const dbConnection = new Sequelize({
	...DbConfig,
	dialect: DbConfig.dialect as Dialect,
	models: [Movie, Review],
});

export default dbConnection;
