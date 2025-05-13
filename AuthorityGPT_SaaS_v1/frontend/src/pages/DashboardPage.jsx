import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link
import { useAuth } from '../hooks/useAuth';

const DashboardPage = () => {
  const { user, loading, fetchUserProfile, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      const token = localStorage.getItem('authToken');
      if (!token) {
        navigate('/login');
      }
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (!user && localStorage.getItem('authToken')) {
      fetchUserProfile();
    }
  }, [user, fetchUserProfile]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <p className="text-xl text-neutral-dark">Loading dashboard...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <p className="text-xl text-neutral-dark">Redirecting to login...</p>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-xl rounded-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-primary">Welcome to your Dashboard, {user.name}!</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-accent text-white rounded hover:bg-accent-dark focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
          >
            Logout
          </button>
        </div>
        <div className="space-y-4 mb-8">
          <p className="text-lg text-neutral-dark">
            <strong className="font-semibold">Email:</strong> {user.email}
          </p>
          <p className="text-lg text-neutral-dark">
            This is your AuthorityGPT dashboard. Start building your authority-based digital business!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Authority Systems Section */}
          <div className="p-6 border border-neutral-medium rounded-md bg-neutral-lightest shadow-sm">
            <h2 className="text-2xl font-semibold text-neutral-darker mb-4">Authority Systems</h2>
            <p className="text-neutral-default mb-4">Access your guided prompt flows here to build out your business systems.</p>
            <ul className="space-y-3">
              <li>
                <Link to="/authority-system-flow/leadflow-builder" className="block p-3 bg-primary text-white rounded hover:bg-primary-dark transition-colors">
                  Leadflow Builder
                </Link>
              </li>
              <li>
                <Link to="/authority-system-flow/newsletter-architect" className="block p-3 bg-primary text-white rounded hover:bg-primary-dark transition-colors">
                  Newsletter Architect
                </Link>
              </li>
              <li>
                <Link to="/authority-system-flow/content-engine" className="block p-3 bg-primary text-white rounded hover:bg-primary-dark transition-colors">
                  Content Engine
                </Link>
              </li>
              {/* Add more systems as they are developed */}
            </ul>
          </div>

          {/* Prompt Generator Section */}
          <div className="p-6 border border-neutral-medium rounded-md bg-neutral-lightest shadow-sm">
            <h2 className="text-2xl font-semibold text-neutral-darker mb-4">Prompt Generator</h2>
            <p className="text-neutral-default mb-4">Generate business-building prompts tailored to your goals and niche.</p>
            <Link to="/prompt-generator" className="inline-block px-6 py-3 bg-secondary text-neutral-darkest font-semibold rounded hover:bg-secondary-dark transition-colors">
              Go to Prompt Generator
            </Link>
          </div>

          {/* AI Copy Generator Section */}
          <div className="p-6 border border-neutral-medium rounded-md bg-neutral-lightest shadow-sm">
            <h2 className="text-2xl font-semibold text-neutral-darker mb-4">AI Copy Generator</h2>
            <p className="text-neutral-default mb-4">Generate powerful copy for your products and niches.</p>
            <Link to="/ai-copy-generator" className="inline-block px-6 py-3 bg-secondary text-neutral-darkest font-semibold rounded hover:bg-secondary-dark transition-colors">
              Go to AI Copy Generator
            </Link>
          </div>

          {/* Admin Section */}
          {user.isAdmin && (
            <div className="p-6 border border-neutral-medium rounded-md bg-neutral-lightest shadow-sm">
              <h2 className="text-2xl font-semibold text-neutral-darker mb-4">Admin</h2>
              <p className="text-neutral-default mb-4">Manage prompt flows and other admin tasks.</p>
              <Link to="/admin/prompt-flows" className="inline-block px-6 py-3 bg-secondary text-neutral-darkest font-semibold rounded hover:bg-secondary-dark transition-colors">
                Go to Admin Interface
              </Link>
            </div>
          )}

          {/* Authority System Builder Section */}
          <div className="p-6 border border-neutral-medium rounded-md bg-neutral-lightest shadow-sm">
            <h2 className="text-2xl font-semibold text-neutral-darker mb-4">Authority System Builder</h2>
            <p className="text-neutral-default mb-4">Build and manage your authority systems.</p>
            <Link to="/authority-system-builder" className="inline-block px-6 py-3 bg-secondary text-neutral-darkest font-semibold rounded hover:bg-secondary-dark transition-colors">
              Go to Authority System Builder
            </Link>
          </div>

          {/* Document Vault Section (Placeholder) */}
          <div className="md:col-span-2 mt-6 p-6 border border-neutral-medium rounded-md bg-neutral-lightest shadow-sm">
            <h2 className="text-2xl font-semibold text-neutral-darker mb-4">Document Vault</h2>
            <p className="text-neutral-default mb-4">Manage and download your generated documents and business plans.</p>
            <Link to="/document-vault" className="inline-block px-6 py-3 bg-neutral-dark text-white rounded hover:bg-neutral-darker transition-colors">
              Open Document Vault
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
