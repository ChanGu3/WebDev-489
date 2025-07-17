import React, { useEffect, useState } from 'react';
import './AdminAnalytics.css';

function AdminAnalytics() {
  const [analytics, setAnalytics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [limit] = useState(10);
  const [offset, setOffset] = useState(0);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/authorize/admin/analytics/anime/streams?limit=${limit}&offset=${offset}`, { credentials: 'include' });
      const data = await res.json();
      setAnalytics(data.analytics || []);
    } catch (e) {
      setError('Failed to load analytics');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
    // eslint-disable-next-line
  }, [offset]);

  return (
    <div className="admin-analytics-container">
      <h2>Movie Analytics</h2>
      {loading ? <div>Loading...</div> : error ? <div>{error}</div> : (
        <table className="admin-analytics-table">
          <thead>
            <tr>
              <th>Anime Title</th>
              <th>Avg Rating</th>
              <th>Movie Title</th>
              <th>Likes</th>
              <th>Views</th>
            </tr>
          </thead>
          <tbody>
            {analytics.map((a, i) => (
              <tr key={i}>
                <td>{a.animeTitle}</td>
                <td>{a.avgRating}</td>
                <td>{a.movieTitle}</td>
                <td>{a.likes}</td>
                <td>{a.views}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <button className="admin-analytics-more-btn" onClick={() => setOffset(offset + limit)}>View more</button>
    </div>
  );
}

export default AdminAnalytics; 