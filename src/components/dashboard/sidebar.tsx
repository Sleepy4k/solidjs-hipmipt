import { For } from 'solid-js';
import MenuItem from './menu.item';

interface ISidebarMenu {
  data: Array<any>;
  disabled: boolean;
}

export default function Sidebar(props: ISidebarMenu) {
  return (
    <div class="hidden xl:block xl:w-[250px] 2xl:w-[280px] 3xl:w-[350px] border-r-2 border-base-300 dark:border-slate-700 px-3 xl:px-4 xl:py-1">
      <div class="w-full">
        <div class="w-full flex flex-col gap-5">
          <For each={props.data} fallback={<div>No Data for Sidebar </div>} >
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
  );
}
