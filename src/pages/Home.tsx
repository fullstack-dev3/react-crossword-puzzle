import React from 'react';
import NavBar from '../components/NavBar';
import images from '../helpers/images';

const Home = () => {
  return (
    <React.Fragment>
      <NavBar />
      <div className="game-panel">
        <a href="/level">
          <div className="element">
            <h5 className="title">Puzzle by Level</h5>
            <img src={images.level} height="350" width="350" alt="level" />
          </div>
        </a>
        <a href="/category">
          <div className="element">
            <h5 className="title">Puzzle by Category</h5>
            <img src={images.category} height="350" width="350" alt="level" />
          </div>
        </a>
      </div>
    </React.Fragment>
  );
}

export default Home;