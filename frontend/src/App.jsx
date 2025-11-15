import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar.jsx';

import { Landing } from './pages/Landing.jsx';
import { Login } from './pages/Login.jsx';
import { Register } from './pages/Register.jsx';
import { Chat } from './pages/Chat.jsx';

import { EntrepreneurDashboard } from './pages/entrepreneur/EntrepreneurDashboard.jsx';
import { SubmitIdea } from './pages/entrepreneur/SubmitIdea.jsx';
import { MyIdeas } from './pages/entrepreneur/MyIdeas.jsx';
import { IdeaDetail } from './pages/entrepreneur/IdeaDetail.jsx';
import { UploadDocs } from './pages/entrepreneur/UploadDocs.jsx';

import { InvestorDashboard } from './pages/investor/InvestorDashboard.jsx';
import { Recommendations } from './pages/investor/Recommendations.jsx';
import { InvestorIdeaDetail } from './pages/investor/InvestorIdeaDetail.jsx';
import { RiskAssessment } from './pages/investor/RiskAssessment.jsx';
import { Portfolio } from './pages/investor/Portfolio.jsx';
import { Checkout } from './pages/investor/Checkout.jsx';

const ProtectedRoute = ({ children, role }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/" />;
  }

  return children;
};

function AppContent() {
  return (
    <div className="d-flex flex-column min-vh-100" style={{ backgroundColor: '#f5f5dc' }}>
      <Navbar />
      <div className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/chat"
            element={
              <ProtectedRoute>
                <Chat />
              </ProtectedRoute>
            }
          />

          <Route
            path="/e/dashboard"
            element={
              <ProtectedRoute role="entrepreneur">
                <EntrepreneurDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/e/ideas/new"
            element={
              <ProtectedRoute role="entrepreneur">
                <SubmitIdea />
              </ProtectedRoute>
            }
          />
          <Route
            path="/e/ideas"
            element={
              <ProtectedRoute role="entrepreneur">
                <MyIdeas />
              </ProtectedRoute>
            }
          />
          <Route
            path="/e/ideas/:id"
            element={
              <ProtectedRoute role="entrepreneur">
                <IdeaDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/e/ideas/:id/docs"
            element={
              <ProtectedRoute role="entrepreneur">
                <UploadDocs />
              </ProtectedRoute>
            }
          />

          <Route
            path="/i/dashboard"
            element={
              <ProtectedRoute role="investor">
                <InvestorDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/i/recommendations"
            element={
              <ProtectedRoute role="investor">
                <Recommendations />
              </ProtectedRoute>
            }
          />
          <Route
            path="/i/ideas/:id"
            element={
              <ProtectedRoute role="investor">
                <InvestorIdeaDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/i/ideas/:id/risk"
            element={
              <ProtectedRoute role="investor">
                <RiskAssessment />
              </ProtectedRoute>
            }
          />
          <Route
            path="/i/portfolio"
            element={
              <ProtectedRoute role="investor">
                <Portfolio />
              </ProtectedRoute>
            }
          />
          <Route
            path="/i/checkout/:ideaId"
            element={
              <ProtectedRoute role="investor">
                <Checkout />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
