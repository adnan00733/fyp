import { useNavigate } from 'react-router-dom';
import { mockIdeas } from '../../data/mockData';
import { Eye, TrendingUp, DollarSign } from 'lucide-react';

export const Recommendations = () => {
  const navigate = useNavigate();
  const validatedIdeas = mockIdeas.filter((idea) => idea.status === 'validated');

  return (
    <div className="container py-4">
      <h2 className="mb-4" style={{ color: '#047857' }}>
        Recommended Ideas
      </h2>

      <div className="row g-4">
        {validatedIdeas.map((idea) => (
          <div key={idea.id} className="col-md-6 col-lg-4">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <h5 className="card-title">{idea.title}</h5>
                  <span className="badge bg-success">Validated</span>
                </div>
                <h6 className="card-subtitle mb-2 text-muted">{idea.market}</h6>
                <p className="card-text">{idea.description}</p>
                <p className="card-text">
                  <strong>Problem:</strong> {idea.problem}
                </p>
                <p className="card-text">
                  <strong>Solution:</strong> {idea.solution}
                </p>
              </div>
              <div className="card-footer bg-white border-top-0">
                <div className="d-grid gap-2">
                  <button
                    className="btn btn-sm text-white"
                    style={{ backgroundColor: '#047857' }}
                    onClick={() => navigate(`/i/ideas/${idea.id}`)}
                  >
                    <Eye size={16} className="me-1" />
                    View Idea
                  </button>
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => navigate(`/i/ideas/${idea.id}/risk`)}
                  >
                    <TrendingUp size={16} className="me-1" />
                    Assess Risk
                  </button>
                  <button
                    className="btn btn-sm"
                    style={{ backgroundColor: '#d4af37', color: 'white' }}
                    onClick={() => navigate(`/i/checkout/${idea.id}`)}
                  >
                    <DollarSign size={16} className="me-1" />
                    Invest Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
