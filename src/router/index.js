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
      component: () => import('../layout/InformationLayout.vue'),
      children: [
        {
          path: 'personal-info',
          component: () => import('../components/features/information/DepositAccountForm.vue')
        },
        {
          path: 'upload-img',
          component: () => import('../components/features/information/UploadImage.vue')
        }
      ]
    },
    {
      path: '/panel',
      component: () => import('../layout/dashboardLayout.vue')
    }
  ]
});

export default router;
