import React, { useEffect, useState } from 'react';
import './AdminAnime.css';

function UploadEditModal({ onClose }) {
  return (
    <div className="admin-anime-modal-overlay" onClick={onClose}>
      <div className="admin-anime-modal" onClick={e => e.stopPropagation()}>
        <h2 className="admin-anime-modal-title">Upload/Edit</h2>
        <form className="admin-anime-modal-form">
          <div className="admin-anime-modal-section">
            <h3>Anime</h3>
            <label>Title:<input type="text" placeholder="anime title..." /></label>
            <label>Description:<textarea placeholder="description..." /></label>
            <label>Copyright:<input type="text" placeholder="copyright name" /></label>
            <label>Original Translation:<input type="text" placeholder="copyright name" /></label>
            <label>Cover File:<input type="file" /></label>
          </div>
          <hr style={{ margin: '24px 0', borderColor: '#4ec3fa' }} />
          <div className="admin-anime-modal-section">
            <h3>Movie</h3>
            <label>Movie Title:<input type="text" placeholder="movie title..." /></label>
            <label>Synopsis:<textarea placeholder="description..." /></label>
            <label>Release Date:<input type="date" /></label>
            <label>Cover File:<input type="file" /></label>
            <label>Genre:<input type="text" placeholder="Genres" /></label>
            <label>Other Translation:<input type="text" /></label>
          </div>
          <div className="admin-anime-modal-actions">
            <button type="button" onClick={onClose}>Close</button>
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function AdminAnime() {
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [limit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const fetchAnime = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/authorize/admin/analytics/anime/streams?limit=${limit}&offset=${offset}`, { credentials: 'include' });
      const data = await res.json();
      setAnimeList(data.anime || []);
    } catch (e) {
      setError('Failed to load anime');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnime();
    // eslint-disable-next-line
  }, [offset]);

  return (
    <div className="admin-anime-container">
      <h2>Anime Movies</h2>
      <button className="admin-anime-upload-btn" onClick={() => setShowModal(true)}>Upload</button>
      {loading ? <div>Loading...</div> : error ? <div>{error}</div> : (
        <table className="admin-anime-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Title</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {animeList.map((a, i) => (
              <tr key={i}>
                <td>{a.releaseDate ? a.releaseDate.split('T')[0] : ''}</td>
                <td>{a.title}</td>
                <td><button className="admin-anime-edit-btn">EDIT</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <button className="admin-anime-more-btn" onClick={() => setOffset(offset + limit)}>View more</button>
      {showModal && <UploadEditModal onClose={() => setShowModal(false)} />}
    </div>
  );
}

export default AdminAnime; 