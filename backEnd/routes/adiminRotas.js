import express from 'express';
const router = express.Router();

import auth from '../middlewares/authMiddleware.js';
import isAdmin from '../middlewares/adminMiddleware.js';
import { dashboard } from '../controllers/adminController.js';

router.get('/dashboard', auth, isAdmin, dashboard);

export default router;
