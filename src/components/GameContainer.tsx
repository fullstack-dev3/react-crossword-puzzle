import { useState } from 'react';
import Card from './Card';
import CrosswordContainer from './CrosswordContainer';
import LevelContainer from './LevelContainer';

const GameContainer = () => {
  const [level, setLevel] = useState('easy');

  return (
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
  );
};

export default GameContainer;