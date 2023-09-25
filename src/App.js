import React, { useState } from 'react';
import './App.css';
import Grid from './components/Grid';
import Controls from './components/Controls';

function App() {
  const[gridSize, setGridSize] = useState(11);
  const[algo, setAlgo] = useState('DFS');
  const [gridArray, setGridArray] = useState(Array(gridSize).fill().map(() => Array(gridSize).fill(false)));

  const handleGridChange = (e) => {
    setGridSize(e.target.value);
  };

  const handleAlgoChange = (e) => {
    setAlgo(e.target.value);
  };

  const handlePlay = () => {
    // algorithm logic here that manipulates a local copy of gridArray
    // make a deep copy of the existing gridArray
    let newGridArray = JSON.parse(JSON.stringify(gridArray));

    console.log(newGridArray);

    // Manipulate newGridArray based on your algorithm
    // ...
    // Update the state; React will automatically keep the frontend updated
    setGridArray(newGridArray);
  };

  return (
    <div className='App'>
      <textarea readOnly value="Your explanation here..." />
      <Controls
        handleGridChange={handleGridChange}
        handleAlgoChange={handleAlgoChange}
        handlePlay={handlePlay}
        gridSize={gridSize}
        algo={algo}
      />
      <Grid gridArray={gridArray} />
    </div>
  );
}

export default App;