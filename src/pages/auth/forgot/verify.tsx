import { AuthLayout } from '@layouts';
import { ApiService } from '@services';
import { EApiType, EDebugType } from '@enums';
import { formValidator, println } from '@utils';
import { TextInput, TextError } from '@components/text.input';
import { createFormGroup, createFormControl } from 'solid-forms';
import { useLocation, useNavigate, useParams } from '@solidjs/router';
import { createSignal, onMount, Switch, Match, Show } from 'solid-js';

interface IRegisterLocation {
  otp: string;
  email: string;
  isOk: boolean;
}

export default function Register() {
  const navigate = useNavigate();
  const params = useParams();
  const [loading, setLoading] = createSignal<boolean>(true);
  const [otp, setOtp] = createSignal<string>('');
  const [isValid, setIsValid] = createSignal<boolean>(false);
  const [email, setEmail] = createSignal<string>('');
  const group = createFormGroup({
    new_password: createFormControl('', {
      required: true,
      validators: [formValidator.required, formValidator.minLength, formValidator.maxLength],
    }),
    new_password_confirmation: createFormControl('', {
      required: true,
      validators: [formValidator.required, formValidator.minLength, formValidator.maxLength],
    }),
  });

  onMount(() => {
    const { state, query } = useLocation<IRegisterLocation>();

    if (!query || query == null || query == undefined) {
      navigate('/', { replace: true });
      return;
    }

    if ((query.otp == null || query.email == null) && !state?.isOk) {
      navigate('/', { replace: true });
      return;
    }

    if (!state || state == null || state == undefined && !state?.isOk) {
      navigate(`/forgot-password/verify/${params.id}`, { replace: true, state: { otp: state.otp, email: state.email, isOk: true } });
      return;
    }

    setOtp(state.otp);
    setEmail(state.email);
    handleCheckDataValid();
  });

  const handleCheckDataValid = async () => {
    await ApiService.post({
      url: 'public/forgot-password/check',
      name: 'System',
      data: {
        email: email(),
        otp: otp(),
        token: params?.id
      },
      server: EApiType.AUTH,
      success: () => {
        setIsValid(true);
      },
      error: () => {
        setIsValid(false);
      },
      finally: () => {
        setLoading(false);
      }
    });
  };

  const handleValidation = () => {
    if (group.isSubmitted) {
      println('System', 'Formulir sudah dikirimkan', EDebugType.ERROR);
      return;
    }

    if (!group.isValid) {
      println('System', 'Silahkan isi semua formulir', EDebugType.ERROR);
      return;
    }

    if (group.value.new_password !== group.value.new_password_confirmation) {
      group.controls.new_password_confirmation.setErrors({ notMatch: 'tidak cocok dengan password' });
      return;
    }

    group.markSubmitted(true);

    setLoading(true);
    handleSubmit();
  };

  const handleSubmit = async () => {
    await ApiService.patch({
      url: 'public/forgot-password/verify',
      name: 'Register',
      data: {
        email: email(),
        otp: otp(),
        token: params?.id,
        new_password: group.value.new_password,
        new_password_confirmation: group.value.new_password_confirmation
      },
      server: EApiType.AUTH,
      success: () => {
        navigate('/forgot-password/done', { replace: true, state: { isDone: true } });
      },
      error: (err: any) => {
        console.log(err);

        println('Forgot Password', err.message, EDebugType.ERROR);
      },
      finally: () => {
        group.markSubmitted(false);
        setLoading(false);
      }
    });
  };

  return (
    <AuthLayout disabled={loading()} title='Lupa Password'>
      <Switch fallback={
        <span class="xl:text-xl font-semibold">
          Mohon maaf, seprtinya terjadi kesalahan,
          <div class='divider' />
          silahkan coba beberapa saat lagi atau hubungi admin.
        </span>
      }>
        <Match when={!isValid()}>
          <>
            <span class="xl:text-xl font-semibold text-center">
              Kami mohon maaf, link yang kami sediakan tidak valid,
              <div class='divider' />
              mohon kirimkan permintaan link baru untuk
              memproses permintaan perubahan password anda.
            </span>
            <div class="flex items-center justify-between" />
            <button
              type="button"
              disabled={loading()}
              onClick={() => navigate('/login', { replace: true })}
              class="btn btn-block btn-primary"
            >
              Back
            </button>
          </>
        </Match>
        <Match when={isValid()}>
          <>
            <span class="xl:text-xl font-semibold">
              Please enter your new password below, and we will change
              your current password with new password.
            </span>
            <div class="w-full flex flex-col items-stretch gap-3">
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
                  name='new_password'
                  disabled={loading()}
                  placeholder='Password Baru'
                  control={group.controls.new_password}
                  class='grow input outline-none focus:outline-none border-none border-[0px] h-auto pl-1 pr-0'
                />
              </label>
              <TextError name='Password Baru' control={group.controls.new_password} />
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
                  name='new_password_confirmation'
                  disabled={loading()}
                  placeholder='Konfirmasi Password Baru'
                  control={group.controls.new_password_confirmation}
                  class='grow input outline-none focus:outline-none border-none border-[0px] h-auto pl-1 pr-0'
                />
              </label>
              <TextError name='Konfirmasi Password Baru' control={group.controls.new_password_confirmation} />
              <div class="flex items-center justify-between" />
              <button
                type='submit'
                disabled={loading()}
                onClick={handleValidation}
                class="btn btn-block btn-primary"
              >
                <Show when={!loading()}>
                  <span>Submit</span>
                </Show>
      
                <Show when={loading()}>
                  <span class="loading loading-dots loading-lg" />
                </Show>
              </button>
              <div class="divider text-sm" />
              <div class="w-full flex justify-center items-center gap-4">
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
          </>
        </Match>
      </Switch>
    </AuthLayout >
  );
}
