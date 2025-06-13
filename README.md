# Ecommerce
Prueba Tecnica - ZETA

**Objetivo del proyecto**
Crear una plataforma e-commerce con:
Frontend: Next.js (React) → para interfaz y navegación.
Backend: Node.js + Express → para APIs, autenticación, productos, etc.
Base de datos: MySQL → para usuarios, productos y órdenes.
JWT: para autenticación y autorización por roles.

**Herramientas utilizadas**
**Herramienta	Función**
Next.js	Framework React → frontend, ruteo dinámico
TailwindCSS	Estilado rápido y responsivo
Node.js	Entorno de ejecución de JavaScript → Backend
Express	Framework para APIs REST
MySQL	Base de datos relacional → Productos, Usuarios
JWT	Autenticación con token
Axios / Fetch	Para hacer peticiones al backend desde el frontend

**Instalación del Backend**
mkdir backend
cd backend
npm init -y
npm install express cors dotenv mysql2 jsonwebtoken bcryptjs

**Instalación del Frontend**
npx create-next-app@latest frontend
cd frontend
npm install
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

**Script de la base de datos**
CREATE DATABASE ecommerce
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255),
  role ENUM('user', 'admin') DEFAULT 'user'
);

CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  description TEXT,
  price DECIMAL(10,2),
  image VARCHAR(255)
);

CREATE TABLE cart_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  product_id INT,
  quantity INT DEFAULT 1,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);

**NOTA**
El proyecto en sí no funciona ya que tuve que realizar muchos cambios, pero por cuestión que estoy laborando actualmente no me dio el tiempo de hacer lo que estaba pendiente

