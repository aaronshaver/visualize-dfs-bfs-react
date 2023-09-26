import React, { useState } from 'react';
import './App.css';
import Grid from './components/Grid';
import Controls from './components/Controls';

function App() {
  const defaultSize = 21;
  const[gridSize, setGridSize] = useState(defaultSize);
  const[algo, setAlgo] = useState('DFS');
  const [gridArray, setGridArray] = useState(Array(gridSize).fill().map(() => Array(gridSize).fill(false)));
  const [isRandom, setIsRandom] = useState(false);
  const [processingArray, setProcessingArray] = useState(
    Array(gridSize).fill().map(() => Array(gridSize).fill(false))
  );

  const handleGridSizeUpdate = (event) => {
    var newSize = parseInt(event.target.value, 10);
    if (Number.isInteger(newSize) && newSize > 0) {
      if (newSize > 69) {
        newSize = 69;
        event.target.value = 69;
      }
      setGridSize(newSize);
      const newGrid = Array(newSize).fill().map(() => Array(newSize).fill(false));
      setGridArray(newGrid);
    } else {
      event.target.value = defaultSize;
      setGridSize(gridSize);
    }
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

    let i = 0;
    function processQueue() {
      // bail out if we've processed everything
      if (i >= queue.length) {
        return;
      }

      // update the grid for 'processing'/highlighted pixel state
      let { x, y } = queue[i];
      clearedGrid[x][y] = 'processing';
      setGridArray(JSON.parse(JSON.stringify(clearedGrid)));

      // use a slight delay before setting to true/visited so that the highlight
      // color remains visible for a short while instead of instantly gone
      setTimeout(() => {
        clearedGrid[x][y] = true;
        setGridArray(JSON.parse(JSON.stringify(clearedGrid)));
      }, 20);

      i++;
      const delay = 10; // effectively controls the overall speed of animation
      setTimeout(processQueue, delay);
    }

    processQueue();
  };

  return (
    <div className='App'>
      <Controls
        handleGridSizeUpdate={handleGridSizeUpdate}
        handleAlgoChange={handleAlgoChange}
        handlePlay={handlePlay}
        gridSize={gridSize}
        algo={algo}
        isRandom={isRandom}
        setIsRandom={setIsRandom}
      />
      <Grid gridArray={gridArray} processingArray={processingArray} />
      <br />
      <p className='p-limited-width'>
        We don't normally think of an image or a grid of pixels as a graph-like structure. But it can be quite naturally
        represented as one: each pixel is a node, and each node has 2, 3, or 4 edges connecting it to other pixels.
        And now that we are thinking of the image as a graph, it becomes clear that search algorithms like depth-first
        search (DFS) and breadth-first search (BFS) can apply to it.
      </p>
      <p className='p-limited-width'>
        This application helps visualize these search algorithms. All pixels start off as "unvisited". Then, starting
        from a central origin pixel, we search through -- and mark as visited -- all pixels in the image.
      </p>
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