import React from 'react';

const Controls = ({ handleGridChange, handleAlgoChange, handlePlay, gridSize, algo }) => {
  return (
    <div>
      <input type="number" value={gridSize} onChange={handleGridChange} />
      <button onClick={handlePlay}>Play</button>
      <label>
        <input type="radio" value="DFS" checked={algo === 'DFS'} onChange={handleAlgoChange} />
        DFS
      </label>
      <label>
        <input type="radio" value="BFS" checked={algo === 'BFS'} onChange={handleAlgoChange} />
        BFS
      </label>
    </div>
  );
};

export default Controls;