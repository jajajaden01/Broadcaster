import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import autthRoutes from './routes/Auth';
import incidentRoutes from './routes/Incident';
import adminRoutes from './routes/Admin';

dotenv.config();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api/v1/auth', autthRoutes);
app.use('/api/v1/red-flags', incidentRoutes);
app.use('/api/v1/admin-panel', adminRoutes);

export default app;
