import { LandingLayout } from '@layouts';
import LOGOITTP from '@images/ittp-logo.png';
import LOGOHIPMI from '@images/hipmi-logo.png';

export default function About() {
  return (
    <LandingLayout title='Tentang'>
      <div class="w-[85%] h-full px-4 xl:px-4 2xl:px-5 xl:py-2 overflow-clip">
        <div class="flex flex-col gap-5">
          <div class="flex flex-col gap-2">
            <h1 class="text-4xl font-bold">Tentang HIPMI</h1>
            <p class="text-justify">
              Himpunan Pengusaha Muda Indonesia (HIPMI) adalah organisasi yang bergerak dalam bidang kewirausahaan. HIPMI PT ITTelkom merupakan salah satu cabang HIPMI yang bergerak di bidang teknologi informasi dan telekomunikasi.
            </p>
          </div>
          <div class="flex flex-col gap-2">
            <h1 class="text-4xl font-bold">Visi</h1>
            <p class="text-justify">
              Menjadi wadah aspirasi dan pengembangan kewirausahaan bagi mahasiswa ITTelkom.
            </p>
          </div>
          <div class="flex flex-col gap-2">
            <h1 class="text-4xl font-bold">Misi</h1>
            <ul class="list-disc pl-5">
              <li>Menumbuhkan jiwa kewirausahaan pada mahasiswa ITTelkom.</li>
              <li>Membantu mahasiswa ITTelkom dalam memulai usaha.</li>
              <li>Menjadi wadah aspirasi dan pengembangan kewirausahaan bagi mahasiswa ITTelkom.</li>
            </ul>
          </div>
          <div class="flex flex-col gap-2">
            <h1 class="text-4xl font-bold">Struktur Organisasi</h1>
            <img loading="lazy" src={LOGOHIPMI} alt="Logo HIPMI PT ITTelkom" class='w-10 h-10' />
            <img loading="lazy" src={LOGOITTP} alt="Logo HIPMI PT ITTelkom" class='w-10 h-10' />
          </div>
        </div>
      </div>
    </LandingLayout>
  );
}