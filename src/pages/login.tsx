import { useNavigate, A } from '@solidjs/router';
import { createFormGroup, createFormControl } from 'solid-forms';
import { convertToTitleCase, formValidator, println } from '@utils';
import { EApiType, EAuthMiscStatus, EAuthUpdateCategory, EDebugType } from '@enums';
import { createEffect, createSignal } from 'solid-js';
import { ApiService } from '@services';
import { AuthLayout } from '@layouts';
import { auth } from '@contexts';

const Login = () => {
  const navigate = useNavigate();
  const { updateData } = auth.useAuth();
  const [loading, setLoading] = createSignal<boolean>(false);
  const group = createFormGroup({
    username_or_email: createFormControl('', {
      required: true,
      validators: [formValidator.required, formValidator.minLength, formValidator.maxLength],
    }),
    password: createFormControl('', {
      required: true,
      validators: [formValidator.required, formValidator.minLength, formValidator.maxLength],
    }),
  });

  createEffect(() => {
    if (group.isDisabled || group.isValid) return;
  });

  const handleValidation = () => {
    if (group.isSubmitted) {
      println('Login', 'Form already submitted', EDebugType.ERROR);
      return;
    }

    if (!group.isValid) {
      Object.entries(group.controls).forEach(([fieldName, error]) => {
        if (error.errors) {
          const errors = Object.values(error.errors);

          for (let index = 0; index < errors.length; index++) {
            println('Login', `${convertToTitleCase(fieldName)} ${errors[index]}`, EDebugType.ERROR);
          }
        }
      });

      return;
    }

    group.markTouched(true);
    group.markSubmitted(true);
    setLoading(true);

    handleSubmit();
  };

  const handleSubmit = async () => {
    await ApiService.post({
      url: 'public/login',
      name: 'Login',
      data: {
        username_or_email: group.value.username_or_email,        
        password: group.value.password
      },
      server: EApiType.AUTH,
      success: (res: any) => {
        const value = res.data;
        console.log(JSON.stringify(value));
        

        try {
          updateData(EAuthUpdateCategory.STATUS, true);
          updateData(EAuthUpdateCategory.USER, {
            email: value.data?.email,
            username: value.data?.username
          });
          updateData(EAuthUpdateCategory.MISC, {
            logo: value.data?.logo,
            status: (value.data?.verified == EAuthMiscStatus.VERIFIED.valueOf()) ? EAuthMiscStatus.VERIFIED : EAuthMiscStatus.UNVERIFIED
          });
          // updateData(EAuthUpdateCategory.TOKEN, value.token);
          updateData(EAuthUpdateCategory.ROLE, value.data?.role);

          println('Login', value.message, EDebugType.SUCCESS);
          navigate('/dashboard', { replace: true });
        } catch (_err) {
          updateData(EAuthUpdateCategory.STATUS, false);

          println('Login', 'Something went wrong when saving data from database', EDebugType.ERROR);
          navigate('/', { replace: true });
        }
      },
      error: (err: any) => {
        if (Object.keys(err.data.data).length < 1 && err.data.status == 'unprocessable entity') {
          println('Login', err.data.message, EDebugType.ERROR);
          return;
        }

        println('Login', 'Something went wrong when checking data from database', EDebugType.ERROR);
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
        Hello, 👋 Welcome Back!
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
            onInput={(e) => group.controls.username_or_email.setValue(e.currentTarget.value)}
            class="grow input outline-none focus:outline-none border-none border-[0px] h-auto pl-1 pr-0"
            placeholder="Email or Username"
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
        <div class="flex items-center justify-between">
          <div class="form-control"/>
          {loading() ? (
            <div class="link link-primary font-semibold text-xs no-underline">Forgot Password?</div>
          ) : (
            <A
              href="/forgot-password"
              class="link link-primary font-semibold text-xs no-underline"
            >
              Forgot Password?
            </A>
          )}
        </div>
        <button
          disabled={loading()}
          onClick={handleValidation}
          class="btn btn-block btn-primary"
        >
          {loading() ? <span class="loading loading-dots loading-lg"/> : <span>Log In</span>}
        </button>
        <div class="divider text-sm">OR</div>
        <div class="w-full flex justify-center items-center gap-4">
          <button
            disabled={loading()}
            onClick={() => navigate('/register')}
            class="btn btn-block dark:btn-neutral"
          >
            Register
          </button>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;
