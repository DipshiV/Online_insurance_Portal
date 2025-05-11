import db from '../config/db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'your_secret_key';

export const registerUser = async (req, res) => {
  try {
    const { fullName, email, password, role } = req.body;

    const [existing] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (existing.length > 0) return res.status(400).json({ msg: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query('INSERT INTO users (fullName, email, password, role) VALUES (?, ?, ?, ?)', [
      fullName,
      email,
      hashedPassword,
      role || 'user',
    ]);

    res.status(201).json({ msg: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (rows.length === 0) return res.status(400).json({ msg: 'Invalid credentials' });

    const user = rows[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ msg: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

    res.json({ token, role: user.role,fullname: user.fullName, msg: 'Login successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const [users] = await db.execute(     "SELECT id, fullName, email, role FROM users WHERE role = 'user'");

    return res.status(200).json({ users });
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ error: 'Server error while fetching users' });
  }
};

export const deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    await db.execute('DELETE FROM users WHERE id = ?', [userId]);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error('Delete error:', err);
    res.status(500).json({ error: 'Failed to delete user' });
  }
};