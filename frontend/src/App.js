import './App.css';
import { useState } from 'react';

function App() {
  const [text, setText] = useState('');
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setPrediction(null);

    try {
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();

      if (response.ok) {
        setPrediction(data.prediction === 1 ? 'Fraudulent Email' : 'Legitimate Email');
      } else {
        setError(data.error || 'Error predicting email.');
      }
    } catch (err) {
      setError('Server not reachable. Check if Flask is running.');
    }
  };

  return (
    <div className="App">
      <h1>Email Fraud Detection</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          rows="6"
          placeholder="Paste email text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <br />
        <button type="submit">Check for Fraud</button>
      </form>
      {prediction && <p><strong>Prediction:</strong> {prediction}</p>}
      {error && <p style={{ color: 'red' }}><strong>Error:</strong> {error}</p>}
    </div>
  );
}

export default App;
