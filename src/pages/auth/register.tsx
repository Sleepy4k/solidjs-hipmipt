import { AuthLayout } from '@layouts';
import { ApiService } from '@services';
import { CSRFService } from '@services';
import SafeForm from '@components/safe.form';
import { Show, createSignal } from 'solid-js';
import { EApiType, EDebugType } from '@enums';
import { SweetAlertResult } from 'sweetalert2';
import { formValidator, println, alert } from '@utils';
import { TextInput, TextError } from '@components/text.input';
import { createFormGroup, createFormControl } from 'solid-forms';
import { BeforeLeaveEventArgs, useBeforeLeave, useNavigate } from '@solidjs/router';

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = createSignal<boolean>(false);
  const group = createFormGroup({
    safe_form: createFormControl(false),
    username: createFormControl('', {
      required: true,
      validators: [formValidator.required, formValidator.minLength, formValidator.maxLength],
    }),
    email: createFormControl('', {
      required: true,
      validators: [formValidator.required, formValidator.email, formValidator.maxLength],
    }),
    password: createFormControl('', {
      required: true,
      validators: [formValidator.required, formValidator.minLength, formValidator.maxLength],
    }),
    password_confirmation: createFormControl('', {
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

    if (group.value.password !== group.value.password_confirmation) {
      group.controls.password_confirmation.setErrors({ notMatch: 'tidak cocok dengan password' });
      return;
    }

    group.markSubmitted(true);

    setLoading(true);
    handleSubmit();
  };

  const handleSubmit = async () => {
    await ApiService.post({
      url: 'public/register',
      name: 'System',
      data: {
        username: group.value.username,
        email: group.value.email,
        password: group.value.password,
        password_confirmation: group.value.password_confirmation
      },
      server: EApiType.AUTH,
      success: (res: any) => {
        println('System', res.data.message, EDebugType.SUCCESS);
        navigate('/login');
      },
      error: () => {
        println('System', 'Terjadi kesalahan dalam melakukan proses pendaftaran', EDebugType.ERROR);
      },
      finally: () => {
        group.markSubmitted(false);
        setLoading(false);
      }
    });
  };

  useBeforeLeave((e: BeforeLeaveEventArgs) => {
    if (group.isDirty && !e.defaultPrevented && !group.controls.safe_form.errors) {
      e.preventDefault();
      setTimeout(() => {
        alert.fire({
          title: 'Konfirmasi',
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'Ya',
          cancelButtonText: 'Tidak',
          html: `
            <div class="flex justify-center items-center gap-4 mt-4">
              <span>
                Apakah anda yakin ingin meninggalkan halaman ini?
                <br />
                Semua data yang sudah di isi akan hilang!!
              </span>
            </div>
          `
        }).then((result: SweetAlertResult) => {
          if (result.isConfirmed) e.retry(true);
        });
      }, 100);
    }
  });

  return (
    <SafeForm regenerate={!!group.controls.safe_form.errors}>
      <AuthLayout disabled={loading()} title='Daftar'>
        <span class="xl:text-xl font-semibold">
          Hai, 👋 Siap bergabung dengan kami?
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
              name='username'
              disabled={loading()}
              placeholder='Username'
              control={group.controls.username}
              class='grow input outline-none focus:outline-none border-none border-[0px] h-auto pl-1 pr-0'
            />
          </label>
          <TextError name='Username' control={group.controls.username} />
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
              type='email'
              name='email'
              disabled={loading()}
              placeholder='Email'
              control={group.controls.email}
              class='grow input outline-none focus:outline-none border-none border-[0px] h-auto pl-1 pr-0'
            />
          </label>
          <TextError name='Email' control={group.controls.email} />
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
              name='password_confirmation'
              disabled={loading()}
              placeholder='Konfirmasi Password'
              control={group.controls.password_confirmation}
              class='grow input outline-none focus:outline-none border-none border-[0px] h-auto pl-1 pr-0'
            />
          </label>
          <TextError name='Konfirmasi Password' control={group.controls.password_confirmation} />
          <div class="flex items-center justify-between" />
          <button
            type='submit'
            disabled={loading()}
            onClick={handleValidation}
            class="btn btn-block btn-primary"
          >
            <Show when={!loading()}>
              <span>Daftar</span>
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
              onClick={() => navigate('/login')}
              class="btn btn-block dark:btn-neutral"
            >
              Masuk
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
