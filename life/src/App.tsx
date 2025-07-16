import { useState, useEffect, useCallback } from 'react';

interface Cell {
  isAlive: boolean;
}

interface CellProps {
  cell: Cell;
  onCellClick: () => void;
}

function CellComponent({ cell, onCellClick }: CellProps) {
  return (
    <button
      className="cell"
      onClick={onCellClick}
      style={{
        background: cell.isAlive ? 'black' : 'white'
      }}
    >
      {cell.isAlive}
    </button>
  );
}

type Grid = Cell[][];

interface GridProps {
  grid: Grid;
  onCellClick: (x: number, y: number) => void;
}

function GridComponent({ grid, onCellClick }: GridProps) {
  return (
    <>
    {grid.map((row, rowIndex) => (
      <div key={rowIndex} className="grid-row">
        {row.map((cell, colIndex) => (
          <CellComponent
            key={`${rowIndex}-${colIndex}`}
            cell={cell}
            onCellClick={() => onCellClick(rowIndex, colIndex)}
            />
        ))}
      </div>
    ))}
    </>
  );
}

export default function Game() {
  const gridHeight = 32;
  const gridWidth = 32;
  const interval = 250; // Interval for the game loop in milliseconds
  const initialGrid: Grid = Array(gridHeight).fill(null).map(() => Array(gridWidth).fill(null).map(() => ({ isAlive: false })));
  const [grid, setGrid] = useState<Grid>(initialGrid);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  
  const computeNextGeneration = useCallback(() => {
    setGrid(currentGrid => {
      const newGrid = currentGrid.map(row => row.map(cell => ({ ...cell })));

      for (let x = 0; x < gridHeight; x++) {
        for (let y = 0; y < gridWidth; y++) {
          let neighbors = 0;

          // Count live neighbors
          for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
              if (dx === 0 && dy === 0) continue; // Skip the cell itself

              const nx = x + dx;
              const ny = y + dy;

              if (nx >= 0 && nx < gridHeight && ny >= 0 && ny < gridWidth) {
                if (currentGrid[nx][ny].isAlive) neighbors++;
              }
            }
          }

          if (currentGrid[x][y].isAlive) { // Death
            newGrid[x][y].isAlive = neighbors === 2 || neighbors === 3;
          } else { // Birth
            newGrid[x][y].isAlive = neighbors === 3;
          }
        }
      }

      return newGrid;
    });
  }, [gridHeight, gridWidth]);

  useEffect(() => {
    let intervalId: number;

    if (isRunning) {
      intervalId = window.setInterval(computeNextGeneration, interval);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isRunning, computeNextGeneration, interval]);

  const handleCellClick = (x: number, y: number) => {
    setGrid(currentGrid => {
      const newGrid = currentGrid.map(row => row.map(cell => ({ ...cell })));
      newGrid[x][y].isAlive = !newGrid[x][y].isAlive;
      return newGrid;
    });
  };

  const clearGrid = () => {
    setGrid(initialGrid);
  };

  return (
    <div className="game">
      <div className="game-grid">
        <GridComponent grid={grid} onCellClick={handleCellClick} />
      </div>
      <div className="game-info">
        <button onClick={() => setIsRunning(!isRunning)}>
          {isRunning ? 'Stop' : 'Start'}
        </button>
        <br></br>
        <button onClick={computeNextGeneration}>
          Next Generation
        </button>
        <br></br>
        <button onClick={clearGrid}>
          Clear
        </button>
      </div>
    </div>
  )
}