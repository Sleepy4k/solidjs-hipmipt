import { lazy } from 'solid-js';
import type { RouteDefinition } from '@solidjs/router';

import Home from '@pages/home';

export const routes: RouteDefinition[] = [
  {
    path: '/',
    component: Home,
  },
  {
    path: 'login',
    component: lazy(() => import('@pages/login')),
  },
  {
    path: 'register',
    component: lazy(() => import('@pages/register')),
  },
  {
    path: 'forgot-password',
    component: lazy(() => import('@pages/forgot.password')),
  },
  {
    path: '**',
    component: lazy(() => import('./errors/404')),
  },
];
