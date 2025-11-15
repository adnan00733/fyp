import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, MessageSquare } from 'lucide-react';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#047857' }}>
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/">
          Investmate Nexus
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {!user ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to={user.role === 'entrepreneur' ? '/e/dashboard' : '/i/dashboard'}
                  >
                    Dashboard
                  </Link>
                </li>
                {user.role === 'entrepreneur' && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/e/ideas">
                      My Ideas
                    </Link>
                  </li>
                )}
                {user.role === 'investor' && (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/i/recommendations">
                        Recommendations
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/i/portfolio">
                        Portfolio
                      </Link>
                    </li>
                  </>
                )}
                <li className="nav-item">
                  <Link className="nav-link" to="/chat">
                    <MessageSquare size={18} className="me-1" />
                    Messages
                  </Link>
                </li>
                <li className="nav-item">
                  <span className="nav-link">
                    <span className="me-2">{user.name}</span>
                  </span>
                </li>
                <li className="nav-item">
                  <button className="btn btn-link nav-link" onClick={handleLogout}>
                    <LogOut size={18} />
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
