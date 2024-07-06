interface INewsCategory {
  name: string;
  slug: string;
}

interface INews {
  slug: string;
  title: string;
  logo?: string;
  content: string;
  category: INewsCategory[];
}

export {
  INews,
  INewsCategory
};
