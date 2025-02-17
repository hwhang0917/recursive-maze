<script setup lang="ts">
import type { Grid } from "@/type";
import { onMounted, ref, watch } from "vue";

interface MazeViewProps {
  grid: Grid;
}
const props = defineProps<MazeViewProps>();

const canvasRef = ref<HTMLCanvasElement>();

onMounted(() => {
  const canvas = canvasRef.value;
  if (canvas) {
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  }
});
</script>

<template>
  <canvas ref="canvasRef" class="h-16 w-screen" />
</template>
