'use client';
import { useEffect } from 'react';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const { cart, fetchCart, removeFromCart } = useCart();

  useEffect(() => {
    fetchCart();
  }, []);

  const total = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Carrito</h1>
      {cart.length === 0 ? (
        <p>El carrito está vacío</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.id} className="border p-2 rounded mb-2 flex justify-between items-center">
              <div>
                <h2 className="font-semibold">{item.product.name}</h2>
                <p>${item.product.price} x {item.quantity}</p>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 text-sm"
              >
                Eliminar
              </button>
            </div>
          ))}
          <div className="font-bold text-right mt-4 text-xl">Total: ${total}</div>
        </>
      )}
    </div>
  );
}
