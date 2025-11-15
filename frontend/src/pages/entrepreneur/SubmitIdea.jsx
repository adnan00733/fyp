import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const SubmitIdea = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [market, setMarket] = useState('');
  const [problem, setProblem] = useState('');
  const [solution, setSolution] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => {
      navigate('/e/ideas');
    }, 2000);
  };

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm">
            <div className="card-header" style={{ backgroundColor: '#047857', color: 'white' }}>
              <h4 className="mb-0">Submit New Idea</h4>
            </div>
            <div className="card-body p-4">
              {success && (
                <div className="alert alert-success" role="alert">
                  Idea submitted successfully! Redirecting...
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label fw-bold">
                    Idea Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter a catchy title for your idea"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="description" className="form-label fw-bold">
                    Description
                  </label>
                  <textarea
                    className="form-control"
                    id="description"
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Briefly describe your idea"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="market" className="form-label fw-bold">
                    Target Market
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="market"
                    value={market}
                    onChange={(e) => setMarket(e.target.value)}
                    placeholder="Who is your target market?"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="problem" className="form-label fw-bold">
                    Problem Statement
                  </label>
                  <textarea
                    className="form-control"
                    id="problem"
                    rows={3}
                    value={problem}
                    onChange={(e) => setProblem(e.target.value)}
                    placeholder="What problem does this solve?"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="solution" className="form-label fw-bold">
                    Solution
                  </label>
                  <textarea
                    className="form-control"
                    id="solution"
                    rows={3}
                    value={solution}
                    onChange={(e) => setSolution(e.target.value)}
                    placeholder="How does your idea solve the problem?"
                    required
                  />
                </div>

                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => navigate('/e/dashboard')}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn text-white"
                    style={{ backgroundColor: '#047857' }}
                  >
                    Submit Idea
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
