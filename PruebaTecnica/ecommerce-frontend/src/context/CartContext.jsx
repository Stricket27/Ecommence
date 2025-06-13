'use client';
import { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { token } = useAuth();

  const fetchCart = async () => {
    if (!token) return;
    const res = await axios.get('http://localhost:5000/api/cart', {
      headers: { Authorization: `Bearer ${token}` },
    });
    setCart(res.data);
  };

  const addToCart = async (productId) => {
    if (!token) return alert('Debes iniciar sesión');
    await axios.post(
      'http://localhost:5000/api/cart',
      { productId, quantity: 1 },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchCart();
  };

  const removeFromCart = async (cartItemId) => {
    await axios.delete(`http://localhost:5000/api/cart/${cartItemId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchCart();
  };

  return (
    <CartContext.Provider value={{ cart, fetchCart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
