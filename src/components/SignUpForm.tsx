'use client';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useState } from 'react';

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Sign Up Form Data Submitted:', formData);

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/auth//signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Sign up successful:', data);
        setError('Sign Up Successfull!');
        redirect('/');
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Something went wrong.');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="card bg-base-100 w-full m-auto  max-w-md p-5 shadow-2xl">
      <div className="text-teal-500 text-4xl font-semibold text-center">
        Sign Up
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && <p>{error}</p>}
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="email">Name</Label>
          <Input
            type="text"
            id="name"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            className="input input-bordered w-full mt-2"
            placeholder="Enter your name"
            required
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="input input-bordered w-full mt-2"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="email">Password</Label>
          <Input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="input input-bordered w-full mt-2"
            placeholder="Enter your password"
            required
          />
        </div>
        <div className="form-control mt-6">
          <button className="bg-teal-500 text-white px-3 py-2">Register</button>
          <div
            className="flex h-8 items-end space-x-1"
            aria-live="polite"
            aria-atomic="true"
          >

          </div>
        </div>
        <p className='text-center'>Already An User? please <Link href={"/login"} className='text-teal-700 '>Login</Link></p>
      </form>
    </div>
  );
};

export default SignUpPage;
