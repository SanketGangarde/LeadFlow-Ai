import Chatbot from '../components/Chatbot';
import LeadForm from '../components/LeadForm';
import '../styles/Landing.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <section className="hero-section">
        <div className="container hero-content">
          <div className="hero-text">
            <h1 className="hero-title">Automate Your Business Growth with AI</h1>
            <p className="hero-subtitle">
              Intelligent lead capture, real-time AI assistance, and automated workflows. Streamline your tech training operations today.
            </p>
            <div className="hero-badges">
              <span className="badge">🚀 MERN Stack</span>
              <span className="badge">🤖 AI/ML</span>
              <span className="badge">⚡ Web Dev</span>
            </div>
          </div>
        </div>
      </section>

      <section className="main-section">
        <div className="container split-layout">
          <div className="layout-col chatbot-col">
            <div className="col-header">
              <h2>Ask our AI Assistant</h2>
              <p>Get instant answers about our training programs and services.</p>
            </div>
            <Chatbot />
          </div>
          
          <div className="layout-col form-col">
            <div className="col-header">
              <h2>Ready to Start?</h2>
              <p>Drop your details and our AI will connect you with the right experts.</p>
            </div>
            <LeadForm />
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
