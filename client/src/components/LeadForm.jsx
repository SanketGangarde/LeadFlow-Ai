import { useState } from 'react';
import axios from 'axios';
import '../styles/Form.css';

const API_URL = import.meta.env.VITE_API_URL || 'https://leadflow-ai-03sa.onrender.com/api';

const LeadForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: 'MERN Stack Training',
    message: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      await axios.post(`${API_URL}/leads`, formData);
      setStatus({ type: 'success', message: 'Thank you! We will get in touch shortly.' });
      setFormData({ name: '', email: '', phone: '', interest: 'MERN Stack Training', message: '' });
    } catch (error) {
      setStatus({ type: 'error', message: 'Failed to submit form. Please try again later.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-card">
      <div className="form-header">
        <h3>Request Information</h3>
        <p>Fill out the form below and our AI will process your request.</p>
      </div>
      
      {status.message && (
        <div className={`form-alert ${status.type}`}>
          {status.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="lead-form">
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="interest">Area of Interest</label>
          <select id="interest" name="interest" value={formData.interest} onChange={handleChange}>
            <option value="MERN Stack Training">MERN Stack Training</option>
            <option value="AI/ML Training">AI/ML Training</option>
            <option value="Python Development">Python Development</option>
            <option value="Web Development">Web Development</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="message">How can we help?</label>
          <textarea id="message" name="message" rows="4" value={formData.message} onChange={handleChange} required></textarea>
        </div>

        <button type="submit" className="btn-primary form-submit" disabled={isSubmitting}>
          {isSubmitting ? 'Processing...' : 'Submit Request'}
        </button>
      </form>
    </div>
  );
};

export default LeadForm;
