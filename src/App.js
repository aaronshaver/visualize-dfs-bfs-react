import React, { useState } from 'react';
import './App.css';
import Grid from './components/Grid';
import Controls from './components/Controls';

function App() {
  const defaultSize = 15;
  const defaultSpeed = 10;
  const[gridSize, setGridSize] = useState(defaultSize);
  const[speed, setSpeed] = useState(defaultSpeed);
  const[algo, setAlgo] = useState('DFS');
  const [gridArray, setGridArray] = useState(Array(gridSize).fill().map(() => Array(gridSize).fill(false)));
  const [isRandom, setIsRandom] = useState(false);
  const [processingArray, setProcessingArray] = useState(
    Array(gridSize).fill().map(() => Array(gridSize).fill(false))
  );
  const [isProcessing, setIsProcessing] = useState(false);

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

  const handleSpeedUpdate = (event) => {
    var newSpeed = parseInt(event.target.value, 10);
    if (Number.isInteger(newSpeed) && newSpeed > 0) {
      if (newSpeed > 5000) {
        newSpeed = 5000;
        event.target.value = 5000;
      }
      setSpeed(newSpeed);
    } else {
      event.target.value = defaultSpeed;
      setSpeed(defaultSpeed);
    }
  };

  const handleAlgoChange = (e) => {
    setAlgo(e.target.value);
  };

  // shuffles an array (in our case, of neighbor-finding functions)
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const randomVal = Math.floor(Math.random() * (i + 1));
      const j = randomVal;
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  const breadthFirstSearch = (grid, y, x, queue) => {
    const visited = Array(grid.length).fill().map(() => Array(grid[0].length).fill(false));
    const toVisit = [{ y, x }];

    visited[y][x] = true;

    const directions = [
      { dy: 1, dx: 0 },
      { dy: -1, dx: 0 },
      { dy: 0, dx: 1 },
      { dy: 0, dx: -1 },
    ];
    // I don't know why, but we need two shuffles; was seeing patterns if this
    // shuffle weren't present; makes no sense, but I wasn't able to debug it
    if (isRandom) {
      shuffleArray(directions);
    }

    while (toVisit.length > 0) {
      const current = toVisit.shift(); // Take the first element
      y = current.y;
      x = current.x;

      // push current position to the queue for later visualization
      queue.push(current);

      if (isRandom) {
        shuffleArray(directions);
      }

      for (const { dy, dx } of directions) {
        const newY = y + dy;
        const newX = x + dx;

        if (newX >= 0 && newX < grid.length && newY >= 0 && newY < grid[0].length && !visited[newY][newX]) {
          toVisit.push({ y: newY, x: newX });
          visited[newY][newX] = true;
        }
      }
    }
  }

  const depthFirstSearch = (grid, y, x, queue) => {
    // exit if out of bounds of the image size
    if (x < 0 || x >= grid.length || y < 0 || y >= grid[0].length) {
      return;
    }
    // exit if this coordinate is already in the queue, thus visited
    if (queue.some(coord => coord.x === x && coord.y === y)) {
      return;
    }

    queue.push({ y, x });

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
    setIsProcessing(true);
    const clearedGrid = Array(gridSize).fill().map(() => Array(gridSize).fill(false));

    // create queue and figure out middle pixel (or close to it for even size)
    const queue = [];
    const middle = Math.round((gridSize - 1) / 2)

    if (algo === 'DFS') {
      depthFirstSearch(clearedGrid, middle, middle, queue);
    }
    else {
      breadthFirstSearch(clearedGrid, middle, middle, queue);
    }

    let i = 0;
    function processQueue() {
      // bail out if we've processed everything and unlock UI controls
      if (i >= queue.length) {
        setIsProcessing(false);
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
      }, speed * 2);

      i++;
      const delay = speed; // effectively controls the overall speed of animation
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
        isProcessing={isProcessing}
        defaultSpeed={defaultSpeed}
        handleSpeedUpdate={handleSpeedUpdate}
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
        This application helps visualize these search algorithms. We're not "searching" in the traditional sense. We're
        flooding-filling the entire image from unvisited (darker color) to visited (lighter color). All pixels start off
        as unvisited. Then, starting from a central origin pixel, we search through -- and mark as visited -- all pixels
        in the image.
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
      <p className='p-limited-width'>
      If you're using BFS with random traversal enabled, it won't look hugely random. This is because all neighbors from
      a given point are explored before moving to the next set of neighbors, unlike DFS, so it makes a diamond shape.
      But if you slow the speed down enough on a large grid, you should see randomness in the order of how the edges are
      filled out between runs if you look closely.
      </p>
    </div>
  );
}

export default App;