import express from 'express';
import { addHallController } from '../controllers/hallContoller.mjs';

const router = express.Router();

// Route for adding a new hall
router.post('/add-hall', addHallController);

export default router;
