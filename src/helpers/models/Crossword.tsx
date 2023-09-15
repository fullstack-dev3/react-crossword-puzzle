export class clickable {
  indexes: number[][];
  isHorizon: boolean;

  constructor(indexes: number[][], isHorizon: boolean) {
    this.indexes = indexes;
    this.isHorizon = isHorizon;
  }
}

export class CrosswordPuzzle {
  key: string;
  alphabet: string;
  x: number;
  y: number;
  empty: boolean = true;
  clickable: clickable[];
  clicked: boolean = false;
  horizonActive: boolean = false;
  hCorrect: string;
  vCorrect: string;
  userInput: string;
  done: boolean;
  wrong: boolean;

  constructor(
    key: string,
    alphabet: string,
    x: number,
    y: number,
    empty: boolean,
    clickable: clickable[],
    clicked: boolean,
    horizonActive: boolean,
    hCorrect: string,
    vCorrect: string,
    userInput: string,
    done: boolean,
    wrong: boolean
  ) {
    this.key = key;
    this.alphabet = alphabet;
    this.x = x;
    this.y = y;
    this.empty = empty;
    this.clickable = clickable;
    this.clicked = clicked;
    this.horizonActive = horizonActive;
    this.hCorrect = hCorrect;
    this.vCorrect = vCorrect;
    this.userInput = userInput;
    this.done = done;
    this.wrong = wrong;
  }
}

export class Crossword {
  puzzle: CrosswordPuzzle[][];
  height: number;
  width: number;
  currentIndexes: number[][];
  horizon: boolean;

  constructor(
    puzzle: CrosswordPuzzle[][],
    height: number,
    width: number,
    currentIndexes: number[][],
    horizon: boolean
  ) {
    this.puzzle = puzzle;
    this.height = height;
    this.width = width;
    this.currentIndexes = currentIndexes;
    this.horizon = horizon;
  }
}