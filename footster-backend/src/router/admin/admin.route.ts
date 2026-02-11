import express from 'express'
import adminController from '../../controller/admin/admin.controller'
import userController from '../../controller/users.controller'
import verifyToken from '../../middleware/verifyToken'
const router = express.Router();

router.post('/register',adminController.adminRegister);
router.get('/logout',verifyToken,userController.userLogout);

export default router ;