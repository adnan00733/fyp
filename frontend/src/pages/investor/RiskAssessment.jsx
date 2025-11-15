import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockIdeas } from '../../data/mockData';
import { ArrowLeft } from 'lucide-react';

export const RiskAssessment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const idea = mockIdeas.find((i) => i.id === id);
  const [marketRisk, setMarketRisk] = useState('');
  const [technicalRisk, setTechnicalRisk] = useState('');
  const [financialRisk, setFinancialRisk] = useState('');
  const [result, setResult] = useState(null);

  if (!idea) {
    return (
      <div className="container py-4">
        <div className="alert alert-danger">Idea not found</div>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const risks = ['Low', 'Medium', 'High'];
    const randomRisk = risks[Math.floor(Math.random() * risks.length)];
    setResult(randomRisk);
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'Low':
        return 'success';
      case 'Medium':
        return 'warning';
      case 'High':
        return 'danger';
      default:
        return 'secondary';
    }
  };

  return (
    <div className="container py-4">
      <button className="btn btn-link ps-0 mb-3" onClick={() => navigate(`/i/ideas/${id}`)}>
        <ArrowLeft size={18} className="me-1" />
        Back to Idea
      </button>

      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm">
            <div className="card-header" style={{ backgroundColor: '#047857', color: 'white' }}>
              <h4 className="mb-0">Risk Assessment: {idea.title}</h4>
            </div>
            <div className="card-body p-4">
              {result && (
                <div className={`alert alert-${getRiskColor(result)} mb-4`} role="alert">
                  <h5>Overall Risk Level: {result}</h5>
                  <p className="mb-0">
                    {result === 'Low' &&
                      'This investment shows strong potential with minimal risk factors.'}
                    {result === 'Medium' &&
                      'This investment has moderate risk. Consider diversifying your portfolio.'}
                    {result === 'High' &&
                      'This investment carries significant risk. Proceed with caution.'}
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="form-label fw-bold">Market Risk</label>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="marketRisk"
                      id="marketLow"
                      value="low"
                      checked={marketRisk === 'low'}
                      onChange={(e) => setMarketRisk(e.target.value)}
                      required
                    />
                    <label className="form-check-label" htmlFor="marketLow">
                      Low - Established market with clear demand
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="marketRisk"
                      id="marketMedium"
                      value="medium"
                      checked={marketRisk === 'medium'}
                      onChange={(e) => setMarketRisk(e.target.value)}
                    />
                    <label className="form-check-label" htmlFor="marketMedium">
                      Medium - Growing market with moderate competition
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="marketRisk"
                      id="marketHigh"
                      value="high"
                      checked={marketRisk === 'high'}
                      onChange={(e) => setMarketRisk(e.target.value)}
                    />
                    <label className="form-check-label" htmlFor="marketHigh">
                      High - Unproven market with uncertain demand
                    </label>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="form-label fw-bold">Technical Risk</label>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="technicalRisk"
                      id="technicalLow"
                      value="low"
                      checked={technicalRisk === 'low'}
                      onChange={(e) => setTechnicalRisk(e.target.value)}
                      required
                    />
                    <label className="form-check-label" htmlFor="technicalLow">
                      Low - Proven technology with clear implementation path
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="technicalRisk"
                      id="technicalMedium"
                      value="medium"
                      checked={technicalRisk === 'medium'}
                      onChange={(e) => setTechnicalRisk(e.target.value)}
                    />
                    <label className="form-check-label" htmlFor="technicalMedium">
                      Medium - Requires some technical innovation
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="technicalRisk"
                      id="technicalHigh"
                      value="high"
                      checked={technicalRisk === 'high'}
                      onChange={(e) => setTechnicalRisk(e.target.value)}
                    />
                    <label className="form-check-label" htmlFor="technicalHigh">
                      High - Requires significant R&D and breakthrough technology
                    </label>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="form-label fw-bold">Financial Risk</label>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="financialRisk"
                      id="financialLow"
                      value="low"
                      checked={financialRisk === 'low'}
                      onChange={(e) => setFinancialRisk(e.target.value)}
                      required
                    />
                    <label className="form-check-label" htmlFor="financialLow">
                      Low - Clear revenue model with predictable costs
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="financialRisk"
                      id="financialMedium"
                      value="medium"
                      checked={financialRisk === 'medium'}
                      onChange={(e) => setFinancialRisk(e.target.value)}
                    />
                    <label className="form-check-label" htmlFor="financialMedium">
                      Medium - Viable revenue model with some uncertainty
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="financialRisk"
                      id="financialHigh"
                      value="high"
                      checked={financialRisk === 'high'}
                      onChange={(e) => setFinancialRisk(e.target.value)}
                    />
                    <label className="form-check-label" htmlFor="financialHigh">
                      High - Unproven revenue model or high burn rate
                    </label>
                  </div>
                </div>

                <div className="d-grid">
                  <button
                    type="submit"
                    className="btn btn-lg text-white"
                    style={{ backgroundColor: '#047857' }}
                  >
                    Calculate Risk Assessment
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
