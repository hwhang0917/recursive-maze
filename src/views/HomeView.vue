<script setup lang="ts">
import { useMaze } from '@/composables/useMaze';
import { EMPTY, END, PATH, START, WALL } from '@/constants'
import { computed } from 'vue'

const { state, solve, isSolving, path } = useMaze();

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
          empty: cell === EMPTY,
          wall: cell === WALL,
          start: cell === START,
          end: cell === END,
          path: cell === PATH,
        }"
      />
    </div>
    <button
      class="solve-btn"
      :disabled="isSolving || path.length > 0"
      @click="() => solve()"
    >
      solve
    </button>
  </div>
</template>

<style lang="scss" scoped>
.solve-btn {
  padding: 1rem;
}
.maze-container {
  display: grid;
  border: 1px solid black;
  width: 50%;
  .row {
    display: grid;
    .col {
      aspect-ratio: 1 / 1;
    }
    .path {
      background-color: #f6e58d;
      display: flex;
      justify-content: center;
      align-items: center;
      &::after {
        content: ".";
      }
    }
    .empty {
      background-color: white;
    }
    .wall {
      background-color: black;
    }
    .start {
      background-color: #badc58;
    }
    .end {
      background-color: #eb4d4b;
    }
  }
}
</style>
