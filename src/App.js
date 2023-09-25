import React, { useState } from 'react';
import './App.css';
import Grid from './components/Grid';
import Controls from './components/Controls';

function App() {
  const[gridSize, setGridSize] = useState(21);
  const[algo, setAlgo] = useState('DFS');
  const [gridArray, setGridArray] = useState(Array(gridSize).fill().map(() => Array(gridSize).fill(false)));

  const handleGridChange = (e) => {
    setGridSize(e.target.value);
  };

  const handleAlgoChange = (e) => {
    setAlgo(e.target.value);
  };

  const depthFirstSearch = (newGridArray, x, y, setGridArray) => {
    if (x < 0 || x >= newGridArray[0].length || y < 0 || y >= newGridArray.length) {
      return
    }

    // exit if already visited
    if (newGridArray[x][y]) {
      return
    }

    newGridArray[x][y] = true;

    // update the gridArray state to cause a re-render
    setGridArray([...newGridArray]);

    setTimeout(() => {
      depthFirstSearch(newGridArray, x+1, y, setGridArray);
      depthFirstSearch(newGridArray, x-1, y, setGridArray);
      depthFirstSearch(newGridArray, x, y+1, setGridArray);
      depthFirstSearch(newGridArray, x, y-1, setGridArray);
    }, 100);
  }

  const handlePlay = () => {
    // Create a cleared grid in case of replays (hitting Play a second time or more)
    const clearedGrid = Array(gridSize).fill().map(() => Array(gridSize).fill(false));
    depthFirstSearch(clearedGrid, 5, 5, setGridArray);
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