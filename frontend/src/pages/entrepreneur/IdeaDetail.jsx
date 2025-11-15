import { useParams, useNavigate } from 'react-router-dom';
import { mockIdeas } from '../../data/mockData';
import { Upload, FileText, ArrowLeft } from 'lucide-react';

export const IdeaDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const idea = mockIdeas.find((i) => i.id === id);

  if (!idea) {
    return (
      <div className="container py-4">
        <div className="alert alert-danger">Idea not found</div>
      </div>
    );
  }

  const getStatusBadge = (status) => {
    const badges = {
      pending: 'bg-secondary',
      validated: 'bg-success',
      revision: 'bg-warning',
      rejected: 'bg-danger',
    };
    return badges[status] || 'bg-secondary';
  };

  return (
    <div className="container py-4">
      <button className="btn btn-link ps-0 mb-3" onClick={() => navigate('/e/ideas')}>
        <ArrowLeft size={18} className="me-1" />
        Back to Ideas
      </button>

      <div className="row">
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <h3 style={{ color: '#047857' }}>{idea.title}</h3>
                <span className={`badge ${getStatusBadge(idea.status)}`}>{idea.status}</span>
              </div>

              <div className="mb-4">
                <h6 className="text-muted">Description</h6>
                <p>{idea.description}</p>
              </div>

              <div className="mb-4">
                <h6 className="text-muted">Target Market</h6>
                <p>{idea.market}</p>
              </div>

              <div className="mb-4">
                <h6 className="text-muted">Problem Statement</h6>
                <p>{idea.problem}</p>
              </div>

              <div className="mb-4">
                <h6 className="text-muted">Solution</h6>
                <p>{idea.solution}</p>
              </div>

              <div className="mb-3">
                <h6 className="text-muted">Documents</h6>
                {idea.documents && idea.documents.length > 0 ? (
                  <div className="list-group">
                    {idea.documents.map((doc, index) => (
                      <div key={index} className="list-group-item">
                        <FileText size={18} className="me-2" />
                        {doc}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted">No documents uploaded</p>
                )}
              </div>

              <button
                className="btn text-white"
                style={{ backgroundColor: '#047857' }}
                onClick={() => navigate(`/e/ideas/${idea.id}/docs`)}
              >
                <Upload size={18} className="me-2" />
                Upload Documents
              </button>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card border-0 shadow-sm">
            <div className="card-header" style={{ backgroundColor: '#047857', color: 'white' }}>
              <h6 className="mb-0">Feedback</h6>
            </div>
            <div className="card-body">
              {idea.feedback && idea.feedback.length > 0 ? (
                <ul className="list-unstyled mb-0">
                  {idea.feedback.map((fb, index) => (
                    <li key={index} className="mb-2">
                      <div className="alert alert-info mb-0" role="alert">
                        {fb}
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted mb-0">No feedback yet</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
