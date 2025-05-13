import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const AdminPromptFlowPage = () => {
  const [flows, setFlows] = useState([]);
  const [newFlow, setNewFlow] = useState({ title: '', steps: [], category: '' });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchFlows();
  }, []);

  const fetchFlows = async () => {
    setIsLoading(true);
    try {
      const { data } = await api.get('/admin/prompt-flows');
      setFlows(data);
    } catch (error) {
      console.error('Failed to fetch prompt flows:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateFlow = async () => {
    if (!newFlow.title || !newFlow.category || newFlow.steps.length === 0) {
      alert('Please fill in all fields and add at least one step.');
      return;
    }
    setIsLoading(true);
    try {
      const { data } = await api.post('/admin/prompt-flows', newFlow);
      setFlows([...flows, data]);
      setNewFlow({ title: '', steps: [], category: '' });
    } catch (error) {
      console.error('Failed to create prompt flow:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateFlow = async (id, updatedFlow) => {
    setIsLoading(true);
    try {
      const { data } = await api.put(`/admin/prompt-flows/${id}`, updatedFlow);
      setFlows(flows.map(flow => (flow._id === id ? data : flow)));
    } catch (error) {
      console.error('Failed to update prompt flow:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteFlow = async (id) => {
    setIsLoading(true);
    try {
      await api.delete(`/admin/prompt-flows/${id}`);
      setFlows(flows.filter(flow => flow._id !== id));
    } catch (error) {
      console.error('Failed to delete prompt flow:', error);
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
        <h1 className="text-3xl font-bold text-primary mb-6">Admin Prompt Flow Management</h1>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-neutral-darker mb-4">Create New Prompt Flow</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Flow Title"
              value={newFlow.title}
              onChange={(e) => setNewFlow({ ...newFlow, title: e.target.value })}
              className="block w-full px-3 py-2 border border-neutral-medium rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            />
            <input
              type="text"
              placeholder="Category"
              value={newFlow.category}
              onChange={(e) => setNewFlow({ ...newFlow, category: e.target.value })}
              className="block w-full px-3 py-2 border border-neutral-medium rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            />
            <textarea
              placeholder="Steps (one per line)"
              value={newFlow.steps.join('\n')}
              onChange={(e) => setNewFlow({ ...newFlow, steps: e.target.value.split('\n') })}
              className="block w-full px-3 py-2 border border-neutral-medium rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              rows="4"
            ></textarea>
            <button
              onClick={handleCreateFlow}
              disabled={isLoading}
              className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50"
            >
              {isLoading ? 'Creating...' : 'Create Flow'}
            </button>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-neutral-darker mb-4">Existing Prompt Flows</h2>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <ul className="space-y-4">
              {flows.map(flow => (
                <li key={flow._id} className="border border-neutral-medium rounded-md p-4">
                  <h3 className="text-xl font-semibold text-neutral-darker mb-2">{flow.title}</h3>
                  <p className="text-neutral-default mb-2">Category: {flow.category}</p>
                  <ul className="list-disc list-inside mb-4">
                    {flow.steps.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ul>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleUpdateFlow(flow._id, { ...flow, title: prompt('Update title:', flow.title) })}
                      className="px-3 py-1 bg-secondary text-neutral-darkest rounded hover:bg-secondary-dark"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDeleteFlow(flow._id)}
                      className="px-3 py-1 bg-accent text-white rounded hover:bg-accent-dark"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPromptFlowPage;
