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

// style
import "../styles/home.scss"

// redux
import { useSelector } from "react-redux"

//mui
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"
import { Typography, Skeleton } from "@mui/material"

//type
import { events, article, social } from "../utils/type"

//api
import { getHome } from "../services/api/homeApi"
import { getEvents } from "../services/api/eventApi"
import { getArticles } from "../services/api/articleApi"
// convertDate
import { convertDate } from "../utils/convertDate"

//stati
interface State {
  articlesArray: Array<article> | null
  homeData: any
  eventArray: Array<events> | null
  socialFrame: social | null
  isLoaded: boolean
}

// inizializzazione
const initialState = {
  articlesArray: null,
  eventArray: null,
  homeData: null,
  socialFrame: null,
  isLoaded: false,
}

const Home: FC = () => {
  const { t }: any = useTranslation()
  const [state, setState] = useState<State>(initialState)

  const SOCIAL: Array<social> = useSelector(
    (state: any) => state.generalDuck.social
  )

  useEffect(() => {
    fetchDatas()
  }, [])

  const fetchDatas = async (): Promise<void> => {
    let homeResponse: any = await getHome()
    let eventResponse: any = await getEvents()
    let articleResponse: any = await getArticles()
    let socialHome: Array<social> = SOCIAL.filter((social: social) => {
      return social.homepageOn == true
    })

    console.log(homeResponse.data);
    
  
    setState({
      ...state,
      homeData: homeResponse.data,
      eventArray: eventResponse.data,
      articlesArray: articleResponse.data,
      socialFrame: socialHome[0],
      isLoaded: true,
    })
  }

  const mapArticles = (item: article, key: number):JSX.Element | undefined  => {
    if(key<5){
      return (
        <CardArticle
          key={key}
          minWidth="350px"
          title={item.title}
          description={item.content[0].paragraph}
          date={item.date}
          image={item.cover}
        />
      )
    }
    return;
  }

  // map degli eventi
  const mapEvents = (event: events, key: number): JSX.Element | undefined  => {
    if(key<5){
      return (
        <article key={key}>
          <CardEventsMobile
            title={event.title}
            description={event.description}
            image={event.cover}
            requirement={event.requirements}
            date={convertDate(event.eventDate,t("dateFormat"))}
            place={event.place}
            minWidth={"330px"}
            opaque={false}
          />
        </article>
      )
    }
    return;
  }

  return (
    <>
      <HelmetComponent metatitleOn={true} title="home" />

      <Header isHome={true} />

      <HashLink to="#home" className="arrowButton scrollToTopButton" smooth>
        <KeyboardArrowUpIcon sx={{ height: 40, width: 40 }} />
      </HashLink>

      <main id="home">
        {state.isLoaded ? (
          <Hero
            type={"home"}
            title={state.homeData.hero.text}
            subtitle={state.homeData.hero.subtitle}
            image={state.homeData.hero.image}
          />
        ) : (
          <Skeleton variant="rectangular" animation="wave">
            <Hero type={"about"} />
          </Skeleton>
        )}
        <div className="sectionContainer">
          <section className="results">
            {state.isLoaded ? (
              <>
                <Typography variant="h2">
                  {state.homeData.result.title}
                </Typography>

                <figure>
                  <img src={state.homeData.result.image} alt="illustrative" />
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
            {state.isLoaded ? (
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
              {state.isLoaded ? (
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

          {/* sezione rimani aggiornato sui social */}
          <section className="stayUpToDate">
            <Typography variant="h2">{t("home.stayUpToDate")}</Typography>
            {state.isLoaded ? (
              <>
                <div className="iframeContainer">
                  <iframe src={state.socialFrame!.link}></iframe>
                </div>
              </>
            ) : (
              <SkeletonSquare />
            )}
          </section>

          {/* sezione storia  */}
          <section className="history" id="history">
            <Typography variant="h2">{t("home.history")}</Typography>
            {state.isLoaded ? (
              <>
                <Typography variant="body1" className="description">
                  {state.homeData.story.text}
                </Typography>
                <div className="imageContainer">
                  <img src={state.homeData.story.image} alt="story image" />
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
