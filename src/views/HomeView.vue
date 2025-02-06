<script setup lang="ts">
import { useMaze } from '@/composables/useMaze';
import { END, START, WALL } from '@/constants'
import { computed } from 'vue'

const { state } = useMaze();

const maze = computed(() => {
  return state.maze.map((row) => {
    return row.split('')
  })
})
</script>

<template>
  <div class="maze-container">
    <div
      class="row"
      v-for="(row, rowIndex) in maze"
      :key="rowIndex"
      :style="{ gridTemplateColumns: `repeat(${row.length}, 1fr)` }"
    >
      <div
        class="col"
        v-for="(cell, cellIndex) in row"
        :key="cellIndex"
        :style="{ gridTemplateRows: `repeat(${row.length}, 1fr)` }"
        :class="{
          space: cell === ' ',
          wall: cell === WALL,
          start: cell === START,
          end: cell === END,
        }"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.maze-container {
  display: grid;
  border: 1px solid black;
  width: 100%;
  .row {
    display: grid;
    .col {
      aspect-ratio: 1 / 1;
    }
    .space {
      background-color: white;
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
</style>
