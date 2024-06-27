import { Auth } from '@contexts';
import { println } from '@utils';
import { IAuth } from '@interfaces';
import { APP_NAME } from '@consts';
import { ApiService } from '@services';
import NavBar from '@components/navbar';
import Footer from '@components/footer';
import MenuItem from '@components/menu.item';
import { useNavigate } from '@solidjs/router';
import { EApiType, EDebugType } from '@enums';
import { For, createEffect, createSignal, onMount } from 'solid-js';

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
          <div class="hidden xl:block xl:w-[250px] 2xl:w-[280px] 3xl:w-[350px] border-r-2 border-base-300 dark:border-slate-700 px-3 xl:px-4 xl:py-1">
            <div class="w-full">
              <div class="w-full flex flex-col gap-5">
                <For each={sidebarMenu()} fallback={<div>No Data for Sidebar </div>} >
                  {(data) => <MenuItem
                    disabled={props.disabled}
                    label={data.label}
                    isLink={data.is_page}
                    url={data.page_url}
                    icon={data.icon}
                  />}
                </For>
              </div>
            </div>
          </div>
          <div class="w-full px-4 xl:px-4 2xl:px-5 xl:py-2 overflow-clip">
            {props.children}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
