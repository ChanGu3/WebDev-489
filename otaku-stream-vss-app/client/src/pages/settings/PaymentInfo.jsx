import React, { useState, useEffect } from 'react';
import NavbarOS from '../../components/NavbarOS';
import FooterOS from '../../components/FooterOS';
import SettingsSidebar from '../../components/SettingsSidebar';
import { useNavigate } from 'react-router-dom';
import './PaymentInfo.css';
import './PaymentInfoModal.css';

const initialCards = [
  {
    id: 1,
    type: 'Visa',
    number: '**** **** **** 1234',
    expiry: '11/11',
    name: 'John Doe',
    primary: true,
  },
  {
    id: 2,
    type: 'Master Card',
    number: '**** **** **** 5678',
    expiry: '12/12',
    name: 'John Doe',
    primary: false,
  },
];

function PaymentInfo() {
  const navigate = useNavigate();
  const [cards, setCards] = useState(initialCards);
  const [billingHistory, setBillingHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('add');
  const [editCard, setEditCard] = useState(null);
  const [form, setForm] = useState({ type: '', number: '', expiry: '', name: '', cvc: '' });

  useEffect(() => {
    fetchBillingHistory();
  }, []);

  const fetchBillingHistory = async () => {
    try {
      const response = await fetch('/api/billing/recent?limit=10', {
        method: 'GET',
        credentials: 'include',
      });
      
      if (response.ok) {
        const data = await response.json();
        setBillingHistory(data.data || []);
      } else {
        console.error('Failed to fetch billing history');
      }
    } catch (error) {
      console.error('Error fetching billing history:', error);
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setModalType('add');
    setForm({ type: '', number: '', expiry: '', name: '', cvc: '' });
    setShowModal(true);
    setEditCard(null);
  };
  
  const openEditModal = (card) => {
    setModalType('edit');
    setForm({
      type: card.type,
      number: card.number.replace(/\*{4} \*{4} \*{4} /, ''),
      expiry: card.expiry,
      name: card.name,
      cvc: '',
    });
    setEditCard(card);
    setShowModal(true);
  };
  
  const closeModal = () => {
    setShowModal(false);
    setEditCard(null);
  };
  
  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  
  const handleSave = () => {
    if (!form.type || !form.number || !form.expiry || !form.name) return;
    if (modalType === 'add') {
      setCards([
        ...cards,
        {
          id: Date.now(),
          type: form.type,
          number: '**** **** **** ' + form.number.slice(-4),
          expiry: form.expiry,
          name: form.name,
          primary: false,
        },
      ]);
    } else if (modalType === 'edit' && editCard) {
      setCards(cards.map(card =>
        card.id === editCard.id
          ? { ...card, type: form.type, number: '**** **** **** ' + form.number.slice(-4), expiry: form.expiry, name: form.name }
          : card
      ));
    }
    closeModal();
  };

  const setAsPrimary = (cardId) => {
    setCards(cards.map(card => ({
      ...card,
      primary: card.id === cardId
    })));
  };

  const removeCard = (cardId) => {
    const cardToRemove = cards.find(card => card.id === cardId);
    if (cardToRemove.primary && cards.length > 1) {
      const remainingCards = cards.filter(card => card.id !== cardId);
      if (remainingCards.length > 0) {
        remainingCards[0].primary = true;
        setCards(remainingCards);
      }
    } else {
      setCards(cards.filter(card => card.id !== cardId));
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  const handleDownload = (billingId) => {
    alert(`Download functionality for billing record ${billingId} would be implemented here`);
  };

  return (
    <>
      <NavbarOS />
      <main className="main-pi manage-membership-layout">
        <aside className="settings-sidebar-fixed">
          <SettingsSidebar />
        </aside>
        <div className="manage-membership-main-centered">
          <h1 className="page-title">Payment Info</h1>
          <section className="payment-methods-section">
            <div className="section-header">
              <h2>Payment Methods</h2>
              <button className="btn add" onClick={openAddModal}>+ Add</button>
            </div>
            <div className="card-grid">
              {cards.map((card) => (
                <div className={`card${card.primary ? ' card-primary' : ''}`} key={card.id}>
                  <div className="card-header">
                    <span className={`card-type ${card.type.toLowerCase().replace(' ', '-')}`}>{card.type}</span>
                  </div>
                  <div className="card-details">
                    <div>{card.number}</div>
                    <div>Expires: {card.expiry}</div>
                    <div>{card.name}</div>
                  </div>
                  <div className="card-actions">
                    <button className="btn edit" onClick={() => openEditModal(card)}>Edit</button>
                    <button className="btn remove" onClick={() => removeCard(card.id)}>Remove</button>
                    {!card.primary && <button className="btn blue" onClick={() => setAsPrimary(card.id)}>Set as Primary</button>}
                  </div>
                </div>
              ))}
            </div>
          </section>
          <section className="billing-history-section">
            <h2>Recent Billing History</h2>
            {loading ? (
              <div style={{ textAlign: 'center', padding: '20px', color: '#87CEEB' }}>Loading billing history...</div>
            ) : (
              <>
                <table className="billing-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Description</th>
                      <th>Payment Method</th>
                      <th>Amount</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {billingHistory.length > 0 ? (
                      billingHistory.map((billing) => (
                        <tr key={billing.id}>
                          <td>{formatDate(billing.billing_date)}</td>
                          <td>{billing.description}</td>
                          <td>{billing.payment_method}</td>
                          <td>${billing.amount}</td>
                          <td className="paid">{billing.status}</td>
                          <td>
                            <button className="btn download" onClick={() => handleDownload(billing.id)}>
                              Download
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" style={{ textAlign: 'center', color: '#A9A9A9' }}>
                          No billing history available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
                <button className="btn blue full-width" onClick={() => navigate('/settings/billing-history')}>View Full Billing History</button>
              </>
            )}
          </section>
        </div>
      </main>
      {showModal && (
        <div className="payment-modal-overlay" onClick={closeModal}>
          <div className="payment-modal" onClick={e => e.stopPropagation()}>
            <h2 className="payment-modal-title">{modalType === 'add' ? 'Add Payment Method' : 'Edit Payment Method'}</h2>
            <form className="payment-modal-form" onSubmit={e => { e.preventDefault(); handleSave(); }}>
              <label>Card Type
                <select name="type" value={form.type} onChange={handleFormChange} required>
                  <option value="">Select</option>
                  <option value="Visa">Visa</option>
                  <option value="Master Card">Master Card</option>
                  <option value="Amex">Amex</option>
                </select>
              </label>
              <label>Card Number
                <input name="number" type="text" maxLength="16" value={form.number} onChange={handleFormChange} required placeholder="1234 5678 9012 3456" />
              </label>
              <label>Expiry
                <input name="expiry" type="text" maxLength="5" value={form.expiry} onChange={handleFormChange} required placeholder="MM/YY" />
              </label>
              <label>Name on Card
                <input name="name" type="text" value={form.name} onChange={handleFormChange} required placeholder="John Doe" />
              </label>
              <label>CVC
                <input name="cvc" type="password" maxLength="4" value={form.cvc} onChange={handleFormChange} required placeholder="123" />
              </label>
              <div className="payment-modal-actions">
                <button type="button" className="btn cancel" onClick={closeModal}>Cancel</button>
                <button type="submit" className="btn save">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
      <FooterOS />
    </>
  );
}

export default PaymentInfo; 