// react import
import { useState, useEffect, FC } from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
// traduzioni
import { useTranslation } from "react-i18next";
// componenti
import Hero from "../components/hooks/Hero/Hero";
import Footer from "../components/hooks/Footer/Footer";
import PreFooter from "../components/hooks/preFooter/PreFooter";
import CardEventsMobile from "../components/hooks/CardEvents/CardEventsMobile";
import CardArticle from "../components/ui/CardArticle/CardArticle";

// style
import "../styles/home.scss";

//icons
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Typography } from "@mui/material";
import Header from "../components/hooks/Header/Header";
import { article, event } from "../utils/type";

interface State {
  articlesArray: Array<article> | null;
}

const initialState = {
  articlesArray: null,
};

const Home: FC = () => {
  // inizializzo traduzioni
  const { t }: any = useTranslation();
  const [state, setState] = useState<State>(initialState);

  useEffect(() => {
    fetchDatas();
  }, []);

  const fetchDatas = (): void => {

  };

  const mapArticles = (item: article, key: number) => {
    return (
      <CardArticle
        key={key}
        minWidth="350px"
        title={item.title}
        description={item.content[0].paragraph}
        date={item.date}
        image={item.cover}
      />
    );
  };

  // map degli eventi
  const mapEvents = (event: event, key: number): JSX.Element => {
    return (
      <article key={key}>
        <CardEventsMobile
          title={event.title}
          description={event.description}
          image={event.cover}
          requirement={event.requirement}
          time={event.time}
          date={event.date}
          place={event.place}
          minWidth={"330px"}
        />
      </article>
    );
  };

  return (
    <>
      <Header isHome={true} />

      <HashLink to="#home" className="scrollToTopButton">
        <KeyboardArrowUpIcon sx={{ height: 40, width: 40 }} />
      </HashLink>

      <main id="home">
        <Hero
          type={"home"}
          title={MokupHome.hero.title}
          subtitle={MokupHome.hero.subtitle}
          image={MokupHome.hero.image}
        />

        <div className="sectionContainer">
          <section className="results">
            <Typography variant="h2">
              {MokupHome.results.resultTitle}
            </Typography>
            <figure>
              <img
                src={MokupHome.results.resultsImage}
                alt="illustrative image"
              />
            </figure>
            <div className="statics">
              <div>
                <Typography variant="h6">
                  {MokupHome.results.staticsResults.staticsOne} %
                </Typography>
              </div>
              <div>
                <Typography variant="h6">
                  {MokupHome.results.staticsResults.staticsOne} %
                </Typography>
              </div>
              <div>
                <Typography variant="h6">
                  {MokupHome.results.staticsResults.staticsOne} %
                </Typography>
              </div>
            </div>
            <div className="caption">
              <Typography variant="body1">
                {MokupHome.results.resultsCaption}
              </Typography>
            </div>
          </section>

          {/* sezione eventi */}
          <section className="events" id="events">
            <Typography variant="h2">{t("titles.eventsTitle")}</Typography>
            <div className="articleContainer">{EVENTI.map(mapEvents)}</div>
          </section>

          {/* sezione articoli blog */}
          <section className="articles" id="blog">
            <Typography variant="h2">{t("home.latestNews")}</Typography>
            <div className="articleContainer">
              {state.articlesArray.map(mapArticles)}
            </div>
          </section>

          {/* sezione rimani aggiornato sui social */}
          <section className="stayUpToDate">
            <Typography variant="h2">{t("home.stayUpToDate")}</Typography>
            <Typography variant="body1" className="description">
              {MokupHome.stayUpToDate.subTitle}
            </Typography>
            <div className="iframeContainer">
              <iframe src={MokupHome.stayUpToDate.link}></iframe>
            </div>
          </section>

          {/* sezione storia  */}
          <section className="history" id="history">
            <Typography variant="h2">{MokupHome.story.title}</Typography>
            <Typography variant="body1" className="description">
              {MokupHome.story.description}
            </Typography>
            <div className="imageContainer">
              <img src={MokupHome.story.image} alt="story image" />
            </div>
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
