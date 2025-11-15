import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !password || !role) {
      setError('All fields are required');
      return;
    }

    const success = register(name, email, password, role);
    if (success) {
      if (role === 'entrepreneur') {
        navigate('/e/dashboard');
      } else {
        navigate('/i/dashboard');
      }
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center" style={{ backgroundColor: '#f5f5dc' }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="card shadow-sm border-0">
              <div className="card-body p-5">
                <h2 className="text-center mb-4" style={{ color: '#047857' }}>
                  Create Account
                </h2>

                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name"
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Create a password"
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="role" className="form-label">
                      I am a/an
                    </label>
                    <select
                      className="form-select"
                      id="role"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    >
                      <option value="">Select your role</option>
                      <option value="entrepreneur">Entrepreneur</option>
                      <option value="investor">Investor</option>
                    </select>
                  </div>

                  <div className="d-grid">
                    <button
                      type="submit"
                      className="btn btn-lg text-white"
                      style={{ backgroundColor: '#047857' }}
                    >
                      Create Account
                    </button>
                  </div>
                </form>

                <div className="text-center mt-3">
                  <p className="text-muted">
                    Already have an account?{' '}
                    <Link to="/login" style={{ color: '#047857' }}>
                      Login here
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
