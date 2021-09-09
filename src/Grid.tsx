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

function copyGrid(g: any[][]): any[][] {
    return g.map(a => a.slice());
}

export const Grid: React.FC<GridProps> = ({ width, height }) => {
    const [ grid, setGrid ] = useState<CellType[][]>(getGrid(width, height));
    // const intervalRef = useRef<NodeJS.Timeout>();
    const gridHistory = useRef<CellType[][][]>([]);
    console.log(gridHistory.current.length);

    // useEffect(() => {
    //     const id = setInterval(() => {
    //         setGrid(currGrid => getNext(currGrid));
    //     }, timeBetween);
    //     intervalRef.current = id;
    // }, [])

    const addToHistory = (grid: CellType[][]): void => {
        // TODO check if most recent is identical if so dont add
        gridHistory.current.push(grid);
    }

    const advanceGOL = (): void => {
        setGrid(currentGrid => {
            addToHistory(copyGrid(currentGrid));
            return getNext(currentGrid)
        });
    }

    const handleKeyPress = (e: KeyboardEvent): void => {
        if(e.key !== ' ') return;
        advanceGOL();
    }

    const devanceGOL = (): void => {
        const prev = gridHistory.current.pop();
        if(prev === undefined) return;
        setGrid(prev);
    }

    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress);
      }, []);

    const handleClick = (rowIdx: number, colIdx: number): void => {
        setGrid(currentGrid => {
            addToHistory(copyGrid(currentGrid));
            const newGrid: CellType[][] = copyGrid(currentGrid);
            newGrid[rowIdx][colIdx] = (newGrid[rowIdx][colIdx] === 'alive' ? 'dead' : 'alive');
            return newGrid;
        })
    }

    return <div id="grid">
        <button onClick={(): void => {devanceGOL()}}>GO BACK!!</button>
        <button onClick={(): void => {advanceGOL()}}>ADVANCE</button>
        {grid.map((row, rowIdx) => (
            <div className={"row"} key={rowIdx}>
                {row.map((cellValue, colIdx) => (
                    <div className={"cell " + cellValue} key={`${rowIdx} ${colIdx}`} onMouseDown={(e): void => handleClick(rowIdx, colIdx)} />
                ))}
            </div>
        ))}
    </div>
}