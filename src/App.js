import React, { useState } from 'react';
import './App.css';
import Grid from './components/Grid';
import Controls from './components/Controls';

function App() {
  const[gridSize, setGridSize] = useState(31);
  const[algo, setAlgo] = useState('DFS');
  const [gridArray, setGridArray] = useState(Array(gridSize).fill().map(() => Array(gridSize).fill(false)));

  const handleGridChange = (e) => {
    setGridSize(e.target.value);
  };

  const handleAlgoChange = (e) => {
    setAlgo(e.target.value);
  };

  const depthFirstSearch = (grid, x, y, queue) => {
    // Exit if out of bounds of the image size
    if (x < 0 || x >= grid.length || y < 0 || y >= grid[0].length) {
      return;
    }
    // Exit if this coordinate is already in the queue, thus visited
    if (queue.some(coord => coord.x === x && coord.y === y)) {
      return;
    }

    // Add to queue for animation later
    queue.push({ x, y });

    depthFirstSearch(grid, x + 1, y, queue);
    depthFirstSearch(grid, x - 1, y, queue);
    depthFirstSearch(grid, x, y + 1, queue);
    depthFirstSearch(grid, x, y - 1, queue);
  };

  const handlePlay = () => {
    const queue = [];
    const clearedGrid = Array(gridSize).fill().map(() => Array(gridSize).fill(false));

    // Populate the queue
    const middle = Math.round((gridSize - 1) / 2)
    depthFirstSearch(clearedGrid, middle, middle, queue);

    // Initialize i outside the processQueue function
    let i = 0;
    function processQueue() {
      if (i >= queue.length) {
        return;
      }

      // Use the queue to update the grid
      const { x, y } = queue[i];
      clearedGrid[x][y] = true;

      // Update the state to force a re-render
      setGridArray(JSON.parse(JSON.stringify(clearedGrid)));

      i++;
      const delay = 15;
      setTimeout(processQueue, delay);
    }

    processQueue();
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