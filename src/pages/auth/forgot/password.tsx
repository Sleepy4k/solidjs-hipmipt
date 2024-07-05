import { AuthLayout } from '@layouts';
import { ApiService } from '@services';
import { CSRFService } from '@services';
import SafeForm from '@components/safe.form';
import { useNavigate } from '@solidjs/router';
import { EApiType, EDebugType } from '@enums';
import { formValidator, println } from '@utils';
import { Show, createEffect, createSignal } from 'solid-js';
import { TextInput, TextError } from '@components/text.input';
import { createFormGroup, createFormControl } from 'solid-forms';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [code, setCode] = createSignal<number>(0);
  const [loading, setLoading] = createSignal<boolean>(false);
  const [imageCode, setImageCode] = createSignal<string>('');
  const group = createFormGroup({
    safe_form: createFormControl(false),
    email: createFormControl('', {
      required: true,
      validators: [formValidator.required, formValidator.email, formValidator.maxLength],
    }),
    captchaCode: createFormControl('', {
      required: true,
      validators: [formValidator.required, formValidator.minLengthNumber, formValidator.maxLengthNumber, formValidator.isNumber],
    }),
  });

  createEffect(() => {
    handleCaptcha();
  });

  const generateCode = () => {
    return Math.floor(Math.random() * 8) + 1;
  };

  const handleCaptcha = () => {
    let code = '';
    const length = Math.floor(Math.random() * 2) + 4;

    for (let i = 0; i < length; i++) {
      code += generateCode() + ' ';
    }

    setImageCode(code);
    setCode(Number(code.trim().replace(/\s/g, '')));
  };

  const handleValidation = () => {
    if (group.isSubmitted) {
      println('System', 'Formulir sudah dikirimkan', EDebugType.ERROR);
      return;
    }

    if (!group.isValid) {
      println('System', 'Silahkan isi semua formulir', EDebugType.ERROR);
      handleCaptcha();
      return;
    }

    if (!CSRFService.validateToken()) {
      group.controls.safe_form.setErrors({ invalid: 'csrf token tidak valid' });
      return;
    } else {
      group.controls.safe_form.setErrors(null);
    }

    if (Number(group.value.captchaCode) != code()) {
      group.controls.captchaCode.setErrors({ isInvalid: 'Tidak sesuai' });
      handleCaptcha();
      return;
    }

    group.markSubmitted(true);

    setLoading(true);
    handleSubmit();
  };

  const handleSubmit = async () => {
    await ApiService.post({
      url: 'public/forgot-password',
      name: 'System',
      data: {
        email: group.value.email
      },
      server: EApiType.AUTH,
      success: (res: any) => {
        const value = res.data;

        println('System', value.message, EDebugType.SUCCESS);
        navigate('/forgot-process', { replace: true, state: { email: group.value.email } });
      },
      error: () => {
        println('System', 'Something went wrong when sending email', EDebugType.ERROR);
      },
      finally: () => {
        group.markSubmitted(false);
        setLoading(false);
      }
    });
  };

  return (
    <SafeForm regenerate={!!group.controls.safe_form.errors}>
      <AuthLayout disabled={loading()} title='Lupa Password'>
        <span class="xl:text-xl font-semibold">
          Silahkan masukkan alamat email anda,
          <br />
          tautan akan dikirimkan ke email anda
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
              type='email'
              name='email'
              disabled={loading()}
              placeholder='Email'
              control={group.controls.email}
              class='grow input outline-none focus:outline-none border-none border-[0px] h-auto pl-1 pr-0'
            />
          </label>
          <TextError name='Email' control={group.controls.email} />
          <label class="input input-bordered min-w-full flex items-center gap-2">
            <div class="card p-1">
              <div class="flex items-center justify-center">
                <span class="text-xl font-semibold">{imageCode()}</span>
              </div>
            </div>
            <div class="divider sm:divider-horizontal" />
            <TextInput
              type='number'
              name='captcha'
              disabled={loading()}
              placeholder='Kode Captcha'
              control={group.controls.captchaCode}
              class='grow input outline-none focus:outline-none border-none border-[0px] h-auto pl-1 pr-0'
            />
          </label>
          <TextError name='Kode Captcha' control={group.controls.captchaCode} />
          <div class="flex items-center justify-between" />
          <button
            type='submit'
            disabled={loading()}
            onClick={handleValidation}
            class="btn btn-block btn-primary"
          >
            <Show when={!loading()}>
              <span>Kirim</span>
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
              onClick={() => navigate('/login')}
              class="btn btn-block dark:btn-neutral"
            >
              Masuk
            </button>
          </div>
        </div>
      </AuthLayout>
    </SafeForm>
  );
}
