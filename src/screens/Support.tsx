import React, { useEffect, useState, ReactElement } from "react";

//axios
import axios from "axios";
import { useTranslation } from "react-i18next";

//helmet
import { Helmet } from "react-helmet";

//components
import PreFooter from "../components/hooks/preFooter/PreFooter";
import Footer from "../components/hooks/Footer/Footer";
import Hero from "../components/hooks/Hero/Hero";

//styles
import "../styles/support.scss";

//type
import { content, hero } from "../utils/type";
import { Typography, Skeleton } from "@mui/material";
import Header from "../components/hooks/Header/Header";
import JoinUs from "../components/hooks/joinUsBbox/JoinUsBox";

type data={
  hero: hero;
  title: string;
  content: Array<content>;
}
interface State {
  data: data,
  isLoaded: boolean|null
}

function Support() {
  const [state, setState] = useState<State>();
  const { t }: any = useTranslation();

  useEffect(() => {
    getData();
  }, []);

  async function getData(): Promise<void> {
    let result = await axios.get("mockAPI/support.jso");
    setState({
      data:result.data,
      isLoaded:true
    });
  }

  const mapping = (item: content, key: number) => {
    console.log("item è", item);
    console.log(`../assets/images/${item.media}`);
    return (
      <section className="content-support-container" key={key}>
        <Typography variant="body1">{item.paragraph}</Typography>
        <div className="media-container">
          <img
            className="content-support"
            src={require(`../assets/images/${item.media}`)}
            alt="hero-img"
          />
        </div>
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
          
          { state?.isLoaded ? 
            (
              <>
                <Typography variant="h1">{state?.data?.title}</Typography>
                {state?.data?.content.map(mapping)}
              </>
            ) : (
              <>
                <Typography variant="h1"><Skeleton variant="text" animation="wave" width={300}/></Typography>
                <section className="content-support-container">
                  <Typography variant="body1">
                    <Skeleton variant="text" animation="wave"/>
                    <Skeleton variant="text" animation="wave"/>
                    <Skeleton variant="text" animation="wave"/>
                    <Skeleton variant="text" animation="wave"/>
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
            )
          }
        </div>
         {
          state?.isLoaded ? 
            <Hero type="home" title={state?.data?.hero.text} image={"pandaImg.jpg"} />
          :
            <Skeleton variant="rectangular" animation="wave">
              <Hero type="about" />
            </Skeleton>
         }
      </main>
      <PreFooter />
      <Footer />
    </>
  );
}

export default Support;
