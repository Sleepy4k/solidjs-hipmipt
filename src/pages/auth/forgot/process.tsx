import { onMount } from 'solid-js';
import { AuthLayout } from '@layouts';
import { useLocation, useNavigate } from '@solidjs/router';

interface IForgotProccessLocation {
  email: string;
}

export default function ForgotProccess() {
  const navigate = useNavigate();
  const { state } = useLocation<IForgotProccessLocation>();

  onMount(() => {
    if (!state || state == null || state == undefined) navigate('/', { replace: true });
  });

  return (
    <AuthLayout title='Lupa Password'>
      <span class="xl:text-xl font-semibold text-center">
        Kami berhasil mengirim tautan ke email anda
        <div class='divider' />
        Silahkan cek email anda pada akun {state.email}{' '}
        jika tidak ada coba cek di bagian spam.
      </span>
      <div class="flex items-center justify-between" />
      <div
        onClick={() => navigate('/', { replace: true })}
        class="btn btn-block btn-primary"
      >
        Home
      </div>
    </AuthLayout>
  );
}
