'use client';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Register() {
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      await axios.post('http://localhost:5000/api/auth/register', data);
      router.push('/auth/login');
    } catch (error) {
      console.error(error);
      alert('Error al registrarse');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Registro</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input {...register('name')} placeholder="Nombre" className="border w-full p-2" required />
        <input {...register('email')} placeholder="Email" className="border w-full p-2" required />
        <input {...register('password')} type="password" placeholder="Contraseña" className="border w-full p-2" required />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">Registrarse</button>
      </form>
    </div>
  );
}
