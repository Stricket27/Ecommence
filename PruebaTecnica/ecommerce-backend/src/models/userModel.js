const db = require('../config/db');

const createUser = (name, email, hashedPassword, role = 'user') => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)';
    db.query(query, [name, email, hashedPassword, role], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

const findUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], (err, results) => {
      if (err) return reject(err);
      resolve(results[0]);
    });
  });
};

module.exports = { createUser, findUserByEmail };
