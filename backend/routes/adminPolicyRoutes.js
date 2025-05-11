// routes/adminPolicyRoutes.js
import express from 'express';
import { getAllPolicies, updatePolicy, deletePolicy } from '../controllers/adminPolicyController.js';
import { authenticateToken,authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/view/policies', authenticateToken, authorizeRoles('admin'), getAllPolicies);
router.put('/policy/:id', authenticateToken, authorizeRoles('admin'), updatePolicy);
router.delete('/policy/:id', authenticateToken, authorizeRoles('admin'), deletePolicy);

export default router;
