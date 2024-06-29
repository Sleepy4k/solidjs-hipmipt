import BGHERO from '@images/hero.jpg';
import { LandingLayout } from '@layouts';
import LOGOITTP from '@images/ittp-logo.png';
import LOGOHIPMI from '@images/hipmi-logo.png';
import { A, useNavigate } from '@solidjs/router';
import { For, Show, Suspense, createResource } from 'solid-js';

interface INews {
  slug: string;
  title: string;
  content: string;
  category: string[];
}

export default function Home() {
  const navigate = useNavigate();

  const [news] = createResource<INews[]>(async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return [
      {
        title: 'Magang MSIB Batch 2024 Telah Dimulai!',
        slug: 'magang-msib-batch-2024-telah-dimulai',
        category: ['Magang', 'Bisnis'],
        content: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque fuga rerum eveniet totam quo, doloremque, laudantium, enim a quisquam molestias alias cum! Quasi, delectus? Itaque illo aut atque ad, quos facilis, libero molestiae reiciendis ducimus nulla cumque id debitis omnis nisi non. Autem, aut iure placeat ab consectetur vitae praesentium?'
      },
      {
        title: 'APERTI BUMN 2024: Lomba Produk Terbaik',
        slug: 'aperti-bumn-2024-lomba-produk-terbaik',
        category: ['Lomba', 'Produk'],
        content: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque fuga rerum eveniet totam quo, doloremque, laudantium, enim a quisquam molestias alias cum! Quasi, delectus? Itaque illo aut atque ad, quos facilis, libero molestiae reiciendis ducimus nulla cumque id debitis omnis nisi non. Autem, aut iure placeat ab consectetur vitae praesentium?'
      },
      {
        title: 'Biasa: Bincang Asah Usaha',
        slug: 'biasa-bincang-asah-usaha',
        category: ['News', 'Self Improvement'],
        content: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque fuga rerum eveniet totam quo, doloremque, laudantium, enim a quisquam molestias alias cum! Quasi, delectus? Itaque illo aut atque ad, quos facilis, libero molestiae reiciendis ducimus nulla cumque id debitis omnis nisi non. Autem, aut iure placeat ab consectetur vitae praesentium?'
      }
    ];
  });

  return (
    <LandingLayout title='Home'>
      <div class="w-[85%] h-full px-4 xl:px-4 2xl:px-5 xl:py-2 overflow-clip">
        {/* Hero HIPMI PT */}
        <div class='min-h-[80vh]'>
          <div
            class="hero h-[65vh] bg-center bg-cover bg-no-repeat bg-opacity-50 rounded-3xl overflow-hidden"
            style={{'background-image': `url(${BGHERO})`}}
          >
            <div class="hero-overlay bg-opacity-75"/>
            <div class="hero-content text-neutral-content text-center">
              <div>
                <h1 class="max-w-[50vw] mb-5 lg:text-6xl md:text-[5vw] text-[6vw] font-extrabold">
                  HIMPUNAN PENGUSAHA
                  <br />
                  MUDA INDONESIA
                </h1>
                <div class="flex justify-center">
                  <p class="max-w-[25vw] lg:text-base md:text-[2vw] text-[3vw]">
                    <b>HIPMI PT</b> adalah wadah bagi mahasiswa-mahasiswi yang bertujuan
                    untuk mentoring dan sharing seputar kegiatan wirausaha.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Berita Terknini */}
        <div class="text-center">
          <h1 class="text-4xl font-extrabold">Kabar Terkini</h1>
          <p class="mt-4 text-md">Apa saja yang terjadi pada bulan ini</p>
          {/* Card Section */}
          <div class="flex flex-wrap justify-center gap-10 mt-[5vh]">
            <Suspense
              fallback={
                <div class="flex justify-center items-center w-full h-[50vh]">
                  {/* Show if data was loading */}
                  <div class="loading loading-lg" />
                </div>
              }
            >
              <Show when={Array.isArray(news()) && news().length === 0}>
                <div class="flex justify-center items-center w-full h-[50vh]">
                  <p class="text-2xl">
                    Belum ada berita terbaru
                  </p>
                </div>
              </Show>

              <Show when={Array.isArray(news()) && news().length > 0}>
                <For each={news()}>
                  {(news, index) => (
                    <A href={`/artikel/${news.slug}`} id={`data-${Math.floor(Math.random() * 4 + 1)}-berita-terkini-${index()}`} class="card bg-base-100 w-96 shadow-xl">
                      <figure>
                        <img
                          loading='lazy'
                          src={LOGOHIPMI}
                          alt="Logo Berita"
                          width={200}
                          height={200}
                        />
                      </figure>
                      <div class="card-body">
                        <div class="card-actions justify-start">
                          <For each={news.category}>
                            {category => <div class="badge badge-outline">{category}</div>}
                          </For>
                        </div>
                        <h2 class="card-title mt-3 font-extrabold text-start">
                          {news.title}
                        </h2>
                        <p class='text-start text-sm'>
                          {news.content}
                        </p>
                      </div>
                    </A>
                  )}
                </For>
              </Show>
            </Suspense>
          </div>
        </div>

        {/* Hero Tentang HIPMI */}
        <div class="mt-12 lg:mt-2 min-h-[80vh] flex">
          <div class='hero'>
            <div class="flex hero-content justify-between gap-[20vw] flex-col lg:flex-row">
              <div>
                <h1 class="text-lg font-bold mb-[5vh]">Tentang Kami</h1>
                <h1 class="text-5xl font-extrabold">HIPMI PT ITTelkom Purwokerto</h1>
                <p class="py-6 max-w-[35vw] mt-[4vh]">
                  HIPMI PT ITTelkom Purwokerto didirikan pada tahun 2024 oleh mahasiswa/mahasiswi
                  yang memiliki minat dan bakat dalam bidang wirausaha. HIPMI PT ITTelkom Purwokerto
                  merupakan wadah bagi mahasiswa-mahasiswi yang bertujuan untuk mentoring dan sharing
                  seputar kegiatan wirausaha.
                </p>
                <button
                  type='button'
                  onClick={() => navigate('/tentang')}
                  class="btn bg-custom-yellow dark:text-neutral text-base mt-[4vh] font-bold"
                >
                  Selengkapnya
                </button>
              </div>
              <div class='flex mt-[8vh] lg:h-[18vh] flex-col lg:flex-row'>
                <img
                  loading='lazy'
                  title='LOGO HIPMI PT ITTelkom'
                  src={LOGOHIPMI}
                  width={180}
                  class="max-w-sm rounded-lg shadow-2xl bg-transparent"
                />
                <div class='divider divider-vertical lg:divider-horizontal' />
                <img
                  loading='lazy'
                  title='LOGO ITTelkom Purwokerto'
                  src={LOGOITTP}
                  width={180}
                  class="max-w-sm rounded-lg shadow-2xl bg-transparent"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </LandingLayout>
  );
}