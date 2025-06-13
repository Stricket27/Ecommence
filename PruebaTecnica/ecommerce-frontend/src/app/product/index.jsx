'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await axios.get('http://localhost:5000/api/products');
    setProducts(res.data);
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Productos</h1>

      <input
        type="text"
        placeholder="Buscar productos..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border px-2 py-1 w-full mb-4"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredProducts.map((product) => (
          <div key={product.id} className="border p-4 rounded shadow">
            <img src={product.image_url} alt={product.name} className="h-40 w-full object-cover mb-2" />
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-gray-600">{product.description}</p>
            <p className="font-bold my-2">${product.price}</p>
            {user ? (
              <button
                onClick={() => addToCart(product.id)}
                className="bg-blue-600 text-white px-4 py-2 rounded w-full"
              >
                Añadir al carrito
              </button>
            ) : (
              <p className="text-sm text-gray-500">Inicia sesión para comprar</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
