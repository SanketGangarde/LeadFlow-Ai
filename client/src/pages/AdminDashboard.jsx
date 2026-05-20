import { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Dashboard.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const AdminDashboard = () => {
  const [leads, setLeads] = useState([]);
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [leadsRes, chatsRes] = await Promise.all([
          axios.get(`${API_URL}/leads`),
          axios.get(`${API_URL}/chats`)
        ]);
        setLeads(leadsRes.data);
        setChats(chatsRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const totalLeads = leads.length;
  const hotLeads = leads.filter(l => l.leadStatus === 'Hot').length;

  if (loading) {
    return <div className="container" style={{ padding: '5rem 0', textAlign: 'center' }}>Loading dashboard data...</div>;
  }

  return (
    <div className="dashboard-container container">
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <p>Monitor your AI-automated business pipeline.</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-title">Total Leads</div>
          <div className="stat-value">{totalLeads}</div>
        </div>
        <div className="stat-card">
          <div className="stat-title">Hot Leads 🔥</div>
          <div className="stat-value text-primary">{hotLeads}</div>
        </div>
        <div className="stat-card">
          <div className="stat-title">AI Chats Processed</div>
          <div className="stat-value">{chats.length}</div>
        </div>
      </div>

      <div className="dashboard-section">
        <h2>Recent Leads</h2>
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Interest</th>
                <th>Status</th>
                <th>AI Summary</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {leads.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '2rem' }}>No leads yet.</td>
                </tr>
              ) : (
                leads.map(lead => (
                  <tr key={lead._id}>
                    <td className="font-medium">{lead.name}</td>
                    <td>{lead.email}</td>
                    <td>{lead.interest}</td>
                    <td>
                      <span className={`status-badge status-${lead.leadStatus?.toLowerCase()}`}>
                        {lead.leadStatus || 'Warm'}
                      </span>
                    </td>
                    <td className="ai-summary">{lead.aiSummary || 'Processing...'}</td>
                    <td className="text-sm">{new Date(lead.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="dashboard-section" style={{ marginTop: '3rem' }}>
        <h2>Recent AI Chat History</h2>
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>User Question</th>
                <th>AI Response</th>
              </tr>
            </thead>
            <tbody>
              {chats.length === 0 ? (
                <tr>
                  <td colSpan="3" style={{ textAlign: 'center', padding: '2rem' }}>No chats yet.</td>
                </tr>
              ) : (
                chats.slice(0, 10).map(chat => (
                  <tr key={chat._id}>
                    <td className="text-sm" style={{ width: '15%' }}>{new Date(chat.createdAt).toLocaleString()}</td>
                    <td style={{ width: '35%' }} className="text-dark">"{chat.userMessage}"</td>
                    <td style={{ width: '50%', color: 'var(--text-light)' }}>{chat.botReply}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
