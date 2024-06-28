import { A } from '@solidjs/router';
import LOGOITTP from '@assets/images/ittp-logo.png';
import LOGOHIPMI from '@assets/images/hipmi-logo.png';

export default function Footer() {
  return (
    <div class='bg-base-200'>
      <footer class="footer text-base-content p-10 w-[75%] ms-[20vw]">
        <aside class='max-w-[15vw]'>
          <div class='flex justify-center gap-5'>
            <img loading="lazy" src={LOGOHIPMI} alt="Logo HIPMI PT ITTelkom" class='w-10 h-10' />
            <img loading="lazy" src={LOGOITTP} alt="Logo HIPMI PT ITTelkom" class='w-10 h-10' />
          </div>
          <p class='text-start mt-5 font-extrabold'>
            Connect with us
          </p>
          <a href="https://www.instagram.com/hipmi.ittp" title='Link Instagram' target="_blank" rel="noopener">
            <span class="ct-icon-container">
              <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
                <circle cx="10" cy="10" r="3.3"/>
                <path d="M14.2,0H5.8C2.6,0,0,2.6,0,5.8v8.3C0,17.4,2.6,20,5.8,20h8.3c3.2,0,5.8-2.6,5.8-5.8V5.8C20,2.6,17.4,0,14.2,0zM10,15c-2.8,0-5-2.2-5-5s2.2-5,5-5s5,2.2,5,5S12.8,15,10,15z M15.8,5C15.4,5,15,4.6,15,4.2s0.4-0.8,0.8-0.8s0.8,0.4,0.8,0.8S16.3,5,15.8,5z"/>
              </svg>
            </span>
          </a>
        </aside>
        <nav class='max-w-[15vw]'>
          <h6 class="footer-title">Site Menu</h6>
          <A href='/kegiatan' class="link link-hover">Kegiatan</A>
          <A href='/artikel' class="link link-hover">Artikel</A>
          <A href='/produk' class="link link-hover">Produk</A>
          <A href='/anggota' class="link link-hover">Anggota</A>
        </nav>
        <nav class='max-w-[15vw]'>
          <h6 class="footer-title">Useful Website</h6>
          <a href='https://ittelkom-pwt.ac.id' class="link link-hover">Institut Teknologi Telkom Purwokerto</a>
          <a href='https://www.hipmijateng.org' class="link link-hover">Beranda | HIPMI Badan Pengurus Daerah (BPD) Jawa Tengah</a>
        </nav>
        <nav/>
      </footer>
      <footer class="footer text-base-content border-base-300 border-t px-10 py-4 flex justify-center">
        <p>Copyright © HIPMI PT ITTelkom Purwokerto 2024 | Teknologi Informasi</p>
      </footer>
    </div>
  );
}

