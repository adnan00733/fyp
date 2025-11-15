import { useNavigate } from 'react-router-dom';
import { mockInvestments, mockIdeas } from '../../data/mockData';
import { TrendingUp, Lightbulb } from 'lucide-react';

export const InvestorDashboard = () => {
  const navigate = useNavigate();
  const totalInvestment = mockInvestments.reduce((sum, inv) => sum + inv.amount, 0);
  const recommendations = mockIdeas.filter((idea) => idea.status === 'validated').slice(0, 3);

  return (
    <div className="container py-4">
      <h2 className="mb-4" style={{ color: '#047857' }}>
        Investor Dashboard
      </h2>

      <div className="row g-4 mb-4">
        <div className="col-md-6">
          <div className="card border-0 shadow-sm">
            <div className="card-body text-center">
              <TrendingUp size={32} style={{ color: '#d4af37' }} className="mb-2" />
              <h3 className="mb-0">${totalInvestment.toLocaleString()}</h3>
              <p className="text-muted mb-0">Total Portfolio Value</p>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card border-0 shadow-sm">
            <div className="card-body text-center">
              <Lightbulb size={32} style={{ color: '#d4af37' }} className="mb-2" />
              <h3 className="mb-0">{mockInvestments.length}</h3>
              <p className="text-muted mb-0">Active Investments</p>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-6 mb-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-header" style={{ backgroundColor: '#047857', color: 'white' }}>
              <h5 className="mb-0">Portfolio Snapshot</h5>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead>
                    <tr>
                      <th>Idea</th>
                      <th>Investment</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockInvestments.map((investment) => (
                      <tr key={investment.id}>
                        <td>{investment.ideaTitle}</td>
                        <td>${investment.amount.toLocaleString()}</td>
                        <td>
                          <span className="badge bg-success">{investment.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="text-center mt-3">
                <button
                  className="btn text-white"
                  style={{ backgroundColor: '#047857' }}
                  onClick={() => navigate('/i/portfolio')}
                >
                  View Full Portfolio
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-6 mb-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-header" style={{ backgroundColor: '#047857', color: 'white' }}>
              <h5 className="mb-0">Recommended Ideas</h5>
            </div>
            <div className="card-body">
              {recommendations.map((idea) => (
                <div key={idea.id} className="card mb-3">
                  <div className="card-body">
                    <h6 className="card-title">{idea.title}</h6>
                    <p className="card-text text-muted small">{idea.description}</p>
                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-sm text-white"
                        style={{ backgroundColor: '#047857' }}
                        onClick={() => navigate(`/i/ideas/${idea.id}`)}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <div className="text-center">
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => navigate('/i/recommendations')}
                >
                  View All Recommendations
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
