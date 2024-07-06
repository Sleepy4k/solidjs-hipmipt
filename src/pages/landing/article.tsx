import { Theme } from '@contexts';
import { trimText } from '@utils';
import '@assets/style/paginate.css';
import { EThemeType } from '@enums';
import { LandingLayout } from '@layouts';
import { useNavigate } from '@solidjs/router';
import LOGOHIPMI from '@images/logo/hipmi.png';
import { LightPaginationNav, DarkPaginationNav, paginate } from 'solid-paginate';
import { createResource, createSignal, For, Index, Show, Suspense, Match, Switch } from 'solid-js';

interface INews {
  slug: string;
  title: string;
  logo?: string;
  content: string;
  category: string[];
}

export default function Article() {
  const pageSize = 6;
  const navigate = useNavigate();
  const { theme } = Theme.useTheme();
  const [currentPage, setCurrentPage] = createSignal(1);

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

  const paginatedNews = () => paginate({items: news(), pageSize, currentPage: currentPage()});

  return (
    <LandingLayout title='Artikel'>
      <div class="w-[85%] h-full px-4 xl:px-4 2xl:px-5 xl:py-2 overflow-clip">
        <div class="flex flex-wrap justify-center gap-10 mt-[5vh] mb-[8vh]">
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
              <Index each={paginatedNews()}>
                {(news, index) => (
                  <div
                    id={`data-${Math.floor(Math.random() * 4 + 1)}-berita-terkini-${index}`}
                    class="card bg-base-100 lg:w-[20vw] shadow-xl"
                    data-aos='fade-up'
                    data-aos-delay={`${index * 100}`}
                  >
                    <figure>
                      <img
                        loading='lazy'
                        src={news()?.logo || LOGOHIPMI}
                        alt="Logo Berita"
                        width={150}
                        height={150}
                      />
                    </figure>
                    <div class="card-body">
                      <div class="card-actions justify-start">
                        <For each={news().category}>
                          {category => <div class="badge badge-outline w-auto h-5 flex justify-center">
                            <span class='lg:text-base text-sm w-full'>{category}</span>
                          </div>}
                        </For>
                      </div>
                      <h2 class="card-title mt-3 font-extrabold text-start">
                        {news().title}
                      </h2>
                      <p class='text-start text-sm'>
                        {trimText(news().content, 150)}
                      </p>
                      <div class="card-actions justify-end">
                        <button
                          type='button'
                          onClick={() => navigate(`/artikel/${news().slug}`)}
                          class="btn bg-custom-yellow dark:text-neutral text-base h-[2vh] mt-[3vh] font-bold lg:text-base"
                        >
                          Selengkapnya
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </Index>
            </Show>
          </Suspense>
        </div>

        <Suspense>
          <Switch>
            <Match when={theme() == EThemeType.DARK && Array.isArray(news()) && news().length > 6}>
              <DarkPaginationNav
                currentPage={currentPage()}
                setCurrentPage={setCurrentPage}
                pageSize={pageSize}
                totalItems={news().length}
                limit={1}
                showStepOptions={true}
              />
            </Match>
            <Match when={theme() == EThemeType.LIGHT && Array.isArray(news()) && news().length > 6}>
              <LightPaginationNav
                currentPage={currentPage()}
                setCurrentPage={setCurrentPage}
                pageSize={pageSize}
                totalItems={news().length}
                limit={1}
                showStepOptions={true}
              />
            </Match>
          </Switch>
        </Suspense>
      </div>
    </LandingLayout>
  );
}