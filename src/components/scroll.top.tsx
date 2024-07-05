import { createSignal } from 'solid-js';
import { MIN_SCROLL_TOP } from '@consts';
import { FaSolidArrowUpLong } from 'solid-icons/fa';

export default function ScrollToTop() {
  const [isScrollDisabled, setIsScrollDisabled] = createSignal(false);
  const handleScrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const handleOnScroll = () => {
    const bodyScroll = document.body.scrollTop > MIN_SCROLL_TOP;
    const docScroll = document.documentElement.scrollTop > MIN_SCROLL_TOP;

    (bodyScroll || docScroll) ? setIsScrollDisabled(true) : setIsScrollDisabled(false);
  };

  window.onscroll = () => handleOnScroll();

  return (
    <div
      onClick={handleScrollToTop}
      hidden={!isScrollDisabled()}
      class="fixed bottom-5 right-5 z-50 animate-bounce transition ease-in-out delay-500"
    >
      <button
        type='button'
        class="btn btn-circle bg-custom-yellow"
      >
        <FaSolidArrowUpLong color='black' />
      </button>
    </div>
  );
}
