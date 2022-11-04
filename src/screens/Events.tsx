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

// mediaquery
import { useMediaQuery } from "react-responsive";

// stile
import "../styles/events.scss";

// definisco typo evento
type Event = {
  title: string;
  image: string;
  description: string;
  requirement: string;
  date: string;
  time: string;
  place: string;
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
  const [isReady, setIsReady] = useState<boolean>(false);
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    axios.get("mockAPI/events.json").then((response) => {
      let tempEvents: Event[] = [];
      response.data.events!.forEach((event: Event) => {
        var dateTokens = event.date.split("-");
        console.log(dateTokens);
        let tempDate = new Date(
          parseInt(dateTokens[0]),
          parseInt(dateTokens[1]) - 1,
          parseInt(dateTokens[2])
        );
        let eventDate = tempDate.getTime();
        let todaySec: number = new Date().getTime();
        if (eventDate < todaySec) {
          return <></>;
        } else {
          tempEvents!.push(event);
          console.log(event);
        }
      });
      setEvents(tempEvents);
      setIsReady(true);
    });
  }, []);
  // translate
  const { t }: any = useTranslation();
  // map
  const mapEvents = (event: Event, key: number): JSX.Element => {
    return (
      <article key={key}>
        <Default>
          <CardEvents
            isLoaded={isReady}
            title={event.title}
            description={event.description}
            image={event.image}
            requirement={event.requirement}
            time={event.time}
            date={event.date}
            place={event.place}
          />
        </Default>
        <Mobile>
          <CardEventsMobile
            isLoaded={isReady}
            title={event.title}
            description={event.description}
            image={event.image}
            requirement={event.requirement}
            time={event.time}
            date={event.date}
            place={event.place}
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
        {events.length > 0 && events.map(mapEvents)}
      </main>

      <PreFooter />
      <Footer />
    </>
  );
};

export default Events;
