import React from 'react';
import NavbarOS from '../../components/NavbarOS';
import FooterOS from '../../components/FooterOS';
import SettingsSidebar from '../../components/SettingsSidebar';
import './ManageMembership.css';
import { useState } from 'react';

function ManageMembership() {
  const [loading, setLoading] = useState(false);

  const handleUpgrade = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/premium/upgrade', {
        method: 'POST',
        credentials: 'include',
      });
      const data = await res.json();
      if (res.ok && data.success) {
        alert('Premium upgrade successful!');
      } else {
        alert(data.error || 'Upgrade failed');
      }
    } catch (err) {
      alert('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavbarOS />
      <main className="manage-membership-layout">
        <aside className="settings-sidebar-fixed">
          <SettingsSidebar />
        </aside>
        <div className="manage-membership-main-centered">
          <h1 className="manage-membership-title">Manage Membership</h1>
          <section className="membership-current-section">
            <div className="membership-current-box">
              <div>
                <div className="current-label">Current Subscription</div>
                <div className="current-plan">Free Plan</div>
                <div className="current-desc">HD quality, Limited content, With ads</div>
                <div className="current-note">Upgrade anytime to unlock premium features</div>
              </div>
              <div className="current-price">Free</div>
            </div>
          </section>
          <section className="membership-plan-section">
            <div className="membership-plan-card">
              <div className="plan-title">Free</div>
              <div className="plan-price">$ 0</div>
              <ul>
                <li>HD quality (720p)</li>
                <li>1 device streaming</li>
                <li>With advertisements</li>
                <li>Limited anime library</li>
              </ul>
              <button className="current-btn" disabled>Current Plan</button>
            </div>
            <div className="membership-plan-card premium">
              <div className="plan-title">Premium</div>
              <div className="plan-price">$ 999</div>
              <ul>
                <li>4K Ultra HD quality</li>
                <li>4 devices streaming</li>
                <li>Full anime library access</li>
                <li>Ad-free experience</li>
              </ul>
              <button className="upgrade-btn" onClick={handleUpgrade} disabled={loading}>
                {loading ? 'Upgrading...' : 'Upgrade Now'}
              </button>
            </div>
          </section>
        </div>
      </main>
      <FooterOS />
    </>
  );
}

export default ManageMembership; 