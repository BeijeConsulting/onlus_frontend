// react
import { useState, useEffect, FC } from "react"

//navigation
import { HashLink } from "react-router-hash-link"

// traduzioni
import { useTranslation } from "react-i18next"

// componenti
import Hero from "../components/hooks/Hero/Hero"
import Footer from "../components/hooks/Footer/Footer"
import PreFooter from "../components/hooks/preFooter/PreFooter"
import CardEventsMobile from "../components/hooks/CardEvents/CardEventsMobile"
import CardArticle from "../components/ui/CardArticle/CardArticle"
import SkeletonCard from "../components/ui/skeleton/skeletonCard/SkeletonCard"
import SkeletonSquare from "../components/ui/skeleton/SkeletonSquare/SkeletonSquare"
import Header from "../components/hooks/Header/Header"
import HelmetComponent from "../components/ui/HelmetComponent/HelmetComponent"
import JoinUs from "../components/hooks/joinUsBbox/JoinUsBox"

// style
import "../styles/home.scss"

// redux
import { useSelector } from "react-redux"

//mui
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"
import { Typography, Skeleton } from "@mui/material"

//type
import { events, article, social, color } from "../utils/type"

//api
import { getHome } from "../services/api/homeApi"
import { getEvents } from "../services/api/eventApi"
import { getArticles } from "../services/api/articleApi"
// convertDate
import { convertDate } from "../utils/convertDate"
import { useNavigate } from "react-router-dom"
import SCREENS from "../route/router"

import { hexToRGB } from "../utils/hexToRGB"

//stati
interface State {
  articlesArray: Array<article> | null
  homeData: any
  eventArray: Array<events> | null
  socialFrame: social | null
  isLoaded: {
    homeLoaded: boolean
    eventLoaded: boolean
    articleLoaded: boolean
    socialLoaded: boolean
  }
}

// inizializzazione
const initialState = {
  articlesArray: null,
  eventArray: null,
  homeData: null,
  socialFrame: null,
  isLoaded: {
    homeLoaded: false,
    eventLoaded: false,
    articleLoaded: false,
    socialLoaded: false,
  },
}

