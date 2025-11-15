import { useNavigate } from 'react-router-dom';
import { mockIdeas } from '../../data/mockData';
import { Plus, CheckCircle, Clock, AlertCircle } from 'lucide-react';

export const EntrepreneurDashboard = () => {
  const navigate = useNavigate();

  const pendingIdeas = mockIdeas.filter((idea) => idea.status === 'pending');
  const validatedIdeas = mockIdeas.filter((idea) => idea.status === 'validated');
  const revisionIdeas = mockIdeas.filter((idea) => idea.status === 'revision');

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 style={{ color: '#047857' }}>Entrepreneur Dashboard</h2>
        <button
          className="btn text-white"
          style={{ backgroundColor: '#047857' }}
          onClick={() => navigate('/e/ideas/new')}
        >
          <Plus size={18} className="me-2" />
          Submit New Idea
        </button>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-md-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body text-center">
              <Clock size={32} className="text-warning mb-2" />
              <h3 className="mb-0">{pendingIdeas.length}</h3>
              <p className="text-muted mb-0">Pending Ideas</p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body text-center">
              <CheckCircle size={32} className="text-success mb-2" />
              <h3 className="mb-0">{validatedIdeas.length}</h3>
              <p className="text-muted mb-0">Validated Ideas</p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body text-center">
              <AlertCircle size={32} className="text-danger mb-2" />
              <h3 className="mb-0">{revisionIdeas.length}</h3>
              <p className="text-muted mb-0">Needs Revision</p>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <div className="card border-0 shadow-sm">
            <div className="card-header" style={{ backgroundColor: '#047857', color: 'white' }}>
              <h5 className="mb-0">Recent Feedback</h5>
            </div>
            <div className="card-body">
              {mockIdeas.filter((idea) => idea.feedback && idea.feedback.length > 0).length === 0 ? (
                <p className="text-muted text-center mb-0">No feedback yet</p>
              ) : (
                <div className="list-group list-group-flush">
                  {mockIdeas
                    .filter((idea) => idea.feedback && idea.feedback.length > 0)
                    .map((idea) => (
                      <div
                        key={idea.id}
                        className="list-group-item list-group-item-action"
                        onClick={() => navigate(`/e/ideas/${idea.id}`)}
                        style={{ cursor: 'pointer' }}
                      >
                        <div className="d-flex justify-content-between align-items-start">
                          <div>
                            <h6 className="mb-1">{idea.title}</h6>
                            <p className="mb-1 text-muted small">
                              {idea.feedback?.[0]}
                            </p>
                          </div>
                          <span
                            className={`badge ${
                              idea.status === 'validated'
                                ? 'bg-success'
                                : idea.status === 'revision'
                                ? 'bg-warning'
                                : 'bg-secondary'
                            }`}
                          >
                            {idea.status}
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
