
export const CELL_TYPES = ['dead', 'alive'] as const;
export type CellType = typeof CELL_TYPES[number];
export interface ICell {
    type: CellType;
    row: number;
    col: number;
}

export const CELL_HEIGHT = 22;
export const GRID_MARGIN = 20;

export type GridDimensions = {
    width: Number;
    height: Number;
};

export interface IControlFunctions {
  advance: (() => void) | undefined;
  undo: (() => void) | undefined;
  clearHistory: (() => void) | undefined;
  randomise: (() => void) | undefined;
  reset: (() => void) | undefined;
  doWrap: boolean;
}