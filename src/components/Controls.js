import React from 'react';


const Controls = ({ handleGridSizeUpdate, handleAlgoChange, handlePlay, gridSize, algo, isRandom, setIsRandom }) => {
  return (
    <div>
      <br />
      Size <input type="text" defaultValue={gridSize} onBlur={handleGridSizeUpdate} size="5" />
      <br />
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
        Random traversal vs. set neighbor order
        <input type="checkbox" checked={isRandom} onChange={() => setIsRandom(!isRandom)} />
        <br />
      </label>
      <br />
    </div>
  );
};

export default Controls;