/**
 * Centralize all routes
 */

import { Router } from 'express';

import authRoutes from './auth.routes';
import userRoutes from './user.routes';

const router = Router();

// Auth routes
router.use('/', authRoutes);

// User routes
router.use('/', userRoutes);

export default router;
