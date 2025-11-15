import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockIdeas } from '../../data/mockData';
import { Eye } from 'lucide-react';

export const MyIdeas = () => {
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();

  const filteredIdeas =
    filter === 'all' ? mockIdeas : mockIdeas.filter((idea) => idea.status === filter);

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
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 style={{ color: '#047857' }}>My Ideas</h2>
        <div className="d-flex gap-2">
          <select
            className="form-select"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{ width: 'auto' }}
          >
            <option value="all">All Ideas</option>
            <option value="pending">Pending</option>
            <option value="validated">Validated</option>
            <option value="revision">Needs Revision</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Market</th>
                  <th>Status</th>
                  <th>Submitted Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredIdeas.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center text-muted">
                      No ideas found
                    </td>
                  </tr>
                ) : (
                  filteredIdeas.map((idea) => (
                    <tr key={idea.id}>
                      <td>
                        <strong>{idea.title}</strong>
                      </td>
                      <td>{idea.market}</td>
                      <td>
                        <span className={`badge ${getStatusBadge(idea.status)}`}>
                          {idea.status}
                        </span>
                      </td>
                      <td>{idea.createdAt}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => navigate(`/e/ideas/${idea.id}`)}
                        >
                          <Eye size={16} className="me-1" />
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
