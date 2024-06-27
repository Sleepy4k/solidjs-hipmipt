import { IAuth } from '@interfaces';
import { createContext } from 'solid-js';

const AuthContext = createContext<IAuth.IAuthContext>();

export default AuthContext;
