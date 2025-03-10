<script setup lang="ts">
import { useMaze } from '@/composables/useMaze'
import { EMPTY, END, PATH, START, WALL } from '@/constants'
import { computed } from 'vue'

const { state, solve, resetMaze, isSolving, path } = useMaze()

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
    <button class="btn" :disabled="isSolving || path.length > 0" @click="() => solve()">
      SOLVE
    </button>
    <button class="btn" :disabled="isSolving" @click="() => resetMaze(state.size.x, state.size.y)">
      RESET
    </button>
    <div class="inputs">
      <div>
        <label for="x">X</label>
        <input type="number" v-model="state.size.x" id="x" :disabled="isSolving" />
      </div>
      <div>
        <label for="y">Y</label>
        <input type="number" v-model="state.size.y" id="y" :disabled="isSolving" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.btn {
  padding: 1rem;
}
.inputs {
  display: flex;
  justify-content: space-between;
  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
    font-family: 'Courier New', Courier, monospace;
  }
  label {
    margin: 0.2rem;
  }
}
.maze-container {
  display: grid;
  border: 1px solid black;
  width: 50%;
  @media (max-width: 768px) {
    width: 100%;
  }
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
