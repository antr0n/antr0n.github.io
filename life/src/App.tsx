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
      <div className="grid-row">
        <CellComponent cell={grid[0][0]} onCellClick={() => handleClick(0, 0)} />
        <CellComponent cell={grid[0][1]} onCellClick={() => handleClick(0, 1)} />
        <CellComponent cell={grid[0][2]} onCellClick={() => handleClick(0, 2)} />
      </div>
      <div className="grid-row">
        <CellComponent cell={grid[1][0]} onCellClick={() => handleClick(1, 0)} />
        <CellComponent cell={grid[1][1]} onCellClick={() => handleClick(1, 1)} />
        <CellComponent cell={grid[1][2]} onCellClick={() => handleClick(1, 2)} />
      </div>
      <div className="grid-row">
        <CellComponent cell={grid[2][0]} onCellClick={() => handleClick(2, 0)} />
        <CellComponent cell={grid[2][1]} onCellClick={() => handleClick(2, 1)} />
        <CellComponent cell={grid[2][2]} onCellClick={() => handleClick(2, 2)} />
      </div>
      <div className="status"></div>
    </>
  );
}

export default function Game() {
const gameGrid: Grid = [
  [{ isAlive: false }, { isAlive: false }, { isAlive: false }],
  [{ isAlive: false }, { isAlive: false }, { isAlive: false }],
  [{ isAlive: false }, { isAlive: false }, { isAlive: false }]
];
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