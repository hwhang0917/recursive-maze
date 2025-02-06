import { reactive, ref } from 'vue'

interface Size {
  x: number
  y: number
}
interface MazeStore {
  maze: string[]
  size: Size
}
export type Selected = 'start' | 'end' | 'wall' | 'empty'

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
  size: { x: 20, y: 9 },
})
const selected = ref<Selected>()

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
  }
}
