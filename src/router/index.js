import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from '@/stores/user';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/auth',
      component: () => import('../layout/RegisterLayout.vue'),
      beforeEnter: (to, from, next) => {
        if (to.path === '/auth') {
          next('/auth/login');
        } else {
          next();
        }
      },
      children: [{ path: 'login', component: () => import('../views/LoginView.vue') }]
    },
    {
      path: '/info',
      component: () => import('../layout/InformationLayout.vue'),
      beforeEnter: (to, from, next) => {
        if (to.path === '/info') {
          next('/info/personal-info');
        } else {
          next();
        }
      },
      children: [
        {
          path: 'personal-info',
          component: () => import('../components/features/information/DepositAccountForm.vue')
        },
        {
          path: 'upload-img',
          component: () => import('../components/features/information/UploadImage.vue')
        },
        {
          path: 'confirm-info',
          component: () => import('../components/features/information/ConfirmInformation.vue')
        }
      ]
    },
    {
      path: '/panel',
      component: () => import('../layout/panelLayout.vue'),
      beforeEnter: (to, from, next) => {
        if (to.path === '/panel') {
          next('/panel/dashboard');
        } else {
          next();
        }
      },
      children: [
        {
          path: 'dashboard',
          component: () => import('../components/features/dashboard/DashboardCards.vue')
        }
      ]
    },
    // 404 page !!! be careful
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../components/features/NotFound.vue')
    }
  ]
});

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  const isAuthenticated = userStore.token;

  const publicRoutes = ['/auth/login'];

  if (!isAuthenticated && !publicRoutes.includes(to.path)) {
    next('/auth/login');
  } else {
    next();
  }
});

export default router;
