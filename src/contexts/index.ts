import ThemeProvider from './theme.provider';
import useTheme from './theme.use';
import AuthProvider from './auth.provider';
import useAuth from './auth.use';

const theme = {
  ThemeProvider,
  useTheme
};

const auth = {
  AuthProvider,
  useAuth
};

export {
  theme,
  auth
};
