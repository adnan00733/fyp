import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockIdeas } from '../../data/mockData';
import { ArrowLeft, CreditCard } from 'lucide-react';

export const Checkout = () => {
  const { ideaId } = useParams();
  const navigate = useNavigate();
  const idea = mockIdeas.find((i) => i.id === ideaId);
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [success, setSuccess] = useState(false);

  if (!idea) {
    return (
      <div className="container py-4">
        <div className="alert alert-danger">Idea not found</div>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => {
      navigate('/i/portfolio');
    }, 2000);
  };

  return (
    <div className="container py-4">
      <button
        className="btn btn-link ps-0 mb-3"
        onClick={() => navigate(`/i/ideas/${ideaId}`)}
      >
        <ArrowLeft size={18} className="me-1" />
        Back to Idea
      </button>

      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm">
            <div className="card-header" style={{ backgroundColor: '#047857', color: 'white' }}>
              <h4 className="mb-0">Investment Checkout</h4>
            </div>
            <div className="card-body p-4">
              {success && (
                <div className="alert alert-success" role="alert">
                  Investment successful! Redirecting to portfolio...
                </div>
              )}

              <div className="alert alert-info mb-4">
                <h5 className="alert-heading">{idea.title}</h5>
                <p className="mb-0">{idea.description}</p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="amount" className="form-label fw-bold">
                    Investment Amount ($)
                  </label>
                  <input
                    type="number"
                    className="form-control form-control-lg"
                    id="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                    min="1000"
                    step="1000"
                    required
                  />
                  <div className="form-text">Minimum investment: $1,000</div>
                </div>

                <div className="mb-4">
                  <label htmlFor="paymentMethod" className="form-label fw-bold">
                    Payment Method
                  </label>
                  <select
                    className="form-select"
                    id="paymentMethod"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    required
                  >
                    <option value="">Select payment method</option>
                    <option value="credit_card">Credit Card</option>
                    <option value="bank_transfer">Bank Transfer</option>
                    <option value="wire_transfer">Wire Transfer</option>
                    <option value="crypto">Cryptocurrency</option>
                  </select>
                </div>

                {paymentMethod === 'credit_card' && (
                  <div className="mb-4">
                    <div className="card">
                      <div className="card-body">
                        <div className="mb-3">
                          <label className="form-label">Card Number</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="1234 5678 9012 3456"
                          />
                        </div>
                        <div className="row">
                          <div className="col-md-6 mb-3">
                            <label className="form-label">Expiry Date</label>
                            <input type="text" className="form-control" placeholder="MM/YY" />
                          </div>
                          <div className="col-md-6 mb-3">
                            <label className="form-label">CVV</label>
                            <input type="text" className="form-control" placeholder="123" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="d-grid gap-2">
                  <button
                    type="submit"
                    className="btn btn-lg text-white"
                    style={{ backgroundColor: '#d4af37' }}
                  >
                    <CreditCard size={20} className="me-2" />
                    Confirm Investment
                  </button>
                  <button
                    type="button"
                    className="btn btn-lg btn-outline-secondary"
                    onClick={() => navigate(`/i/ideas/${ideaId}`)}
                  >
                    Cancel
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
