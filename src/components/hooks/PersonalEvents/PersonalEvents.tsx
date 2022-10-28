import React, { ReactElement, useEffect, useState } from "react";
import CardEventsMobile from "../../cardEvents/CardEventsMobile";
import { useTranslation } from "react-i18next";

import "./personalEvents.scss";

interface event {
  title: string;
  image: string;
  description: string;
  requirement: string;
  date: string;
  time: string;
  place: string;
}

interface Props {
  events: event[];
}

/*title: string,
    image: string,
    description: string,
    requirement: string,
    date: string,
    time: string,
    place: string*/

function PersonalEvents(props: Props) {
  const { t }: any = useTranslation();
  const [today, setToday] = useState<Date>(new Date());

  //   useEffect(() => {
  //     setToday(new Date());
  //   }, []);

  function mapCurrentEvents(element: event, key: number): any {
    let eventDate = Date.parse(element.date);
    let todaySec = today.getTime();
    if (eventDate > todaySec) {
      return (
        <div key={key} className="singleCardContainer">
          <CardEventsMobile
            title={element.title}
            image={element.image}
            requirement={element.requirement}
            description={element.description}
            date={element.date}
            time={element.time}
            place={element.place}
          />
        </div>
      );
    } else {
      return <></>;
    }
  }

  function mapPastEvents(element: event, key: number): ReactElement {
    let eventDate = Date.parse(element.date);
    let todaySec: number = today!.getTime();
    console.log("i valori da paragonare", eventDate, todaySec);
    if (eventDate < todaySec) {
      return (
        <div key={key} className="singleCardContainer">
          <CardEventsMobile
            title={element.title}
            image={element.image}
            requirement={element.requirement}
            description={element.description}
            date={element.date}
            time={element.time}
            place={element.place}
          />
        </div>
      );
    } else {
      return <></>;
    }
  }
  return (
    <article className="eventsSection">
      <section>
        <div className="txt">{t("personalArea.programmedEvents")}</div>
        <section className="cardsContainer">
          {props.events.map(mapCurrentEvents)}
        </section>
        <div className="txt">{t("personalArea.pastEvents")}</div>
        <section className="cardsContainer">
          {props.events.map(mapPastEvents)}
        </section>
      </section>
    </article>
  );
}

export default PersonalEvents;
