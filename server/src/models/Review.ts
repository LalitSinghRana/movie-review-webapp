import {
	Table,
	Model,
	Column,
	DataType,
	ForeignKey,
} from 'sequelize-typescript';
import Movie from './Movie';

@Table({
	timestamps: false,
	tableName: 'reviews',
})
class Review extends Model {
	@Column({
		type: DataType.INTEGER,
		allowNull: false,
		primaryKey: true,
		autoIncrement: true,
	})
	Id: number;

	@Column({
		type: DataType.STRING,
		allowNull: true,
	})
	Reviewer_Name: string;

	@Column({
		type: DataType.INTEGER,
		allowNull: false,
	})
	Rating: number;

	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	Review_Comments: string;

	@ForeignKey(() => Movie)
	@Column({
		type: DataType.INTEGER,
		allowNull: false,
	})
	Movie_Id: number;
}

export default Review;
