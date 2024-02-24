import { RouteRecordRaw } from 'vue-router';
import { isAuthenticated } from './index';

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: () => import('pages/Login.vue'),
  },
  {
    path: '/cadastro',
    name: 'cadastro',
    component: () => import('pages/Cadastro.vue'),
  },
  {
    path: '/forgot-pass',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/ForgotPass.vue'),
        name: 'forgotpass',
      },
    ],
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Home.vue'), name: 'home' },
    ],
  },
  {
    path: '/places',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Places.vue'), name: 'places' },
    ],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
