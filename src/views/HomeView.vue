<script setup lang="ts">
import { END, START, WALL } from '@/constants'
import mazeStore from '@/stores/mazeStore'
import { computed } from 'vue'

const maze = computed(() => {
  return mazeStore.maze.map((row) => {
    return row.split('')
  })
})
</script>

<template>
  <div class="wrapper">
    <div class="maze">
      <div
        class="maze-row"
        v-for="row in maze"
        :key="row.join('')"
      >
        <div
          class="maze-cell"
          v-for="cell in row"
          :key="cell"
          :class="{
            wall: cell === WALL,
            start: cell === START,
            end: cell === END
          }"
        >
          {{ cell }}
        </div>
      </div>
    </div>
    <button class="solve">Solve</button>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  display: grid;
  gap: 1rem;
  .solve {
    padding: 0.5rem 1rem;
    background-color: #333;
    color: white;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
    &:hover {
      background-color: #555;
    }
  }
  .maze {
    user-select: none;
    .maze-row {
      display: flex;
      .maze-cell {
        width: 2rem;
        height: 2rem;
        border: 1px solid black;
        background-color: white;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .wall {
        background-color: black;
      }
      .start {
        background-color: green;
      }
      .end {
        background-color: red;
      }
    }
  }
}
</style>
