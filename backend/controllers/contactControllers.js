import db from '../config/db.js';

export const submitContactForm = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    console.log("Contact POST hit:", req.body);

    const sql = 'INSERT INTO contact_messages (name, email, subject, message) VALUES (?, ?, ?, ?)';
    const [result] = await db.execute(sql, [name, email, subject, message]);
    res.status(200).json({ message: 'Message received successfully' });
  } catch (error) {
    console.error("Contact POST error:", error);
    res.status(500).json({ error: 'Server error' });
  }
};


export const getContactMessages = async(req, res) => {
    try {
        const sql = 'SELECT * FROM contact_messages ORDER BY created_at DESC';
        const [rows] = await db.execute(sql);
        res.status(200).json({ messages: rows });
      } catch (error) {
        console.error("GET contact-messages error:", error);
        res.status(500).json({ error: 'Server error' });
      }
    };