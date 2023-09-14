/* eslint-disable no-sequences */
// @ts-ignore
import CWG from 'cwg';
import { Crossword, CrosswordPuzzle, clickable } from './models/Crossword';

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

export const GetCrossword = (data: string[], count: number): Crossword => {
  const initialValue: Crossword = {
    puzzle: [],
    height: 0,
    width: 0
  }

  try {
    const shuffle = [...ShuffleData(data)];
    
    const result = CWG(shuffle.slice(0, count));
    
    const height: number = result.height;
    const width: number = result.width;

    if (height < 1 && width < 1) {
      return initialValue;
    }

    let puzzle: CrosswordPuzzle[][] = [];
    for (let y = 0; y < height; y++) {
      let subPuzzle = [];
      for (let x = 0; x < width; x++) {
        subPuzzle.push({
          key: `${y}${x}`,
          alphabet: '',
          x,
          y,
          empty: true,
          clickable: [],
          clicked: false,
          horizonActive: false,
          hCorrect: '',
          vCorrect: ''
        });
      }

      puzzle.push(subPuzzle);
    }

    result.positionObjArr.forEach((element: any) => {
      let index = 0;
      let indexes: number[][] = [];
      let clickable: clickable[] = [];

      if (element.isHorizon) {
        for (let x = element.xNum; x < (element.wordStr.length + element.xNum); x++) {
          indexes.push([element.yNum, x]);
        }

        let clickibleIndex: clickable = {
          indexes: indexes,
          isHorizon: element.isHorizon
        };
        for (let x = element.xNum; x < (element.wordStr.length + element.xNum); x++) {
          let found: CrosswordPuzzle | undefined =
            puzzle[element.yNum].find(item => item.y === element.yNum && item.x === x);
          if (found) {
            found.alphabet = element.wordStr[index];
            found.empty = false;
            found.clickable = [...found.clickable, clickibleIndex];
            found.hCorrect = element.wordStr;
            index++
          }
        }
      } else {
        for (let y = element.yNum; y < (element.wordStr.length + element.yNum); y++) {
          indexes.push([y, element.xNum]);
        }

        let clickibleIndex: clickable = {
          indexes: indexes,
          isHorizon: element.isHorizon
        };

        clickable.push(clickibleIndex);

        for (let y = element.yNum; y < (element.wordStr.length + element.yNum); y++) {
          let found: CrosswordPuzzle | undefined =
            puzzle[y].find(item => item.x === element.xNum && item.y === y);
          if (found) {
            found.alphabet = element.wordStr[index];
            found.empty = false;
            found.clickable = [...found.clickable, clickibleIndex];
            found.vCorrect = element.wordStr;
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
    return initialValue;
  }
}

export const GetCorrectAnswer = (item: CrosswordPuzzle): string => {
  if (item.clickable.length === 1 && item.clickable[0].isHorizon) {
    return item.hCorrect;
  } else if (item.clickable.length === 1 && !item.clickable[0].isHorizon) {
    return item.vCorrect;
  } else if (item.clickable.length === 2 && item.horizonActive) {
    return item.vCorrect;
  } else if (item.clickable.length === 2 && !item.horizonActive) {
    return item.hCorrect;
  }

  return '';
}

export const ClickCrossword = (item: CrosswordPuzzle, crossword: Crossword): Crossword => {
  let newCrossword = { ...crossword };

  for (let i = 0; i < crossword.puzzle.length; i++) {
    for (let j = 0; j < crossword.puzzle[0].length; j++) {
      newCrossword.puzzle[i][j].clicked = false;
    }
  }

  if (item.clickable.length === 1) {
    if (item.clickable[0].isHorizon) {
      for (let i = 0; i < item.clickable[0].indexes.length; i++) {
        newCrossword.puzzle[item.clickable[0].indexes[i][0]][item.clickable[0].indexes[i][0], item.clickable[0].indexes[i][1]].clicked = true;
      }
    } else {
      for (let i = 0; i < item.clickable[0].indexes.length; i++) {
        newCrossword.puzzle[item.clickable[0].indexes[i][0]][item.clickable[0].indexes[i][0], item.clickable[0].indexes[i][1]].clicked = true;
      }
    }
  } else if (item.clickable.length === 2) {
    if (item.horizonActive) {
      if (!item.clickable[0].isHorizon) {
        for (let i = 0; i < item.clickable[0].indexes.length; i++) {
          newCrossword.puzzle[item.clickable[0].indexes[i][0]][item.clickable[0].indexes[i][0], item.clickable[0].indexes[i][1]].clicked = true;
        }
      } else if (!item.clickable[1].isHorizon) {
        for (let i = 0; i < item.clickable[1].indexes.length; i++) {
          newCrossword.puzzle[item.clickable[1].indexes[i][0]][item.clickable[1].indexes[i][0], item.clickable[1].indexes[i][1]].clicked = true;
        }
      }
    } else {
      if (item.clickable[0].isHorizon) {
        for (let i = 0; i < item.clickable[0].indexes.length; i++) {
          newCrossword.puzzle[item.clickable[0].indexes[i][0]][item.clickable[0].indexes[i][0], item.clickable[0].indexes[i][1]].clicked = true;
        }
      } else if (item.clickable[1].isHorizon) {
        for (let i = 0; i < item.clickable[1].indexes.length; i++) {
          newCrossword.puzzle[item.clickable[1].indexes[i][0]][item.clickable[1].indexes[i][0], item.clickable[1].indexes[i][1]].clicked = true;
        }
      }
    }

    item.horizonActive = !item.horizonActive;
  }

  return newCrossword;
}