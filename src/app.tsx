import AOS from 'aos';
import 'aos/dist/aos.css';
import { routes } from './routes';
import { Toaster } from 'solid-toast';
import { MetaProvider } from '@solidjs/meta';
import { HashRouter } from '@solidjs/router';
import { Theme, Auth, Meta } from '@contexts';
import { Suspense, type Component, createEffect } from 'solid-js';

const App: Component = () => {
  createEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: false,
    });
  });

  return (
    <MetaProvider>
      <main class="min-h-screen">
        <HashRouter root={(props) => (
          <Suspense fallback={
            <div class="flex justify-center items-center h-screen">
              <span class="loading loading-ring loading-lg h-32 w-32 border-t-2 border-b-2" />
            </div>
          }>
            <Meta.MetaProvider>
              <Auth.AuthProvider>
                <Theme.ThemeProvider>
                  <Toaster />
                  {props.children}
                </Theme.ThemeProvider>
              </Auth.AuthProvider>
            </Meta.MetaProvider>
          </Suspense>
        )}>
          {routes}
        </HashRouter>
      </main>
    </MetaProvider>
  );
};

export default App;
