const { addToCart, getCart, removeFromCart } = require('../models/cartModel');

const addProductToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    await addToCart(req.user.id, productId, quantity || 1);
    res.status(201).json({ message: 'Producto agregado al carrito' });
  } catch (error) {
    res.status(500).json({ message: 'Error al agregar al carrito', error });
  }
};

const getUserCart = async (req, res) => {
  try {
    const cart = await getCart(req.user.id);
    const total = cart.reduce((acc, item) => acc + item.total, 0);
    res.json({ cart, total });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el carrito', error });
  }
};

const removeProductFromCart = async (req, res) => {
  try {
    await removeFromCart(req.params.id, req.user.id);
    res.json({ message: 'Producto eliminado del carrito' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar del carrito', error });
  }
};

module.exports = { addProductToCart, getUserCart, removeProductFromCart };
