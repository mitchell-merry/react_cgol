import React, { useEffect, useRef, useState } from "react";
import { CellType, getNext } from "./Cgol";
import './Grid.css';

export interface GridProps {
    width: number;
    height: number;
}

const timeBetween = 2000;

// Return a default, dead grid.
function getGrid(width: number, height: number): CellType[][] {
    const o: CellType[][] = [];
    for (let row = 0; row < height; row++) {
      o.push([]);
      for (let col = 0; col < width; col++) {
        o[row].push('dead');
      }
    }
    return o;
}

export const Grid: React.FC<GridProps> = ({ width, height }) => {
    const [ grid, setGrid ] = useState<CellType[][]>(getGrid(width, height));
    const intervalRef = useRef<NodeJS.Timeout>();
    
    // useEffect(() => {
    //     const id = setInterval(() => {
    //         setGrid(currGrid => getNext(currGrid));
    //     }, timeBetween);
    //     intervalRef.current = id;
    // }, [])

    const handleKeyPress = (e: KeyboardEvent) => {
        if(e.key !== ' ') return;

        setGrid(currGrid => getNext(currGrid));
    }

    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress);
      }, []);

    const handleClick = (rowIdx: number, colIdx: number): void => {
        setGrid(currentGrid => {
            const newGrid: CellType[][] = currentGrid.map(a => a.slice());
            newGrid[rowIdx][colIdx] = 'alive';
            return newGrid;
        })
    }

    return <div id="grid">
        {grid.map((row, rowIdx) => (
            <div className={"row"} key={rowIdx}>
                {row.map((cellValue, colIdx) => (
                    <div className={"cell " + cellValue} key={`${rowIdx} ${colIdx}`} onMouseDown={(e) => handleClick(rowIdx, colIdx)} />
                ))}
            </div>
        ))}
    </div>
}