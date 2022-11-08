import React, { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import axios from "axios";
import { Typography } from "@mui/material";

// componenti
import Footer from "../components/hooks/Footer/Footer";
import PreFooter from "../components/hooks/preFooter/PreFooter";
import CardEvents from "../components/hooks/CardEvents/CardEvents";
import CardEventsMobile from "../components/hooks/CardEvents/CardEventsMobile";
import Header from "../components/hooks/Header/Header";
import SkeletonCardDesktop from "../components/ui/skeleton/SkeletonCardDesktop/SkeletonCardDesktop";
import SkeletonCard from "../components/ui/skeleton/skeletonCard/SkeletonCard";

// mediaquery
import { useMediaQuery } from "react-responsive";

// stile
import "../styles/events.scss";
import { getEvents } from "../services/api/eventApi";

interface State {
  isLoaded: boolean;
  events: Array<any>;
}

const initialState = {
  isLoaded: false,
  events: [],
};

//React responsive const
const Default = ({ children }: any) => {
  const isNotMobile = useMediaQuery({ minWidth: 992 });
  return isNotMobile ? children : null;
};
const Mobile = ({ children }: any) => {
  const isMobile = useMediaQuery({ maxWidth: 991 });
  return isMobile ? children : null;
};

const Events: FC = () => {
  const [state, setState] = useState<State>(initialState);
  // translate
  const { t }: any = useTranslation();

  useEffect(() => {
    fetchDatas();
  }, []);

  //funzione traduzione data Simone
  // axios.get("mockAPI/events.jso").then((response) => {
  //   let tempEvents: Event[] = [];
  //   response.data.events!.forEach((event: Event) => {
  //     var dateTokens = event.date.split("-");
  //     console.log(dateTokens);
  //     let tempDate = new Date(
  //       parseInt(dateTokens[0]),
  //       parseInt(dateTokens[1]) - 1,
  //       parseInt(dateTokens[2])
  //     );
  //     let eventDate = tempDate.getTime();
  //     let todaySec: number = new Date().getTime();
  //     if (eventDate < todaySec) {
  //       return <></>;
  //     } else {
  //       tempEvents!.push(event);
  //       console.log(event);
  //     }
  //   });
  //   setEvents(tempEvents);
  //   setIsReady(true);
  // });

  const fetchDatas = async (): Promise<void> => {
    let result: any = await getEvents();
    setState({
      ...state,
      isLoaded: true,
      events: result.data.data,
    });
  };

  // map
  const mapEvents = (event: any, key: number): JSX.Element => {
    return (
      <article key={key}>
        <Default>
          <CardEvents
            title={event.attributes.events.title}
            description={event.attributes.events.description}
            image={event.attributes.events.cover}
            requirement={event.attributes.events.requirement}
            time={event.attributes.events.time}
            date={event.attributes.events.date}
            place={event.attributes.events.place}
          />
        </Default>
        <Mobile>
          <CardEventsMobile
            title={event.attributes.events.title}
            description={event.attributes.events.description}
            image={event.attributes.events.cover}
            requirement={event.attributes.events.requirement}
            time={event.attributes.events.time}
            date={event.attributes.events.date}
            place={event.attributes.events.place}
            opaque={false}
          />
        </Mobile>
      </article>
    );
  };

  return (
    <>
      <Helmet>
        <title>Onlus - {t("metaTitles.events")}</title>
        <meta name="description" content={`${t("metaTitles.events")} page`} />
      </Helmet>

      <Header />

      <main id={"events"} className="sectionContainer">
        <Typography variant="h1">{t("titles.eventsTitle")}</Typography>{" "}
        {state.isLoaded ? (
          state.events.map(mapEvents)
        ) : (
          <div>
            <Default>
              <article>
                <SkeletonCardDesktop />
              </article>
              <article>
                <SkeletonCardDesktop />
              </article>
            </Default>

            <Mobile>
              <article>
                <SkeletonCard />
              </article>
              <article>
                <SkeletonCard />
              </article>
            </Mobile>
          </div>
        )}
      </main>

      <PreFooter />
      <Footer />
    </>
  );
};

export default Events;
