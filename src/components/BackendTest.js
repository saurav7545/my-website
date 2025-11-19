import React, { useState } from 'react';

const BackendTest = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_URL = "https://backend1-2agm.onrender.com/api";

  const testEndpoint = async (endpoint, method = 'GET', headers = {}) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...headers
        }
      });

      const data = await response.text();
      let jsonData;
      try {
        jsonData = JSON.parse(data);
      } catch {
        jsonData = data;
      }

      setResult({
        status: response.status,
        statusText: response.statusText,
        ok: response.ok,
        data: jsonData
      });
    } catch (error) {
      setResult({
        error: error.message,
        details: error.toString()
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'monospace' }}>
      <h1>🔧 Backend API Tester</h1>
      <p>Base URL: <strong>{API_URL}</strong></p>
      
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
        <button 
          onClick={() => testEndpoint('/photos/')}
          style={buttonStyle}
        >
          Test GET /photos/
        </button>
        
        <button 
          onClick={() => testEndpoint('/auth/login/', 'POST')}
          style={buttonStyle}
        >
          Test POST /auth/login/
        </button>

        <button 
          onClick={() => setResult(null)}
          style={{...buttonStyle, background: '#ef4444'}}
        >
          Clear
        </button>
      </div>

      {loading && <p>Loading...</p>}

      {result && (
        <div style={{ 
          background: result.error ? '#fee2e2' : '#dcfce7',
          padding: '1rem',
          borderRadius: '8px',
          border: `1px solid ${result.error ? '#ef4444' : '#22c55e'}`
        }}>
          <h3>{result.error ? '❌ Error' : '✅ Response'}</h3>
          
          {result.status && (
            <>
              <p><strong>Status:</strong> {result.status} {result.statusText}</p>
              <p><strong>OK:</strong> {result.ok ? 'Yes' : 'No'}</p>
            </>
          )}

          <details>
            <summary style={{ cursor: 'pointer', fontWeight: 'bold', marginTop: '1rem' }}>
              📄 Response Data (Click to expand)
            </summary>
            <pre style={{ 
              background: '#1f2937',
              color: '#fff',
              padding: '1rem',
              borderRadius: '4px',
              overflow: 'auto',
              maxHeight: '400px'
            }}>
              {JSON.stringify(result, null, 2)}
            </pre>
          </details>
        </div>
      )}

      <div style={{ marginTop: '2rem', padding: '1rem', background: '#fef3c7', borderRadius: '8px' }}>
        <h3>💡 What to check:</h3>
        <ul>
          <li><strong>Status 200:</strong> Backend is working! ✅</li>
          <li><strong>Status 401:</strong> Backend is online but needs auth 🔐</li>
          <li><strong>Status 500:</strong> Backend error 🔥</li>
          <li><strong>TypeError: Failed to fetch:</strong> Backend offline or CORS issue ❌</li>
        </ul>
      </div>
    </div>
  );
};

const buttonStyle = {
  padding: '0.75rem 1.5rem',
  background: '#3b82f6',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  fontWeight: 'bold',
  fontSize: '1rem'
};

export default BackendTest;
