import { Auth } from '@contexts';
import { println } from '@utils';
import { IAuth } from '@interfaces';
import { APP_NAME } from '@consts';
import { ApiService } from '@services';
import { useNavigate } from '@solidjs/router';
import { EApiType, EDebugType } from '@enums';
import { createEffect, createSignal, onMount } from 'solid-js';
import { NavBar, Footer, Sidebar } from '@components/dashboard';

export default function DashboardLayout(props: IAuth.IAuthLayoutProp) {
  const navigate = useNavigate();
  const { isLogged } = Auth.useAuth();
  const [sidebarMenu, setSidebarMenu] = createSignal<Array<any>>([]);

  onMount(() => {
    if (!isLogged()) navigate('/', { replace: true });
  });

  createEffect(() => {
    getSidebarMenuData();
  });

  createEffect(() => {
    if (props.title) document.title = `${props.title} | ${APP_NAME}`;
  });

  const getSidebarMenuData = async () => {
    await ApiService.get({
      url: '/protected/sidebar_menu',
      name: 'System',
      server: EApiType.MAIN,
      success: (res: any) => {
        setSidebarMenu(res.data.data);
      },
      error: () => {
        println('System', 'Something went wrong when get sidebar data', EDebugType.ERROR);
        navigate('/', { replace: true });
      }
    });
  };

  return (
    <div
      id="rootContainer"
      class="w-full p-0 m-0 overflow-visible min-h-screen flex flex-col justify-between"
    >
      <div>
        <NavBar disabled={props.disabled} sidebarData={sidebarMenu()} />
        <div class="w-full flex gap-0 pt-20 xl:pt-[96px] 2xl:pt-[112px] mb-auto">
          <Sidebar
            disabled={props.disabled}
            data={sidebarMenu()}
          />
          <div class="w-full px-4 xl:px-4 2xl:px-5 xl:py-2 overflow-clip">
            {props.children}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
