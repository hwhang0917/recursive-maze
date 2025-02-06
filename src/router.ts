import { createWebHashHistory, createRouter } from 'vue-router'
import HomeView from './views/HomeView.vue';
import SolutionView from './views/SolutionView.vue';

const routes = [
  { path: '/', component: HomeView },
  { path: '/solution', component: SolutionView },
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
