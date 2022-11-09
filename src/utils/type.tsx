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

export type events = {
  title: string;
  image: string;
  description: string;
  requirement: string;
  date: string;
  time: string;
  place: string;
};

export type personalData = {
  info: personalInfo;
  donations: donationData;
  events: Array<events>;
} | null;

export type donation = {
  id: string;
  date: string;
  amount: number;
};

export type donationData = {
  totalAmount: number;
  history: donation[];
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
  phone: string;
  email: string;
  address: string;
  PIva: string;
  CF: string;
};

export type color = {
  name: string;
  bgColor: string;
  textColor: string;
};

export type joinUs = {
  title: string;
  subtitle: string;
  btnText1: string;
  btnText2: string;
  link: string;
};
