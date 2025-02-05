import { reactive } from 'vue'

interface MazeStore {
  maze: string[];
  size: { x: number, y: number};
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
  size: { x: 20, y: 9 },
});

export default mazeStore
