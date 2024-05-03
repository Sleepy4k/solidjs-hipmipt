import { theme } from '@contexts';
import { println } from '@utils';
import { useNavigate } from '@solidjs/router';
import { ApiService } from '@/services';
import { EApiType, EDebugType } from '@/enums';
import swal from 'sweetalert';

export default function Home() {
  const navigate = useNavigate();
  const themeCtx = theme.useTheme();

  const handleApi = async () => {
    await ApiService.get({
      url: '/',
      name: 'Register',    
      server: EApiType.AUTH,
      error: (err: any) => {
        println('Register', err, EDebugType.ERROR);
      }
    });
  };

  const handleSwal = () => {
    swal({
      title: 'Are you sure?',
      text: 'You will be logged out!',
      icon: 'warning',
      buttons: ['Cancel', 'Logout'],
      dangerMode: true,
    }).then((willLogout) => {
      if (willLogout) println('Home', 'Logout deh', EDebugType.SUCCESS);
    });
  };

  return (
    <section class="bg-gray-100 text-gray-700 p-8">
      <h1 class="text-2xl font-bold">Home</h1>
      <p class="mt-4">This is the home page.</p>

      <div class="flex items-center space-x-2">
        <button
          class="border rounded-lg px-2 border-gray-900"
          onClick={() => navigate('/login')}
        >
          Login
        </button>

        <button
          class="border rounded-lg px-2 border-gray-900"
          onClick={() => navigate('/register')}
        >
          Register
        </button>
      </div>

      <div class="flex items-center space-x-2">
        <button
          class="border rounded-lg px-2 border-gray-900"
          onClick={() => themeCtx.themeFunc()}
        >
          Change
        </button>

        <output class="p-10px">Current Theme: {themeCtx.theme().valueOf()}</output>
      </div>

      <div class="flex items-center space-x-2">
        <button
          class="border rounded-lg px-2 border-gray-900"
          onClick={handleApi}
        >
          Test Api
        </button>
      </div>

      <div class="flex items-center space-x-2">
        <button
          class="border rounded-lg px-2 border-gray-900"
          onClick={handleSwal}
        >
          Test Swal
        </button>
      </div>

    </section>
  );
}
