import React from 'react';
import Card from './Card';
import CrosswordContainer from './CrosswordContainer';

const GameContainer = () => {
  return (
    <div className='container d-flex'>
      <div className='col-md-8 p-2'>
        <Card>
          <CrosswordContainer />
        </Card>
      </div>
      <div className='col-md-4 p-2'>
        <Card>
          <div>Level Panel</div>
        </Card>
      </div>
    </div>
  );
};

export default GameContainer;