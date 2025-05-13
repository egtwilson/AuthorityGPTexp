import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AICopyGeneratorPage = () => {
  const [productType, setProductType] = useState('');
  const [generatedCopy, setGeneratedCopy] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateCopy = async () => {
    if (!productType) {
      setGeneratedCopy("Please enter a product type or niche to generate copy.");
      return;
    }
    setIsLoading(true);

    // Simulate API call and AI interaction
    await new Promise(resolve => setTimeout(resolve, 1500));

    const exampleCopy = `Here's some copy for your ${productType}:\n\nEmail Subject: "Unlock the Secrets to ${productType} Success"\n\nEmail Body: "Discover how ${productType} can transform your business. Click here to learn more."\n\nHeadline: "Revolutionize Your ${productType} with Our Innovative Solutions"\n\nAd Copy: "Upgrade your ${productType} with our cutting-edge technology. Try it today and see the difference!"`;
    setGeneratedCopy(exampleCopy);
    setIsLoading(false);
  };

  const handleSaveToVault = () => {
    // Placeholder for saving to vault logic
    alert('Copy saved to vault!');
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(generatedCopy);
    alert('Copy copied to clipboard!');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-xl rounded-lg p-8">
        <Link to="/dashboard" className="text-sm text-primary hover:text-primary-dark mb-4 inline-block">
          &larr; Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold text-primary mb-6">AI Copy Generator</h1>
        <p className="text-neutral-dark mb-6">
          Enter your product type or niche, and we'll generate powerful copy for you.
        </p>

        <div className="space-y-4 mb-6">
          <div>
            <label htmlFor="productType" className="block text-sm font-medium text-neutral-dark">
              Product Type or Niche
            </label>
            <input
              type="text"
              id="productType"
              value={productType}
              onChange={(e) => setProductType(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-neutral-medium rounded-md shadow-sm placeholder-neutral-focus focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              placeholder="e.g., Sustainable Fashion, B2B SaaS"
            />
          </div>
        </div>

        <button
          onClick={handleGenerateCopy}
          disabled={isLoading}
          className="px-6 py-3 mb-6 bg-secondary text-neutral-darkest font-semibold rounded hover:bg-secondary-dark focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 disabled:opacity-50"
        >
          {isLoading ? 'Generating...' : 'Generate Copy'}
        </button>

        {generatedCopy && (
          <div className="p-6 border border-neutral-medium rounded-md bg-neutral-lightest mb-6">
            <h3 className="text-xl font-semibold text-neutral-darker mb-2">Generated Copy:</h3>
            <p className="text-neutral-default whitespace-pre-wrap">{generatedCopy}</p>
            <div className="mt-4 flex space-x-3">
              <button
                onClick={handleSaveToVault}
                className="px-4 py-2 bg-neutral-dark text-white rounded hover:bg-neutral-darker"
              >
                Save to Vault
              </button>
              <button
                onClick={handleCopyToClipboard}
                className="px-4 py-2 bg-accent text-white rounded hover:bg-accent-dark"
              >
                Copy to Clipboard
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AICopyGeneratorPage;
