// controllers/policyControllers.js
import db from '../config/db.js';

// Add policy by admin (global)
export const adminAddPolicy = async (req, res) => {
    try {
      const { policyName, description, coverageAmount, premiumAmount } = req.body;
  
      const sql = `INSERT INTO policies (policy_name, description, coverage_amount, premium_amount)
                   VALUES (?, ?, ?, ?)`;
      await db.execute(sql, [policyName, description, coverageAmount, premiumAmount]);
  
      return res.status(201).json({ message: 'Policy added successfully by admin' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Server error while adding policy' });
    }
  };
  
 export const getAllPolicies = async (req, res) => {
  try {
    const [policies] = await db.execute('SELECT * FROM policies');
    return res.status(200).json({ policies });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error fetching policies' });
  }
};


// controllers/policyControllers.js

// Apply a policy (for customers)
export const applyPolicy = async (req, res) => {
    try {
      const { policyId } = req.body;
      const userId = req.user.id; // Customer's ID from JWT token
  
      // Log the user and policy ID for debugging
      console.log('Customer ID:', userId);
      console.log('Policy ID:', policyId);
  
      // Check if the customer has already applied for this policy
      const [existingApplication] = await db.execute(
        'SELECT * FROM applied_policies WHERE user_id = ? AND policy_id = ?',
        [userId, policyId]
      );
  
      if (existingApplication.length > 0) {
        return res.status(400).json({ error: 'You have already applied for this policy' });
      }
  
      // SQL query to insert the application into the applied_policies table
      const sql = 'INSERT INTO applied_policies (user_id, policy_id) VALUES (?, ?)';
      await db.execute(sql, [userId, policyId]);
  
      return res.status(200).json({ message: 'Policy applied successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Server error while applying for the policy' });
    }
  };
  
  // View all policies that a customer has applied for
export const viewAppliedPolicies = async (req, res) => {
    try {
      const userId = req.user.id; // Customer's ID from JWT token
  
      // SQL query to get all policies applied by the logged-in user
      const [appliedPolicies] = await db.execute(
        'SELECT p.policy_name, p.premium_amount, a.applied_at FROM applied_policies a JOIN policies p ON a.policy_id = p.id WHERE a.user_id = ?',
        [userId]
      );
  
      return res.status(200).json({ appliedPolicies });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Server error while fetching applied policies' });
    }
  };
  