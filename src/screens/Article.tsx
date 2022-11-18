import { FC, useEffect, useState } from "react"

// redux
import { useSelector } from "react-redux"

//components
import Footer from "../components/hooks/Footer/Footer"
import Header from "../components/hooks/Header/Header"
import PreFooter from "../components/hooks/preFooter/PreFooter"
import CorrelatedArticleCard from "../components/ui/correlatedArticleCard/CorrelatedArticleCard"
import Hero from "../components/hooks/Hero/Hero"
import SkeletonCorrelated from "../components/ui/skeleton/skeletonCorrelated/SkeletonCorrelated"

//translation
import { useTranslation } from "react-i18next"

//type
import { article, category, contentArticle, color } from "../utils/type"

//style
import "../styles/article.scss"

//mui
import { Skeleton, Typography } from "@mui/material"
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft"

//navigation
import { Link, useParams, useLocation, useNavigate } from "react-router-dom"
import SCREENS from "../route/router"

//api
import {
  getArticlesFromCategory,
  getSingleArticle,
} from "../services/api/articleApi"
import HelmetComponent from "../components/ui/HelmetComponent/HelmetComponent"

import { hexToRGB } from "../utils/hexToRGB"

interface State {
  article: article | null
  localArray: Array<article>
  isLoaded: boolean
  categories: category[]
}
const initialState = {
  article: null,
  localArray: [],
  isLoaded: false,
  categories: [],
}

const Article: FC = () => {
  const [state, setState] = useState<State>(initialState)
  const location = useLocation()

  //id dell articolo corrispondente
  let params = useParams()
  const navigate: Function = useNavigate()

  const { t }: any = useTranslation()

  const PALETTE: Array<color> = useSelector(
    (state: any) => state.generalDuck.palette
  )

  useEffect(() => {
    fetchDatas()
  }, [])

  async function fetchDatas() {
    let singleArticleResult: any = await getSingleArticle(params.id)
    let correlatedResult: any = await getArticlesFromCategory(
      location.state.cat_id
    )

    setState({
      ...state,
      article: singleArticleResult.data,
      localArray: correlatedResult.data,
      isLoaded: true,
    })
  }

  const goToArticle = (id: number, cat_id: number) => (): void => {
    navigate(SCREENS.article + `/${id}`, { state: { cat_id: cat_id } })
  }

  const mappingParagraph = (el: contentArticle, key: number): JSX.Element => {
    return (
      <div key={key} className="paragraph">
        <p className="paragraphText">{el.paragraph}</p>
        <img className="media" src={el.media[0].content} alt="article-pic" />
      </div>
    )
  }

  const mappingCorrelated = (
    el: article,
    key: number
  ): JSX.Element | undefined => {
    if (key < 3 && el.id !== Number(params.id)) {
      return (
        <div key={key} onClick={goToArticle(el.id, el.category[0]?.id)}>
          <CorrelatedArticleCard cover={el.coverContent} title={el.title} />
        </div>
      )
    }
    return
  }

  const mappingCategories = (el: any, key: number): JSX.Element => {
    return (
      <Typography key={key} variant="h5" className="hero-category">
        {el.name}
      </Typography>
    )
  }

  return (
    <>
      {state.isLoaded ? (
        <HelmetComponent metatitleOn={false} title={state.article?.title} />
      ) : (
        <HelmetComponent metatitleOn={false} title="" />
      )}

      <Header />

      <Link
        style={{
          background: hexToRGB(PALETTE[2].textColor, 0.6),
          color: PALETTE[0].textColor,
        }}
        to={SCREENS.blog}
        className="arrowButton goBackButton"
      >
        <KeyboardArrowLeftIcon sx={{ height: 40, width: 40 }} />
      </Link>
      {state.isLoaded ? (
        <main id="article">
          <Hero
            image={state.article!.coverContent}
            title={state.article!.title}
            category={state.article!.category.map(mappingCategories)}
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
  )
}

export default Article
