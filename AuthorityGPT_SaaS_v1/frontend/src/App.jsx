import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext'; // Ensure useAuth is exported if needed here, or just AuthProvider

import Layout from './components/Core/Layout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import PromptGeneratorPage from './pages/PromptGeneratorPage';
import DocumentVaultPage from './pages/DocumentVaultPage';
import AuthoritySystemFlowPage from './pages/AuthoritySystemFlowPage';
import LicensingPage from './pages/LicensingPage';
import OnboardingWizardPage from './pages/OnboardingWizardPage';
import NotFoundPage from './pages/NotFoundPage';
import AICopyGeneratorPage from './pages/AICopyGeneratorPage'; // Import the new page
import ClientPortalPage from './pages/ClientPortalPage'; // Import the new page
import AdminPromptFlowPage from './pages/AdminPromptFlowPage'; // Import the new page
import AuthoritySystemBuilderPage from './pages/AuthoritySystemBuilderPage'; // Import the new page

// ProtectedRoute component
const ProtectedRoute = ({ children, requiredLicense = false, requiredAdmin = false }) => {
  const { user, loading } = useAuth();

  if (loading) {
    // You can show a loading spinner here
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredLicense && !user.hasLicensing) {
    return <Navigate to="/licensing" replace />;
  }

  if (requiredAdmin && !user.isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

function AppContent() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/prompt-generator"
          element={
            <ProtectedRoute>
              <PromptGeneratorPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/document-vault"
          element={
            <ProtectedRoute>
              <DocumentVaultPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/authority-system-flow/:systemId" // Example dynamic route
          element={
            <ProtectedRoute>
              <AuthoritySystemFlowPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/licensing"
          element={
            <ProtectedRoute>
              <LicensingPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/onboarding"
          element={
            <ProtectedRoute> {/* Or maybe onboarding is accessible before full auth? Depends on flow */}
              <OnboardingWizardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ai-copy-generator"
          element={
            <ProtectedRoute>
              <AICopyGeneratorPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/client-portal"
          element={
            <ProtectedRoute requiredLicense>
              <ClientPortalPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/prompt-flows"
          element={
            <ProtectedRoute requiredAdmin>
              <AdminPromptFlowPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/authority-system-builder"
          element={
            <ProtectedRoute>
              <AuthoritySystemBuilderPage />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
