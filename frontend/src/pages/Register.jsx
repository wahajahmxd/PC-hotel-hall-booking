import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from '../components/UI/Button.jsx';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/user/register', formData, { withCredentials: true });
      alert('Registration successful!');
      navigate('/');
    } catch (error) {
        console.error('Registration error:', error);
      alert('Registration failed. Email might be taken.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-900">Welcome to Realm of Premium Banquets</h1>
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow border border-gray-200">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">Create Your Account</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="text-base font-medium text-gray-700 mb-1 block">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-5 py-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-200 text-gray-900 bg-white"
            />
          </div>
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
              className="w-full px-5 py-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-200 text-gray-900 bg-white"
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
              className="w-full px-5 py-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-200 text-gray-900 bg-white"
            />
          </div>
          <Button type="submit" variant="primary" size="large" className="w-full py-3 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded shadow transition">Register</Button>
        </form>
        <p className="text-center mt-6 text-base text-gray-600">
          Already have an account?{' '}
          <a href="/login" className="text-blue-700 hover:underline font-bold">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
