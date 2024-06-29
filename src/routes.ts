import { lazy } from 'solid-js';
import type { RouteDefinition } from '@solidjs/router';

export const routes: RouteDefinition[] = [
  {
    path: '/',
    component: lazy(() => import('@pages/landing/home')),
  },
  {
    path: '/about',
    component: lazy(() => import('@pages/landing/about/home')),
  },
  {
    path: '/about/bpc',
    component: lazy(() => import('@pages/landing/about/bpc')),
  },
  {
    path: '/about/pt',
    component: lazy(() => import('@pages/landing/about/pt')),
  },
  {
    path: '/activity',
    component: lazy(() => import('@pages/landing/activity')),
  },
  {
    path: '/article',
    component: lazy(() => import('@pages/landing/article')),
  },
  {
    path: '/product',
    component: lazy(() => import('@pages/landing/product')),
  },
  {
    path: '/member',
    component: lazy(() => import('@pages/landing/member')),
  },
  {
    path: '/login',
    component: lazy(() => import('@pages/auth/login')),
  },
  {
    path: '/register',
    component: lazy(() => import('@pages/auth/register')),
  },
  {
    path: '/forgot-password',
    component: lazy(() => import('@pages/auth/forgot/password')),
  },
  {
    path: '/forgot-password/verify/:id',
    component: lazy(() => import('@pages/auth/forgot/verify')),
  },
  {
    path: '/forgot-password/done',
    component: lazy(() => import('@pages/auth/forgot/done')),
  },
  {
    path: '/forgot-process',
    component: lazy(() => import('@pages/auth/forgot/process')),
  },
  {
    path: '/dashboard',
    component: lazy(() => import('@pages/dashboard/home')),
  },
  {
    path: '/*all',
    component: lazy(() => import('@pages/errors/404')),
  },
];
