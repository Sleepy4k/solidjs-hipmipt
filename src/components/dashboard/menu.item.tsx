import { ESidebarIcon } from '@enums';
import { IMenuItemProp } from '@interfaces';
import { FiUsers, FiBox } from 'solid-icons/fi';
import { A, useMatch } from '@solidjs/router';
import { HiOutlineClipboardDocumentList } from 'solid-icons/hi';
import { AiOutlineUser, AiOutlineFileText, AiOutlinePieChart, AiOutlineLineChart, AiOutlineBarChart, AiOutlineHome } from 'solid-icons/ai';
import { Show, Switch, Match } from 'solid-js';

export default function MenuItem(props: IMenuItemProp) {
  const match = useMatch(() => props.url);

  const renderIcon = (css: string) => (
    <Switch fallback={<AiOutlineHome class={css} />}>
      <Match when={props.icon.toLowerCase() == ESidebarIcon.USER.valueOf()}>
        <AiOutlineUser class={css} />
      </Match>
      <Match when={props.icon.toLowerCase() == ESidebarIcon.USERS.valueOf()}>
        <FiUsers class={css} />
      </Match>
      <Match when={props.icon.toLowerCase() == ESidebarIcon.FILETEXT.valueOf()}>
        <AiOutlineFileText class={css} />
      </Match>
      <Match when={props.icon.toLowerCase() == ESidebarIcon.CLIPBOARDDOCUMENT.valueOf()}>
        <HiOutlineClipboardDocumentList class={css} />
      </Match>
      <Match when={props.icon.toLowerCase() == ESidebarIcon.PIECHART.valueOf()}>
        <AiOutlinePieChart class={css} />
      </Match>
      <Match when={props.icon.toLowerCase() == ESidebarIcon.LINECHART.valueOf()}>
        <AiOutlineLineChart class={css} />
      </Match>
      <Match when={props.icon.toLowerCase() == ESidebarIcon.BARCHART.valueOf()}>
        <AiOutlineBarChart class={css} />
      </Match>
      <Match when={props.icon.toLowerCase() == ESidebarIcon.SIDEBOX.valueOf()}>
        <FiBox class={css} />
      </Match>
      <Match when={props.icon.toLowerCase() == ESidebarIcon.HOME.valueOf()}>
        <AiOutlineHome class={css} />
      </Match>
    </Switch>
  );

  return (
    <div class="w-full flex flex-col items-stretch gap-2">
      <Switch fallback={<div>Something went wrong</div>}>
        <Match when={!props.isLink}>
          <span class="hidden xl:block px-2 xl:text-sm 2xl:text-base 3xl:text-lg uppercase">
            {props.label}
          </span>
        </Match>

        <Match when={props.isLink && props.disabled}>
          <div
            class={Boolean(match()) == true
              ? 'btn 2xl:min-h-[52px] 3xl:min-h-[64px] btn-active btn-ghost btn-block justify-start'
              : 'btn 2xl:min-h-[52px] 3xl:min-h-[64px] btn-ghost btn-block justify-start'
            }
          >
            <Show when={props.icon}>
              {renderIcon('xl:text-2xl 2xl:text-3xl 3xl:text-4xl')}
            </Show>
            <span class="xl:text-sm 2xl:text-base 3xl:text-lg capitalize">
              {props.label}
            </span>
          </div>
        </Match>

        <Match when={props.isLink && !props.disabled}>
          <Show when={props.icon && props.onClick}>
            <div
              onClick={() => props.onClick}
              class={Boolean(match()) == true
                ? 'btn 2xl:min-h-[52px] 3xl:min-h-[64px] btn-active btn-ghost btn-block justify-start'
                : 'btn 2xl:min-h-[52px] 3xl:min-h-[64px] btn-ghost btn-block justify-start'
              }
            >
              {renderIcon('xl:text-2xl 2xl:text-3xl 3xl:text-4xl')}
              <span class="xl:text-sm 2xl:text-base 3xl:text-lg capitalize">
                {props.label}
              </span>
            </div>
          </Show>

          <Show when={props.icon && !props.onClick}>
            <A
              href={props.url || '?'}
              class={Boolean(match()) == true
                ? 'btn 2xl:min-h-[52px] 3xl:min-h-[64px] btn-active btn-ghost btn-block justify-start'
                : 'btn 2xl:min-h-[52px] 3xl:min-h-[64px] btn-ghost btn-block justify-start'
              }
            >
              {renderIcon('xl:text-2xl 2xl:text-3xl 3xl:text-4xl')}
              <span class="xl:text-sm 2xl:text-base 3xl:text-lg capitalize">
                {props.label}
              </span>
            </A>
          </Show>
        </Match>
      </Switch>

      {/* {!props.isLink ? (<span class="hidden xl:block px-2 xl:text-sm 2xl:text-base 3xl:text-lg uppercase">
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
      )} */}
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