const Home: FC = () => {
  const { t }: any = useTranslation()
  const [state, setState] = useState<State>(initialState)

  const navigate: Function = useNavigate()

  const SOCIAL: Array<social> = useSelector(
    (state: any) => state.generalDuck.social
  )

  const PALETTE: Array<color> = useSelector(
    (state: any) => state.generalDuck.palette
  )

  useEffect(() => {
    fetchDatas()
  }, [])

  const fetchDatas = async (): Promise<void> => {
    let home: boolean = false,
      event: boolean = false,
      article: boolean = false,
      social: boolean = false
    let homeResponse: any = await getHome()
    if (homeResponse.status === 200) home = true
    let eventResponse: any = await getEvents()
    if (eventResponse.status === 200) event = true
    let articleResponse: any = await getArticles()
    if (articleResponse.status === 200) article = true
    if (SOCIAL.length > 0) social = true

    let socialHome: Array<social> = SOCIAL.filter((social: social) => {
      return social.homepageOn == true
    })

    setState({
      ...state,
      homeData: homeResponse.data,
      eventArray: eventResponse.data,
      articlesArray: articleResponse.data,
      socialFrame: socialHome[0],
      isLoaded: {
        homeLoaded: home,
        eventLoaded: event,
        articleLoaded: article,
        socialLoaded: social,
      },
    })
  }

  const goToArticle = (id: number, cat_id: number) => (): void => {
    navigate(SCREENS.article + `/${id}`, { state: { cat_id: cat_id } })
  }

  const mapArticles = (item: article, key: number): JSX.Element | undefined => {
    if (key < 5) {
      return (
        <div key={key} onClick={goToArticle(item.id, item.category[0]?.id)}>
          <CardArticle
            minWidth="350px"
            title={item.title}
            description={item.content[0].paragraph}
            date={item.date}
            image={item.cover}
          />
        </div>
      )
    }
    return
  }

  // map degli eventi
  const mapEvents = (event: events, key: number): JSX.Element | undefined => {
    if (key < 5) {
      return (
        <article key={key}>
          <CardEventsMobile
            title={event.title}
            description={event.description}
            image={event.coverContent}
            requirement={event.requirements}
            date={convertDate(event.eventDate, t("dateFormat"))}
            place={event.place}
            minWidth={"330px"}
            opaque={false}
          />
        </article>
      )
    }
    return
  }

  return (
    <>
      <HelmetComponent metatitleOn={true} title="home" />

      <Header isHome={true} />

      <HashLink
        style={{
          background: hexToRGB(PALETTE[2].textColor, 0.6),
          color: PALETTE[0].textColor,
        }}
        to="#home"
        className="arrowButton scrollToTopButton"
        smooth
      >
        <KeyboardArrowUpIcon sx={{ height: 40, width: 40 }} />
      </HashLink>

      <main id="home">
        {state.isLoaded.homeLoaded ? (
          <Hero
            type={"home"}
            title={state.homeData.hero.text}
            subtitle={state.homeData.hero.subtitle}
            image={state.homeData.hero.mediaContent}
          />
        ) : (
          <Skeleton variant="rectangular" animation="wave">
            <Hero type={"about"} />
          </Skeleton>
        )}
        <div className="sectionContainer">
          <section className="results">
            {state.isLoaded.homeLoaded ? (
              <>
                <Typography variant="h2">
                  {state.homeData.result.title}
                </Typography>

                <figure>
                  <img
                    src={state.homeData.result.mediaContent}
                    alt="illustrative"
                  />
                </figure>
                <div className="caption">
                  <Typography variant="body1">
                    {state.homeData.result.text}
                  </Typography>
                </div>
              </>
            ) : (
              <SkeletonSquare direction="column-reverse" />
            )}
          </section>

          {/* sezione eventi */}
          <section className="events" id="events">
            <Typography variant="h2">{t("titles.eventsTitle")}</Typography>
            {state.isLoaded.eventLoaded ? (
              <div className="articleContainer">
                {state.eventArray!.map(mapEvents)}
              </div>
            ) : (
              <div className="articleContainer">
                <article>
                  <SkeletonCard />
                </article>
                <article>
                  <SkeletonCard />
                </article>
                <article>
                  <SkeletonCard />
                </article>
              </div>
            )}
          </section>

          {/* sezione articoli blog */}
          <section className="articles" id="blog">
            <Typography variant="h2">{t("home.latestNews")}</Typography>
            <div className="articleContainer">
              {state.isLoaded.articleLoaded ? (
                state.articlesArray!.map(mapArticles)
              ) : (
                <div className="articleContainer">
                  <article>
                    <SkeletonCard />
                  </article>
                  <article>
                    <SkeletonCard />
                  </article>
                  <article>
                    <SkeletonCard />
                  </article>
                  <article>
                    <SkeletonCard />
                  </article>
                  <article>
                    <SkeletonCard />
                  </article>
                </div>
              )}
            </div>
          </section>
        </div>
        {/* sezione join us box*/}
        <JoinUs supportBox={true} />
        <div className="sectionContainer">
          {/* sezione storia  */}
          <section className="history" id="history">
            <Typography variant="h2">{t("home.history")}</Typography>
            {state.isLoaded.homeLoaded ? (
              <>
                <Typography variant="body1" className="description">
                  {state.homeData.story.text}
                </Typography>
                <div className="imageContainer">
                  <img
                    src={state.homeData.story.mediaContent}
                    alt="story image"
                  />
                </div>
              </>
            ) : (
              <SkeletonSquare />
            )}
          </section>
        </div>
      </main>

      {/* footer e prefooter */}
      <PreFooter />
      <Footer />
    </>
  )
}

export default Home
