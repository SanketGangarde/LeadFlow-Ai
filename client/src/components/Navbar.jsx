import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Navbar.css';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/', { replace: true });
  };

  return (
    <nav className="navbar">
      <div className="container nav-content">
        <Link to="/" className="brand">
          <span className="brand-icon">✨</span>
          LeadFlow AI
        </Link>
        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          {isAuthenticated ? (
            <>
              <Link to="/admin" className="nav-link">Dashboard</Link>
              <button onClick={handleLogout} className="nav-link btn-primary" style={{ border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="nav-link btn-primary">Admin Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
