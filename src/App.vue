<script setup lang="ts">
import { RouterView } from 'vue-router'
import { buildMaze, printMaze } from './utils'

printMaze(buildMaze({ x: 20, y: 10 }))
</script>

<template>
  <header>
    <h1>Recursive Maze Solver</h1>
  </header>
  <main>
    <RouterView />
  </main>
</template>

<style scoped>
header {
  padding: 1rem;
  background-color: #333;
  color: #fff;
  h1 {
    margin-bottom: 1rem;
  }
  nav {
    display: flex;
    justify-content: space-between;
    form {
      display: flex;
      gap: 1rem;
    }
    .buttons {
      display: flex;
      gap: 1rem;
      label {
        display: none;
      }
      button {
        all: unset;
        width: 2rem;
        height: 2rem;
        border-radius: 0.5rem;
        cursor: pointer;
        border: 0.2rem solid transparent;
        &:hover {
          border: 0.2rem solid gray;
        }
      }
      .selected {
        border: 0.2rem solid pink;
        &:hover {
          border: 0.2rem solid pink;
        }
      }
      .empty {
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
}
main {
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
