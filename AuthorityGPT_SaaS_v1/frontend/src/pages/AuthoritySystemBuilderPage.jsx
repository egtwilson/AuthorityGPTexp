import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';

const AuthoritySystemBuilderPage = () => {
  const [systems, setSystems] = useState([]);
  const [selectedSystem, setSelectedSystem] = useState(null);
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSystems();
  }, []);

  const fetchSystems = async () => {
    setIsLoading(true);
    try {
      const { data } = await api.get('/authority-systems');
      setSystems(data);
    } catch (error) {
      console.error('Failed to fetch authority systems:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSystemSelect = (system) => {
    setSelectedSystem(system);
    setSteps(system.steps);
    setCurrentStep(0);
    setAnswers({});
  };

  const handleAnswerChange = (e) => {
    setAnswers({ ...answers, [currentStep]: e.target.value });
  };

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSaveAndExport = async () => {
    setIsLoading(true);
    try {
      const { data } = await api.post('/authority-systems/save', {
        systemId: selectedSystem._id,
        answers,
      });
      const docxUrl = `/api/authority-systems/export/docx/${data._id}`;
      const pdfUrl = `/api/authority-systems/export/pdf/${data._id}`;
      window.open(docxUrl, '_blank');
      window.open(pdfUrl, '_blank');
    } catch (error) {
      console.error('Failed to save and export:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-xl rounded-lg p-8">
        <Link to="/dashboard" className="text-sm text-primary hover:text-primary-dark mb-4 inline-block">
          &larr; Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold text-primary mb-6">Authority System Builder</h1>

        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            {!selectedSystem ? (
              <div>
                <h2 className="text-2xl font-semibold text-neutral-darker mb-4">Choose a System</h2>
                <ul className="space-y-3">
                  {systems.map((system) => (
                    <li key={system._id}>
                      <button
                        onClick={() => handleSystemSelect(system)}
                        className="block w-full text-left p-3 bg-primary text-white rounded hover:bg-primary-dark transition-colors"
                      >
                        {system.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div>
                <h2 className="text-2xl font-semibold text-neutral-darker mb-4">{selectedSystem.name}</h2>
                <div className="mb-4">
                  {steps.map((step, index) => (
                    <span
                      key={index}
                      className={`inline-block px-3 py-1 rounded-full ${
                        index === currentStep ? 'bg-primary text-white' : 'bg-neutral-light text-neutral-dark'
                      }`}
                    >
                      {index + 1}
                    </span>
                  ))}
                </div>
                <div className="mb-4">
                  <h3 className="text-xl font-semibold text-neutral-darker mb-2">Step {currentStep + 1}</h3>
                  <p className="text-neutral-default mb-2">{steps[currentStep]}</p>
                  <textarea
                    value={answers[currentStep] || ''}
                    onChange={handleAnswerChange}
                    className="w-full min-h-[100px] p-3 border border-neutral-medium rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                  ></textarea>
                </div>
                <div className="flex justify-between">
                  <button
                    onClick={handlePreviousStep}
                    disabled={currentStep === 0}
                    className="px-4 py-2 bg-secondary text-neutral-darkest font-semibold rounded hover:bg-secondary-dark focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 disabled:opacity-50"
                  >
                    Previous
                  </button>
                  {currentStep < steps.length - 1 ? (
                    <button
                      onClick={handleNextStep}
                      className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      onClick={handleSaveAndExport}
                      disabled={isLoading}
                      className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50"
                    >
                      {isLoading ? 'Saving...' : 'Save and Export'}
                    </button>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AuthoritySystemBuilderPage;
