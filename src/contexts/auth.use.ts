import { useContext } from 'solid-js';
import ThemeContext from './theme.context';

const useAuth = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('Something went wrong when use theme context');

  return context;
};

export default useAuth;

