import { APP_ENV } from '@consts';
import { For, Show } from 'solid-js';

export default function HTTPDebug() {
  const urlParams = new URLSearchParams(location.search);

  return (
    <Show when={APP_ENV === 'development'}>
      <div class="flex flex-col items-center gap-2 outline outline-offset-2 outline-cyan-500 w-full">
        <h1 class="font-bold text-3xl">
          {`Path = ${window.location.origin}${location.pathname}`}
        </h1>
        <h2 class="font-bold text-2xl">
          HTTP Method = GET
        </h2>
        <h3>
          Query Param
        </h3>
        <table class="table w-full">
          <thead>
            <tr>
              <th>Index</th>
              <th>Key</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <For each={Array.from(urlParams)}>
              {([key, value], index) => (
                <tr>
                  <td>{index()}</td>
                  <td>{key}</td>
                  <td>{value}</td>
                </tr>
              )}
            </For>
          </tbody>
        </table>
      </div>
    </Show>
  );
}
