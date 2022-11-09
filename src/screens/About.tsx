import { useState, useEffect, FC } from "react";
import { useTranslation } from "react-i18next";

//axios
import { getAbout } from "../services/api/aboutAPI";

//helmet
import { Helmet } from "react-helmet";

//Components
import Footer from "../components/hooks/Footer/Footer";
import Header from "../components/hooks/Header/Header";
import Hero from "../components/hooks/Hero/Hero";
import JoinUs from "../components/hooks/joinUsBbox/JoinUsBox";
import PreFooter from "../components/hooks/preFooter/PreFooter";

//type
import { content } from "../utils/type";

//Styles
import "../styles/about.scss";
import { Typography, Skeleton } from "@mui/material";

interface State {
  imageHero: string;
  titleHero: string;
  pageIsLoaded: boolean;
  content: Array<content>;
}

const initialState: State = {
  imageHero: "",
  titleHero: "",
  pageIsLoaded: false,
  content: [],
};

const About: FC = () => {
  const { t }: any = useTranslation();
  const [state, setState] = useState<State>(initialState);

  useEffect(() => {
    fetchDatas();
  }, []);

  async function fetchDatas() {
    let result: any = await getAbout();
    console.log(result.data.data.attributes.about.hero.img);
    setState({
      pageIsLoaded: true,
      imageHero: result.data.data.attributes.about.hero.img,
      titleHero: result.data.data.attributes.about.hero.text,
      content: result.data.data.attributes.about.content,
    });
  }

  const mappingContent = (item: content, key: number) => {
    return (
      <section
        className={
          !!item.media
            ? "content-about-container"
            : "content-about-container-only-text"
        }
        key={key}
      >
        <Typography variant="body1">{item.paragraph}</Typography>
        {!!item.media && (
          <div className="media-container">
            {item.media.type === "image" ? (
              <img
                className="content-about"
                src={item.media.content}
                alt="hero-img"
              />
            ) : (
              <video controls className="content-about">
                <source type="video/mp4" src={item.media.content} />
              </video>
            )}
          </div>
        )}
      </section>
    );
  };

  return (
    <>
      <Helmet>
        <title>Onlus - {t("metaTitles.about")}</title>
        <meta name="description" content={`${t("metaTitles.about")} page`} />
      </Helmet>

      <Header />
      {state.pageIsLoaded ? (
        <main id="about">
          <Hero
            type={"about"}
            title={state.titleHero}
            image={state.imageHero}
          />
          <section className="sectionContainer">
            <Typography variant="h1">{t("nav.about")}</Typography>
            {state.content.map(mappingContent)}
          </section>
        </main>
      ) : (
        //Skeleton
        <main id="about">
          <Skeleton variant="rectangular" animation="wave">
            <Hero type={"about"} />
          </Skeleton>
          <section className="sectionContainer">
            <Typography variant="h1">{t("nav.about")}</Typography>

            <section className="content-about-container">
              <Typography variant="body1">
                <Skeleton variant="text" animation="wave" />
                <Skeleton variant="text" animation="wave" />
                <Skeleton variant="text" animation="wave" />
                <Skeleton variant="text" animation="wave" />
              </Typography>
              <div className="media-container">
                <Skeleton
                  variant="rectangular"
                  height="300px"
                  animation="wave"
                />
              </div>
            </section>
          </section>
        </main>
      )}

      <JoinUs type="support" />

      <PreFooter />
      <Footer />
    </>
  );
};

export default About;
