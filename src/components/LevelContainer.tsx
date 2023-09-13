import React from 'react';
import Button from 'react-bootstrap/Button';

const LevelContainer: React.FC<{changeLevel: (level: string) => any }> = (props) => {
  return (
    <div className="d-flex justify-content-between">
      <Button
        className="flex-fill m-2"
        variant="info"
        onClick={() => props.changeLevel('easy')}
      >
        Easy
      </Button>
      <Button
        className="flex-fill m-2"
        variant="info"
        onClick={() => props.changeLevel('normal')}
      >
        Normal
      </Button>
      <Button
        className="flex-fill m-2"
        variant="info"
        onClick={() => props.changeLevel('expert')}
      >
        Expert
      </Button>
    </div>
  );
}

export default LevelContainer;