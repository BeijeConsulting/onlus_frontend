import { useState, useEffect, FC } from "react";
import { useTranslation } from "react-i18next";

//axios
import { getAbout } from "../services/api/aboutAPI";

//Components
import Footer from "../components/hooks/Footer/Footer";
import Header from "../components/hooks/Header/Header";
import Hero from "../components/hooks/Hero/Hero";
import JoinUs from "../components/hooks/joinUsBbox/JoinUsBox";
import PreFooter from "../components/hooks/preFooter/PreFooter";
import HelmetComponent from "../components/ui/HelmetComponent/HelmetComponent";

//type
import { content } from "../utils/type";

//Styles
import "../styles/about.scss";

//mui
import { Typography, Skeleton } from "@mui/material";

interface State {
  imageHero: string;
  titleHero: string;
  titleScreen: string;
  pageIsLoaded: boolean;
  content: Array<content>;
}

const initialState: State = {
  imageHero: "",
  titleHero: "",
  titleScreen: "",
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
    let about: boolean = false;
    let result: any = await getAbout();
    if (!!result.data.hero && !!result.data.content && !!result.data.title) about = true;
    setState({
      pageIsLoaded: about,
      imageHero: result.data.hero.mediaContent,
      titleHero: result.data.hero.text,
      content: result.data.content,
      titleScreen: result.data.title.title,
    });
  }

  const mappingContent = (item: content, key: number) => {
    return (
      <section
        className={
          !!item.mediaContent
            ? "content-about-container"
            : "content-about-container-only-text"
        }
        key={key}
      >
        <Typography variant="body1">{item.paragraph}</Typography>
        {!!item.mediaContent && (
          <div className="media-container">
            {" "}
            <img
              className="content-about"
              src={item.mediaContent}
              alt="hero-img"
            />
          </div>
        )}
      </section>
    );
  };

  return (
    <>
      <HelmetComponent metatitleOn={true} title="about" />

      <Header />
      {state.pageIsLoaded ? (
        <main id="about">
          <Hero
            type={"about"}
            title={state.titleHero}
            image={state.imageHero}
          />
          <section className="sectionContainer">
            <Typography variant="h1">{state.titleScreen}</Typography>
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

      <JoinUs supportBox={true} />

      <PreFooter />
      <Footer />
    </>
  );
};

export default About;
