const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connection = require('./config/db');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API funcionando correctamente');
});

/* RUTAS */
/**
 * PRODUCTOS
 */
const productRoutes = require('./routes/productRoutes');
app.use('/api/products', productRoutes);
/**
 * CARRITO
 */
const cartRoutes = require('./routes/cartRoutes');
app.use('/api/cart', cartRoutes);




const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
