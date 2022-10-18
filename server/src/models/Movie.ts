import { Table, Model, Column, DataType } from 'sequelize-typescript';

@Table({
	timestamps: false,
	tableName: 'movies',
})
class Movie extends Model {
	@Column({
		type: DataType.INTEGER,
		allowNull: false,
		primaryKey: true,
		autoIncrement: true,
	})
	Id: number;

	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	Name: string;

	@Column({
		type: DataType.DATEONLY,
		allowNull: false,
	})
	Release_Date: string;

	@Column({
		type: DataType.DOUBLE,
		allowNull: false,
		defaultValue: 0,
	})
	Avg_Rating: number;

	@Column({
		type: DataType.INTEGER,
		allowNull: false,
		defaultValue: 0,
	})
	Sum_Of_Ratings: number;

	@Column({
		type: DataType.INTEGER,
		allowNull: false,
		defaultValue: 0,
	})
	Ratings_Count: number;
};

export default Movie;