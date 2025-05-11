import express from 'express';
import { registerUser, loginUser,getAllUsers,deleteUser } from '../controllers/userControllers.js';
import { authenticateToken,authorizeRoles } from '../middleware/authMiddleware.js';
import { submitContactForm ,getContactMessages} from '../controllers/contactControllers.js';
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

// Test Protected Routes
router.get('/user-dashboard', authenticateToken, authorizeRoles('user'), (req, res) => {
  res.json({ msg: 'Welcome to User Dashboard' });
});

router.get('/admin-dashboard', authenticateToken, authorizeRoles('admin'), (req, res) => {
  res.json({ msg: 'Welcome to Admin Dashboard' });
});

router.get('/admin/users', authenticateToken, authorizeRoles('admin'), getAllUsers);


router.post('/contact', (req, res, next) => {
  console.log("/contact route received POST request");
  next();
}, submitContactForm);


router.get('/admin/contact-messages', authenticateToken, authorizeRoles('admin'), getContactMessages);

router.delete('/admin/users/:id', authenticateToken, authorizeRoles('admin'), deleteUser);

export default router;
