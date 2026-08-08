import React, { useState } from 'react';
import { verifyPhotoWithAI } from './aiService';

function PhotoUploadComponent() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [taskDesc, setTaskDesc] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile || !taskDesc) return;

    setLoading(true);
    try {
      const responseData = await verifyPhotoWithAI(selectedFile, taskDesc);
      setResult(responseData);
    } catch (err) {
      alert("Verification failed. Make sure your Python backend is running!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">Submit Assignment Photo</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input 
          type="text" 
          placeholder="Task description (e.g., Draw an ecosystem model)" 
          value={taskDesc}
          onChange={(e) => setTaskDesc(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input 
          type="file" 
          accept="image/*"
          onChange={(e) => setSelectedFile(e.target.files[0])}
          className="w-full"
        />
        <button 
          type="submit" 
          disabled={loading}
          className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
        >
          {loading ? "AI is reviewing..." : "Verify Photo"}
        </button>
      </form>

      {result && (
        <div className="mt-4 p-4 border rounded bg-gray-50">
          <p><strong>Status:</strong> {result.status}</p>
          <p><strong>Confidence:</strong> {(result.confidence_score * 100).toFixed(1)}%</p>
          <p><strong>Reasoning:</strong> {result.reasoning}</p>
        </div>
      )}
    </div>
  );
}

export default PhotoUploadComponent;