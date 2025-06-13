const db = require('../config/db');

const getAllProducts = () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM products', (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

const getProductById = (id) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM products WHERE id = ?', [id], (err, results) => {
      if (err) return reject(err);
      resolve(results[0]);
    });
  });
};

const createProduct = (product) => {
  return new Promise((resolve, reject) => {
    const { name, description, price, image_url } = product;
    const query = 'INSERT INTO products (name, description, price, image_url) VALUES (?, ?, ?, ?)';
    db.query(query, [name, description, price, image_url], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

const updateProduct = (id, product) => {
  return new Promise((resolve, reject) => {
    const { name, description, price, image_url } = product;
    const query = 'UPDATE products SET name=?, description=?, price=?, image_url=? WHERE id=?';
    db.query(query, [name, description, price, image_url, id], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

const deleteProduct = (id) => {
  return new Promise((resolve, reject) => {
    db.query('DELETE FROM products WHERE id = ?', [id], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

module.exports = { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct };
