import { reactive } from 'vue'

interface MazeStore {
  maze: string[][];
  size: { x: number, y: number};
}

export default reactive<MazeStore>({
  maze: [
    ['##################E#'],
    ['#   # #  #         #'],
    ['# # #   ##  ##  ####'],
    ['# # ###  #  #   #  #'],
    ['# #   #  # #### #  #'],
    ['# # #         # #  #'],
    ['# # # ## ## # ###  #'],
    ['# # #       #      #'],
    ['#S##################'],
  ],
  size: { x: 20, y: 9 },
});


