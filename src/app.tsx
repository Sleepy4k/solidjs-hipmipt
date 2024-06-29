import { routes } from './routes';
import { Toaster } from 'solid-toast';
import { MetaProvider } from '@solidjs/meta';
import { HashRouter } from '@solidjs/router';
import { Theme, Auth, Meta } from '@contexts';
import { Suspense, type Component } from 'solid-js';

const App: Component = () => {
  return (
    <MetaProvider>
      <main class="min-h-screen">
        <HashRouter root={(props) => (
          <Meta.MetaProvider>
            <Auth.AuthProvider>
              <Theme.ThemeProvider>
                <Suspense fallback={
                  <div class="flex justify-center items-center h-screen">
                    <div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2"/>
                  </div>
                }>
                  <Toaster />
                  {props.children}
                </Suspense>
              </Theme.ThemeProvider>
            </Auth.AuthProvider>
          </Meta.MetaProvider>
        )}>
          {routes}
        </HashRouter>
      </main>
    </MetaProvider>
  );
};

export default App;
