/* eslint-disable no-sequences */
// @ts-ignore
import CWG from 'cwg';
import { Crossword, CrosswordPuzzle, clickable } from './models/Crossword';

const alphabets = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

export const ShuffleData = (data: string[]): string[] => {
  let result: string[] = [];
  let init: string[] = [...data];

  try {
    while (init.length > 0) {
      const index = Math.floor(Math.random() * init.length);
      
      result.push(init[index]);
      init.splice(index, 1);
    }
  } catch {
    result = init;
  }

  return result;
};

export const GetCrossword = (data: string[], count: number): Crossword => {
  const initialValue: Crossword = {
    puzzle: [],
    height: 0,
    width: 0,
    currentIndexes: [],
    horizon: false
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
          vCorrect: '',
          userInput: '',
          done: false,
          wrong: false
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
            index++;
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
            index++;
          }
        }
      }
    });

    return {
      puzzle,
      width,
      height,
      currentIndexes: [],
      horizon: false
    };
  } catch {
    return initialValue;
  }
}

export const UpdateCrossword = (
  item: CrosswordPuzzle, crossword: Crossword
) : Promise<Crossword> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let newCrossword = { ...crossword };

      newCrossword.currentIndexes = [];

      for (let i = 0; i < crossword.puzzle.length; i++) {
        for (let j = 0; j < crossword.puzzle[0].length; j++) {
          newCrossword.puzzle[i][j].clicked = false;
          newCrossword.puzzle[i][j].userInput = '';
        }
      }

      if (item.clickable.length === 1) {
        if (item.clickable[0].isHorizon) {
          for (let i = 0; i < item.clickable[0].indexes.length; i++) {
            newCrossword.currentIndexes.push([item.clickable[0].indexes[i][0], item.clickable[0].indexes[i][0], item.clickable[0].indexes[i][1]]);
            newCrossword.puzzle[item.clickable[0].indexes[i][0]][item.clickable[0].indexes[i][0], item.clickable[0].indexes[i][1]].clicked = true;
          }
        } else {
          for (let i = 0; i < item.clickable[0].indexes.length; i++) {
            newCrossword.currentIndexes.push([item.clickable[0].indexes[i][0], item.clickable[0].indexes[i][0], item.clickable[0].indexes[i][1]]);
            newCrossword.puzzle[item.clickable[0].indexes[i][0]][item.clickable[0].indexes[i][0], item.clickable[0].indexes[i][1]].clicked = true;
          }
        }
      } else if (item.clickable.length === 2) {
        if (item.horizonActive) {
          if (item.clickable[0].isHorizon === false) {
            for (let i = 0; i < item.clickable[0].indexes.length; i++) {
              newCrossword.currentIndexes.push([item.clickable[0].indexes[i][0], item.clickable[0].indexes[i][0], item.clickable[0].indexes[i][1]]);
              newCrossword.puzzle[item.clickable[0].indexes[i][0]][item.clickable[0].indexes[i][0], item.clickable[0].indexes[i][1]].clicked = true;
            }
          } else if (item.clickable[1].isHorizon === false) {
            for (let i = 0; i < item.clickable[1].indexes.length; i++) {
              newCrossword.currentIndexes.push([item.clickable[1].indexes[i][0], item.clickable[1].indexes[i][0], item.clickable[1].indexes[i][1]]);
              newCrossword.puzzle[item.clickable[1].indexes[i][0]][item.clickable[1].indexes[i][0], item.clickable[1].indexes[i][1]].clicked = true;
            }
          }
        } else {
          if (item.clickable[0].isHorizon) {
            for (let i = 0; i < item.clickable[0].indexes.length; i++) {
              newCrossword.currentIndexes.push([item.clickable[0].indexes[i][0], item.clickable[0].indexes[i][0], item.clickable[0].indexes[i][1]]);
              newCrossword.puzzle[item.clickable[0].indexes[i][0]][item.clickable[0].indexes[i][0], item.clickable[0].indexes[i][1]].clicked = true;
            }
          } else if (item.clickable[1].isHorizon) {
            for (let i = 0; i < item.clickable[1].indexes.length; i++) {
              newCrossword.currentIndexes.push([item.clickable[1].indexes[i][0], item.clickable[1].indexes[i][0], item.clickable[1].indexes[i][1]]);
              newCrossword.puzzle[item.clickable[1].indexes[i][0]][item.clickable[1].indexes[i][0], item.clickable[1].indexes[i][1]].clicked = true;
            }
          }
        }

        const newStatus: boolean = !item.horizonActive;
        item.horizonActive = newStatus;
        newCrossword.horizon = newStatus;
      }

      resolve(newCrossword);
    }, 100);
  });
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

export const SetAnswer = (
  item: Crossword,
  eventKey: string,
  indexes: number[][],
  correct: string
) : Promise<Crossword> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let temp = { ...item };

      if (eventKey === 'Backspace' || eventKey === 'Delete') {
        for (let i = indexes.length - 1; i > 0; i--) {
          if (temp.puzzle[indexes[i][0]][indexes[i][2]].done) {

          } else {
            while (temp.puzzle[indexes[i][0]][indexes[i][2]].userInput === '' && i !== 0) {
              temp.puzzle[indexes[i][0]][indexes[i][2]].userInput = '';
              i--;
            }

            temp.puzzle[indexes[i][0]][indexes[i][2]].userInput = '';

            break;
          }
        }

        resolve({ ...temp });
      } else if (alphabets.includes(eventKey.toLowerCase())) {
        let check: string = '';

        for (let i = 0; i < indexes.length; i++) {
          if (temp.puzzle[indexes[i][0]][indexes[i][2]].done) {
            check += temp.puzzle[indexes[i][0]][indexes[i][2]].alphabet;
          } else {
            check += temp.puzzle[indexes[i][0]][indexes[i][2]].userInput;

            if (temp.puzzle[indexes[i][0]][indexes[i][2]].userInput === '') {
              temp.puzzle[indexes[i][0]][indexes[i][2]].userInput = eventKey.toLowerCase();
              check += eventKey.toLowerCase();

              break;
            }
          }
        }

        if (check.length === correct.length) {
          if (check === correct) {
            for (let i = 0; i < indexes.length; i++) {
              temp.puzzle[indexes[i][0]][indexes[i][2]].done = true;
            }
          } else {
            for (let i = 0; i < indexes.length; i++) {
              temp.puzzle[indexes[i][0]][indexes[i][2]].wrong = true;
            }
          }
        }

        resolve({ ...temp });
      }
    }, 100);
  });
}