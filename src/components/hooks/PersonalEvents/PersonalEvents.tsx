import React, { FC, ReactElement, useEffect, useState } from "react";
import CardEventsMobile from "../CardEvents/CardEventsMobile";
import { useTranslation } from "react-i18next";

import "./personalEvents.scss";
import { events } from "../../../utils/type";
import { Typography } from "@mui/material";

interface Props {
  events: events[] | null;
}

interface LocalState {
  futureEvents: events[] | null;
  pastEvents: events[] | null;
}

const PersonalEvents: FC<Props> = (props) => {
  const { t }: any = useTranslation();
  const [today, setToday] = useState<Date>(new Date());
  const [state, setState] = useState<LocalState>({
    futureEvents: null,
    pastEvents: null,
  });

     useEffect(() => {
       splitEvents()
     }, []);

     useEffect(() => {
      console.log(state)
    }, [state]);

  function splitEvents(): void {
    let future: events[] = [];
    let past: events[] = [];    

      props.events!.forEach((event: events) => {
        var dateTokens = event.date.split("-");
        console.log(dateTokens);
        let tempDate = new Date(
          parseInt(dateTokens[0]),
          parseInt(dateTokens[1]) - 1,
          parseInt(dateTokens[2])
        );
        let eventDate = tempDate.getTime();
        let todaySec: number = today!.getTime();
        if(eventDate < todaySec) {
          past.push(event);
          console.log(event)
        } else {
          future.push(event);
          console.log(event)
        }
      });

      setState({
        ...state,
        futureEvents: future,
        pastEvents: past,
      })

    }

  const mapEvents = (past:boolean) => (element: events, key: number): ReactElement => {
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
            opaque={past}
          />
        </div>
      );
  }

  return (
    <article className="eventsSection">
      <section>
        <Typography variant="h3" sx={{ paddingBottom: "25px" }}>
          {t("personalArea.programmedEvents")}
        </Typography>
        <section className="cardsContainer">
          {state.futureEvents?.map(mapEvents(false))}
        </section>
        <Typography variant="h3" sx={{ paddingBottom: "25px" }}>
          {t("personalArea.pastEvents")}
        </Typography>
        <section className="cardsContainer">
          {state.pastEvents?.map(mapEvents(true))}
        </section>
      </section>
    </article>
  );
};

export default PersonalEvents;
