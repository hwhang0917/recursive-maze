<script setup lang="ts">
import { RouterView } from 'vue-router';
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
}
</style>
