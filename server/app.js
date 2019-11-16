import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import autthRoutes from './routes/Auth';

dotenv.config();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api/v1/auth', autthRoutes);

export default app;
