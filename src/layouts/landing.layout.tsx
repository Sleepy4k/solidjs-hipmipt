import { Meta } from '@contexts';
import { IAuth } from '@interfaces';
import { createEffect } from 'solid-js';
import ScrollToTop from '@components/scroll.top';
import { NavBar, Footer } from '@components/landing';

export default function LandingLayout(props: IAuth.IAuthLayoutProp) {
  const { changeTitle } = Meta.useMeta();

  createEffect(() => {
    if (props.title) changeTitle(props.title);
    else changeTitle();
  });

  return (
    <div
      class="w-full p-0 m-0 overflow-visible min-h-screen flex flex-col justify-between"
    >
      <NavBar />
      <div class='lg:mt-[8vh] mt-[5rem]'>
        <div class="flex gap-0 pt-5 mb-auto flex justify-center z-0">
          {props.children}
        </div>
      </div>
      <ScrollToTop />
      <Footer />
    </div>
  );
}
