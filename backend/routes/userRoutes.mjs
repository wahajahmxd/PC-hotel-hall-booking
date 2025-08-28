import express from 'express';
import { 
    registerUserController, 
    loginUserController, 
    deleteProfileController, 
    updateUserRoleController, 
    getPersonalDetailsController, 
    updateUserPasswordController, 
    logoutUserController, 
    forgetPassword, 
    getAllUserController, 
    deleteUserController, 
    updateUserProfileController, 
    changePasswordController 
} from '../controllers/userController.mjs';  // Adjust to your controllers' path

import { isAuthenticUser, authorizeRoles } from '../middlewares/authMiddleware.mjs';  // Adjust to your middleware path

const router = express.Router();

// User Routes
router.post('/register', registerUserController);  
router.post('/forget', forgetPassword);    
router.post('/login', loginUserController);
router.get('/logout', isAuthenticUser, logoutUserController);
router.get('/profile/info', isAuthenticUser, getPersonalDetailsController);
router.get('/', isAuthenticUser, authorizeRoles("admin"), getAllUserController);
router.put('/profile/update', isAuthenticUser, updateUserProfileController);
router.put('/forget/password/update/:token', changePasswordController);
router.put('/password/update', isAuthenticUser, updateUserPasswordController);   
router.put('/update/role/:id', isAuthenticUser, authorizeRoles("admin"), updateUserRoleController);
router.delete('/profile/delete', isAuthenticUser, deleteProfileController);
router.delete('/:id', isAuthenticUser, authorizeRoles("admin"), deleteUserController);

export default router;
