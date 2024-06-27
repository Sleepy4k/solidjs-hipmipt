import { onMount } from 'solid-js';
import { AuthLayout } from '@layouts';
import { useLocation, useNavigate } from '@solidjs/router';

interface IForgotDoneLocation {
  isDone: boolean;
}

export default function ForgotProccess() {
  const navigate = useNavigate();
  const { state } = useLocation<IForgotDoneLocation>();

  onMount(() => {
    if (!state || state == null || state == undefined || !state?.isDone) navigate('/', { replace: true });
  });

  return (
    <AuthLayout title='Lupa Password'>
      <span class="xl:text-xl font-semibold text-center">
        Proses selesai, password anda sudah diubah
        <div class='divider' />
        silahkan ingat password baru anda, selamat bersenang-senang.
      </span>
      <div class="flex items-center justify-between" />
      <div
        onClick={() => navigate('/login', { replace: true })}
        class="btn btn-block btn-primary"
      >
        Masuk
      </div>
    </AuthLayout>
  );
}
