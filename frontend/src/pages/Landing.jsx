import { useNavigate } from 'react-router-dom';
import { Lightbulb, TrendingUp } from 'lucide-react';

export const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-vh-100" style={{ backgroundColor: '#f5f5dc' }}>
      <div className="container py-5">
        <div className="text-center mb-5">
          <h1 className="display-3 fw-bold mb-3" style={{ color: '#047857' }}>
            Welcome to Investmate Nexus
          </h1>
          <p className="lead text-muted">
            Connecting innovative entrepreneurs with forward-thinking investors
          </p>
        </div>

        <div className="row g-4 justify-content-center">
          <div className="col-md-5">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body text-center p-5">
                <div className="mb-4">
                  <Lightbulb size={64} style={{ color: '#d4af37' }} />
                </div>
                <h3 className="card-title mb-3" style={{ color: '#047857' }}>
                  For Entrepreneurs
                </h3>
                <p className="card-text text-muted mb-4">
                  Submit your innovative ideas, get validation, and connect with investors
                  who believe in your vision.
                </p>
                <div className="d-grid gap-2">
                  <button
                    className="btn btn-lg text-white"
                    style={{ backgroundColor: '#047857' }}
                    onClick={() => navigate('/register')}
                  >
                    Get Started
                  </button>
                  <button
                    className="btn btn-lg btn-outline-secondary"
                    onClick={() => navigate('/login')}
                  >
                    Login
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-5">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body text-center p-5">
                <div className="mb-4">
                  <TrendingUp size={64} style={{ color: '#d4af37' }} />
                </div>
                <h3 className="card-title mb-3" style={{ color: '#047857' }}>
                  For Investors
                </h3>
                <p className="card-text text-muted mb-4">
                  Discover validated startup ideas, assess risks, and invest in the next
                  big thing with confidence.
                </p>
                <div className="d-grid gap-2">
                  <button
                    className="btn btn-lg text-white"
                    style={{ backgroundColor: '#047857' }}
                    onClick={() => navigate('/register')}
                  >
                    Get Started
                  </button>
                  <button
                    className="btn btn-lg btn-outline-secondary"
                    onClick={() => navigate('/login')}
                  >
                    Login
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
