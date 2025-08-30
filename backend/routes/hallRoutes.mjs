import express from 'express';
import { addHallController } from '../controllers/hallContoller.mjs';
import { getAllHallsController } from '../controllers/hallContoller.mjs';

const router = express.Router();

// Route for getting all halls
router.get('/get-all-halls', getAllHallsController);

// Route for adding a new hall
router.post('/add-hall', addHallController);

export default router;
