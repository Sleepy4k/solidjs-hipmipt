import { IAuth } from '@interfaces';
import { APP_NAME } from '@consts';
import { createEffect } from 'solid-js';
// import { useNavigate } from '@solidjs/router';
import { NavBar, Footer } from '@components/landing';

export default function LandingLayout(props: IAuth.IAuthLayoutProp) {
  // const navigate = useNavigate();

  createEffect(() => {
    if (props.title) document.title = `${props.title} | ${APP_NAME}`;
  });

  return (
    <div
      class="w-full p-0 m-0 overflow-visible min-h-screen flex flex-col justify-between"
    >
      <NavBar />
      <div class='mt-[8vh]'>
        <div class="flex gap-0 pt-5 mb-auto flex justify-center z-0">
          {props.children}
        </div>
      </div>
      <Footer />
    </div>
  );
}
