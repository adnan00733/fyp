import { useState } from 'react';
import { mockInvestments } from '../../data/mockData';
import { CreditCard as Edit2, Save } from 'lucide-react';

export const Portfolio = () => {
  const [investments, setInvestments] = useState(mockInvestments);
  const [editingId, setEditingId] = useState(null);
  const [editAmount, setEditAmount] = useState('');

  const totalValue = investments.reduce((sum, inv) => sum + inv.amount, 0);

  const handleEdit = (id, currentAmount) => {
    setEditingId(id);
    setEditAmount(currentAmount.toString());
  };

  const handleSave = (id) => {
    setInvestments(
      investments.map((inv) =>
        inv.id === id ? { ...inv, amount: parseFloat(editAmount) } : inv
      )
    );
    setEditingId(null);
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4" style={{ color: '#047857' }}>
        Investment Portfolio
      </h2>

      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body text-center p-4">
          <h3 className="mb-2">Total Portfolio Value</h3>
          <h2 style={{ color: '#047857' }}>${totalValue.toLocaleString()}</h2>
        </div>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead>
                <tr>
                  <th>Idea</th>
                  <th>Investment Amount</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {investments.map((investment) => (
                  <tr key={investment.id}>
                    <td>
                      <strong>{investment.ideaTitle}</strong>
                    </td>
                    <td>
                      {editingId === investment.id ? (
                        <input
                          type="number"
                          className="form-control form-control-sm"
                          value={editAmount}
                          onChange={(e) => setEditAmount(e.target.value)}
                          style={{ width: '150px' }}
                        />
                      ) : (
                        `$${investment.amount.toLocaleString()}`
                      )}
                    </td>
                    <td>{investment.date}</td>
                    <td>
                      <span className="badge bg-success">{investment.status}</span>
                    </td>
                    <td>
                      {editingId === investment.id ? (
                        <button
                          className="btn btn-sm text-white"
                          style={{ backgroundColor: '#047857' }}
                          onClick={() => handleSave(investment.id)}
                        >
                          <Save size={16} className="me-1" />
                          Save
                        </button>
                      ) : (
                        <button
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => handleEdit(investment.id, investment.amount)}
                        >
                          <Edit2 size={16} className="me-1" />
                          Edit
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
