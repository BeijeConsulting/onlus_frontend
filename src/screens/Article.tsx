import React, { FC, Fragment, useEffect, useState } from "react";

//components
import Footer from "../components/hooks/Footer/Footer";
import Header from "../components/hooks/Header/Header";
import PreFooter from "../components/hooks/preFooter/PreFooter";
import CorrelatedArticleCard from "../components/ui/correlatedArticleCard/CorrelatedArticleCard";
import Hero from "../components/hooks/Hero/Hero";
import SkeletonCorrelated from "../components/ui/skeleton/skeletonCorrelated/SkeletonCorrelated";

//translation
import { useTranslation } from "react-i18next";

//axios
import axios, { AxiosResponse } from "axios";

//type
import { article, content } from "../utils/type";

//style
import "../styles/article.scss";

//helmet
import { Helmet } from "react-helmet";
import { Skeleton, Typography } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  getArticles,
  getSingleArticle,
} from "../services/api/articleApi";
import { HashLink } from "react-router-hash-link";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import SCREENS from "../route/router";

interface State {
  article: article | null;
  localArray: Array<article>;
  isLoaded: boolean;
}
const initialState = {
  article: null,
  localArray: [],
  isLoaded: false,
};

const Article: FC = () => {
  const [state, setState] = useState<State>(initialState);

  //id dell articolo corrispondente
  const navigate: any = useNavigate();
  let params = useParams();

  const { t }: any = useTranslation();

  useEffect(() => {
    fetchDatas();
  }, []);

  async function fetchDatas() {
    let singleArticleResult: any = await getSingleArticle(params.id);
    // let correlatedResult: any = await getArticlesFromCategory(
    //   singleArticleResult.data.data.attributes.article.categories[0]
    // );
    let correlatedResult: any = await getArticles();

    setState({
      ...state,
      article: singleArticleResult.data.data.attributes.article,
      localArray: correlatedResult.data.data,
      isLoaded: true,
    });
  }

  const mappingParagraph = (el: content, key: number): JSX.Element => {
    return (
      <div key={key} className="paragraph">
        <p className="paragraphText">{el.paragraph}</p>
        {/* {!!el.media && <img className="image" src={el.media} />} */}
        {!!el.media &&
          (el.media.type === "image" ? (
            <img className="media" src={el.media.content} />
          ) : (
            <video controls className="video">
              <source type="video/webm" src={el.media.content} />
            </video>
          ))}
      </div>
    );
  };

  const mappingCorrelated = (el: any, key: number): JSX.Element | undefined => {
    if (key < 3) {
      return (
        <div key={key}>
          <CorrelatedArticleCard
            cover={el.attributes.article.cover}
            title={el.attributes.article.title}
          />
        </div>
      );
    }
    return;
  };

  return (
    <>
      {state.isLoaded ? (
        <Helmet>
          <title>Onlus - {state.article?.title}</title>
          <meta name="description" content={`${t("metaTitles.about")} page`} />
        </Helmet>
      ) : (
        <Helmet>
          <title>Onlus - </title>
          <meta name="description" content={`${t("metaTitles.about")} page`} />
        </Helmet>
      )}
      <Header />
      <Link to={SCREENS.blog} className="arrowButton goBackButton">
        <KeyboardArrowLeftIcon sx={{ height: 40, width: 40 }} />
      </Link>
      {state.isLoaded ? (
        <main id="article">
          <Hero
            image={state.article!.cover}
            title={state.article!.title}
            type="article"
          />
          <section className="sectionContainer">
            <Typography variant="body1">{state.article!.date}</Typography>
            <article>
              <section>{state.article!.content.map(mappingParagraph)}</section>
              <Typography variant="h3">{t("home.relatedArticles")}</Typography>
              <section className="correlatedArticles">
                {state.localArray.map(mappingCorrelated)}
              </section>
            </article>
          </section>
        </main>
      ) : (
        <main id="article">
          <Skeleton variant="rectangular" animation="wave">
            <Hero type="about" />
          </Skeleton>

          <section className="sectionContainer">
            <Typography variant="body1">
              <Skeleton variant="text" animation="wave" width={150} />
            </Typography>
            <article>
              <section>
                <Skeleton variant="text" animation="wave" />
                <Skeleton variant="text" animation="wave" />
                <Skeleton variant="text" animation="wave" />
                <Skeleton
                  variant="rectangular"
                  animation="wave"
                  height={"500px"}
                />
                <Skeleton variant="text" animation="wave" />
                <Skeleton variant="text" animation="wave" />
              </section>
              <Typography variant="h3">{t("home.relatedArticles")}</Typography>
              <section className="correlatedArticles">
                <SkeletonCorrelated />
                <SkeletonCorrelated />
                <SkeletonCorrelated />
              </section>
            </article>
          </section>
        </main>
      )}
      <PreFooter />
      <Footer />
    </>
  );
};

export default Article;
