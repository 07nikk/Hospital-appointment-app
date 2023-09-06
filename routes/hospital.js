import express from 'express';
import { createHospital, getHospital, getAllHospitals, updateHospital, deleteHospital } from '../controller/hospital.js';
import {verifyAdmin, verifyToken} from '../utils/verify.js';

const router = express.Router();

//Create
router.post('/',verifyToken, verifyAdmin, createHospital);

//Read
router.get('/:id', getHospital);

//Get ALL
router.get('/',verifyToken, getAllHospitals);

//Update
router.patch('/:id', verifyToken, verifyAdmin, updateHospital);

// //Delete
router.delete('/:id', verifyToken, verifyAdmin, deleteHospital);

export default router;
