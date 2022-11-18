import { useEffect, useState } from "react";

//fetch
import { getSupportData } from "../services/api/supportAPI";

//components
import PreFooter from "../components/hooks/preFooter/PreFooter";
import Footer from "../components/hooks/Footer/Footer";
import Hero from "../components/hooks/Hero/Hero";
import Header from "../components/hooks/Header/Header";
import JoinUs from "../components/hooks/joinUsBbox/JoinUsBox";
import HelmetComponent from "../components/ui/HelmetComponent/HelmetComponent";

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

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData(): Promise<void> {
    let result: any = await getSupportData();
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
        <Typography variant="body1">{item.paragraph}</Typography>
        {!!item.mediaContent && (
          <div className="media-container">
            <img
              className="content-support"
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
      <HelmetComponent metatitleOn={true} title="support" />

      <Header />

      <main id="support">
        <JoinUs supportBox={false} />
        <div className="sectionContainer">
          {state?.isLoaded && !!state.data ? (
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
        {state?.isLoaded && !!state.data.hero ? (
          <Hero
            type="home"
            title={state?.data?.hero.text}
            image={state?.data?.hero.mediaContent}
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
