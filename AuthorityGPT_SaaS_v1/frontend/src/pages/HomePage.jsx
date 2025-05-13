import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="text-center py-16 bg-gradient-to-r from-primary to-secondary text-white">
      <h1 className="text-5xl font-bold mb-6">Welcome to AuthorityGPT</h1>
      <p className="text-xl mb-8 max-w-2xl mx-auto">
        Build your authority-based digital business with AI-powered strategy flows.
        Turn your expertise into a thriving online presence.
      </p>
      <div className="space-x-4">
        <Link
          to="/register"
          className="bg-white text-primary font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-opacity-90 transition duration-300"
        >
          Get Started Free
        </Link>
        <Link
          to="/login"
          className="border-2 border-white text-white font-semibold py-3 px-8 rounded-lg hover:bg-white hover:text-primary transition duration-300"
        >
          Login
        </Link>
      </div>
      <div className="mt-16 max-w-4xl mx-auto grid md:grid-cols-3 gap-8 text-neutral-dark">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold text-primary mb-3">Guided AI Flows</h3>
          <p>Step-by-step systems to plan your lead magnets, newsletters, content strategy, and more.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold text-primary mb-3">Prompt Generator</h3>
          <p>Get tailored business-building prompts and AI-powered insights for your niche.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold text-primary mb-3">Document Vault</h3>
          <p>All your generated plans and documents, organized and accessible anytime.</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
