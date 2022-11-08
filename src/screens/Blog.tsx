import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Typography } from "@mui/material";

import Footer from "../components/hooks/Footer/Footer";
import Header from "../components/hooks/Header/Header";
import InputBox from "../components/hooks/inputBox/InputBox";
import SelectBox from "../components/hooks/inputBox/SelectBox";
import PreFooter from "../components/hooks/preFooter/PreFooter";
import CustomPagination from "../components/ui/CustomPagination/CustomPagination";

import { Helmet } from "react-helmet";

//utils
import { article, category } from "../utils/type";

//style
import "../styles/blog.scss";
import CardArticle from "../components/ui/CardArticle/CardArticle";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import SCREENS from "../route/router";
import axios, { AxiosResponse } from "axios";
import SkeletonCard from "../components/ui/skeleton/skeletonCard/SkeletonCard";
import { getArticles, getCategories } from "../services/api/articleApi";
import { articles } from "../utils/data";

interface State {
  categories: Array<category>;
  articles: Array<article>;
  numberOfPages: number;
  isLoaded: boolean;
}

const initialState = {
  categories: [],
  numberOfPages: 1,
  articles: [],
  isLoaded: false,
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

let localArticles: Array<any> = [];

const Blog: FC = () => {
  const navigate: Function = useNavigate();
  const [state, setState] = useState<State>(initialState);
  const { t }: any = useTranslation();
  const ARTICLESXPAGES = 6;

  useEffect(() => {
    pagesCalc();
    fetchData();
  }, []);

  const fetchData = async () => {
    let articleResult: any = await getArticles();
    let categoryResult: any = await getCategories();

    let localCategories: Array<any> = [];
    localArticles = articleResult.data.data;

    categoryResult.data.data.forEach((e: any) => {
      let singleCategory: category = {
        label: e.attributes.categories.name,
        value: e.attributes.categories.name,
      };
      localCategories.push(singleCategory);
    });

    setState({
      ...state,
      categories: localCategories,
      articles: articleResult.data.data,
      isLoaded: true,
    });
  };

  const goToArticle = (id: number) => (): void => {
    navigate(SCREENS.article + `/${id}`);
  };

  const mapping = (el: any, key: number): JSX.Element => {
    return (
      <div key={key} onClick={goToArticle(el.id)}>
        <Mobile>
          <CardArticle
            date={el.attributes.article.date}
            image={el.attributes.article.cover}
            title={el.attributes.article.title}
            description={el.attributes.article.content[0].paragraph}
            minWidth="250px"
          />
        </Mobile>
        <Default>
          <CardArticle
            date={el.attributes.article.date}
            image={el.attributes.article.cover}
            title={el.attributes.article.title}
            description={el.attributes.article.content[0].paragraph}
            minWidth="300px"
          />
        </Default>
      </div>
    );
  };

  const search = (e: React.ChangeEvent<HTMLInputElement>): void => {
    let textInputValue: string = e.target.value;
    let filteredArticles: Array<any> = localArticles.filter((obj) => {
      return obj.attributes.article.title
        .toLowerCase()
        .includes(textInputValue.toLowerCase());
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

  const pagesCalc = (): void => {
    let pages = 1;
    pages = Math.ceil(state.articles.length / ARTICLESXPAGES);
    setState({
      ...state,
      numberOfPages: pages,
    });
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
        <section className="searchContainer input-box">
          <InputBox label={t("search")} type="text" callbackChange={search} />
          <SelectBox
            label={t("selectCategory")}
            items={state.categories}
            callbackChange={handleCategory}
          />
        </section>
        <section className="cardsContainer">
          {state.isLoaded ? (
            state.articles.map(mapping)
          ) : (
            <>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </>
          )}
        </section>

        <CustomPagination
          callbackChange={handleCategory}
          numberOfPages={state.numberOfPages}
        />
      </main>
      <PreFooter />
      <Footer />
    </>
  );
};

export default Blog;
