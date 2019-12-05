import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import authRoutes from './v2/routes/Auth';
import redFlagsRoutes from './v2/routes/Incident';

dotenv.config();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api/v2/auth', authRoutes);
app.use('/api/v2/red-flags', redFlagsRoutes);

export default app;
