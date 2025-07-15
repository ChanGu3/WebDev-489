// src/pages/Admin/AdminDashboard.jsx
import { useNavigate } from 'react-router-dom';
import NavbarOS from '../../components/NavbarOS.jsx';
import FooterOS from '../../components/FooterOS.jsx';

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
      <NavbarOS />
      <main className="flex-grow p-6">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        <ul className="space-y-4 text-lg">
          <li><button onClick={() => navigate('/admin/animeManagement')} className="text-blue-600 underline">Manage Anime</button></li>
          <li><button onClick={() => navigate('/admin/analytics')} className="text-blue-600 underline">View Analytics</button></li>
          <li><button onClick={() => navigate('/admin/userManagement')} className="text-blue-600 underline">Manage Users</button></li>
        </ul>
      </main>
      <FooterOS />
    </div>
  );
};

export default AdminDashboard;