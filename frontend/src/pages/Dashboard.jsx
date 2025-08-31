import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from '../components/UI/Button.jsx';
import { Select } from '../components/UI/Select.jsx';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: 'User', id: '' });
  const [halls, setHalls] = useState([]);
  const [showBooking, setShowBooking] = useState(false);
  const [bookingData, setBookingData] = useState({
    hallId: '',
    date: '',
    startTime: '',
    endTime: ''
  });
  const [selectedHall, setSelectedHall] = useState(null);

  // On mount, check user auth
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (!storedUser) {
      navigate('/login');
    } else {
      setUser(storedUser);
    }
  }, [navigate]);

  // Fetch halls from DB
  useEffect(() => {
    const fetchHalls = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/hall/get-all-halls`);
        setHalls(res.data.halls || []);
      } catch (err) {
        setHalls([]);
        console.error('Failed to fetch halls:', err);
      }
    };
    fetchHalls();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/user/logout`, { withCredentials: true });
      localStorage.removeItem('user');
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      alert('Logout failed.');
    }
  };

  const handleBookingChange = (e) => {
    const { name, value } = e.target;
    setBookingData(prev => ({ ...prev, [name]: value }));
    if (name === 'hallId') {
      const hall = halls.find(h => h._id === value);
      setSelectedHall(hall || null);
    }
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/bookings/book-hall`, {
        userId: user.id,
        hallId: bookingData.hallId,
        bookingData: {
          date: bookingData.date,
          startTime: bookingData.startTime,
          endTime: bookingData.endTime,
          totalPrice: selectedHall?.price || 0
        }
      }, { withCredentials: true });
      alert('Booking successful!');
      setShowBooking(false);
      setBookingData({ hallId: '', date: '', startTime: '', endTime: '' });
      setSelectedHall(null);
    } catch (err) {
      alert('Booking failed: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="min-h-screen bg-white px-4 py-8">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-10">
        <div className="text-xl font-bold text-gray-900">Welcome, {user.name}</div>
        <Button variant="black" size="medium" onClick={handleLogout}>Logout</Button>
      </div>
      {/* Create Booking */}
      <div className="flex flex-col items-center">
        <Button variant="black" size="large" className="mb-8" onClick={() => setShowBooking(v => !v)}>
          {showBooking ? 'Cancel' : 'Create Booking'}
        </Button>
        {showBooking && (
          <form onSubmit={handleBookingSubmit} className="w-full max-w-md bg-white p-8 rounded-2xl shadow border border-gray-200 space-y-6">
            <div>
              <label className="block text-base font-medium text-gray-700 mb-1">Hall</label>
              <select
                name="hallId"
                value={bookingData.hallId}
                onChange={handleBookingChange}
                required
                className="w-full px-5 py-3 border rounded focus:outline-none focus:ring-2 focus:ring-black text-gray-900 bg-white"
              >
                <option value="" disabled>Select a hall</option>
                {halls.map(hall => (
                  <option key={hall._id} value={hall._id}>{hall.hallName}</option>
                ))}
              </select>
            </div>
            {selectedHall && (
              <div>
                <label className="block text-base font-medium text-gray-700 mb-1">Price</label>
                <div className="w-full px-5 py-3 border rounded bg-gray-50 text-gray-900">{selectedHall.price}</div>
              </div>
            )}
            <div>
              <label className="block text-base font-medium text-gray-700 mb-1">Date</label>
              <input type="date" name="date" value={bookingData.date} onChange={handleBookingChange} required className="w-full px-5 py-3 border rounded focus:outline-none focus:ring-2 focus:ring-black text-gray-900 bg-white" />
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-base font-medium text-gray-700 mb-1">Start Time</label>
                <input type="time" name="startTime" value={bookingData.startTime} onChange={handleBookingChange} required className="w-full px-5 py-3 border rounded focus:outline-none focus:ring-2 focus:ring-black text-gray-900 bg-white" />
              </div>
              <div className="flex-1">
                <label className="block text-base font-medium text-gray-700 mb-1">End Time</label>
                <input type="time" name="endTime" value={bookingData.endTime} onChange={handleBookingChange} required className="w-full px-5 py-3 border rounded focus:outline-none focus:ring-2 focus:ring-black text-gray-900 bg-white" />
              </div>
            </div>
            <Button variant="black" size="large" className="w-full py-3">Book Hall</Button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
