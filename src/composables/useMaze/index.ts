import { reactive, ref } from "vue";
import { create } from "./builder";
import type { Grid } from "@/type";
import { E, N, S, W } from "@/constants";


const state = reactive<Grid>([]);
const isCreating = ref<boolean>(false);
const isSolving = ref<boolean>(false);

export const gridToVisual = (grid: Grid): string[][] => {
  const size = grid.length;
  const visualSize = size * 3;
  const visual = Array(visualSize)
    .fill([])
    .map(() => Array(visualSize).fill("#"));

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const cell = grid[y][x];
      const baseY = y * 3;
      const baseX = x * 3;

      visual[baseY + 1][baseX + 1] = " ";

      if (cell & N) visual[baseY][baseX + 1] = " ";
      if (cell & S) visual[baseY + 2][baseX + 1] = " ";
      if (cell & E) visual[baseY + 1][baseX + 2] = " ";
      if (cell & W) visual[baseY + 1][baseX] = " ";
    }
  }

  return visual;
}

const useMaze = () => {
  const createMaze = async (size: number) => {
    isCreating.value = true;
    state.length = 0;
    const newMaze = await create(size);
    for (let i = 0; i < newMaze.length; i++) {
      state.push(newMaze[i]);
    }
    isCreating.value = false;
  }
  return {
    state,
    createMaze,
    gridToVisual,
  };
};

export default useMaze;
