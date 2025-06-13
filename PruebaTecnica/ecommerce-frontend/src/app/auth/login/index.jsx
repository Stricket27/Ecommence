'use client';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function Login() {
  const { register, handleSubmit } = useForm();
  const { login } = useAuth();
  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', data);
      login(res.data.token);
      router.push('/products');
    } catch (error) {
      console.error(error);
      alert('Credenciales inválidas');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Iniciar Sesión</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input {...register('email')} placeholder="Email" className="border w-full p-2" required />
        <input {...register('password')} type="password" placeholder="Contraseña" className="border w-full p-2" required />
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded">Ingresar</button>
      </form>
    </div>
  );
}
