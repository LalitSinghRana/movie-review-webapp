import * as dotenv from 'dotenv';
dotenv.config();

import config from 'config';
import express from 'express';
import { Request } from 'express';
import cors from 'cors';
import dbConnection from '@database/Config';
import movieRoutes from '@routes/movie-routes';
import reviewRoutes from '@routes/review-routes';
import defaultJson from '@config/default.json';

const app = express();

app.use(cors<Request>());
app.use(express.json());

app.use('/movie', movieRoutes);
app.use('/review', reviewRoutes);

const alterSchema = config.get<typeof defaultJson.AlterSchema>('AlterSchema');
console.log(`Altering schemas on this run: ${alterSchema}`);
dbConnection
	.sync({ alter: alterSchema })
	.then(() => console.log('Database sync successful'))
	.catch((err) => console.log(err));

const PORT = config.get<typeof defaultJson.Port>('Port');
app.listen(PORT, () => {
	console.log(`NODE_ENV : ${process.env.NODE_ENV}`);
	console.log(`listening on port ${PORT}`);
});
