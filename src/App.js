import React, { useState } from 'react';
import './App.css';
import Grid from './components/Grid';
import Controls from './components/Controls';

function App() {
  const[gridSize, setGridSize] = useState(21);
  const[algo, setAlgo] = useState('DFS');
  const [gridArray, setGridArray] = useState(Array(gridSize).fill().map(() => Array(gridSize).fill(false)));
  const [isRandom, setIsRandom] = useState(false);

  const handleGridChange = (e) => {
    setGridSize(e.target.value);
  };

  const handleAlgoChange = (e) => {
    setAlgo(e.target.value);
  };


  // randomize the order of neighbor selection each time the animation is Played
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  const depthFirstSearch = (grid, y, x, queue) => {
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

    const directions = [
      () => depthFirstSearch(grid, y + 1, x, queue),
      () => depthFirstSearch(grid, y - 1, x, queue),
      () => depthFirstSearch(grid, y, x + 1, queue),
      () => depthFirstSearch(grid, y, x - 1, queue),
    ];
    if (isRandom) {
      shuffleArray(directions);
    }

    for (const direction of directions) {
      direction();
    }
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
      <Controls
        handleGridChange={handleGridChange}
        handleAlgoChange={handleAlgoChange}
        handlePlay={handlePlay}
        gridSize={gridSize}
        algo={algo}
        isRandom={isRandom}
        setIsRandom={setIsRandom}
      />
      <Grid gridArray={gridArray} />
      <p className='p-limited-width'>
        For the "line" DFS implementation, where it has a set order of traversal (e.g. always x+1 first,
        then y+1, etc.), because DFS explores as far as possible before backtracking, the
        first call will recursively call itself until it hits the edge of the grid.
        Only when it cannot proceed any further will it backtrack to the previous call and try the next
        direction.
        Since the terminating call is an out-of-bounds pixel, it will go back to an edge pixel and try the
        second direction.
      </p>
      <p className='p-limited-width'>
        During the "random" DFS implementation, where it does a random walk, it will sometimes "jump" around
        and leave "islands" of turned off pixels because: let's say it selected x+1 to go right, then y-1 to
        go down in that farther-down-the-stack call, and let's say it encounters and edge -- well, the next
        pixel, when we go up/back one level in the call stack might be quite far away. So it would look like
        a jump once we return back to an earlier layer of the stack. It's a little hard to explain in text,
        easier to visualize with graphics.
      </p>

    </div>
  );
}

export default App;