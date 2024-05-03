import { useNavigate } from '@solidjs/router';
import { createFormGroup, createFormControl } from 'solid-forms';
import { convertToTitleCase, formValidator, println } from '@utils';
import { EApiType, EDebugType } from '@enums';
import { createEffect, createSignal } from 'solid-js';
import { ApiService } from '@services';
import { AuthLayout } from '@layouts';

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = createSignal<boolean>(false);
  const group = createFormGroup({
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

  createEffect(() => {
    if (group.isDisabled || group.isValid) return;
  });

  const handleValidation = () => {
    if (group.isSubmitted) {
      println('Register', 'Form already submitted', EDebugType.ERROR);
      return;
    }

    if (!group.isValid) {
      Object.entries(group.controls).forEach(([fieldName, error]) => {
        if (error.errors) {
          const errors = Object.values(error.errors);

          for (let index = 0; index < errors.length; index++) {
            println('Register', `${convertToTitleCase(fieldName)} ${errors[index]}`, EDebugType.ERROR);
          }
        }
      });

      return;
    }

    if (group.value.password !== group.value.password_confirmation) {
      println('Register', 'Password confirmation not match', EDebugType.ERROR);
      return;
    }

    group.markTouched(true);
    group.markSubmitted(true);
    setLoading(true);

    handleSubmit();
  };

  const handleSubmit = async () => {
    await ApiService.post({
      url: 'public/register',
      name: 'Register',
      data: {
        username: group.value.username,
        email: group.value.email,
        password: group.value.password,
        password_confirmation: group.value.password_confirmation
      },
      server: EApiType.AUTH,
      success: (res: any) => {
        const value = res.data;

        println('Register', value.message, EDebugType.SUCCESS);
        navigate('/login');
      },
      error: () => {
        println('Register', 'Something went wrong when registering data', EDebugType.ERROR);
      },
      finally: () => {
        group.markTouched(false);
        group.markSubmitted(false);
        setLoading(false);
      }
    });
  };

  return (
    <AuthLayout disabled={loading()}>
      <span class="xl:text-xl font-semibold">
        Hai, 👋 Ready to join us?
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
            type="text"
            disabled={loading()}
            onInput={(e) => group.controls.username.setValue(e.currentTarget.value)}
            class="grow input outline-none focus:outline-none border-none border-[0px] h-auto pl-1 pr-0"
            placeholder="Username"
          />
        </label>
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
          <input
            type="password"
            disabled={loading()}
            onInput={(e) => group.controls.password.setValue(e.currentTarget.value)}
            class="grow input outline-none focus:outline-none border-none border-[0px] h-auto pl-1 pr-0"
            placeholder="Password"
          />
        </label>
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
          <input
            type="password"
            disabled={loading()}
            onInput={(e) => group.controls.password_confirmation.setValue(e.currentTarget.value)}
            class="grow input outline-none focus:outline-none border-none border-[0px] h-auto pl-1 pr-0"
            placeholder="Password Confirmation"
          />
        </label>
        <div class="flex items-center justify-between" />
        <button
          disabled={loading()}
          onClick={handleValidation}
          class="btn btn-block btn-primary"
        >
          {loading() ? <span class="loading loading-dots loading-lg"/> : <span>Register</span>}
        </button>
        <div class="divider text-sm">OR</div>
        <div class="w-full flex justify-center items-center gap-4">
          <button
            disabled={loading()}
            onClick={() => navigate('/login')}
            class="btn btn-block dark:btn-neutral"
          >
            Log In
          </button>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Register;
