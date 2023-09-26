import React from 'react';


const Controls = ({ handleGridChange, handleAlgoChange, handlePlay, gridSize, algo, isRandom, setIsRandom }) => {
  return (
    <div>
      <br />
      <input type="number" value={gridSize} onChange={handleGridChange} />
      <button onClick={handlePlay}>Play</button>
      <br />
      Algorithm
      <label>
        <input type="radio" value="DFS" checked={algo === 'DFS'} onChange={handleAlgoChange} />
        DFS
      </label>
      <label>
        <input type="radio" value="BFS" checked={algo === 'BFS'} onChange={handleAlgoChange} />
        BFS
      </label>
      <br />
      <label>
        Random traversal
        <input type="checkbox" checked={isRandom} onChange={() => setIsRandom(!isRandom)} />
        <br />
      </label>
      <br />
    </div>
  );
};

export default Controls;