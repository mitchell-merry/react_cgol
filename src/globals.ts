import { ICoord } from "./Sidebar/Structures/StructureData";

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
  advance?: () => void;
  undo?: () => void;
  clearHistory?: () => void;
  randomise?: () => void;
  reset?: () => void;
  loadStructure?: (cells: ICoord[]) => void;
  doWrap: boolean;
}