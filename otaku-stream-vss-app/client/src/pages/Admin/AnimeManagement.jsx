import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarOS from '../../components/NavbarOS.jsx';
import FooterOS from '../../components/FooterOS.jsx';

const AnimeManagement = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    genre: '',
    ageRestriction: '',
    availability: 'free',
    video: null,
    thumbnail: null,
    subtitles: null,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = new FormData();
    Object.entries(formData).forEach(([key, val]) => payload.append(key, val));

    try {
      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: payload,
      });
      const data = await response.json();
      alert(data.message || 'Upload successful');
    } catch (err) {
      alert('Upload failed');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavbarOS />
      <main className="flex-grow p-6">
        <button onClick={() => navigate('/admin')} className="text-blue-500 underline mb-4">← Back to Dashboard</button>
        <h2 className="text-2xl font-bold mb-6">Manage Anime Uploads</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input name="title" onChange={handleChange} placeholder="Title" className="block w-full border p-2" />
          <textarea name="description" onChange={handleChange} placeholder="Description" className="block w-full border p-2" />
          <input name="genre" onChange={handleChange} placeholder="Genre" className="block w-full border p-2" />
          <input name="ageRestriction" onChange={handleChange} placeholder="Age Restriction" className="block w-full border p-2" />
          <select name="availability" onChange={handleChange} className="block w-full border p-2">
            <option value="free">Free</option>
            <option value="premium">Premium</option>
          </select>
          <input type="file" name="video" onChange={handleChange} className="block w-full" />
          <input type="file" name="thumbnail" onChange={handleChange} className="block w-full" />
          <input type="file" name="subtitles" onChange={handleChange} className="block w-full" />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2">Upload</button>
        </form>
      </main>
      <FooterOS />
    </div>
  );
};

export default AnimeManagement;