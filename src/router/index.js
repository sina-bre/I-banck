import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/auth',
      component: () => import('../layout/RegisterPage.vue'),
      children: [{ path: 'login', component: () => import('../views/LoginView.vue') }]
    },
    {
      path: '/info',
      component: () => import('../layout/InformationLayout.vue')
      // children: [{ path: 'personal-info', component: () => import('') }]
    }
  ]
});

export default router;
