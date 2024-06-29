import { createContext } from 'solid-js';
import { IContext } from '@interfaces';

const ThemeContext = createContext<IContext.IThemeContext>();

export default ThemeContext;
