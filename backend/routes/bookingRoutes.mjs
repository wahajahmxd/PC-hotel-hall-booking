import express from 'express';
import { bookHallController } from '../controllers/bookingController.mjs'; 
import { isAuthenticUser } from '../middlewares/authMiddleware.mjs'; 

const router = express.Router();

router.post('/book-hall', isAuthenticUser, bookHallController);

export default router;
