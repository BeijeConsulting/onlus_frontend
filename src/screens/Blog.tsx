import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

//mui
import { Pagination, Typography } from "@mui/material";

//components
import Footer from "../components/hooks/Footer/Footer";
import Header from "../components/hooks/Header/Header";
import InputBox from "../components/hooks/inputBox/InputBox";
import SelectBox from "../components/hooks/inputBox/SelectBox";
import PreFooter from "../components/hooks/preFooter/PreFooter";
import CardArticle from "../components/ui/CardArticle/CardArticle";
import SkeletonCard from "../components/ui/skeleton/skeletonCard/SkeletonCard";
import HelmetComponent from "../components/ui/HelmetComponent/HelmetComponent";

//utils
import { article, category } from "../utils/type";

//style
import "../styles/blog.scss";

//navigation
import { useNavigate } from "react-router-dom";
import SCREENS from "../route/router";

//api
import {
  getArticles,
  getCategories,
  getArticlesFromCategory,
} from "../services/api/articleApi";

//responsive
import useResponsive from "../utils/useResponsive";

interface State {
  categories: Array<category>;
  articles: Array<Array<article>>;
  numberOfPages: number;
  isLoaded: boolean;
  page: number;
}

const initialState = {
  categories: [],
  numberOfPages: 1,
  articles: [],
  isLoaded: false,
  page: 1,
};

//localarray for search filter
let localArticles: Array<article> = [];

const Blog: FC = () => {
  const navigate: Function = useNavigate();
  const [state, setState] = useState<State>(initialState);
  const { t }: any = useTranslation();
  const ARTICLESXPAGES = 6;
  let [Mobile, Default] = useResponsive();

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log(state);
    console.log("localArticles:", localArticles);
  }, [state]);

  const fetchData = async () => {
    let articleResult: any = await getArticles();
    let categoryResult: any = await getCategories();

    console.log("ARTICLE RESULT ", articleResult.data);
    console.log("CATEGORY RESULT ", categoryResult.data);

    let localCategories: Array<any> = [];

    categoryResult.data.forEach((e: any) => {
      let singleCategory: category = {
        label: e.name,
        value: e.id,
      };
      localCategories.push(singleCategory);
    });

    localArticles = articleResult.data;

    let pageObj: any = generatePagination(localArticles);
    console.log(pageObj);

    setState({
      ...state,
      categories: localCategories,
      articles: pageObj.paginationArticle,
      numberOfPages: pageObj.pages,
      isLoaded: true,
    });
  };

  const generatePagination = (array: Array<article>): any => {
    let pages = Math.ceil(array.length / ARTICLESXPAGES);
    console.log("array nella pagination", array);

    let tempArticle: Array<article> = array;
    let paginationArticle: Array<Array<article>> = [];

    while (tempArticle.length > 0) {
      paginationArticle.push(tempArticle.splice(0, ARTICLESXPAGES));
    }
    let pageObj = {
      paginationArticle: paginationArticle,
      pages: pages,
    };
    return pageObj;
  };

  const goToArticle = (id: number, cat_id: number) => (): void => {
    navigate(SCREENS.article + `/${id}`, { state: { cat_id: cat_id } });
  };

  const mapping = (el: any, key: number): JSX.Element => {
    return (
      <div key={key} onClick={goToArticle(el.id, el.category[0]?.id)}>
        {el.status === "published" && (
          <>
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
          </>
        )}
      </div>
    );
  };

  const search = (e: React.ChangeEvent<HTMLInputElement>): void => {
    let textInputValue: string = e.target.value;
    console.log(localArticles);
    let filteredArticles: Array<article> = localArticles.filter((obj) => {
      return obj.title.toLowerCase().includes(textInputValue.toLowerCase());
    });
    console.log(filteredArticles);
    let pageObj: any = generatePagination(filteredArticles);
    setState({
      ...state,
      numberOfPages: pageObj.pages,
      page: 1,
      articles: pageObj.paginationArticle,
    });
  };

  const handleCategory = async (e: any): Promise<void> => {
    let pageObj: any;
    if (e === 0) {
      pageObj = generatePagination(localArticles);
    } else {
      let result: any = await getArticlesFromCategory(e);
      pageObj = generatePagination(result.data);
    }
    setState({
      ...state,
      numberOfPages: !!pageObj.pages ? pageObj.pages : 1,
      page: 1,
      articles: pageObj.paginationArticle,
    });
  };
  const changePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setState({
      ...state,
      page: value,
    });
  };

  return (
    <>
      <HelmetComponent metatitleOn={true} title="blog" />

      <Header />
      <main id="blog" className="sectionContainer">
        <Typography variant="h1">{t("titles.blogTitle")}</Typography>
        <section className="searchContainer input-box">
          <InputBox label={t("search")} type="text" callbackChange={search} />
          <SelectBox
            label={t("selectCategory")}
            items={[{ label: "Tutti", value: 0 }, ...state.categories]}
            callbackChange={handleCategory}
          />
        </section>
        <section className="cardsContainer">
          {state.isLoaded ? (
            state.articles[state.page - 1].map(mapping)
          ) : (
            <>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </>
          )}
        </section>
        <div className="pagination">
          <Pagination
            count={state.numberOfPages}
            page={state.page}
            onChange={changePage}
          />
        </div>
      </main>
      <PreFooter />
      <Footer />
    </>
  );
};

export default Blog;
