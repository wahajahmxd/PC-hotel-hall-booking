import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import userRoutes from './routes/userRoutes.mjs';
import hallRoutes from './routes/hallRoutes.mjs';
import bookingRoutes from './routes/bookingRoutes.mjs';

const app = express();

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); 

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use('/api/user/', userRoutes);
app.use('/api/hall/', hallRoutes);
app.use('/api/bookings/', bookingRoutes);

export default app;
