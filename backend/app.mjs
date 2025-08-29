import express from 'express';
import cookieParser from 'cookie-parser';

// Import route handlers
//import productRoutes from './routes/productRoutes.mjs';
import userRoutes from './routes/userRoutes.mjs';
import hallRoutes from './routes/hallRoutes.mjs';
//import orderRoutes from './routes/orderRoutes.mjs';

const app = express();

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // for parsing cookies from requests

// Use the imported routes
//app.use('/api/product/', productRoutes);
app.use('/api/user/', userRoutes);
app.use('/api/hall/', hallRoutes);
//app.use('/api/order/', orderRoutes);

export default app;
