// react import
import { useState, useEffect, FC } from "react";
import { HashLink } from "react-router-hash-link";
// traduzioni
import { useTranslation } from "react-i18next";
// componenti
import Hero from "../components/hooks/Hero/Hero";
import Footer from "../components/hooks/Footer/Footer";
import PreFooter from "../components/hooks/preFooter/PreFooter";
import CardEventsMobile from "../components/hooks/CardEvents/CardEventsMobile";
import CardArticle from "../components/ui/CardArticle/CardArticle";
import SkeletonCard from "../components/ui/skeleton/skeletonCard/SkeletonCard";
import SkeletonSquare from "../components/ui/skeleton/SkeletonSquare/SkeletonSquare";
// style
import "../styles/home.scss";
// redux
import { useSelector } from "react-redux";

//icons
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Typography, Skeleton } from "@mui/material";
import Header from "../components/hooks/Header/Header";
import { events, article, social } from "../utils/type";
import { getHome } from "../services/api/homeApi";
import { getEvents } from "../services/api/eventApi";
import { getArticles } from "../services/api/articleApi";

// stati
interface State {
  articlesArray: Array<article> | null;
  homeData: any;
  eventArray: Array<events> | null;
  socialFrame: social | null;
  isLoaded: boolean;
}
// inizializzazione
const initialState = {
  articlesArray: null,
  eventArray: null,
  homeData: null,
  socialFrame: null,
  isLoaded: false,
};

const Home: FC = () => {
  // inizializzo traduzioni
  const { t }: any = useTranslation();
  const [state, setState] = useState<State>(initialState);

  const SOCIAL: Array<any> = useSelector(
    (state: any) => state.generalDuck.social
  );

  useEffect(() => {
    fetchDatas();
  }, []);

  const fetchDatas = async (): Promise<void> => {
    let homeResponse: any = await getHome();
    let eventResponse: any = await getEvents();
    let articleResponse: any = await getArticles();
    let socialHome: Array<social> = SOCIAL.filter((social: social) => {
      return social.homepageOn == true;
    });

    console.log(socialHome);

    setState({
      ...state,
      homeData: homeResponse.data.data.attributes.home,
      eventArray: eventResponse.data.data,
      articlesArray: articleResponse.data.data,
      socialFrame: socialHome[0],
      isLoaded: true,
    });
  };

  const mapArticles = (item: any, key: number) => {
    return (
      <CardArticle
        key={key}
        minWidth="350px"
        title={item.attributes.article.title}
        description={item.attributes.article.content[0].paragraph}
        date={item.attributes.article.date}
        image={item.attributes.article.cover}
      />
    );
  };

  // map degli eventi
  const mapEvents = (event: any, key: number): JSX.Element => {
    return (
      <article key={key}>
        <CardEventsMobile
          title={event.attributes.events.title}
          description={event.attributes.events.description}
          image={event.attributes.events.cover}
          requirement={event.attributes.events.requirement}
          time={event.attributes.events.time}
          date={event.attributes.events.date}
          place={event.attributes.events.place}
          minWidth={"330px"}
          opaque={false}
          // isLoaded={false} //da camabiare
        />
      </article>
    );
  };

  return (
    <>
      <Header isHome={true} />

      <HashLink to="#home" className="arrowButton scrollToTopButton">
        <KeyboardArrowUpIcon sx={{ height: 40, width: 40 }} />
      </HashLink>

      <main id="home">
        {state.isLoaded ? (
          <Hero
            type={"home"}
            title={state.homeData.hero.title}
            subtitle={state.homeData.hero.title}
            image={state.homeData.hero.img}
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
                  {state.homeData.results.title}
                </Typography>

                <figure>
                  <img
                    src={state.homeData.results.img}
                    alt="illustrative"
                  />
                </figure>
                <div className="caption">
                  <Typography variant="body1">
                    {state.homeData.results.text}
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
            <Typography variant="h2">Storia...</Typography>
            {state.isLoaded ? (
              <>
                <Typography variant="body1" className="description">
                  {state.homeData.story.text}
                </Typography>
                <div className="imageContainer">
                  <img src={state.homeData.story.img} alt="story image" />
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
  );
};

export default Home;
