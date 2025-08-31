import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from '../components/UI/Button.jsx';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    // If already logged in, redirect to dashboard
    const storedUser = localStorage.getItem('user');
    if (storedUser) navigate('/dashboard');
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/user/login`, formData, { withCredentials: true });
      // Save user info (id, name) to localStorage
      if (res.data && res.data.valid) {
        localStorage.setItem('user', JSON.stringify({
          id: res.data.valid._id,
          name: res.data.valid.name
        }));
      }
      alert('Login successful!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-900">Welcome to Realm of Premium Banquets</h1>
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow border border-gray-200">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">Login to Your Account</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="text-base font-medium text-gray-700 mb-1 block">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-5 py-3 border rounded focus:outline-none focus:ring-2 focus:ring-black text-gray-900 bg-white"
            />
          </div>
          <div>
            <label htmlFor="password" className="text-base font-medium text-gray-700 mb-1 block">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-5 py-3 border rounded focus:outline-none focus:ring-2 focus:ring-black text-gray-900 bg-white"
            />
          </div>
          <Button variant="black" size="large" className="w-full py-3">Login</Button>
        </form>
        <p className="text-center mt-6 text-base text-gray-600">
          Don't have an account?{' '}
          <a href="/register" className="text-black underline font-bold">Register</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
