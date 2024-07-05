import { LandingLayout } from '@layouts';
import LOGOITTP from '@images/logo/ittp.png';
import LOGOHIPMI from '@images/logo/hipmi.png';
import { For, Show, Suspense, createResource } from 'solid-js';

interface IVisi {
  title: string;
  logo?: string;
  content: string;
}

export default function About() {
  const [visi] = createResource<IVisi[]>(async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return [
      {
        title: 'Meningkatkan Kreativitas',
        content: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque fuga rerum eveniet totam quo, doloremque, laudantium, enim a quisquam molestias alias cum! Quasi, delectus? Itaque illo aut atque ad, quos facilis, libero molestiae reiciendis ducimus nulla cumque id debitis omnis nisi non. Autem, aut iure placeat ab consectetur vitae praesentium?'
      },
      {
        title: 'Meningkatkan Kreativitas',
        content: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque fuga rerum eveniet totam quo, doloremque, laudantium, enim a quisquam molestias alias cum! Quasi, delectus? Itaque illo aut atque ad, quos facilis, libero molestiae reiciendis ducimus nulla cumque id debitis omnis nisi non. Autem, aut iure placeat ab consectetur vitae praesentium?'
      },
      {
        title: 'Meningkatkan Kreativitas',
        content: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque fuga rerum eveniet totam quo, doloremque, laudantium, enim a quisquam molestias alias cum! Quasi, delectus? Itaque illo aut atque ad, quos facilis, libero molestiae reiciendis ducimus nulla cumque id debitis omnis nisi non. Autem, aut iure placeat ab consectetur vitae praesentium?'
      },
      {
        title: 'Meningkatkan Kreativitas',
        content: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque fuga rerum eveniet totam quo, doloremque, laudantium, enim a quisquam molestias alias cum! Quasi, delectus? Itaque illo aut atque ad, quos facilis, libero molestiae reiciendis ducimus nulla cumque id debitis omnis nisi non. Autem, aut iure placeat ab consectetur vitae praesentium?'
      },
      {
        title: 'Meningkatkan Kreativitas',
        content: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque fuga rerum eveniet totam quo, doloremque, laudantium, enim a quisquam molestias alias cum! Quasi, delectus? Itaque illo aut atque ad, quos facilis, libero molestiae reiciendis ducimus nulla cumque id debitis omnis nisi non. Autem, aut iure placeat ab consectetur vitae praesentium?'
      }
    ];
  });

  return (
    <LandingLayout title='Tentang'>
      <div class="w-[85%] h-full px-4 xl:px-4 2xl:px-5 xl:py-2 overflow-clip">
        {/* Hero Tentang HIPMI */}
        <div class="min-h-[55vh] flex mb-12">
          <div class='hero'>
            <div class="flex hero-content justify-between gap-[20vw] flex-col lg:flex-row">
              <div data-aos='fade-up'>
                <h1 class="text-lg font-bold mb-[5vh]">Tentang Kami</h1>
                <h1 class="lg:text-5xl text-3xl font-extrabold">HIPMI PT ITTelkom Purwokerto</h1>
                <p class="py-6 max-w-[25vw] mt-[4vh]">
                  HIPMI PT ITTelkom Purwokerto didirikan pada tahun 2024 oleh mahasiswa/mahasiswi
                  yang memiliki minat dan bakat dalam bidang wirausaha. HIPMI PT ITTelkom Purwokerto
                  merupakan wadah bagi mahasiswa-mahasiswi yang bertujuan untuk mentoring dan sharing
                  seputar kegiatan wirausaha.
                </p>
              </div>
              <div class='flex lg:mt-[8vh] lg:mb-1 mb-12 lg:h-[18vh] w-[30vw] lg:w-[30vw] flex-col lg:flex-row' data-aos='fade-left'>
                <img
                  loading='lazy'
                  title='LOGO HIPMI PT ITTelkom'
                  src={LOGOHIPMI}
                  class="max-w-sm rounded-lg shadow-2xl bg-transparent"
                />
                <div class='divider divider-vertical lg:divider-horizontal' />
                <img
                  loading='lazy'
                  title='LOGO ITTelkom Purwokerto'
                  src={LOGOITTP}
                  class="max-w-sm rounded-lg shadow-2xl bg-transparent"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Berita Terknini */}
        <div class="text-center mb-12">
          {/* Slogan Section */}
          <div>
            <h1 class="text-3xl font-extrabold" data-aos="zoom-in-up">Slogan</h1>
            <div class="flex w-full justify-center mt-3 h-[1vh]" data-aos='fade-up'>
              <div class="divider w-[60%] border-black bg-black h-1 dark:border-neutral dark:bg-neutral" />
            </div>
            <div class="flex w-full justify-center mt-5 mb-[1vh] xs:mb-[2vh] h-[1vh]">
              <span class='lg:text-md text-sm lg:font-base font-sm' data-aos="zoom-out-up">Pengusaha Penjuang, Pejuang Pengusaha</span>
            </div>
            <div class="flex w-full justify-center mb-[2vh] h-[1vh]" data-aos='fade-up'>
              <div class="divider w-[60%] border-black bg-black h-1 dark:border-neutral dark:bg-neutral" />
            </div>
          </div>

          {/* Visi Misi Section */}
          <div class="flex flex-col gap-5 mt-12">
            <div class="flex flex-col gap-2 mt-[5vh]">
              <h1 class="text-3xl font-extrabold">Misi dan Visi</h1>
              {/* Misi Section */}
              <p class="text-center">
                Menjadi wadah aspirasi dan pengembangan kewirausahaan bagi mahasiswa ITTelkom.
              </p>
              <div class="flex w-full justify-center mb-2 h-[1vh]">
                <div class="divider w-[60%] h-1 dark:border-neutral dark:bg-neutral" />
              </div>
              {/* Visi Section with card for each visi */}
              <div class="flex w-full justify-center">
                <div class="flex flex-col gap-4 mt-8 w-[75%]">
                  <div class="flex flex-wrap justify-center gap-10">
                    <Suspense
                      fallback={
                        <div class="flex justify-center items-center w-full h-[50vh]">
                          {/* Show if data was loading */}
                          <div class="loading loading-lg" />
                          {/* Add loading text */}
                          <p class="text-2xl ms-5">
                            Memuat list visi...
                          </p>
                        </div>
                      }
                    >
                      <Show when={Array.isArray(visi()) && visi().length === 0}>
                        <div class="flex justify-center items-center w-full h-[50vh]">
                          <p class="text-2xl">
                            Belum ada visi yang dibuat
                          </p>
                        </div>
                      </Show>

                      <Show when={Array.isArray(visi()) && visi().length > 0}>
                        <For each={visi()}>
                          {(visi, index) => (
                            <div
                              id={`data-${Math.floor(Math.random() * 4 + 1)}-visi-${index()}`}
                              class="card bg-base-100 lg:w-[18vw] lg:min-h-[45vh] shadow-xl"
                            >
                              <figure class='mt-10'>
                                <img
                                  loading='lazy'
                                  src={visi?.logo || LOGOHIPMI}
                                  alt="Logo Visi"
                                  width={200}
                                  height={200}
                                />
                              </figure>
                              <div class="card-body ms-[2vw]">
                                <h2 class="card-title mt-3 font-extrabold text-start">
                                  {visi.title}
                                </h2>
                                <p class='text-start text-sm mt-3'>
                                  {visi.content}
                                </p>
                              </div>
                            </div>
                          )}
                        </For>
                      </Show>
                    </Suspense>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LandingLayout>
  );
}