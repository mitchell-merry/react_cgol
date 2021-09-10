import { CellType } from "../globals";

const isOob = (grid: CellType[][], row: number, col: number): boolean => {
    return row < 0 || col < 0 || row >= grid.length || col >= grid[row].length;
}

const getNeighbourCountGrid = (grid: CellType[][]): number[][] => {
    const o: number[][] = [];
    for(let row = 0; row < grid.length; row++) {
        o.push([]);
        for(let col = 0; col < grid[row].length; col++) {
            o[row].push(0);
        }
    }

    for(let row = 0; row < grid.length; row++) {
        for(let col = 0; col < grid[row].length; col++) {
            if(grid[row][col] === 'dead') continue;

            /* 
                0 1 2
                3 4 5
                6 7 8
                where 4 is the current cell.
            */
            for(let m = 0; m < 9; m++) {
                const [newRow, newCol] = [row + Math.floor(m / 3)-1, col + m % 3-1];
                if(m !== 4 && !isOob(grid, newRow, newCol)) {
                    o[newRow][newCol]++;
                }
            }
        }
    }
    return o;
}

const isAlive = (current: CellType, neighbours: number): boolean => {
    return current === 'dead' ? (neighbours === 3) : (neighbours === 2 || neighbours === 3);
}

export const getNext = (grid: CellType[][]): CellType[][] => {
    const o: CellType[][] = [];
    const neighbourCountGrid = getNeighbourCountGrid(grid);
    
    for(let row = 0; row < grid.length; row++) {
        o.push([]);
        for(let col = 0; col < grid[row].length; col++) {
            const r: CellType = isAlive(grid[row][col], neighbourCountGrid[row][col]) ? 'alive' : 'dead'; 
            o[row].push(r);
        }
    }

    return o;
}