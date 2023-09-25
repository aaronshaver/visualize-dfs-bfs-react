const Grid = ({ gridArray }) => {
    const grid = [];

    for (let i = 0; i < gridArray.length; i++) {
      const row = [];
      for (let j = 0; j < gridArray[i].length; j++) {
        const color = gridArray[i][j] ? 'lightblue' : 'darkblue';
        row.push(
          <div
            key={`${i}-${j}`}
            style={{
              width: '20px',
              height: '20px',
              backgroundColor: color,
              border: '1px solid black',
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