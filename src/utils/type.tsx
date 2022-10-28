export type article = {
  id: number;
  date: string; //dovrá essere date
  title: string;
  cover: string;
  categories: Array<string>;
  content: Array<content>;
};

export type content = {
  paragraph: string;
  media: {
    content: string;
    type: string;
  } | null;
};
