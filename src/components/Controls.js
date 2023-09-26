import React from 'react';


const Controls = ({ handleGridSizeUpdate, handleAlgoChange, handlePlay, gridSize, algo, isRandom, setIsRandom, isProcessing }) => {
  return (
    <div>
      <br />
      Size: <input type="text" defaultValue={gridSize} onBlur={handleGridSizeUpdate} size="5" disabled={isProcessing} />
      <br />
      <button onClick={handlePlay} disabled={isProcessing}>Play</button>
      <br />
      Algorithm:
      <label>
        <input type="radio" value="DFS" checked={algo === 'DFS'} onChange={handleAlgoChange} disabled={isProcessing} />
        DFS
      </label>
      <label>
        <input type="radio" value="BFS" checked={algo === 'BFS'} onChange={handleAlgoChange} disabled={isProcessing} />
        BFS
      </label>
      <br />
      <label>
        Random traversal vs. fixed neighbor order:
        <input type="checkbox" checked={isRandom} onChange={() => setIsRandom(!isRandom)} disabled={isProcessing} />
        <br />
      </label>
      <br />
    </div>
  );
};

export default Controls;