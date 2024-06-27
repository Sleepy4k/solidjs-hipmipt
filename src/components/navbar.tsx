import { HiSolidBars3CenterLeft } from 'solid-icons/hi';
import { RiMediaFullscreenFill, RiMediaFullscreenExitFill } from 'solid-icons/ri';
import { A } from '@solidjs/router';
import ChangeTheme from './change.theme';
import { For, createEffect, createSignal } from 'solid-js';
import { APP_NAME } from '@consts';
import swal from 'sweetalert';
import { ApiService } from '@services';
import { EApiType, EDebugType } from '@enums';
import { Auth } from '@contexts';
import { println } from '@utils';
import MenuItem from './menu.item';

interface INavBarProps {
  disabled: boolean,
  sidebarData: Array<any>
}

export default function NavBar(props: INavBarProps) {
  const { misc, logoutUser } = Auth.useAuth();
  const root = document.getElementById('root');
  const [isFullScreen, setIsFullScreen] = createSignal<boolean>(false);
  const [isDrawerOpen, setIsDrawerOpen] = createSignal<boolean>(false);

  const toggleFullScreen = () => setIsFullScreen(!isFullScreen());
  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen());

  createEffect(() => {
    isFullScreen() ? root?.requestFullscreen({ navigationUI: 'auto' }) : document?.exitFullscreen();
  });

  const confirmLogout = () => {
    swal({
      title: 'Are you sure?',
      text: 'You will be logged out!',
      icon: 'warning',
      buttons: ['Cancel', 'Logout'],
      dangerMode: true,
    }).then((willLogout) => {
      if (willLogout) handleLogout();
    });
  };

  const handleLogout = async () => {
    await ApiService.post({
      url: '/protected/logout',
      name: 'Logout',
      server: EApiType.AUTH,
      success: (res: any) => {
        logoutUser();

        const value = res.data;
        println('Logout', value.message, EDebugType.SUCCESS);
      },
      error: () => {
        println('Logout', 'Something went wrong when logging out user', EDebugType.ERROR);
      }
    });
  };

  return (
    <div class="fixed z-[3] top-0 left-0 right-0 bg-base-100 w-full flex justify-between px-3 xl:px-4 py-3 xl:py-5 gap-4 xl:gap-0">
      {/* container */}
      <div class="flex gap-3 items-center">
        {/* for mobile */}
        <div class="drawer w-auto p-0 mr-1 xl:hidden">
          <input
            id="drawer-navbar-mobile"
            type="checkbox"
            class="drawer-toggle"
            checked={isDrawerOpen()}
            onChange={toggleDrawer}
          />
          <div class="p-0 w-auto drawer-content">
            <label
              for="drawer-navbar-mobile"
              class="p-0 btn btn-ghost drawer-button"
            >
              <HiSolidBars3CenterLeft class="text-2xl" />
            </label>
          </div>
          <div class="drawer-side z-[99]">
            <label
              for="drawer-navbar-mobile"
              aria-label="close sidebar"
              class="drawer-overlay"
            />
            <div class="menu p-4 w-auto min-h-full bg-base-200 text-base-content">
              {!props.disabled ? (
                <A
                  href="/dashboard"
                  class="flex items-center gap-1 xl:gap-2 mt-1 mb-5"
                >
                  <span class="text-[16px] leading-[1.2] sm:text-lg xl:text-xl 2xl:text-2xl font-semibold text-base-content dark:text-neutral-200">
                    {APP_NAME}
                  </span>
                </A>
              ) : (
                <div class="flex items-center gap-1 xl:gap-2 mt-1 mb-5">
                  <span class="text-[16px] leading-[1.2] sm:text-lg xl:text-xl 2xl:text-2xl font-semibold text-base-content dark:text-neutral-200">
                    {APP_NAME}
                  </span>
                </div>
              )}
              <For each={props.sidebarData} fallback={<div>No Data for Sidebar </div>} >
                {(data) => <MenuItem
                  onClick={() => toggleDrawer()}
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

        {/* navbar logo */}
        {!props.disabled ? (
          <A href="/dashboard" class="flex items-center gap-1 xl:gap-2">
            <span class="text-[16px] leading-[1.2] sm:text-lg xl:text-xl 2xl:text-2xl font-semibold text-base-content dark:text-neutral-200">
              {APP_NAME}
            </span>
          </A>
        ) : (
          <div class="flex items-center gap-1 xl:gap-2">
            <span class="text-[16px] leading-[1.2] sm:text-lg xl:text-xl 2xl:text-2xl font-semibold text-base-content dark:text-neutral-200">
              {APP_NAME}
            </span>
          </div>
        )}
      </div>

      {/* navbar items to right */}
      <div class="flex items-center gap-0 xl:gap-1 2xl:gap-2 3xl:gap-5">
        {/* fullscreen */}
        <button
          onClick={toggleFullScreen}
          class="hidden xl:inline-flex btn btn-circle btn-ghost"
        >
          {!isFullScreen() ? (
            <RiMediaFullscreenFill class="xl:text-xl 2xl:text-2xl 3xl:text-3xl" />
          ) : (
            <RiMediaFullscreenExitFill class="xl:text-xl 2xl:text-2xl 3xl:text-3xl" />
          )}
        </button>

        {/* theme */}
        <div class="px-0 xl:px-auto btn btn-circle btn-ghost xl:mr-1">
          <ChangeTheme />
        </div>

        {/* avatar dropdown */}
        <div class="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            class="btn btn-ghost btn-circle avatar"
          >
            <div class="w-9 rounded-full">
              <img
                src={misc()?.logo || 'https://th.bing.com/th/id/OIP.j1rpn-KTUmqcVBQygXuOuQHaIk?rs=1&pid=ImgDetMain'}
                alt="user-profile"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-40"
          >
            {!props.disabled ? (
              <>
                <A href="/dashboard/profile">
                  <li>
                    <a class="justify-between">My Profile</a>
                  </li>
                </A>
                <li onClick={() => confirmLogout()}>
                  <a>Log Out</a>
                </li>
              </>
            ) : (
              <>
                <li>
                  <a class="justify-between">My Profile</a>
                </li>
                <li>
                  <a>Log Out</a>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

