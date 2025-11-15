import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Upload, ArrowLeft } from 'lucide-react';

export const UploadDocs = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [businessPlan, setBusinessPlan] = useState(null);
  const [marketResearch, setMarketResearch] = useState(null);
  const [financials, setFinancials] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => {
      navigate(`/e/ideas/${id}`);
    }, 2000);
  };

  return (
    <div className="container py-4">
      <button className="btn btn-link ps-0 mb-3" onClick={() => navigate(`/e/ideas/${id}`)}>
        <ArrowLeft size={18} className="me-1" />
        Back to Idea
      </button>

      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm">
            <div className="card-header" style={{ backgroundColor: '#047857', color: 'white' }}>
              <h4 className="mb-0">Upload Documents</h4>
            </div>
            <div className="card-body p-4">
              {success && (
                <div className="alert alert-success" role="alert">
                  Documents uploaded successfully! Redirecting...
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="businessPlan" className="form-label fw-bold">
                    Business Plan
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="businessPlan"
                    onChange={(e) => setBusinessPlan(e.target.files?.[0] || null)}
                    accept=".pdf,.doc,.docx"
                  />
                  {businessPlan && (
                    <div className="form-text text-success">Selected: {businessPlan.name}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="marketResearch" className="form-label fw-bold">
                    Market Research
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="marketResearch"
                    onChange={(e) => setMarketResearch(e.target.files?.[0] || null)}
                    accept=".pdf,.doc,.docx"
                  />
                  {marketResearch && (
                    <div className="form-text text-success">Selected: {marketResearch.name}</div>
                  )}
                </div>

                <div className="mb-4">
                  <label htmlFor="financials" className="form-label fw-bold">
                    Financial Projections
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="financials"
                    onChange={(e) => setFinancials(e.target.files?.[0] || null)}
                    accept=".pdf,.xls,.xlsx"
                  />
                  {financials && (
                    <div className="form-text text-success">Selected: {financials.name}</div>
                  )}
                </div>

                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => navigate(`/e/ideas/${id}`)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn text-white"
                    style={{ backgroundColor: '#047857' }}
                  >
                    <Upload size={18} className="me-2" />
                    Upload Documents
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
