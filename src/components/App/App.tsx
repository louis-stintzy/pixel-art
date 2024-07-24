import { useState } from 'react';
import Bar from '../Bar/Bar';
import Grid from '../Grid/Grid';
import './App.scss';

function App() {
  const [gridSize, setGridSize] = useState({
    width: 8,
    height: 8,
  });
  return (
    <div className="App">
      <div className="container">
        <Bar setGridSize={setGridSize} />
        <Grid gridSize={gridSize} />
      </div>
    </div>
  );
}

export default App;
