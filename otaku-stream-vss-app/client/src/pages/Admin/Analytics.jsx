import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarOS from '../../components/NavbarOS.jsx';
import FooterOS from '../../components/FooterOS.jsx';

const Analytics = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col min-h-screen">
      <NavbarOS />
      <main className="flex-grow p-6">
        <button onClick={() => navigate('/admin')} className="text-blue-500 underline mb-4">← Back to Dashboard</button>
        <h2 className="text-2xl font-bold mb-6">Analytics Dashboard</h2>
        <p className="text-gray-700">Charts for watch time, users, and trends.</p>
      </main>
      <FooterOS />
    </div>
  );
};

export default Analytics;