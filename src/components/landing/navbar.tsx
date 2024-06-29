import { A } from '@solidjs/router';
import LOGOITTP from '@images/ittp-logo.png';
import LOGOHIPMI from '@images/hipmi-logo.png';
import ChangeTheme from '@components/change.theme';

export default function NavBar() {
  return (
    <div class="fixed navbar bg-base-100 z-50 flex justify-center">
      <div class="absolute top-5 right-5">
        <ChangeTheme />
      </div>
      <div class='navbar w-[85%]'>
        <div class="navbar-start">
          <A href='/' class="btn btn-ghost text-xl">
            <img loading="lazy" src={LOGOHIPMI} alt="Logo HIPMI PT ITTelkom" class='w-10 h-10' />
            <img loading="lazy" src={LOGOITTP} alt="Logo HIPMI PT ITTelkom" class='w-10 h-10' />
          </A>
        </div>
        <div class="navbar-center hidden lg:flex">
          <ul class="menu menu-horizontal px-1 lg:text-base gap-2">
            <li>
              <A href='/'>Home</A>
            </li>
            <li>
              <details>
                <summary><A href='/about'>Tentang HIPMI</A></summary>
                <ul class="p-2">
                  <li>
                    <A href='/about/bpc'>HIPMI BPC</A>
                  </li>
                  <li>
                    <A href='/about/pt'>HIPMI PT</A>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <A href='/activity'>Kegiatan</A>
            </li>
            <li>
              <A href='/article'>Artikel</A>
            </li> 
            <li>
              <A href='/product'>Produk</A>
            </li>
            <li>
              <A href='/member'>Anggota</A>
            </li>
          </ul>
        </div>
        <div class="navbar-end">
          <div class="hidden lg:block relative rounded-2xl overflow-hidden h-[5vh] w-[10vh]">
            <A href='/login' class="btn btn-block bg-custom-yellow dark:text-neutral text-base">Masuk</A>
          </div>
          <div class="dropdown dropdown-end">
            <div
              title="Menu"
              tabindex="0"
              role="button"
              class="btn btn-ghost lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul
              tabindex="0"
              class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow gap-2"
            >
              <li>
                <A href='/'>Home</A>
              </li>
              <li>
                <A href='/about'>Tentang HIPMI</A>
                <ul class="p-2">
                  <li>
                    <A href='/about/bpc'>HIPMI BPC</A>
                  </li>
                  <li>
                    <A href='/about/pt'>HIPMI PT</A>
                  </li>
                </ul>
              </li>
              <li>
                <A href='/activity'>Kegiatan</A>
              </li>
              <li>
                <A href='/article'>Artikel</A>
              </li> 
              <li>
                <A href='/product'>Produk</A>
              </li>
              <li>
                <A href='/member'>Anggota</A>
              </li>
              <li>
                <A href='/login'>Masuk</A>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

