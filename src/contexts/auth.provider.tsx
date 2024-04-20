import { EThemeType } from '@enums';
import { getOrCreateStorage, setAndDeleteStorage } from '@utils';
import ThemeContext from './theme.context';
import { IProviderProp } from '@interfaces';
import { createSignal, createEffect, Component } from 'solid-js';

const AuthProvider: Component<IProviderProp> = (props: IProviderProp) => {
  const [theme, setTheme] = createSignal<EThemeType>(EThemeType.LIGHT);

  const themeFunc = () => {
    if (theme() == EThemeType.LIGHT) setTheme(EThemeType.DARK);
    else setTheme(EThemeType.LIGHT);

    setAndDeleteStorage<string>('data-theme', theme().valueOf());
  };

  createEffect(() => {
    document.querySelector('html')?.setAttribute('data-theme', theme().valueOf());
  });

  createEffect(() => {
    const currentTheme = getOrCreateStorage<string>('data-theme', EThemeType.LIGHT.valueOf());
    setTheme(currentTheme == EThemeType.DARK.valueOf() ? EThemeType.DARK : EThemeType.LIGHT);
  });

  return (
    <ThemeContext.Provider value={{ theme, themeFunc }}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export default AuthProvider;
