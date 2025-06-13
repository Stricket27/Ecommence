const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../models/productModel');

const getProducts = async (req, res) => {
  try {
    const products = await getAllProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener productos', error });
  }
};

const getProduct = async (req, res) => {
  try {
    const product = await getProductById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener producto', error });
  }
};

const addProduct = async (req, res) => {
  try {
    const { name, description, price, image_url } = req.body;
    if (!name || !price) return res.status(400).json({ message: 'Nombre y precio son obligatorios' });

    await createProduct({ name, description, price, image_url });
    res.status(201).json({ message: 'Producto creado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear producto', error });
  }
};

const editProduct = async (req, res) => {
  try {
    const { name, description, price, image_url } = req.body;
    await updateProduct(req.params.id, { name, description, price, image_url });
    res.json({ message: 'Producto actualizado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar producto', error });
  }
};

const removeProduct = async (req, res) => {
  try {
    await deleteProduct(req.params.id);
    res.json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar producto', error });
  }
};

module.exports = { getProducts, getProduct, addProduct, editProduct, removeProduct };
