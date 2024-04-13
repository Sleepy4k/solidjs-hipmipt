import type { Component } from 'solid-js';
import { useRoutes } from '@solidjs/router';

import { Toaster } from 'solid-toast';
import { routes } from './routes';
import { theme } from '@contexts';

const App: Component = () => {
  const Route = useRoutes(routes);

  return (
    <>
      <Toaster />
      <theme.ThemeProvider>
        <Route />
      </theme.ThemeProvider>
    </>
  );
};

export default App;
