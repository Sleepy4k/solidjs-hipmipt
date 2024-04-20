import { TAuthUpdateData } from '@types';
import IAuthUserData from './auth.user.data';
import IAuthMiscData from './auth.misc.data';

interface IAuthContext {
  user: IAuthUserData,
  misc: IAuthMiscData,
  token: string,
  updateData: TAuthUpdateData
}

export default IAuthContext;
