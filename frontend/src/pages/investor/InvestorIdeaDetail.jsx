import { useParams, useNavigate } from 'react-router-dom';
import { mockIdeas } from '../../data/mockData';
import { ArrowLeft, TrendingUp, MessageCircle, DollarSign, FileText } from 'lucide-react';

export const InvestorIdeaDetail = () => {
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

  return (
    <div className="container py-4">
      <button className="btn btn-link ps-0 mb-3" onClick={() => navigate('/i/recommendations')}>
        <ArrowLeft size={18} className="me-1" />
        Back to Recommendations
      </button>

      <div className="row">
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <h3 style={{ color: '#047857' }}>{idea.title}</h3>
                <span className="badge bg-success">{idea.status}</span>
              </div>

              <div className="mb-3">
                <h6 className="text-muted">Entrepreneur</h6>
                <p>{idea.entrepreneurName}</p>
              </div>

              <div className="mb-3">
                <h6 className="text-muted">Description</h6>
                <p>{idea.description}</p>
              </div>

              <div className="mb-3">
                <h6 className="text-muted">Target Market</h6>
                <p>{idea.market}</p>
              </div>

              <div className="mb-3">
                <h6 className="text-muted">Problem Statement</h6>
                <p>{idea.problem}</p>
              </div>

              <div className="mb-3">
                <h6 className="text-muted">Solution</h6>
                <p>{idea.solution}</p>
              </div>

              <div className="mb-4">
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
                  <p className="text-muted">No documents available</p>
                )}
              </div>

              <div className="d-grid gap-2 d-md-flex">
                <button
                  className="btn text-white"
                  style={{ backgroundColor: '#047857' }}
                  onClick={() => navigate(`/i/ideas/${idea.id}/risk`)}
                >
                  <TrendingUp size={18} className="me-2" />
                  Assess Risk
                </button>
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => navigate('/chat')}
                >
                  <MessageCircle size={18} className="me-2" />
                  Message Founder
                </button>
                <button
                  className="btn"
                  style={{ backgroundColor: '#d4af37', color: 'white' }}
                  onClick={() => navigate(`/i/checkout/${idea.id}`)}
                >
                  <DollarSign size={18} className="me-2" />
                  Invest Now
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card border-0 shadow-sm mb-3">
            <div className="card-header" style={{ backgroundColor: '#047857', color: 'white' }}>
              <h6 className="mb-0">Validation Status</h6>
            </div>
            <div className="card-body">
              <div className="alert alert-success mb-0">
                <strong>Validated</strong>
                <p className="mb-0 mt-2 small">
                  This idea has been reviewed and validated by our team of experts.
                </p>
              </div>
            </div>
          </div>

          <div className="card border-0 shadow-sm">
            <div className="card-header" style={{ backgroundColor: '#047857', color: 'white' }}>
              <h6 className="mb-0">Investment Insights</h6>
            </div>
            <div className="card-body">
              <ul className="list-unstyled mb-0">
                <li className="mb-2">
                  <strong>Market Size:</strong> Large
                </li>
                <li className="mb-2">
                  <strong>Competition:</strong> Moderate
                </li>
                <li className="mb-2">
                  <strong>Growth Potential:</strong> High
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
