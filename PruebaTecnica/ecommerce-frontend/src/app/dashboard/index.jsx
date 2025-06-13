'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';

export default function Dashboard() {
  const { user, token } = useAuth();
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: '', description: '', price: '', image_url: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    if (!user || user.role !== 'admin') router.push('/');
    else fetchProducts();
  }, [user]);

  const fetchProducts = async () => {
    const res = await axios.get('http://localhost:5000/api/products');
    setProducts(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/api/products/${editingId}`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post('http://localhost:5000/api/products', form, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      setForm({ name: '', description: '', price: '', image_url: '' });
      setEditingId(null);
      fetchProducts();
    } catch (error) {
      console.error(error);
      alert('Error al guardar el producto');
    }
  };

  const handleEdit = (product) => {
    setForm(product);
    setEditingId(product.id);
  };

  const handleDelete = async (id) => {
    if (confirm('¿Seguro que quieres eliminar este producto?')) {
      await axios.delete(`http://localhost:5000/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchProducts();
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Panel de Productos (Admin)</h1>

      {/* FORMULARIO */}
      <form onSubmit={handleSubmit} className="space-y-2 mb-6 border p-4 rounded">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Nombre"
          className="border w-full p-2"
          required
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Descripción"
          className="border w-full p-2"
          required
        />
        <input
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Precio"
          type="number"
          className="border w-full p-2"
          required
        />
        <input
          name="image_url"
          value={form.image_url}
          onChange={handleChange}
          placeholder="URL de imagen"
          className="border w-full p-2"
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">
          {editingId ? 'Actualizar Producto' : 'Crear Producto'}
        </button>
      </form>

      {/* LISTA DE PRODUCTOS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {products.map((product) => (
          <div key={product.id} className="border p-3 rounded shadow relative">
            <img src={product.image_url} alt={product.name} className="h-32 w-full object-cover mb-2" />
            <h2 className="font-semibold text-lg">{product.name}</h2>
            <p className="text-sm text-gray-600">{product.description}</p>
            <p className="font-bold my-2">${product.price}</p>
            <div className="flex justify-between mt-2">
              <button
                onClick={() => handleEdit(product)}
                className="text-blue-600 text-sm"
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(product.id)}
                className="text-red-600 text-sm"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
