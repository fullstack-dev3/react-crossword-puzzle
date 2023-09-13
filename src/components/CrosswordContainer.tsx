import React, { useEffect, useState } from 'react';
import { Easy } from '../helpers/data/EasyWords';
import { Normal } from '../helpers/data/NormalWords';
import { Expert } from '../helpers/data/ExpertWords';
import { GetCrossword } from '../helpers/functions';
import { Crossword } from '../helpers/models/Crossword';

const CrosswordContainer: React.FC<{level: string}> = (props) => {
  const [data, setData] = useState<Crossword | undefined>(undefined);

  useEffect(() => {
    if (props.level === 'easy' && Easy.length > 0) {
      setData(GetCrossword(Easy, 5));
    }
    if (props.level === 'normal' && Normal.length > 0) {
      setData(GetCrossword(Normal, 10));
    }
    if (props.level === 'expert' && Expert.length > 0) {
      setData(GetCrossword(Expert, 20));
    }
  }, [props.level]);

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
                    borderColor: 'gray',
                    borderStyle: subItem.empty ? 'none' : 'solid',
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