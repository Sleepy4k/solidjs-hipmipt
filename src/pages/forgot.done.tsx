import { useLocation, useNavigate } from '@solidjs/router';
import { AuthLayout } from '@layouts';
import { createEffect } from 'solid-js';

const ForgotProccess = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  createEffect(() => {
    if (!state || state == undefined) navigate('/', { replace: true });
  });

  return (
    <AuthLayout>
      <span class="xl:text-xl font-semibold">
         Done, your password already changed,
         please remember your new password, have fun.
      </span>
      <div class="flex items-center justify-between" />
      <div
        onClick={() => navigate('/login', { replace: true })}
        class="btn btn-block btn-primary"
      >
        Back
      </div>
    </AuthLayout>
  );
};

export default ForgotProccess;

