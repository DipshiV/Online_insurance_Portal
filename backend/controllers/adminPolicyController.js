import db from '../config/db.js';
// Get all policies added by admin (you may add filter if needed)
export const getAllPolicies = async (req, res) => {
  try {
    const [policies] = await db.execute('SELECT * FROM policies');
    return res.status(200).json({ policies });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
};

// Update policy
export const updatePolicy = async (req, res) => {
  const { id } = req.params;
  const { policy_name, description, coverage_amount, premium_amount } = req.body;
  try {
    const sql = `UPDATE policies 
                 SET policy_name = ?, description = ?, coverage_amount = ?, premium_amount = ?
                 WHERE id = ?`;
    await db.execute(sql, [policy_name, description, coverage_amount, premium_amount, id]);
    return res.status(200).json({ message: 'Policy updated successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
};

// Delete policy
// Delete policy
export const deletePolicy = async (req, res) => {
    const { id } = req.params;
    console.log('Policy ID to delete:', id);
  
    try {
      // Step 1: Delete dependent records from applied_policies
      await db.execute('DELETE FROM applied_policies WHERE policy_id = ?', [id]);
  
      // Step 2: Now delete the policy
      const [result] = await db.execute('DELETE FROM policies WHERE id = ?', [id]);
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Policy not found' });
      }
  
      return res.status(200).json({ message: 'Policy deleted successfully' });
    } catch (err) {
      console.error('Error deleting policy:', err);
      return res.status(500).json({ error: 'Server error' });
    }
  };
  
  
