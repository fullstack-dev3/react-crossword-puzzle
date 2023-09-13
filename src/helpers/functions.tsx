// @ts-ignore
import CWG from 'cwg';
import { Crossword, CrosswordPuzzle } from './models/Crossword';

export const ShuffleData = (data: string[]): string[] => {
  let result: string[] = [];

  try {
    while (data.length > 0) {
      const index = Math.floor(Math.random() * data.length);
      
      result.push(data[index]);
      data.splice(index, 1);
    }

    return result;
  } catch {
    return data;
  }
};

export const GetCrossword = (data: string[]): Crossword | undefined => {
  try {
    if (data.length === 0) {
      return undefined
    }

    const shuffle = [...ShuffleData(data)];
    
    const result = CWG(shuffle.slice(0, 10));
    
    const height: number = result.height;
    const width: number = result.width;

    if (height < 1 && width < 1) {
      return undefined;
    }

    let puzzle: CrosswordPuzzle[][] = [];
    for (let y = 0; y < height; y++) {
      let subPuzzle = [];
      for (let x = 0; x < width; x++) {
        subPuzzle.push({ key: `${y}${x}`, alphabet: '', x, y, empty: true });
      }

      puzzle.push(subPuzzle);
    }

    result.positionObjArr.forEach((element: any) => {
      let index = 0;

      if (element.isHorizon) {
        for (let x = element.xNum; x < (element.wordStr.length + element.xNum); x++) {
          let found: CrosswordPuzzle | undefined =
            puzzle[element.yNum].find(item => item.y === element.yNum && item.x === x);
          if (found) {
            found.alphabet = element.wordStr[index];
            found.empty = false;
            index++
          }
        }
      } else {
        for (let y = element.yNum; y < (element.wordStr.length + element.yNum); y++) {
          let found: CrosswordPuzzle | undefined =
            puzzle[y].find(item => item.x === element.xNum && item.y === y);
          if (found) {
            found.alphabet = element.wordStr[index];
            found.empty = false;
            index++
          }
        }
      }
    });

    return {
      puzzle,
      width,
      height
    };
  } catch {
    return undefined;
  }
}