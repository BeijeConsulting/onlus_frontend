export type article = {
  id: number;
  name: string;
  surname: string;
  email: string;
  date: string; //dovrá essere date
  title: string;
  status: string;
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

export type category = {
  label: string;
  value: string;
};
