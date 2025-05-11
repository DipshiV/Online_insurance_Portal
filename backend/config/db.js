// db.js
import mysql from 'mysql2/promise';

const db = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Cdac@123',
  database: 'OIP',
});

console.log('MySQL connected');

export default db;
