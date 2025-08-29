import express from 'express';
import { 
    registerUserController, 
    loginUserController,
    logoutUserController, 
    forgetPassword
} from '../controllers/userController.mjs';  

import { isAuthenticUser } from '../middlewares/authMiddleware.mjs';  

const router = express.Router();

router.post('/register', registerUserController);  
router.post('/forget', forgetPassword);    
router.post('/login', loginUserController);
router.get('/logout', isAuthenticUser, logoutUserController); 

export default router;
