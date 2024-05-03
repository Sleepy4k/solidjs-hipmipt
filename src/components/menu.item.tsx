import { ESidebarIcon } from '@enums';
import { IMenuItemProp } from '@interfaces';
import { AiOutlineUser, AiOutlineFileText, AiOutlinePieChart, AiOutlineLineChart, AiOutlineBarChart, AiOutlineHome } from 'solid-icons/ai';
import { FiUsers, FiBox } from 'solid-icons/fi';
import { HiOutlineClipboardDocumentList } from 'solid-icons/hi';
import { NavLink, useMatch } from '@solidjs/router';

export default function MenuItem(props: IMenuItemProp) {
  const match = useMatch(() => props.url);

  const renderIcon = (css: string) => {
    switch (props.icon.toLowerCase()) {
      case ESidebarIcon.USER.valueOf():
        return <AiOutlineUser class={css} />;
      case ESidebarIcon.USERS.valueOf():
        return <FiUsers class={css} />;
      case ESidebarIcon.FILETEXT.valueOf():
        return <AiOutlineFileText class={css} />;
      case ESidebarIcon.CLIPBOARDDOCUMENT.valueOf():
        return <HiOutlineClipboardDocumentList class={css} />;
      case ESidebarIcon.PIECHART.valueOf():
        return <AiOutlinePieChart class={css} />;
      case ESidebarIcon.LINECHART.valueOf():
        return <AiOutlineLineChart class={css} />;
      case ESidebarIcon.BARCHART.valueOf():
        return <AiOutlineBarChart class={css} />;
      case ESidebarIcon.SIDEBOX.valueOf():
        return <FiBox class={css} />;
      case ESidebarIcon.HOME.valueOf():
        return <AiOutlineHome class={css} />;
    }
  };

  return (
    <div class="w-full flex flex-col items-stretch gap-2">
      {!props.isLink ? (<span class="hidden xl:block px-2 xl:text-sm 2xl:text-base 3xl:text-lg uppercase">
        {props.label}
      </span>) : (
        <>
          {!props.disabled ? (
            <NavLink
              onclick={props.onClick}
              href={props.url || '?'}
              class={Boolean(match()) == true
                ? 'btn 2xl:min-h-[52px] 3xl:min-h-[64px] btn-active btn-ghost btn-block justify-start'
                : 'btn 2xl:min-h-[52px] 3xl:min-h-[64px] btn-ghost btn-block justify-start'
              }
            >
              {props.icon && renderIcon('xl:text-2xl 2xl:text-3xl 3xl:text-4xl')}
              <span class="xl:text-sm 2xl:text-base 3xl:text-lg capitalize">
                {props.label}
              </span>
            </NavLink>
          ) : (
            <div
              class={Boolean(match()) == true
                ? 'btn 2xl:min-h-[52px] 3xl:min-h-[64px] btn-active btn-ghost btn-block justify-start'
                : 'btn 2xl:min-h-[52px] 3xl:min-h-[64px] btn-ghost btn-block justify-start'
              }
            >
              {props.icon && renderIcon('xl:text-2xl 2xl:text-3xl 3xl:text-4xl')}
              <span class="xl:text-sm 2xl:text-base 3xl:text-lg capitalize">
                {props.label}
              </span>
            </div>
          )}
        </>
      )}
      {/*}<For each={props.listItems} fallback={<div>No Items Provided</div>}>
        {(listItem) => {
          if (listItem.isLink) {
            const match = useMatch(() => listItem.url);

            return (
              <>
                {!props.disabled ? (
                  <NavLink
                    onclick={props.onClick}
                    href={listItem.url || '/dashboard'}
                    class={Boolean(match()) == true
                      ? 'btn 2xl:min-h-[52px] 3xl:min-h-[64px] btn-active btn-ghost btn-block justify-start'
                      : 'btn 2xl:min-h-[52px] 3xl:min-h-[64px] btn-ghost btn-block justify-start'
                    }
                  >
                    <listItem.icon class="xl:text-2xl 2xl:text-3xl 3xl:text-4xl" />
                    <span class="xl:text-sm 2xl:text-base 3xl:text-lg capitalize">
                      {listItem.label}
                    </span>
                  </NavLink>
                ) : (
                  <div
                    class={Boolean(match()) == true
                      ? 'btn 2xl:min-h-[52px] 3xl:min-h-[64px] btn-active btn-ghost btn-block justify-start'
                      : 'btn 2xl:min-h-[52px] 3xl:min-h-[64px] btn-ghost btn-block justify-start'
                    }
                  >
                    <listItem.icon class="xl:text-2xl 2xl:text-3xl 3xl:text-4xl" />
                    <span class="xl:text-sm 2xl:text-base 3xl:text-lg capitalize">
                      {listItem.label}
                    </span>
                  </div>
                )}
              </>
            );
          } else {
            return (
              <button
                disabled={props.disabled}
                onClick={listItem.onClick}
                class="btn 2xl:min-h-[52px] 3xl:min-h-[64px] btn-ghost btn-block justify-start"
              >
                <listItem.icon class="xl:text-2xl 2xl:text-3xl 3xl:text-4xl" />
                <span class="xl:text-sm 2xl:text-base 3xl:text-lg capitalize">
                  {listItem.label}
                </span>
              </button>
            );
          }
        }}
      </For>*/}
    </div>
  );
}
