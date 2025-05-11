// routes/policyRoutes.js
import express from 'express';
import { authenticateToken } from '../middleware/authMiddleware.js'; // Assuming authentication middleware is used

import { adminAddPolicy, getAllPolicies,applyPolicy,viewAppliedPolicies } from '../controllers/policyControllers.js';
const router = express.Router();
router.post('/admin/add-policy', authenticateToken, adminAddPolicy); // admin only
router.get('/policies', authenticateToken, getAllPolicies); // for customer to view

// Route for customers to apply for a policy
router.post('/customer/apply-policy', authenticateToken, applyPolicy);

router.get('/customer/my-applied-policies', authenticateToken, viewAppliedPolicies);

export default router;


