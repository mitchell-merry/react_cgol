import React, { useEffect, useRef, useState } from "react";
import { getNext } from "../algorithms/Cgol";
import { CellType, CELL_HEIGHT, GridDimensions, GRID_MARGIN, ICell, IControlFunctions } from "../globals";

import styles from './Grid.module.scss';
var classNames = require('classnames');

export interface GridProps {
    controlFunctions: React.MutableRefObject<IControlFunctions>;
}

export const Grid: React.FC<GridProps> = ({ controlFunctions }) => {
    const [ gridDimensions, setGridDimensions ] = useState<GridDimensions>(getWindowDimensions());
    const [ grid, setGrid ] = useState<CellType[][]>(getInitialGrid(gridDimensions));
    const [ currentDrag, setCurrentDrag ] = useState<CellType | null>(null);
    const gridHistory = useRef<CellType[][][]>([]);

    // Re-write - decide on if we're doing per cell or per grid
    const updateCells = (cells: ICell[]): void => {
        if(cells.length === 0) return;
        // TODO update history
        setGrid(currentGrid => {
            const newGrid = copyGrid(currentGrid);
            cells.forEach(cell => {
                newGrid[cell.row][cell.col] = cell.type;
            })
            return newGrid;
        });
    }

    const updateGrid = (newGrid: CellType[][]): void => {
        gridHistory.current.push(grid);
        setGrid(newGrid);
    }

    const advanceGrid = (): void => {
        gridHistory.current.push(grid);
        setGrid(currentGrid => getNext(currentGrid));
    }

    const undo = (): void => {
        const prevState = gridHistory.current.pop();
        if(!prevState) return;
        setGrid(prevState);
    }

    const clearHistory = (): void => {
        gridHistory.current = [];
    }

    const randomiseGrid = (): void => {
        updateGrid(getRandomGrid(gridDimensions));
        clearHistory();
    }

    const resetGrid = (): void => {
        updateGrid(getInitialGrid(gridDimensions));
        clearHistory();
    }

    const endDrag = (): void => {
        setCurrentDrag(null);
    }
    
    controlFunctions.current.advance = advanceGrid;
    controlFunctions.current.undo = undo;
    controlFunctions.current.clearHistory = clearHistory;
    controlFunctions.current.randomise = randomiseGrid;
    controlFunctions.current.reset = resetGrid;

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>, rowIdx: number, colIdx: number): void => {
        gridHistory.current.push(grid);
        const newDrag = grid[rowIdx][colIdx] === 'alive' ? 'dead' : 'alive';
        setCurrentDrag(newDrag);
        updateCells([{
            type: newDrag, 
            row: rowIdx, 
            col: colIdx
        }])
    }

    const handleMouseUp = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, rowIdx: number, colIdx: number): void => {
        endDrag();
    }

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, rowIdx: number, colIdx: number): void => {
        console.log();
        if(currentDrag === null || currentDrag === grid[rowIdx][colIdx]) return;
        
        // Fixes if you hold click and then leave the grid - checks to make sure there are buttons held down on return.
        if(e.buttons === 0) {
            endDrag();
            return;
        }
        
        updateCells([{
            type: currentDrag, 
            row: rowIdx, 
            col: colIdx
        }])
    }

    const handleKeyDown = (e: KeyboardEvent): void => {
        if(e.key !== ' ') return;
        advanceGrid();
    }

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
    }, []);


    return <div className={styles.grid}>
        {grid.map((row, rowIdx) => (
            <div className={styles.row} key={rowIdx}>
                {row.map((cellValue, colIdx) => {
                    const cellCN = classNames(styles.cell, {
                        [styles.active]: cellValue === 'alive',
                        [styles.dead]: cellValue === 'dead'
                    })
                    
                    return <div 
                        className={cellCN} 
                        key={`${rowIdx} ${colIdx}`} 
                        onMouseDown={(e) => handleMouseDown(e, rowIdx, colIdx)}
                        onMouseUp={(e) => handleMouseUp(e, rowIdx, colIdx)}
                        onMouseMove={(e) => handleMouseMove(e, rowIdx, colIdx)}
                    />
                })}
            </div>
        ))}
    </div>
}

// Get dimensions of the grid based on the window size
const getWindowDimensions = (): GridDimensions => {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width: Math.floor((width-GRID_MARGIN*2)/CELL_HEIGHT*0.6), 
        height: Math.floor((height-GRID_MARGIN*2)/CELL_HEIGHT)
    };
}

// Return a default, dead grid.
const getInitialGrid = (dimensions: GridDimensions): CellType[][] => {
    const o: CellType[][] = [];

    for (let row = 0; row < dimensions.height; row++) {
      o.push([]);
      for (let col = 0; col < dimensions.width; col++) {
        o[row].push('dead');
      }
    }
    return o;
}

const getRandomCell = (): CellType => Math.random() < 0.5 ? 'alive' : 'dead';

const getRandomGrid = (dimensions: GridDimensions): CellType[][] => {
    const o: CellType[][] = [];

    for (let row = 0; row < dimensions.height; row++) {
      o.push([]);
      for (let col = 0; col < dimensions.width; col++) {
        o[row].push(getRandomCell());
      }
    }
    return o;
}

// Deep copy
const copyGrid = (g: any[][]): any[][] => {
    return g.map(a => a.slice());
}