import React, { FC, ReactElement, useEffect, useState } from "react";
import CardEventsMobile from "../CardEvents/CardEventsMobile";
import { useTranslation } from "react-i18next";

import "./personalEvents.scss";
import { Events } from "../../../utils/type";

interface Props {
  events: Array<Events>;
}

/*title: string,
    image: string,
    description: string,
    requirement: string,
    date: string,
    time: string,
    place: string*/

const PersonalEvents: FC<Props> = (props) => {
  const { t }: any = useTranslation();
  const [today, setToday] = useState<Date>(new Date());

  //   useEffect(() => {
  //     setToday(new Date());
  //   }, []);

  function mapEvents(element: Events, key: number): ReactElement {
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
          {props.events.map(mapEvents)}
        </section>
        <div className="txt">{t("personalArea.pastEvents")}</div>
        <section className="cardsContainer">
          {props.events.map(mapEvents)}
        </section>
      </section>
    </article>
  );
};

export default PersonalEvents;
