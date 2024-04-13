import { useLocation, useNavigate } from '@solidjs/router';
import { APP_ENV } from '@consts'; 

export default function NotFound() {
  const navigate = useNavigate();
  const location = useLocation();
  const isDevMode = APP_ENV === 'development';

  return (
    <div class="w-screen h-screen">
      <div class="w-full h-full flex justify-center items-center">
        <div class="flex flex-col justify-center items-center gap-10">
          <h1 class="font-bold text-7xl">
            🐔 Boom! Are you lost? 🙄
          </h1>
          {isDevMode && (
            <h1 class="font-bold text-7xl">
              {`Path = ${location.pathname}`}
              <br/>
              Method = GET
            </h1>
          )}
          <button onClick={() => navigate('/')} class="btn">
            <span>Homepage</span>
          </button>
        </div>
      </div>
    </div>
  );
}
