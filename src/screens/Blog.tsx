import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Typography } from "@mui/material";

import Footer from "../components/hooks/Footer/Footer";
import Header from "../components/hooks/Header/Header";
import InputBox from "../components/hooks/inputBox/InputBox";
import SelectBox from "../components/hooks/inputBox/SelectBox";
import PreFooter from "../components/hooks/preFooter/PreFooter";

import { Helmet } from "react-helmet";

//utils
import { articles, categories } from "../utils/data";
import { article, category } from "../utils/type";

//style
import "../styles/blog.scss";
import CardArticle from "../components/ui/CardArticle/CardArticle";
import { useMediaQuery } from "react-responsive";

interface State {
  categories: Array<category>;
  articles: Array<article>;
}

const initialState = {
  categories: [],
  articles: articles,
};

//React responsive const
const Default = ({ children }: any) => {
  const isNotMobile = useMediaQuery({ minWidth: 992 });
  return isNotMobile ? children : null;
};
const Mobile = ({ children }: any) => {
  const isMobile = useMediaQuery({ maxWidth: 991 });
  return isMobile ? children : null;
};

let localArticles: Array<article> = articles;

const Blog: FC = () => {
  const [state, setState] = useState<State>(initialState);
  const { t }: any = useTranslation();

  useEffect(() => {
    createCategories();
  }, []);

  const createCategories = (): void => {
    let localCategories: Array<category> = [];
    categories.forEach((e) => {
      let singleCategory: category = {
        label: e.name,
        value: e.name,
      };
      localCategories.push(singleCategory);
    });
    console.log(localCategories);
    setState({
      ...state,
      categories: localCategories,
    });
  };

  const mapping = (el: article, key: number): JSX.Element => {
    return (
      <div key={key}>
        <Mobile>
          <CardArticle
            date={el.date}
            image={el.cover}
            title={el.title}
            description={el.content[0].paragraph}
            minWidth="250px"
          />
        </Mobile>
        <Default>
          <CardArticle
            date={el.date}
            image={el.cover}
            title={el.title}
            description={el.content[0].paragraph}
            minWidth="300px"
          />
        </Default>
      </div>
    );
  };

  const search = (e: React.ChangeEvent<HTMLInputElement>): void => {
    let textInputValue: string = e.target.value;
    let filteredArticles: Array<article> = localArticles.filter((obj) => {
      return obj.title.toLowerCase().includes(textInputValue.toLowerCase());
    });
    console.log(filteredArticles);
    setState({
      ...state,
      articles: filteredArticles,
    });
  };

  const handleCategory = (): void => {
    //chiamata api
  };

  return (
    <>
      <Helmet>
        <title>Onlus - {t("metaTitles.blog")}</title>
        <meta name="description" content={`${t("metaTitles.blog")} page`} />
      </Helmet>
      <Header />
      <main id="blog" className="sectionContainer">
        <Typography variant="h1">{t("titles.blogTitle")}</Typography>
        <section className="searchContainer">
          <InputBox label={t("search")} type="text" callbackChange={search} />
          <SelectBox
            label={t("selectCategory")}
            items={state.categories}
            callbackChange={handleCategory}
          />
        </section>
        <section className="cardsContainer">
          {state.articles.map(mapping)}
        </section>
      </main>
      <PreFooter />
      <Footer />
    </>
  );
};

export default Blog;
