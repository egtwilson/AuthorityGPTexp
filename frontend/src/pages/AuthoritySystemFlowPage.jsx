import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api'; // Import the API service
import { useAuth } from '../hooks/useAuth'; // To get user context

const AuthoritySystemFlowPage = () => {
  const { systemId } = useParams();
  const { user } = useAuth(); // Get current user

  const [currentStep, setCurrentStep] = useState(1);
  const [userInput, setUserInput] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [projectId, setProjectId] = useState(null); // Assume a project context is established

  const systemName = systemId ? systemId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'System';

  // TODO: In a real app, you'd fetch or create a project associated with this flow
  // For now, let's simulate having a projectId.
  // This might come from a selected project on the dashboard or be created when a user starts a new flow.
  useEffect(() => {
    // Placeholder: simulate fetching/creating a project ID
    // In a real app, you might have a "currentProject" in a context or fetch it.
    if (user) {
      // Example: const userDefaultProjectId = user.projects?.[0]?._id || 'new-project-placeholder';
      // setProjectId(userDefaultProjectId);
      setProjectId("mock-project-id-123"); // Replace with actual project logic
    }
  }, [user]);


  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleGetAISuggestion = async () => {
    if (!userInput.trim()) {
      setError('Please provide some input for the AI.');
      return;
    }
    setIsLoading(true);
    setError('');
    setAiResponse('');

    try {
      // Placeholder for API call to backend for AI suggestion
      // const response = await api.post(`/api/ai/suggest/${systemId}/step/${currentStep}`, { userInput, projectId });
      // setAiResponse(response.data.suggestion);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      const mockSuggestion = `AI Suggestion for "${userInput}" in ${systemName} (Step ${currentStep}): This is a detailed suggestion based on your input, helping you refine your strategy. It would typically involve several paragraphs of actionable advice.`;
      setAiResponse(mockSuggestion);

    } catch (err) {
      setError(err.response?.data?.message || 'Failed to get AI suggestion.');
      console.error("AI Suggestion error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveAndNext = async () => {
    setIsLoading(true);
    setError('');
    try {
      // Placeholder for API call to save progress
      // await api.post(`/api/projects/${projectId}/systems/${systemId}/step/${currentStep}`, { userInput, aiResponse });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Progress saved (simulated):', { projectId, systemId, currentStep, userInput, aiResponse });
      
      setCurrentStep(prev => prev + 1);
      setUserInput(''); // Clear input for next step
      setAiResponse(''); // Clear AI response for next step
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save progress.');
      console.error("Save progress error:", err);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSaveProgress = async () => {
    if (!projectId) {
        setError("No active project to save to.");
        return;
    }
    setIsLoading(true);
    setError('');
    try {
        // Placeholder: In a real app, you'd collect all relevant data for the current system flow
        const progressData = {
            currentStep,
            stepsData: { /* ... collect data from all steps ... */ },
            [systemId]: { // Storing progress specific to this system
                currentStep,
                userInputForCurrentStep: userInput,
                lastAiResponse: aiResponse,
                // Potentially an array of all inputs/outputs for this flow
            }
        };
        // await api.put(`/api/projects/${projectId}/save-flow/${systemId}`, progressData);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
        console.log("Progress saved to project (simulated)", projectId, systemId, progressData);
        alert("Progress Saved (Simulated)!"); // User feedback
    } catch (err) {
        setError(err.response?.data?.message || 'Failed to save overall progress.');
        console.error("Save overall progress error:", err);
    } finally {
        setIsLoading(false);
    }
  };

  const handleDownload = async (format) => {
    if (!projectId) {
        setError("No active project to download from.");
        return;
    }
    setIsLoading(true);
    setError('');
    try {
        // Placeholder: In a real app, backend would generate the document
        // const response = await api.post(`/api/documents/generate/${projectId}/${systemId}`, { format, content: {userInput, aiResponse, allStepsData...} });
        // window.open(response.data.downloadUrl, '_blank'); // Or trigger download differently

        await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
        const documentTitle = `${systemName} - Step ${currentStep} - ${new Date().toISOString().split('T')[0]}`;
        console.log(`Downloading ${format} (simulated):`, { projectId, systemId, documentTitle, userInput, aiResponse });
        alert(`Simulated download of ${documentTitle} as ${format}.`);
    } catch (err) {
        setError(err.response?.data?.message || `Failed to generate ${format} document.`);
        console.error("Download error:", err);
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
        <h1 className="text-3xl font-bold text-primary mb-2">Authority System: {systemName}</h1>
        <p className="text-neutral-default mb-6">Project ID (Simulated): {projectId || "N/A"}</p>

        {error && <p className="text-red-500 text-sm text-center bg-red-100 p-3 rounded mb-4">{error}</p>}
        
        <div className="p-6 border border-neutral-medium rounded-md bg-neutral-lightest mb-6">
          <h3 className="text-xl font-semibold text-neutral-darker mb-3">Step {currentStep}: Your Input</h3>
          <p className="text-neutral-default mb-2">
            {/* Placeholder step instruction - this would be dynamic */}
            {currentStep === 1 ? `What is the primary goal you want to achieve with this ${systemName.toLowerCase()}?` : `Provide details for step ${currentStep} of the ${systemName.toLowerCase()}.`}
          </p>
          <textarea 
            placeholder={`e.g., For Leadflow Builder (Step 1): "Generate 20 qualified leads per week for my coaching business."`} 
            className="w-full min-h-[100px] p-3 mt-1 border border-neutral-medium rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            value={userInput}
            onChange={handleInputChange}
            disabled={isLoading}
          ></textarea>
          <div className="mt-4 flex flex-wrap gap-3">
            <button 
              onClick={handleGetAISuggestion}
              disabled={isLoading || !userInput.trim()}
              className="px-4 py-2 bg-secondary text-neutral-darkest font-semibold rounded hover:bg-secondary-dark focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 disabled:opacity-50"
            >
              {isLoading ? 'Getting Suggestion...' : 'Get AI Suggestion'}
            </button>
            <button 
              onClick={handleSaveAndNext}
              disabled={isLoading || !userInput.trim()} // Potentially also disable if no AI response, depending on flow
              className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50"
            >
              {isLoading ? 'Saving...' : 'Save & Next Step'}
            </button>
          </div>
        </div>

        {aiResponse && (
          <div className="p-6 border border-dashed border-primary rounded-md bg-primary/5 mb-6">
            <h4 className="text-lg font-semibold text-primary mb-2">AI Response Area:</h4>
            <p className="text-neutral-dark whitespace-pre-wrap">{aiResponse}</p>
          </div>
        )}

        <div className="flex flex-wrap gap-4 border-t border-neutral-medium pt-6 mt-6">
          <button 
            onClick={handleSaveProgress}
            disabled={isLoading || !projectId}
            className="px-4 py-2 bg-neutral-dark text-white rounded hover:bg-neutral-darker disabled:opacity-50"
          >
            {isLoading ? 'Saving...' : 'Save Full Progress'}
          </button>
          <button 
            onClick={() => handleDownload('PDF')}
            disabled={isLoading || !projectId}
            className="px-4 py-2 bg-accent text-white rounded hover:bg-accent-dark disabled:opacity-50"
          >
            {isLoading ? 'Generating...' : 'Download as PDF'}
          </button>
          <button 
            onClick={() => handleDownload('Word')}
            disabled={isLoading || !projectId}
            className="px-4 py-2 bg-accent text-white rounded hover:bg-accent-dark disabled:opacity-50"
          >
            {isLoading ? 'Generating...' : 'Download as Word'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthoritySystemFlowPage;
