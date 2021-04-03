import { Router } from 'express';
import UserRouter from './users';
import AuthRouter from './auth';

// Init router and path
const router = Router();

// Add sub-routes
router.use('/users', UserRouter);
router.use('/auth', AuthRouter);

// Export the base-router
export default router;