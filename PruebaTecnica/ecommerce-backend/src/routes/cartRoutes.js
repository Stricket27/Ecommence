const express = require('express');
const router = express.Router();
const { addProductToCart, getUserCart, removeProductFromCart } = require('../controllers/cartController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.post('/', verifyToken, addProductToCart);
router.get('/', verifyToken, getUserCart);
router.delete('/:id', verifyToken, removeProductFromCart);

module.exports = router;
