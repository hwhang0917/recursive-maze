import { MAX_SIZE, MIN_SIZE, N, S, E, W } from "@/constants";
import type { Grid } from "@/type";

export const create = async (size: number): Promise<Grid> => {
  if (size < MIN_SIZE || size > MAX_SIZE) {
    throw new Error("Invalid maze size");
  }
  const grid = Array(size).fill([]).map(() => Array(size).fill(0));
  const DX = { [E]: 1, [W]: -1, [N]: 0, [S]: 0 };
  const DY = { [E]: 0, [W]: 0, [N]: -1, [S]: 1 };
  const OPPOSITE = { [E]: W, [W]: E, [N]: S, [S]: N };

  const carvePath = (cx: number, cy: number, grid: Grid) => {
    const directions = [N, S, E, W].sort(() => Math.random() - 0.5);

    directions.forEach((direction) => {
      const nx = cx + DX[direction];
      const ny = cy + DY[direction];

      if (ny >= 0 && ny < grid.length && nx >= 0 && nx < grid[ny].length && grid[ny][nx] === 0) {
        grid[cy][cx] |= direction;
        grid[ny][nx] |= OPPOSITE[direction];
        carvePath(nx, ny, grid);
      }
    });
  };

  carvePath(size - 1, 0, grid);
  return grid;
};
