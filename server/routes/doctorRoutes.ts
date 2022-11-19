import express, { Router } from 'express';

import * as doctorController from '../controllers/doctor/doctorController';

const router: Router = express.Router();

router.get('/', doctorController.getAllDoctors);
router.get('/:doctorId', doctorController.getOneDoctors);
router.post('/apply', doctorController.applyAsDoctor);

export default router;
