import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const PromptGeneratorPage = () => {
  const [goal, setGoal] = useState('');
  const [niche, setNiche] = useState('');
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGeneratePrompt = async () => {
    if (!goal && !niche) {
      setGeneratedPrompt("Please enter a goal or niche to generate a prompt.");
      setAiResponse('');
      return;
    }
    setIsLoading(true);
    // Placeholder for actual prompt generation logic
    // In a real app, this would involve an API call to the backend
    // which then might interact with a GPT model.
    
    // Simulate API call and AI interaction
    await new Promise(resolve => setTimeout(resolve, 1500));

    const examplePrompt = `Create a 7-day content plan for a ${niche || 'new'} business aiming to ${goal || 'increase brand awareness'}. Include daily themes, content types (e.g., blog post, social media update, video), and key talking points for each day.`;
    setGeneratedPrompt(examplePrompt);

    const exampleAiResponse = `Here's a 7-day content plan for your ${niche || 'business'} to ${goal || 'achieve its goal'}:\n\nDay 1: Introduction - Blog post introducing your brand's mission and values.\nDay 2: Problem/Solution - Social media carousel highlighting a common problem your audience faces and how your product/service solves it.\nDay 3: Testimonial Tuesday - Share a customer success story (video or text).\nDay 4: Behind the Scenes - Short video showing your process or team.\nDay 5: Educational Content - Infographic or short guide related to your niche.\nDay 6: Engage & Ask - Run a poll or Q&A on social media.\nDay 7: Offer/CTA - Promote a specific product, service, or lead magnet.\n\n(This is a simplified example. A real AI response would be more detailed.)`;
    setAiResponse(exampleAiResponse);
    setIsLoading(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-xl rounded-lg p-8">
        <Link to="/dashboard" className="text-sm text-primary hover:text-primary-dark mb-4 inline-block">
          &larr; Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold text-primary mb-6">Prompt Generator</h1>
        <p className="text-neutral-dark mb-6">
          Enter your business goal or niche, and we'll generate a powerful prompt. Then, get a GPT-powered answer to kickstart your strategy!
        </p>

        <div className="space-y-4 mb-6">
          <div>
            <label htmlFor="goal" className="block text-sm font-medium text-neutral-dark">
              Your Business Goal (e.g., increase sales, build email list)
            </label>
            <input
              type="text"
              id="goal"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-neutral-medium rounded-md shadow-sm placeholder-neutral-focus focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              placeholder="e.g., Launch a new product successfully"
            />
          </div>
          <div>
            <label htmlFor="niche" className="block text-sm font-medium text-neutral-dark">
              Your Niche (e.g., sustainable fashion, B2B SaaS)
            </label>
            <input
              type="text"
              id="niche"
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-neutral-medium rounded-md shadow-sm placeholder-neutral-focus focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              placeholder="e.g., Local coffee shops"
            />
          </div>
        </div>

        <button
          onClick={handleGeneratePrompt}
          disabled={isLoading}
          className="px-6 py-3 mb-6 bg-secondary text-neutral-darkest font-semibold rounded hover:bg-secondary-dark focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 disabled:opacity-50"
        >
          {isLoading ? 'Generating...' : 'Generate Prompt & Get AI Answer'}
        </button>

        {generatedPrompt && (
          <div className="p-6 border border-neutral-medium rounded-md bg-neutral-lightest mb-6">
            <h3 className="text-xl font-semibold text-neutral-darker mb-2">Generated Prompt:</h3>
            <p className="text-neutral-default whitespace-pre-wrap">{generatedPrompt}</p>
          </div>
        )}

        {isLoading && (
          <div className="p-6 border border-dashed border-neutral-medium rounded-md bg-neutral-lightest text-center">
            <p className="text-neutral-dark">Generating AI response, please wait...</p>
            {/* You can add a spinner here */}
          </div>
        )}

        {!isLoading && aiResponse && (
          <div className="p-6 border border-dashed border-primary rounded-md bg-primary/5">
            <h3 className="text-xl font-semibold text-primary mb-2">AI-Powered Answer:</h3>
            <p className="text-neutral-dark whitespace-pre-wrap">{aiResponse}</p>
            <div className="mt-4 flex space-x-3">
                <button className="px-4 py-2 bg-neutral-dark text-white rounded hover:bg-neutral-darker">Save to Vault</button>
                <button className="px-4 py-2 bg-accent text-white rounded hover:bg-accent-dark">Download</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PromptGeneratorPage;
