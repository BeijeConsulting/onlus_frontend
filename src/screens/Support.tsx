import React, { useEffect, useState } from "react";

import { useTranslation } from "react-i18next";

//fetch
import { getSupportData } from "../services/api/supportAPI";

//helmet
import { Helmet } from "react-helmet";

//components
import PreFooter from "../components/hooks/preFooter/PreFooter";
import Footer from "../components/hooks/Footer/Footer";
import Hero from "../components/hooks/Hero/Hero";

//styles
import "../styles/support.scss";

//type
import { content, support } from "../utils/type";
import { Typography, Skeleton } from "@mui/material";
import Header from "../components/hooks/Header/Header";
import JoinUs from "../components/hooks/joinUsBbox/JoinUsBox";

interface State {
  data: support;
  isLoaded: boolean | null;
}

function Support() {
  const [state, setState] = useState<State>();
  const { t }: any = useTranslation();

  useEffect(() => {
    getData();
  }, []);

  async function getData(): Promise<void> {
    let result: any = await getSupportData();
    console.log(result.data.data.attributes.support);
    setState({
      data: result.data.data.attributes.support,
      isLoaded: true,
    });
  }

  const mapping = (item: content, key: number) => {
    console.log("item è", item);
    console.log(`${item?.media?.content}`);
    return (
      <section
        className={
          !!item.media
            ? "content-about-container"
            : "content-about-container-only-text"
        }
        key={key}
      >
        <Typography variant="body1">{item?.paragraph}</Typography>
        {!!item.media && (
          <div className="media-container">
            {item.media.type === "image" ? (
              <img
                className="content-support"
                src={item.media.content}
                alt="hero-img"
              />
            ) : (
              <video controls className="content-support">
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
        <title>Onlus - {t("metaTitles.support")}</title>
        <meta name="description" content={`${t("metaTitles.support")} page`} />
      </Helmet>
      <Header />
      <main id="support">
        <JoinUs type="donate" />
        <div className="sectionContainer">
          {state?.isLoaded ? (
            <>
              <Typography variant="h1">{state?.data?.title}</Typography>
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
            image={state.data.hero.img}
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
