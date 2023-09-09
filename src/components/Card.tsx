import React from 'react';

const Card = ({ children }: { children: React.ReactElement }) => {
  return (
    <div className='card'>
      {children}
    </div>
  );
};

export default Card;