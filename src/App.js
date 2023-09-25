import React, { useState } from 'react';
import './App.css';

function App() {
  const[gridSize, setGridSize] = useState(11);
  const[algo, setAlgo] = useState('DFS');

  const handleGridChange = (e) => {
    gridGridSize(e.target.value);
  };

  const handleAlgoChange = (e) => {
    setAlgo(e.target.value);
  };

  const handlePlay = () => {
    // logic for playing animation goes here
  };

  return (
    <div className='App'>
      <textarea readOnly value="description of app goes here" />
      <div>
        <input type="number" value={gridSize} onChange={handleGridChange} />
        <button onClick={handlePlay}>Play</button>
      </div>
      <div>
        <input type="radio" value="DFS" checked={algo === 'DFS'} onChange={handleAlgoChange} />DFS
        <input type="radio" value="BFS" checked={algo === 'BFS'} onChange={handleAlgoChange} />BFS
      </div>
      <div>
        {/* grid goes here */}
      </div>
    </div>
  );
}

export default App;