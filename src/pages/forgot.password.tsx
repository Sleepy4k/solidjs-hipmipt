import { useNavigate } from '@solidjs/router';
import { createFormGroup, createFormControl } from 'solid-forms';
import { createEffect, createSignal } from 'solid-js';
import { convertToTitleCase, formValidator, println } from '@utils';
import { EDebugType } from '@enums';
import { AuthLayout } from '@layouts';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const captchaUrl = 'https://dummyimage.com/300x100/000/fff.png&text=';
  const [imageCode, setImageCode] = createSignal<string>('');
  const [code, setCode] = createSignal<number>(0);
  const [loading, setLoading] = createSignal<boolean>(false);
  const group = createFormGroup({
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

  createEffect(() => {
    if (group.isDisabled || group.isValid) return;
  });

  const generateCode = () => {
    const genCode = Math.floor(Math.random() * 8) + 1;

    return genCode;
  };

  const handleCaptcha = () => {
    let key = generateCode() + '+' + generateCode() + '+' + generateCode() + '+' + generateCode();
    setImageCode(captchaUrl + key);

    key = key.split('+').join('');
    setCode(Number(key));
  };

  const handleValidation = () => {
    if (group.isSubmitted) {
      println('Forgot Password', 'Form already submitted', EDebugType.ERROR);
      return;
    }

    if (!group.isValid) {
      Object.entries(group.controls).forEach(([fieldName, error]) => {
        if (!error.errors) return;

        const errors = Object.values(error.errors);

        for (let index = 0; index < errors.length; index++) {
          println('Forgot Password', `${convertToTitleCase(fieldName)} ${errors[index]}`, EDebugType.ERROR);
        }
      });

      return;
    }

    if (Number(group.value.captchaCode) != code()) {
      println('Forgot Password', 'Invalid captcha code', EDebugType.ERROR);
      handleCaptcha();
      return;
    }

    group.markTouched(true);
    group.markSubmitted(true);
    setLoading(true);

    handleSubmit();
  };

  const handleSubmit = async () => {
    group.markTouched(false);
    group.markSubmitted(false);
    setLoading(false);

    navigate('/forgot-proccess', { replace: true, state: { email: group.value.email } });
  };

  return (
    <AuthLayout>
      <span class="xl:text-xl font-semibold">
        Please enter your email address below, and we will send you a link
        to set a new password.
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
          <input
            type="email"
            disabled={loading()}
            onInput={(e) => group.controls.email.setValue(e.currentTarget.value)}
            class="grow input outline-none focus:outline-none border-none border-[0px] h-auto pl-1 pr-0"
            placeholder="Email"
          />
        </label>
        <div class="flex items-center justify-between" >
          <div class="form-control">
            <image src={imageCode()} alt="Captch Code" />
          </div>
        </div>
        <label class="input input-bordered min-w-full flex items-center gap-2">
          <input
            type="text"
            disabled={loading()}
            onInput={(e) => group.controls.captchaCode.setValue(e.currentTarget.value)}
            class="grow input outline-none focus:outline-none border-none border-[0px] h-auto pl-1 pr-0"
            placeholder="Captcha Code"
          />
        </label>
        <div class="flex items-center justify-between" />
        <button
          disabled={loading()}
          onClick={handleValidation}
          class="btn btn-block btn-primary"
        >
          Submit
        </button>
        <div class="divider text-sm" />
        <div class="w-full flex justify-center items-center gap-4">
          <button
            onClick={() => navigate('/login')}
            class="btn btn-block dark:btn-neutral"
          >
            Back
          </button>
        </div>
      </div>
    </AuthLayout>
  );
};

export default ForgotPassword;
