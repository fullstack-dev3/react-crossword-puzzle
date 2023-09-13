export class CrosswordPuzzle {
  key: string;
  alphabet: string;
  x: number;
  y: number;
  empty: boolean = true;

  constructor(key: string, alphabet: string, x: number, y: number, empty: boolean) {
    this.key = key;
    this.alphabet = alphabet;
    this.x = x;
    this.y = y;
    this.empty = empty;
  }
}

export class Crossword {
  puzzle: CrosswordPuzzle[][];
  height: number;
  width: number;

  constructor(puzzle: CrosswordPuzzle[][], height: number, width: number) {
    this.puzzle = puzzle;
    this.height = height;
    this.width = width;
  }
}