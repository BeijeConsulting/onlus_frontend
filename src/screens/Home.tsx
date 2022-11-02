// react import
import { useState, useEffect, FC } from "react";

// translation
import { useTranslation } from "react-i18next";

// components
import Hero from "../components/ui/Hero/Hero";
import Footer from "../components/ui/Footer/Footer";
import PreFooter from "../components/hooks/preFooter/PreFooter";
import CardEventsMobile from "../components/hooks/CardEvents/CardEventsMobile";
import CardArticle from "../components/ui/CardArticle/CardArticle";
import Header from "../components/ui/Header/Header";

// style
import "../styles/home.scss";

//icons
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

//type
import { article, Events } from "../utils/type";

//mockup article
import { articles } from "../utils/data";

// mokup home (il json reale sarà diverso)
const MokupHome = {
  hero: {
    title: "Salva i panda dai bambù",
    subtitle: "Loremfzdsoifgzdsoihgfzdsoigfdzsoifghzdsoigfhziofgz",
    image: "pandaImg.jpg",
  },
  results: {
    resultTitle: "lorem ipsum dei risultati",
    resultsImage: "https://cdn-icons-png.flaticon.com/512/16/16121.png?w=360",
    resultsCaption:
      " Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos architecto consequuntur ab quasi nostrum rem error numquam! Error laborum sit iusto fugit, doloribus doloremque quos repellendus minima. Architecto, sequi adipisci.",
    staticsResults: {
      staticsOne: 20,
      staticsTwo: 40,
      staticTrhee: 39,
    },
  },
  stayUpToDate: {
    subTitle: "Seguici su facebook",
    link: "https://www.wwf.it/",
  },
  story: {
    title: "Storia...",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos architecto consequuntur ab quasi nostrum rem error numquam! Error laborum sit iusto fugit, doloribus doloremque quos repellendus minima. Architecto, sequi adipisci.",
    image:
      "https://leganerd.com/wp-content/uploads/2016/10/pandas-live_64dff22c2fe56e9-999x562.jpg",
  },
};

// mokup eventi
const EVENTI: Array<Events> = [
  {
    title: "Save the planet",
    image: "https://www.plasticfreeonlus.it/seo/plastic-free-raccolta-fb.jpeg",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animi vero culpa velit magni aliquam. Voluptas non ullam quo temporibus aut, cum, sequi eaque recusandae iusto praesentium cumque omnis laudantium, saepe labore! Odio dicta tenetur, enim laboriosam quidem libero vel ipsam animi vitae ducimus aperiam magni fuga, ex cumque repudiandae eaque?",
    requirement:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animi vero culpa velit magni aliquam. Voluptas non ullam quo temporibus aut, cum, sequi eaque recusandae iusto praesentium cumque omnis laudantium, saepe labore! Odio dicta tenetur, enim laboriosam quidem libero vel ipsam animi vitae ducimus aperiam magni fuga, ex cumque repudiandae eaque?",
    date: "4 ottobre 2022",
    time: "h 12.00",
    place: "Milano",
  },
  {
    title: "Un gancio in cielo",
    image:
      "https://www.congiulia.com/wp-content/uploads/2022/03/IMG-20220329-WA0008.jpg",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animi vero culpa velit magni aliquam. Voluptas non ullam quo temporibus aut, cum, sequi eaque recusandae iusto praesentium cumque omnis laudantium, saepe labore! Odio dicta tenetur, enim laboriosam quidem libero vel ipsam animi vitae ducimus aperiam magni fuga, ex cumque repudiandae eaque?",
    requirement: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. ",
    date: "12 ottobre 2022",
    time: "h 12.00",
    place: "Milano",
  },
  {
    title: "United for the heart",
    image:
      "http://incodaalgruppo.gazzetta.it/files/2022/03/United-Onlus-evento-21-marzo-2022-Milano-500x506.jpeg",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animi vero culpa velit magni aliquam. Voluptas non ullam quo temporibus aut, cum, sequi eaque recusandae iusto praesentium cumque omnis laudantium, saepe labore! Odio dicta tenetur, enim laboriosam quidem libero vel ipsam animi vitae ducimus aperiam magni fuga, ex cumque repudiandae eaque?",
    requirement: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. ",
    date: "12 ottobre 2022",
    time: "h 12.00",
    place: "Milano",
  },
];

const Home: FC = () => {
  // inizializzo traduzioni
  const { t }: any = useTranslation();
  const [state, setState] = useState({ articlesArray: articles });

  useEffect(() => {
    getArticles();
  }, []);

  const getArticles = (): void => {
    setState({ articlesArray: articles });
  };

  const mapArticles = (item: article, key: number) => {
    return (
      <article key={key}>
        <CardArticle
          minWidth="350px"
          title={item.title}
          description={item.content[0].paragraph}
          date={item.date}
          image={item.cover}
        />
      </article>
    );
  };

  // map degli eventi
  const mapEvents = (event: Events, key: number): JSX.Element => {
    return (
      <article key={key}>
        <CardEventsMobile
          title={event.title}
          description={event.description}
          image={event.image}
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

      <a href="#home" className="scrollToTopButton">
        <KeyboardArrowUpIcon sx={{ height: 40, width: 40 }} />
      </a>

      <main id="home">
        <Hero
          type={"home"}
          title={MokupHome.hero.title}
          subtitle={MokupHome.hero.subtitle}
          image={MokupHome.hero.image}
        />

        <section className="sectionContainer">
          <section className="results">
            <h4 className="title">{MokupHome.results.resultTitle}</h4>
            <figure>
              <img
                src={MokupHome.results.resultsImage}
                alt="illustrative image"
              />
            </figure>
            <div className="statics">
              <div>
                <h6>{MokupHome.results.staticsResults.staticsOne} %</h6>
              </div>
              <div>
                <h6>{MokupHome.results.staticsResults.staticsOne} %</h6>
              </div>
              <div>
                <h6>{MokupHome.results.staticsResults.staticsOne} %</h6>
              </div>
            </div>
            <div className="caption">
              <p>{MokupHome.results.resultsCaption}</p>
            </div>
          </section>

          {/* sezione eventi */}
          <section className="events" id="events">
            <h4 className="title">{t("titles.eventsTitle")}</h4>
            <div className="articleContainer">{EVENTI.map(mapEvents)}</div>
          </section>

          {/* sezione articoli blog */}
          <section className="articles" id="blog">
            <h4 className="title">{t("home.latestNews")}</h4>
            <div className="articlesContainer">
              {state.articlesArray.map(mapArticles)}
            </div>
          </section>

          {/* sezione rimani aggiornato sui social */}
          <section className="stayUpToDate">
            <h4 className="title">{t("home.stayUpToDate")}</h4>
            <p className="subTitle">{MokupHome.stayUpToDate.subTitle}</p>
            <div className="iframeContainer">
              <iframe src={MokupHome.stayUpToDate.link}></iframe>
            </div>
          </section>

          {/* sezione storia  */}
          <section className="history" id="history">
            <h4 className="title">{MokupHome.story.title}</h4>
            <p className="description">{MokupHome.story.description}</p>
            <div className="imageContainer">
              <img src={MokupHome.story.image} alt="story image" />
            </div>
          </section>
        </section>
      </main>

      {/* footer e prefooter */}
      <PreFooter />
      <Footer />
    </>
  );
};

export default Home;
