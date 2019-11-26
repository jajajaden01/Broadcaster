import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import autthRoutes from './routes/Auth';
import incidentRoutes from './routes/Incident';

dotenv.config();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api/v1/auth', autthRoutes);
app.use('/api/v1/red-flags', incidentRoutes);

export default app;
