import { useEffect, useState } from 'react';
import { Beginner } from '../helpers/data/Words';
import { GetCrossword } from '../helpers/functions';
import { Crossword } from '../helpers/models/Crossword';

const CrosswordContainer = () => {
  const [data, setData] = useState<Crossword | undefined>(undefined);
  useEffect(() => {
    if (Beginner.length > 0) {
      setData(GetCrossword(Beginner));
    }
  }, []);

  return (
    <div className='p-2'>
      {data && data.puzzle.map((item, index) => {
        return (
          <div
            key={index}
            style={{
              alignContent: 'flex-start',
              display: 'flex',
              height: `${100 / data.height}%`
            }}
          >
            {item.map(subItem => {
              return (
                <div
                  key={subItem.key}
                  className='text-center'
                  style={{
                    border: subItem.empty ? 'none' : 'solid',
                    borderColor: 'gray',
                    borderWidth: 1,
                    fontSize: 24,
                    height: '100%',
                    width: `${100 / data.width}%`
                  }}
                >
                  {subItem.alphabet}
                </div>
              );
            })}
          </div>
        );
      })}
    </div >
  );
};

export default CrosswordContainer;