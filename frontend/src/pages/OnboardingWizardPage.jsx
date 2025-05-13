import React from 'react';

const OnboardingWizardPage = () => {
  return (
    <div>
      <h2>Welcome to AuthorityGPT! Let's Get Started.</h2>
      <p>This onboarding wizard will help you choose your primary goal and recommend relevant Authority Systems.</p>
      
      {/* Step 1: Choose Goal */}
      <div style={{border: '1px solid #ccc', padding: '20px', margin: '20px 0', borderRadius: '5px'}}>
        <h4>Step 1: What is your primary goal?</h4>
        <select style={{width: '100%', padding: '10px', marginTop: '10px', borderRadius: '4px', border: '1px solid #ddd'}}>
          <option value="">Select a goal...</option>
          <option value="leadgen">Generate More Leads</option>
          <option value="audience">Build an Engaged Audience</option>
          <option value="productlaunch">Launch a New Product/Service</option>
          <option value="brand">Establish Personal Brand</option>
        </select>
      </div>

      {/* Step 2: System Recommendations (Placeholder based on goal) */}
      <div style={{border: '1px solid #ccc', padding: '20px', margin: '20px 0', borderRadius: '5px'}}>
        <h4>Step 2: Recommended Systems</h4>
        <p>(Based on your goal, we recommend these systems to start with...)</p>
        <ul>
          <li>Leadflow System (if goal is leadgen)</li>
          <li>Newsletter Builder (if goal is audience)</li>
        </ul>
      </div>
      <button>Complete Onboarding & Go to Dashboard</button>
    </div>
  );
};

export default OnboardingWizardPage;
