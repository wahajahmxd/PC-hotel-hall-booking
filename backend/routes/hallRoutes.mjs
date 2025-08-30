import express from 'express';
import { addHallController } from '../controllers/hallContoller.mjs';
import { getAllHallsController } from '../controllers/hallContoller.mjs';

const router = express.Router();

router.get('/get-all-halls', getAllHallsController);
router.post('/add-hall', addHallController);

export default router;
