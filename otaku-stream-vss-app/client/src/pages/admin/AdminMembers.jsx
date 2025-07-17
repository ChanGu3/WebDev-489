import React, { useEffect, useState } from 'react';
import './AdminMembers.css';

function AdminMembers() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [limit] = useState(10);
  const [offset, setOffset] = useState(0);

  const fetchMembers = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/authorize/admin/members?limit=${limit}&offset=${offset}`, { credentials: 'include' });
      const data = await res.json();
      setMembers(data.members || []);
    } catch (e) {
      setError('Failed to load members');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
    // eslint-disable-next-line
  }, [offset]);

  const handleBan = async (email, isBanned) => {
    try {
      await fetch(`/api/authorize/admin/members/${email}/ban${isBanned === false ? '?isBanned=false' : ''}`, {
        method: 'POST',
        credentials: 'include',
      });
      fetchMembers();
    } catch (e) {
      alert('Failed to update ban status');
    }
  };

  return (
    <div className="admin-members-container">
      <h2>Member List</h2>
      {loading ? <div>Loading...</div> : error ? <div>{error}</div> : (
        <table className="admin-members-table">
          <thead>
            <tr>
              <th>Sign-up Date</th>
              <th>Email</th>
              <th>Account Type</th>
              <th>Ban?</th>
            </tr>
          </thead>
          <tbody>
            {members.map((m, i) => (
              <tr key={i}>
                <td>{m.createdAt ? m.createdAt.split('T')[0] : ''}</td>
                <td>{m.email}</td>
                <td>{m.accountType || (m.isPremium ? 'Premium' : 'Free')}</td>
                <td>
                  <button
                    className={m.banned ? 'unban-btn' : 'ban-btn'}
                    onClick={() => handleBan(m.email, m.banned === true ? false : undefined)}
                  >
                    {m.banned ? 'UNBAN' : 'BAN'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <button className="admin-members-more-btn" onClick={() => setOffset(offset + limit)}>View more</button>
    </div>
  );
}

export default AdminMembers; 