import { useState } from 'react';

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
    >
      {cell.isAlive}
    </button>
  );
}

type Grid = Cell[][];

interface GridProps {
  grid: Grid;
}

function GridComponent({ grid }: GridProps) {
  function handleClick(x: number, y: number) {
    grid[x][y].isAlive = !grid[x][y].isAlive;
    console.log("Cell (" + x + ", " + y + ") is ", grid[x][y].isAlive);
  }

  return (
    <>
    {grid.map((row, rowIndex) => (
      <div key={rowIndex} className="grid-row">
        {row.map((cell, colIndex) => (
          <CellComponent
            key={`${rowIndex}-${colIndex}`}
            cell={cell}
            onCellClick={() => handleClick(rowIndex, colIndex)}
            />
        ))}
      </div>
    ))}
    <div className="status"></div>
    </>
  );
}

export default function Game() {
  const gridHeight = 32;
  const gridWidth = 32;
  const gameGrid: Grid = Array(gridHeight).fill(null).map(() => Array(gridWidth).fill(null).map(() => ({ isAlive: false })));

  return (
    <div className="game">
      <div className="game-grid">
        <GridComponent grid={gameGrid} />
      </div>
      <div className="game-info">
        <p>Game Info:</p>
      </div>
    </div>
  )
}