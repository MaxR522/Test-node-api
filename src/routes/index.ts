/**
 * Centralize all routes
 */

import { Router } from 'express';

import authRoutes from './auth.routes';

const router = Router();

// Auth routes
router.use('/', authRoutes);

export default router;
