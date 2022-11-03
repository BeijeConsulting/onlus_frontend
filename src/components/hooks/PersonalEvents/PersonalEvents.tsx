import React, { FC, ReactElement, useEffect, useState } from "react";
import CardEventsMobile from "../CardEvents/CardEventsMobile";
import { useTranslation } from "react-i18next";

import "./personalEvents.scss";
import { Events } from "../../../utils/type";
import { Typography } from "@mui/material";

interface Props {
  events: Events[] | null;
}

interface LocalState {
  futureEvents: Events[] | null;
  pastEvents: Events[] | null;
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
    let future: Events[] = [];
    let past: Events[] = [];    

      props.events!.forEach((event: Events) => {
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

  function mapEvents(element: Events, key: number): ReactElement {
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
  }

  return (
    <article className="eventsSection">
      <section>
        <Typography variant="h3" sx={{ paddingBottom: "25px" }}>
          {t("personalArea.programmedEvents")}
        </Typography>
        <section className="cardsContainer">
          {state.futureEvents?.map(mapEvents)}
        </section>
        <Typography variant="h3" sx={{ paddingBottom: "25px" }}>
          {t("personalArea.pastEvents")}
        </Typography>
        <section className="cardsContainer">
          {state.pastEvents?.map(mapEvents)}
        </section>
      </section>
    </article>
  );
};

export default PersonalEvents;
