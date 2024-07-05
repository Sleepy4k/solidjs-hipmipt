import { Auth } from '@contexts';
import { AuthLayout } from '@layouts';
import { ApiService } from '@services';
import { CSRFService } from '@services';
import SafeForm from '@components/safe.form';
import { useNavigate } from '@solidjs/router';
import { Show, createSignal } from 'solid-js';
import { formValidator, println } from '@utils';
import { TextInput, TextError } from '@components/text.input';
import { createFormGroup, createFormControl } from 'solid-forms';
import { EApiType, EAuthMiscStatus, EAuthUpdateCategory, EDebugType } from '@enums';

export default function Login() {
  const navigate = useNavigate();
  const { updateData } = Auth.useAuth();
  const [loading, setLoading] = createSignal<boolean>(false);
  const group = createFormGroup({
    safe_form: createFormControl(false),
    username_or_email: createFormControl('', {
      required: true,
      validators: [formValidator.required, formValidator.minLength, formValidator.maxLength],
    }),
    password: createFormControl('', {
      required: true,
      validators: [formValidator.required, formValidator.minLength, formValidator.maxLength],
    }),
  });

  const handleValidation = () => {
    if (group.isSubmitted) {
      println('System', 'Formulir sudah dikirimkan', EDebugType.ERROR);
      return;
    }

    if (!group.isValid) {
      println('System', 'Silahkan isi semua formulir', EDebugType.ERROR);
      return;
    }

    if (!CSRFService.validateToken()) {
      group.controls.safe_form.setErrors({ invalid: 'csrf token tidak valid' });
      return;
    } else {
      group.controls.safe_form.setErrors(null);
    }

    group.markSubmitted(true);

    setLoading(true);
    handleSubmit();
  };

  const handleSubmit = async () => {
    await ApiService.post({
      url: 'public/login',
      name: 'System',
      data: {
        username_or_email: group.value.username_or_email,        
        password: group.value.password
      },
      server: EApiType.AUTH,
      success: (res: any) => {
        const value = res.data;

        updateData(EAuthUpdateCategory.STATUS, true);
        updateData(EAuthUpdateCategory.ROLE, value.data?.role);
        updateData(EAuthUpdateCategory.USER, {
          email: value.data?.email,
          username: value.data?.username
        });
        updateData(EAuthUpdateCategory.MISC, {
          logo: value.data?.logo,
          status: (value.data?.verified == EAuthMiscStatus.VERIFIED.valueOf()) ? EAuthMiscStatus.VERIFIED : EAuthMiscStatus.UNVERIFIED
        });

        println('System', value.message, EDebugType.SUCCESS);
        navigate('/dashboard', { replace: true });
      },
      error: () => {
        println('System', 'Something went wrong when checking data from database', EDebugType.ERROR);
      },
      finally: () => {
        group.markSubmitted(false);
        setLoading(false);
      }
    });
  };

  return (
    <SafeForm regenerate={!!group.controls.safe_form.errors}>
      <AuthLayout disabled={loading()} title='Masuk'>
        <span class="xl:text-xl font-semibold">
          Halo, 👋 Selamat Datang Kembali!
        </span>
        <div class="w-full flex flex-col items-stretch gap-3">
          <label class="input input-bordered min-w-full flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              class="w-4 h-4 opacity-70"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <TextInput
              type='text'
              name='username_or_email'
              disabled={loading()}
              placeholder='Email atau Username'
              control={group.controls.username_or_email}
              class='grow input outline-none focus:outline-none border-none border-[0px] h-auto pl-1 pr-0'
            />
          </label>
          <TextError name='Email atau Username' control={group.controls.username_or_email} />
          <label class="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              class="w-4 h-4 opacity-70"
            >
              <path
                fill-rule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clip-rule="evenodd"
              />
            </svg>
            <TextInput
              type='password'
              name='password'
              disabled={loading()}
              placeholder='Password'
              control={group.controls.password}
              class='grow input outline-none focus:outline-none border-none border-[0px] h-auto pl-1 pr-0'
            />
          </label>
          <TextError name='Password' control={group.controls.password} />
          <div class="flex items-center justify-between">
            <div class="form-control"/>
            <button
              type='button'
              disabled={loading()}
              onClick={() => navigate('/forgot-password')}
              class="link link-primary font-semibold text-xs no-underline"
            >
              Forgot Password?
            </button>
          </div>
          <button
            type='submit'
            disabled={loading()}
            onClick={handleValidation}
            class="btn btn-block btn-primary"
          >
            <Show when={!loading()}>
              <span>Masuk</span>
            </Show>

            <Show when={loading()}>
              <span class="loading loading-dots loading-lg" />
            </Show>
          </button>
          <div class="divider text-sm">OR</div>
          <div class="w-full flex justify-center items-center gap-4">
            <button
              type='button'
              disabled={loading()}
              onClick={() => navigate('/register')}
              class="btn btn-block dark:btn-neutral"
            >
              Daftar
            </button>
          </div>
          <div class="w-full flex justify-center items-center gap-4 mt-2">
            <button
              type='button'
              disabled={loading()}
              onClick={() => navigate('/')}
              class="btn btn-block dark:btn-neutral"
            >
              Home
            </button>
          </div>
        </div>
      </AuthLayout>
    </SafeForm>
  );
}
