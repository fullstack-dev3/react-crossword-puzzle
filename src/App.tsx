import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/NavBar';
import GamePanel from './components/GamePanel';

function App() {
  return (
    <React.Fragment>
      <NavBar />
      <GamePanel />
    </React.Fragment>
  );
}

export default App;