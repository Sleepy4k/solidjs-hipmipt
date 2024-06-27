import { Show } from 'solid-js';
import { APP_ENV } from '@consts';
import { useLocation, useNavigate } from '@solidjs/router';

export default function NotFound() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div class="w-screen h-screen">
      <div class="w-full h-full flex justify-center items-center">
        <div class="flex flex-col justify-center items-center gap-10">
          <div class="flex flex-col items-center gap-2">
            <h1 class="font-bold text-9xl">404</h1>
            <h1 class="font-bold text-5xl">Halaman Tidak Ditemukan</h1>
          </div>

          <div class="flex flex-col items-center gap-2">
            <p class="text-lg text-center">
              Halaman yang Anda cari mungkin telah dihapus,
              <br />
              nama telah diubah, atau sementara tidak tersedia.
            </p>
          </div>

          <Show when={APP_ENV === 'development'}>
            <div class="flex flex-col items-center gap-2 outline outline-offset-2 outline-cyan-500">
              <h1 class="font-bold text-3xl">
                {`Path = ${location.pathname}`}
                <br />
                Method = GET
              </h1>
            </div>
          </Show>

          <div class="flex flex-col items-center gap-2">
            <button
              type='button'
              onClick={() => navigate('/')}
              class="btn btn-block dark:btn-neutral"
            >
              <span>Home</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
