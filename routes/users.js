import express from 'express';
import { getUser, getAllUsers, deleteUser, updateUser} from '../controller/user.js';
import {verifyToken, verifyAdmin, verifyUser} from '../utils/verify.js';
const router = express.Router();

router.get('/',verifyToken, verifyAdmin, getAllUsers);
router.get('/:id', verifyToken, verifyUser, getUser);
router.delete('/:id', verifyToken, verifyUser, deleteUser);
router.patch('/:id', verifyToken, verifyUser, updateUser);

export default router;