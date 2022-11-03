import { useState, useEffect, FC } from "react";
import { useTranslation } from "react-i18next";

//axios
import axios, { AxiosResponse } from "axios";

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
    let result: AxiosResponse = await axios.get("mockAPI/about.json");
    console.log(result.data.about.hero.img);
    setState({
      pageIsLoaded: true,
      imageHero: result.data.about.hero.img,
      titleHero: result.data.about.hero.text,
      content: result.data.about.content,
    });
  }

  const mappingContent = (item: content, key: number) => {
    return (
      <section className="content-about-container" key={key}>
        {state.pageIsLoaded ? (
          <Typography variant="body1">{item.paragraph}</Typography>
        ) : (
          <Typography variant="body1">
            <Skeleton variant="text" />
            <Skeleton variant="text" />
            <Skeleton variant="text" />
            <Skeleton variant="text" />
          </Typography>
        )}
        <div className="media-container">
          {!!item.media &&
            (item.media.type === "image" ? (
              <img
                className="content-about"
                src={item.media?.content}
                alt="hero-img"
              />
            ) : (
              <video controls className="content-about">
                <source type="video/mp4" src={item.media.content} />
              </video>
            ))}
        </div>
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

      <main id="about">
        <Hero type={"about"} title={state.titleHero} image={state.imageHero} />
        <section className="sectionContainer">
          <Typography variant="h1">{t("nav.about")}</Typography>
          {state.content.map(mappingContent)}
        </section>
      </main>
      <JoinUs type="support" />

      <PreFooter />
      <Footer />
    </>
  );
};

export default About;
