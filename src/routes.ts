import { lazy } from 'solid-js';
import type { RouteDefinition } from '@solidjs/router';

import Home from '@pages/landing/home';

export const routes: RouteDefinition[] = [
  {
    path: '/',
    component: Home,
  },
  {
    path: 'login',
    component: lazy(() => import('@pages/auth/login')),
  },
  {
    path: 'register',
    component: lazy(() => import('@pages/auth/register')),
  },
  {
    path: 'forgot-password',
    component: lazy(() => import('@pages/auth/forgot/password')),
  },
  {
    path: 'forgot-process',
    component: lazy(() => import('@pages/auth/forgot/process')),
  },
  {
    path: 'forgot-password/verify/:id',
    component: lazy(() => import('@pages/auth/forgot/verify')),
  },
  {
    path: 'forgot-password/done',
    component: lazy(() => import('@pages/auth/forgot/done')),
  },
  {
    path: 'dashboard',
    component: lazy(() => import('@pages/dashboard/home')),
  },
  {
    path: '**',
    component: lazy(() => import('@pages/errors/404')),
  },
];
