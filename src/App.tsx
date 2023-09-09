import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/NavBar';
import GameContainer from './components/GameContainer';

function App() {
  return (
    <React.Fragment>
      <NavBar />
      <GameContainer />
    </React.Fragment>
  );
}

export default App;