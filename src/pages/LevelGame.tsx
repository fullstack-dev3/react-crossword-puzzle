import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import Card from '../components/Card';
import CrosswordContainer from '../components/CrosswordContainer';
import LevelContainer from '../components/LevelContainer';

const LevelGame = () => {
  const [level, setLevel] = useState('easy');

  return (
    <React.Fragment>
      <NavBar />
      <div className='container d-flex'>
        <div className='col-md-8 p-2'>
          <Card>
            <CrosswordContainer level={level} />
          </Card>
        </div>
        <div className='col-md-4 p-2'>
          <Card>
            <LevelContainer level={level} changeLevel={(level) => setLevel(level)} />
          </Card>
        </div>
      </div>
    </React.Fragment>
  );
};

export default LevelGame;