import { trimText } from '@utils';
import BGHERO from '@images/hero.jpg';
import { LandingLayout } from '@layouts';
import LOGOITTP from '@images/logo/ittp.png';
import { useNavigate } from '@solidjs/router';
import LOGOHIPMI from '@images/logo/hipmi.png';
import { styled } from 'solid-styled-components';
import { For, Show, Suspense, createResource } from 'solid-js';

interface INews {
  slug: string;
  title: string;
  logo?: string;
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

  // Buat styled div component untuk nambahin css background image
  // Karena SolidJS tidak support inline style (ada warning nya)
  const StyledDiv = styled('div')`
    background-image: url(${BGHERO});
  `;

  // Buat styled iframe component untuk nambahin css background image
  // Karena SolidJS tidak support inline style (add warning nya)
  const StyledIframe = styled('iframe')`
    border: solid 1px #777;
    width: 100%;
    height: 65vh;
  `;

  return (
    <LandingLayout>
      <div class="w-[85%] h-full px-4 xl:px-4 2xl:px-5 xl:py-2 overflow-clip">
        {/* Hero HIPMI PT */}
        <div class='lg:min-h-[80vh] min-h-[25rem]'>
          <StyledDiv
            class="hero lg:h-[65vh] h-[20rem] bg-center bg-cover bg-no-repeat bg-opacity-50 rounded-3xl overflow-hidden"
          >
            <div class="hero-overlay bg-opacity-85"/>
            <div class="hero-content text-neutral-content text-center">
              <div>
                <h1 class="lg:max-w-[50vw] mb-5 lg:text-6xl md:text-[5vw] text-[6vw] font-extrabold">
                  HIMPUNAN PENGUSAHA
                  <br />
                  MUDA INDONESIA
                </h1>
                <div class="flex justify-center">
                  <p class="lg:max-w-[25vw] lg:text-base md:text-[2vw] text-[2.5vw]">
                    <b>Himpunan Pengusaha Muda Indonesia</b> atau biasa dikenal dengan <b>HIPMI</b> merupakan sebuah organisasi independen
                    yang merupakan kumpulan para pengusaha muda Indonesia yang bergerak dalam bidang perekoNomian.
                    Organisasi ini merupakan sebuah organisasi non-partisan yang mulai didirikan pada tanggal 19 Juni 1972.
                  </p>
                </div>
              </div>
            </div>
          </StyledDiv>
        </div>

        {/* Berita Terknini */}
        <div class="text-center">
          <h1 class="text-4xl font-extrabold">Kabar Terkini</h1>
          <p class="mt-4 text-md">Apa saja yang terjadi pada bulan ini</p>
          {/* Card Section */}
          <div class="flex flex-wrap justify-center gap-10 mt-[5vh]">
            <Suspense
              fallback={
                <div class="flex justify-center items-center w-full h-[50vh]" data-aos="fade-up">
                  {/* Show if data was loading */}
                  <div class="loading loading-lg" />
                  {/* Add loading text */}
                  <p class="text-2xl ms-5">
                    Memuat berita terbaru...
                  </p>
                </div>
              }
            >
              <Show when={Array.isArray(news()) && news().length === 0}>
                <div class="flex justify-center items-center w-full h-[50vh]" data-aos="fade-up">
                  <p class="text-2xl">
                    Belum ada berita terbaru
                  </p>
                </div>
              </Show>

              <Show when={Array.isArray(news()) && news().length > 0}>
                <For each={news()}>
                  {(news, index) => (
                    <div
                      id={`data-${Math.floor(Math.random() * 4 + 1)}-berita-terkini-${index()}`}
                      class="card bg-base-100 lg:w-[18vw] shadow-xl"
                      data-aos='fade-up'
                      data-aos-delay={`${index() * 100}`}
                    >
                      <figure>
                        <img
                          loading='lazy'
                          src={news?.logo || LOGOHIPMI}
                          alt="Logo Berita"
                          width={150}
                          height={150}
                        />
                      </figure>
                      <div class="card-body">
                        <div class="card-actions justify-start">
                          <For each={news.category}>
                            {category => <div class="badge badge-outline w-auto h-5 flex justify-center">
                              <span class='lg:text-base text-sm w-full'>{category}</span>
                            </div>}
                          </For>
                        </div>
                        <h2 class="card-title mt-3 font-extrabold text-start">
                          {news.title}
                        </h2>
                        <p class='text-start text-sm'>
                          {trimText(news.content, 150)}
                        </p>
                        <div class="card-actions justify-end">
                          <button
                            type='button'
                            onClick={() => navigate(`/artikel/${news.slug}`)}
                            class="btn bg-custom-yellow dark:text-neutral text-base h-[2vh] mt-[3vh] font-bold lg:text-base"
                          >
                            Selengkapnya
                          </button>
                        </div>
                      </div>
                    </div>
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
              <div data-aos='fade-up'>
                <h1 class="text-lg font-bold mb-[5vh]">Tentang Kami</h1>
                <h1 class="lg:text-5xl text-3xl font-extrabold">HIPMI PT ITTelkom Purwokerto</h1>
                <p class="py-6 lg:max-w-[35vw] mt-[4vh]">
                  HIPMI PT ITTelkom Purwokerto didirikan pada tahun 2024 oleh mahasiswa/mahasiswi
                  yang memiliki minat dan bakat dalam bidang wirausaha. HIPMI PT ITTelkom Purwokerto
                  merupakan wadah bagi mahasiswa-mahasiswi yang bertujuan untuk mentoring dan sharing
                  seputar kegiatan wirausaha.
                </p>
                <button
                  type='button'
                  onClick={() => navigate('/about')}
                  class="btn bg-custom-yellow dark:text-neutral text-base mt-[4vh] font-bold"
                >
                  Selengkapnya
                </button>
              </div>
              <div class='flex lg:mt-[8vh] lg:mb-1 mb-12 lg:h-[18vh] w-[10rem] lg:w-[30vw] lg:me-[10vw] flex-col lg:flex-row' data-aos='fade-left'>
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

        {/* Calender Section */}
        <div class="text-center">
          <h1 class="text-4xl font-extrabold" data-aos="fade-up">Kalender HIPMI PT ITTelkom</h1>
          {/* Card Section */}
          <div class="flex flex-wrap justify-center gap-10 mt-[5vh] mb-[12vh]">
            <Suspense
              fallback={
                <div class="flex justify-center items-center w-full h-[50vh]" data-aos="fade-up">
                  {/* Show if data was loading */}
                  <div class="loading loading-lg" />
                  {/* Add loading text */}
                  <p class="text-2xl ms-5">
                    Memuat berita terbaru...
                  </p>
                </div>
              }
            >
              <div class='flex justify-center items-center min-h-[65vh] min-w-full'>
                <StyledIframe
                  loading="lazy"
                  data-aos="fade-up"
                  src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=Asia%2FJakarta&bgcolor=%23ffd700&title=%20&src=ZW4uaW5kb25lc2lhbiNob2xpZGF5QGdyb3VwLnYuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%230B8043"
                />
              </div>
            </Suspense>
          </div>
        </div>
      </div>
    </LandingLayout>
  );
}
