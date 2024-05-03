import { TAuthUpdateData } from '@types';
import { Accessor } from 'solid-js';
import IAuthUserData from './auth.user.data';
import IAuthMiscData from './auth.misc.data';

interface IAuthContext {
  user: Accessor<IAuthUserData>,
  misc: Accessor<IAuthMiscData>,
  role: Accessor<string>,
  isLogged: Accessor<boolean>,
  authToken: Accessor<string>,
  updateData: TAuthUpdateData,
  logoutUser: () => void,
}

export default IAuthContext;
