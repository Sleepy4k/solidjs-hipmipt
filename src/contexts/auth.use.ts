import { useContext } from 'solid-js';
import AuthContext from './auth.context';

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('Something went wrong when use theme context');

  return context;
};

export default useAuth;

