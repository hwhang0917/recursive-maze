import type { Maze, Size } from "@/composables/useMaze"
import { EMPTY, END, START, WALL } from "@/constants"

export const buildMaze = (size: Size): Maze  => {
  const maze: Maze  = []
  const topRow = WALL.repeat(size.x - 2) + END + WALL
  const bottomRow = WALL + START + WALL.repeat(size.x - 2)
  const midRow = WALL + EMPTY.repeat(size.x - 2) + WALL
  for (let i = 0; i < size.y; i++) {
    if (i === 0) {
      maze.push(topRow)
    } else if (i === size.y - 1) {
      maze.push(bottomRow)
    } else {
      maze.push(midRow)
    }
  }
  return maze
}

export const printMaze = (maze: Maze) => {
  for (let i = 0; i < maze.length; i++) {
    const row = maze[i]
    const parsedRow = row.replace(/ /g, '.')
    console.log(`[${i}]    ` + parsedRow)
  }
}
