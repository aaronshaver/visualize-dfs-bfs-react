const Grid = ({ gridArray }) => {
    const grid = [];

    for (let i = 0; i < gridArray.length; i++) {
      const row = [];
      for (let j = 0; j < gridArray[i].length; j++) {
        const color = gridArray[i][j] === 'processing' ? '#00FFCA' : (gridArray[i][j] ? '#05BFDB' : '#088395');
        row.push(
          <div
            key={`${i}-${j}`}
            style={{
              width: '20px',
              height: '20px',
              backgroundColor: color,
              border: '1px solid #0A4D68',
            }}
          ></div>
        );
      }
      grid.push(<div key={i} style={{ display: 'flex' }}>{row}</div>);
    }

    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div>
          {grid}
        </div>
      </div>
    );
  };

  export default Grid;