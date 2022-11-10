import { useEffect, useState } from "react";

//i18n
import { useTranslation } from "react-i18next";

//fetch
import { getSupportData } from "../services/api/supportAPI";

//helmet
import { Helmet } from "react-helmet";

//components
import PreFooter from "../components/hooks/preFooter/PreFooter";
import Footer from "../components/hooks/Footer/Footer";
import Hero from "../components/hooks/Hero/Hero";
import Header from "../components/hooks/Header/Header";
import JoinUs from "../components/hooks/joinUsBbox/JoinUsBox";

//styles
import "../styles/support.scss";

//type
import { content, support } from "../utils/type";

//mui
import { Typography, Skeleton } from "@mui/material";

interface State {
  data: support;
  isLoaded: boolean | null;
}

function Support() {
  const [state, setState] = useState<State>();
  const { t }: any = useTranslation();

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData(): Promise<void> {
    let result: any = await getSupportData();
    console.log("Support result",result.data);
    setState({
      data: result.data,
      isLoaded: true,
    });
  }

  const mapping = (item: content, key: number) => {
    return (
      <section
        className={
          !!item.mediaContent
            ? "content-about-container"
            : "content-about-container-only-text"
        }
        key={key}
      >
        {/* <Typography variant="body1">{item.paragraph}</Typography> */}
        {!!item.mediaContent && (
          <div className="media-container">
            {item.mediaType === "image" ? (
              <img
                className="content-support"
                src={item.mediaContent}
                alt="hero-img"
              />
            ) : (
              <video controls className="content-support">
                <source type="video/mp4" src={item.mediaContent} />
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
        <title>Onlus - {t("metaTitles.support")}</title>
        <meta name="description" content={`${t("metaTitles.support")} page`} />
      </Helmet>
      <Header />
      <main id="support">
        <JoinUs type="donate" />
        <div className="sectionContainer">
          {state?.isLoaded ? (
            <>
              <Typography variant="h1">{state?.data?.title.title}</Typography>
              {state?.data?.content.map(mapping)}
            </>
          ) : (
            <>
              <Typography variant="h1">
                <Skeleton variant="text" animation="wave" width={300} />
              </Typography>
              <section className="content-support-container">
                <Typography variant="body1">
                  <Skeleton variant="text" animation="wave" />
                  <Skeleton variant="text" animation="wave" />
                  <Skeleton variant="text" animation="wave" />
                  <Skeleton variant="text" animation="wave" />
                </Typography>
                <div className="media-container">
                  <Skeleton
                    variant="rectangular"
                    className="content-support"
                    animation="wave"
                  />
                </div>
              </section>
            </>
          )}
        </div>
        {state?.isLoaded ? (
          <Hero
            type="home"
            title={state?.data?.hero.text}
            image={state?.data?.hero.image}
          />
        ) : (
          <Skeleton variant="rectangular" animation="wave">
            <Hero type="about" />
          </Skeleton>
        )}
      </main>
      <PreFooter />
      <Footer />
    </>
  );
}

export default Support;
