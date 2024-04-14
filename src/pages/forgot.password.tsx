import { useNavigate } from '@solidjs/router';
import ChangeTheme from '@components/change.theme';
import { APP_NAME } from '@consts';

const ForgotPassword = () => {
  const navigate = useNavigate();

  return (
    <div class="w-full p-0 m-0">
      <div class="w-full min-h-screen flex justify-center items-center bg-base-200 relative">
        <div class="absolute top-5 right-5 z-[99]">
          <ChangeTheme />
        </div>
        <div class="w-full h-screen xl:h-auto xl:w-[30%] 2xl:w-[25%] 3xl:w-[20%] bg-base-100 rounded-lg shadow-md flex flex-col items-center p-5 pb-7 gap-8 pt-20 xl:pt-7">
          <div class="flex items-center gap-1 xl:gap-2">
            <span class="text-[18px] leading-[1.2] sm:text-lg xl:text-3xl 2xl:text-3xl font-semibold text-base-content dark:text-neutral-200">
              {APP_NAME}
            </span>
          </div>
          <span class="xl:text-xl font-semibold">
            Hai, Please fill your email, we will send you email confirmation.
            <br />
            <br />
            This confirmation link only valid for 3 days
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
                class="grow input outline-none focus:outline-none border-none border-[0px] h-auto pl-1 pr-0"
                placeholder="Email"
              />
            </label>
            <div class="flex items-center justify-between"/>
            <div
              onClick={() => navigate('/forgot-password')}
              class="btn btn-block btn-primary"
            >
              Submit
            </div>
            <div class="divider text-sm"/>
            <div class="w-full flex justify-center items-center gap-4">
              <button
                onClick={() => navigate('/login')}
                class="btn btn-block dark:btn-neutral"
              >
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
