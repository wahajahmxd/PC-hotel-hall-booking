import express from 'express';
import { bookHallController } from '../controllers/bookingController.mjs'; // Import the controller function
import { isAuthenticUser } from '../middlewares/authMiddleware.mjs'; // Middleware to check if user is authenticated

const router = express.Router();

// POST request to book a hall
// This route will be used by users to book a hall
router.post('/book-hall', isAuthenticUser, bookHallController);

export default router;
