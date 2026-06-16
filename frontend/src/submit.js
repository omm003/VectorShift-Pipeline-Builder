import { useState } from 'react';
import { useStore } from './store';

export const SubmitButton = () => {
  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const response = await fetch('/pipelines/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nodes, edges }),
      });
      if (!response.ok) throw new Error(`Server error: ${response.status}`);
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const close = () => { setResult(null); setError(null); };

  return (
    <>
      <div className="submit-bar">
        <div className="submit-bar-info">
          <span className="submit-stat">{nodes.length} nodes</span>
          <span className="submit-divider">·</span>
          <span className="submit-stat">{edges.length} edges</span>
        </div>
        <button className="submit-button" onClick={handleSubmit} disabled={loading}>
          {loading ? 'Analyzing...' : 'Submit Pipeline'}
        </button>
      </div>

      {(result || error) && (
        <div className="result-overlay" onClick={close}>
          <div className="result-modal" onClick={(e) => e.stopPropagation()}>
            {error ? (
              <>
                <div className="result-icon result-icon-error">✗</div>
                <h2 className="result-title">Error</h2>
                <p className="result-error-msg">{error}</p>
              </>
            ) : result ? (
              <>
                <div className="result-icon result-icon-success">✓</div>
                <h2 className="result-title">Pipeline Analysis</h2>
                <div className="result-stats">
                  <div className="result-stat-card">
                    <span className="result-stat-value">{result.num_nodes}</span>
                    <span className="result-stat-label">Nodes</span>
                  </div>
                  <div className="result-stat-card">
                    <span className="result-stat-value">{result.num_edges}</span>
                    <span className="result-stat-label">Edges</span>
                  </div>
                  <div className={`result-stat-card ${result.is_dag ? 'stat-success' : 'stat-error'}`}>
                    <span className="result-stat-value">{result.is_dag ? '✓' : '✗'}</span>
                    <span className="result-stat-label">Valid DAG</span>
                  </div>
                </div>
                <p className="result-description">
                  {result.is_dag
                    ? 'Your pipeline is a valid Directed Acyclic Graph — it can be executed without circular dependencies.'
                    : 'Your pipeline contains a cycle and is not a valid DAG. Please remove circular connections.'}
                </p>
              </>
            ) : null}
            <button className="result-close" onClick={close}>Close</button>
          </div>
        </div>
      )}
    </>
  );
};
