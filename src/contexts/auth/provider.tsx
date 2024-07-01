import AuthContext from './context';
import { ApiService } from '@services';
import { TAuthUpdateData } from '@types';
import { IProviderProp, IAuth } from '@interfaces';
import { useLocation, useNavigate } from '@solidjs/router';
import { createSignal, createEffect, Component } from 'solid-js';
import { deleteStorage, getStorage, println, setAndDeleteStorage } from '@utils';
import { EMAIL_KEY_PREFIX, USERNAME_KEY_PREFIX, TOKEN_KEY_PREFIX } from '@consts';
import { EApiType, EAuthMiscStatus, EAuthUpdateCategory, EDebugType } from '@enums';

const AuthProvider: Component<IProviderProp> = (props: IProviderProp) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [checked, setChecked] = createSignal<boolean>(false);
  const [user, setUser] = createSignal<IAuth.IAuthUserData>(null);
  const [misc, setMisc] = createSignal<IAuth.IAuthMiscData>(null);
  const [role, setRole] = createSignal<string>(null);
  const [isLogged, setIsLogged] = createSignal<boolean>(false);
  const [authToken, setAuthToken] = createSignal<string>(null);

  const updateData: TAuthUpdateData = (category: EAuthUpdateCategory, data: any) => {
    switch (category) {
    case EAuthUpdateCategory.USER:
      setUser(data);
      updateUserLocalStorage();
      break;
    case EAuthUpdateCategory.TOKEN:
      setAuthToken(data);
      updateTokenLocalStorage();
      break;
    case EAuthUpdateCategory.MISC:
      setMisc(data);
      break;
    case EAuthUpdateCategory.STATUS:
      setIsLogged(data);
      break;
    case EAuthUpdateCategory.ROLE:
      setRole(data);
      break;
    default:
      println('System', 'Something went wrong when updating data', EDebugType.ERROR);
      break;
    }
  };

  const updateUserLocalStorage = () => {
    setAndDeleteStorage(USERNAME_KEY_PREFIX, user().username);
    setAndDeleteStorage(EMAIL_KEY_PREFIX, user().email);
  };

  const updateTokenLocalStorage = () => {
    setAndDeleteStorage(TOKEN_KEY_PREFIX, authToken());
  };

  const logoutUser = () => {
    setIsLogged(false);
    setUser(null);
    setMisc(null);
    setAuthToken(null);
    setRole(null);

    [USERNAME_KEY_PREFIX, EMAIL_KEY_PREFIX, TOKEN_KEY_PREFIX].forEach((key) => deleteStorage(key));

    navigate('/', { replace: true });
  };

  createEffect(() => {
    checkIsLogged();
  });

  const checkIsLogged = async () => {
    if (isLogged() || checked()) return;

    const username = getStorage(USERNAME_KEY_PREFIX);
    const email = getStorage(EMAIL_KEY_PREFIX);
    const token = getStorage(TOKEN_KEY_PREFIX);

    if (!username || !email || !token) {
      setChecked(true);
      [USERNAME_KEY_PREFIX, EMAIL_KEY_PREFIX, TOKEN_KEY_PREFIX].forEach((key) => deleteStorage(key));

      return;
    }

    const oldPath = location.pathname;
    const oldQuery = location.query;
    const oldState = location.state;

    await ApiService.post({
      url: '/protected/extend-session',
      name: 'System',
      server: EApiType.AUTH,
      data: {
        username,
        email,
        token
      },
      success: (res: any) => {
        const value = res.data;

        updateData(EAuthUpdateCategory.STATUS, true);
        updateData(EAuthUpdateCategory.USER, {
          username: value.data?.username,
          email: value.data?.email
        });
        updateData(EAuthUpdateCategory.MISC, {
          logo: value.data?.logo,
          status: value.data?.verified == EAuthMiscStatus.VERIFIED.valueOf() ? EAuthMiscStatus.VERIFIED : EAuthMiscStatus.UNVERIFIED,
        });
        updateData(EAuthUpdateCategory.TOKEN, value.token);
        updateData(EAuthUpdateCategory.ROLE, value.data?.role);

        println('System', 'Current session has been successfully extended', EDebugType.SUCCESS);

        if (location.pathname == oldPath) return;

        const fixedPath = (oldQuery) ? `${oldPath}?${new URLSearchParams(oldQuery)}` : oldPath;

        navigate(fixedPath, { replace: true, state: oldState });
      },
      error: () => {
        ['hipmi_user_id', 'hipmi_user_email', 'hipmi_user_name'].forEach((key) => deleteStorage(key));

        println('System', 'Something went wrong when extend current session', EDebugType.ERROR);
      },
      finally: () => {
        setChecked(true);
      }
    });
  };

  return (
    <AuthContext.Provider value={{ user, misc, role, isLogged, authToken, updateData, logoutUser }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
