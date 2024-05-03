import { useLocation, useNavigate, useParams } from '@solidjs/router';
import { createFormGroup, createFormControl } from 'solid-forms';
import { convertToTitleCase, formValidator, println } from '@utils';
import { EApiType, EDebugType } from '@enums';
import { createEffect, createSignal } from 'solid-js';
import { ApiService } from '@services';
import { AuthLayout } from '@layouts';

const Register = () => {
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

  createEffect(() => {
    const { state, query } = useLocation();

    const otpData = query?.otp || null;
    const emailData = query?.email || null;

    if (otpData != null && emailData != null && !state?.isOk) {
      navigate(`/forgot-password/verify/${params.id}`, { replace: true, state: { otp: otpData, email: emailData, isOk: true } });
    } else if ((otpData == null || emailData == null) && !state?.isOk) {
      println('Forgot Password', 'Invalid access data', EDebugType.ERROR);
      navigate('/', { replace: true });
      return;
    }

    setOtp(state?.otp);
    setEmail(state?.email);

    if (state?.isOk) handleCheckDataValid();
  });

  createEffect(() => {
    if (group.isDisabled || group.isValid) return;
  });

  const handleCheckDataValid = async () => {
    await ApiService.post({
      url: 'public/forgot-password/check',
      name: 'Forgot Password',
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

    if (group.value.new_password !== group.value.new_password_confirmation) {
      println('Register', 'Password confirmation not match', EDebugType.ERROR);
      return;
    }

    group.markTouched(true);
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
        group.markTouched(false);
        group.markSubmitted(false);
        setLoading(false);
      }
    });
  };

  return (
    <AuthLayout disabled={loading()}>
      {!isValid() ? (
        <>
          <span class="xl:text-xl font-semibold">
            We're sorry, link that we are provided is invalid,
            please send request for new link to proccess your
            change password request.
          </span>
          <div class="flex items-center justify-between" />
          <button
            disabled={loading()}
            onClick={() => navigate('/login', { replace: true })}
            class="btn btn-block btn-primary"
          >
            Back
          </button>
        </>
      ) : (
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
              <input
                type="password"
                disabled={loading()}
                onInput={(e) => group.controls.new_password.setValue(e.currentTarget.value)}
                class="grow input outline-none focus:outline-none border-none border-[0px] h-auto pl-1 pr-0"
                placeholder="New Password"
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
                onInput={(e) => group.controls.new_password_confirmation.setValue(e.currentTarget.value)}
                class="grow input outline-none focus:outline-none border-none border-[0px] h-auto pl-1 pr-0"
                placeholder="New Password Confirmation"
              />
            </label>
            <div class="flex items-center justify-between" />
            <button
              disabled={loading()}
              onClick={handleValidation}
              class="btn btn-block btn-primary"
            >
              {loading() ? <span class="loading loading-dots loading-lg"/> : <span>Change Password</span>}
            </button>
            <div class="divider text-sm" />
            <div class="w-full flex justify-center items-center gap-4">
              <button
                disabled={loading()}
                onClick={() => navigate('/')}
                class="btn btn-block dark:btn-neutral"
              >
                Home
              </button>
            </div>
          </div>
        </>
      )
      }
    </AuthLayout >
  );
};

export default Register;
