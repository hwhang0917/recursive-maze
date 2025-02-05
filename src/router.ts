import { createWebHashHistory, createRouter } from 'vue-router'
import HomeView from './views/HomeView.vue';
import MazeView from './views/MazeView.vue';

const routes = [
  { path: '/', component: HomeView },
  { path: '/solution', component: MazeView },
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
