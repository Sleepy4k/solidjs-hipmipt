import { createContext } from 'solid-js';
import { IAuthContext } from '@interfaces';

const AuthContext = createContext<IAuthContext>();

export default AuthContext;
