<script setup lang="ts">
import MazeView from "./components/MazeView.vue";
import useMaze, { gridToVisual } from "./composables/useMaze/index";
const maze = useMaze();
</script>

<template>
  <header>
    <nav>
      <button @click="async () => {
        await maze.createMaze(4);
        console.table(maze.state);
        const r = gridToVisual(maze.state);
        console.table(r);
      }">Generate Maze</button>
    </nav>
  </header>
  <main>
    <MazeView :grid="maze.state" />
  </main>
  <footer>
    <p>Copyright &copy; {{ new Date().getFullYear() }} Heesang Whang. All rights reserved.</p>
  </footer>
</template>
