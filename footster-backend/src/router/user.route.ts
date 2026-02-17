import express from 'express'
import userRoute from '../controller/users.controller'
import allUserRoute from '../controller/admin/aUsers.controller'
import verifyToken from '../middleware/verifyToken'
import limitter from '../middleware/rateLimitter'

const router = express.Router();

router.post('/register',limitter,userRoute.userRegister);

router.post('/login',limitter,userRoute.userLogin);
router.get('/login',limitter,userRoute.userLogin);

router.get('/all',allUserRoute.getAllUsers);

router.get('/details',verifyToken,allUserRoute.getUserDetails);

router.get('/logout',verifyToken,userRoute.userLogout);

export default router
