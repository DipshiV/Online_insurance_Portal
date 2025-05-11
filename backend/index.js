import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import policyRoutes from './routes/policyRoutes.js';
import adminRoutes from './routes/adminPolicyRoutes.js'

const app = express();
const PORT = 5800;

app.use(cors());
app.use(express.json());

app.use('/api', authRoutes);

app.use('/api', policyRoutes);
app.use('/api',adminRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
