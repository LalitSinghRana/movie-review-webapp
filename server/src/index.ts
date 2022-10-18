import express from 'express';
import dbConnection from './database/Config';
import movieRoutes from './routes/movie-routes';
import reviewRoutes from './routes/review-routes';

const app = express();

app.use(express.json());
app.use('/movie', movieRoutes);
app.use('/review', reviewRoutes);

dbConnection
	.sync()
	.then(() => console.log('Database sync successful'))
	.catch((err) => console.log(err));

const PORT = 5000;

app.listen(PORT, () => {
	console.log(`listening on port ${PORT}`);
});
