const db = require('../config/db');

const addToCart = (userId, productId, quantity = 1) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO cart_items (user_id, product_id, quantity) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE quantity = quantity + ?';
    db.query(query, [userId, productId, quantity, quantity], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

const getCart = (userId) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT ci.id, p.name, p.price, ci.quantity, (p.price * ci.quantity) AS total
      FROM cart_items ci
      JOIN products p ON ci.product_id = p.id
      WHERE ci.user_id = ?
    `;
    db.query(query, [userId], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

const removeFromCart = (cartItemId, userId) => {
  return new Promise((resolve, reject) => {
    const query = 'DELETE FROM cart_items WHERE id = ? AND user_id = ?';
    db.query(query, [cartItemId, userId], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

module.exports = { addToCart, getCart, removeFromCart };
