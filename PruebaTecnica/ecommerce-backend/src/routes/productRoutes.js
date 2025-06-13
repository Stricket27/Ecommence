const express = require('express');
const router = express.Router();
const { getProducts, getProduct, addProduct, editProduct, removeProduct } = require('../controllers/productController');
const { verifyToken, requireRole } = require('../middlewares/authMiddleware');

router.get('/', getProducts);
router.get('/:id', getProduct);

// Solo admin puede crear, editar y eliminar productos
router.post('/', verifyToken, requireRole('admin'), addProduct);
router.put('/:id', verifyToken, requireRole('admin'), editProduct);
router.delete('/:id', verifyToken, requireRole('admin'), removeProduct);

module.exports = router;
