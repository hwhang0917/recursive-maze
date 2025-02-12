import { DIRECTIONS, EMPTY, END, PATH, START, WALL } from '@/constants'
import { pause } from '@/utils'
import { reactive, ref } from 'vue'

export interface Size {
  x: number
  y: number
}
export type Point = Size
export type Maze = string[]
export type Selected = 'start' | 'end' | 'wall' | 'empty'
interface MazeStore {
  maze: Maze
  size: Size
}

const resetMaze = (width: number, height: number) => {
  width++
  height--

  if (width % 2 === 0) width--
  if (height % 2 === 0) height--

  const newMaze: string[][] = []
  for (let y = 0; y < height; y++) {
    newMaze[y] = []
    for (let x = 0; x < width; x++) {
      newMaze[y][x] = WALL
    }
  }

  function shuffle(array: [number, number][]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
    }
    return array
  }

  function carve(x: number, y: number) {
    newMaze[y][x] = EMPTY

    const directions: [number, number][] = [
      [2, 0],
      [-2, 0],
      [0, 2],
      [0, -2],
    ]
    shuffle(directions)

    for (const [dx, dy] of directions) {
      const nx = x + dx
      const ny = y + dy
      if (nx > 0 && nx < width - 1 && ny > 0 && ny < height - 1 && newMaze[ny][nx] === '#') {
        newMaze[y + dy / 2][x + dx / 2] = ' '
        carve(nx, ny)
      }
    }
  }

  carve(1, 1)

  let exitX = null
  for (let x = width - 2; x > 0; x--) {
    if (newMaze[1][x] === EMPTY) {
      exitX = x
      break
    }
  }
  if (exitX === null) exitX = width - 2
  newMaze[0][exitX] = END

  let startX = null
  for (let x = 1; x < width - 1; x++) {
    if (newMaze[height - 2][x] === ' ') {
      startX = x
      break
    }
  }
  if (startX === null) startX = 1
  newMaze[height - 1][startX] = START

  isSolving.value = false
  path.value = []
  seen.value = initSeen(mazeStore.size)
  mazeStore.maze = newMaze.map((row) => row.join(''))
}

const mazeStore = reactive<MazeStore>({
  maze: [
    '##################E#',
    '#   # #  #         #',
    '# # #   ### ## #####',
    '# # ###  #  #   #  #',
    '# #   ## # #### ## #',
    '# # # #       # #  #',
    '# # # ##### ### #  #',
    '# # #         # #  #',
    '# # # ## ## # #### #',
    '# # #  #  # # #    #',
    '# # # ## ## # # ## #',
    '# # #  # #  #      #',
    '#S##################',
  ],
  size: { x: 20, y: 13 },
})
const selected = ref<Selected>()
const path = ref<Point[]>([])
const isSolving = ref<boolean>(false)
const initSeen = (size: Size): boolean[][] => {
  const seen: boolean[][] = []
  for (let i = 0; i < size.y; i++) {
    const subSeen: boolean[] = []
    for (let j = 0; j < size.x; j++) {
      subSeen.push(false)
    }
    seen.push(subSeen)
  }
  return seen
}
const seen = ref<boolean[][]>(initSeen(mazeStore.size))

const walk = (maze: Maze, curr: Point): boolean => {
  if (curr.x < 0 || curr.x >= maze[0].length || curr.y < 0 || curr.y >= maze.length) {
    return false
  }
  if (maze[curr.y][curr.x] === WALL) {
    return false
  }
  if (maze[curr.y][curr.x] === END) {
    path.value.push(curr)
    return true
  }
  if (seen.value[curr.y][curr.x]) {
    return false
  }

  seen.value[curr.y][curr.x] = true
  path.value.push(curr)

  for (const [diffX, diffY] of DIRECTIONS) {
    const next: Point = {
      x: curr.x + diffX,
      y: curr.y + diffY,
    }
    if (walk(maze, next)) {
      return true
    }
  }

  path.value.pop()
  return false
}
const getStart = (): Point => {
  for (let y = 0; y < mazeStore.size.y; y++) {
    for (let x = 0; x < mazeStore.size.x; x++) {
      if (mazeStore.maze[y][x] === START) {
        return { x, y }
      }
    }
  }
  return { x: 0, y: 0 }
}
const solve = async (delay = 30) => {
  isSolving.value = true

  walk(mazeStore.maze, getStart())

  const paths = path.value.slice(1, path.value.length - 1)
  for (const p of paths) {
    const line = mazeStore.maze[p.y]
    const newLine = line.split('')
    newLine[p.x] = PATH
    mazeStore.maze[p.y] = newLine.join('')
    if (delay >= 0) {
      await pause(delay)
    }
  }
  isSolving.value = false
}

export const useMaze = () => {
  const setSize = (size: Size) => {
    mazeStore.size = size
    const newMaze: string[] = []
    for (let i = 0; i < size.y; i++) {
      let row = ' '
      if (i === 0 || i === size.y - 1) {
        row = '#'.repeat(size.x)
      } else {
        row = '#' + ' '.repeat(size.x - 2) + '#'
      }
      newMaze.push(row)
    }
    mazeStore.maze = newMaze
  }
  const setCell = (x: number, y: number) => {
    const row = mazeStore.maze[x]
    const rowStart = row.slice(0, y)
    const rowEnd = row.slice(y + 1)
    switch (selected.value) {
      case 'start':
        mazeStore.maze[x] = rowStart + 'S' + rowEnd
        break
      case 'end':
        mazeStore.maze[x] = rowStart + 'E' + rowEnd
        break
      case 'wall':
        mazeStore.maze[x] = rowStart + '#' + rowEnd
        break
      case 'empty':
        mazeStore.maze[x] = rowStart + ' ' + rowEnd
        break
      default:
        break
    }
  }
  return {
    state: mazeStore,
    setSize,
    selected,
    setCell,
    solve,
    isSolving,
    path,
    resetMaze,
  }
}
