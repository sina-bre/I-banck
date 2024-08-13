import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/auth',
      component: () => import('../layout/RegisterPage.vue'),
      children: [{ path: 'login', component: () => import('../views/LoginView.vue') }]
    }
  ]
});

export default router;
