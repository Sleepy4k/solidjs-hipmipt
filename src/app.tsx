import { Toaster } from 'solid-toast';
import { Theme, Auth } from '@contexts';
import type { Component, JSXElement } from 'solid-js';

const App: Component = (props: { children: JSXElement }) => {
  return (
    <>
      <Toaster />
      <Auth.AuthProvider>
        <Theme.ThemeProvider>
          {props.children}
        </Theme.ThemeProvider>
      </Auth.AuthProvider>
    </>
  );
};

export default App;
