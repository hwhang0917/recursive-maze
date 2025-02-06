<script setup lang="ts">
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import { useMaze, type Selected } from './composables/useMaze'

const { state, setSize, selected } = useMaze()

const xSize = ref(state.size.x)
const ySize = ref(state.size.y)

const onXChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  xSize.value = parseInt(target.value)
}
const onYChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  ySize.value = parseInt(target.value)
}
const onSet = () => setSize({ x: xSize.value, y: ySize.value })

const setSelected = (type: Selected) => selected.value = type
</script>

<template>
  <header>
    <h1>Recursive Maze Solver</h1>
    <!--
    <nav>
      <form @submit.prevent="onSet">
        <input type="number" placeholder="X" :value="xSize" @change="onXChange" />
        <input type="number" placeholder="Y" :value="ySize" @change="onYChange" />
        <input type="submit" value="Set" />
      </form>
      <div class="buttons">
        <button
          class="empty"
          :class="{ selected: selected === 'empty' }"
          title="Empty"
          @click="setSelected('empty')"
        />
        <button
          class="wall"
          :class="{ selected: selected === 'wall' }"
          title="Wall"
          @click="setSelected('wall')"
        />
        <button
          class="start"
          :class="{ selected: selected === 'start' }"
          title="Start"
          @click="setSelected('start')"
        />
        <button
          class="end"
          :class="{ selected: selected === 'end' }"
          title="End"
          @click="setSelected('end')"
        />
      </div>
    </nav>
    -->
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
