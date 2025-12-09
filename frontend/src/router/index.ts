import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/portfolio',
      name: 'portfolio',
      component: () => import('@/views/PortfolioView.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/AboutView.vue'),
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('@/views/admin/AdminLayout.vue'),
      children: [
        {
          path: '',
          name: 'admin-dashboard',
          component: () => import('@/views/admin/DashboardView.vue'),
        },
        {
          path: 'login',
          name: 'admin-login',
          component: () => import('@/views/admin/LoginView.vue'),
        },
        {
          path: 'portfolios',
          name: 'admin-portfolios',
          component: () => import('@/views/admin/PortfolioManageView.vue'),
        },
        {
          path: 'profile',
          name: 'admin-profile',
          component: () => import('@/views/admin/ProfileEditView.vue'),
        },
        {
          path: 'skills',
          name: 'admin-skills',
          component: () => import('@/views/admin/SkillManageView.vue'),
        },
      ],
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})

export default router
