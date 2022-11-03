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

export type infoType = {
  info: {
    title: string;
    text: string;
  };
  qna: Array<faq>;
} | null;

export type faq = {
  question: string;
  answer: string;
};

export type Events = {
  title: string;
  image: string;
  description: string;
  requirement: string;
  date: string;
  time: string;
  place: string;
};

export type personalData = {
  myInfo: personalInfo;
  donations: Array<donation>;
  events: Array<Events>;
} | null;

export type donation = {
  id: string;
  date: string;
  amount: number;
};

export type personalInfo = {
  email: string;
  language: string;
  name: string;
  password: string;
  phoneNumber: string;
  surname: string;
};

export type language = {
  label: string;
  value: string;
};

export type hero = {
  img: string;
  text: string;
};
export type social = {
  name: string;
  icon: string;
  link: string;
  footerOn: boolean;
  homepageOn: boolean;
};

export type contact = {
  telephone: string;
  email: string;
  address: string;
  PIva: string;
  CF: string;
};
