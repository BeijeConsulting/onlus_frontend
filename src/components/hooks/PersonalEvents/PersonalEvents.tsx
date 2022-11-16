import { FC, ReactElement, useEffect, useState } from "react";

//components
import CardEventsMobile from "../CardEvents/CardEventsMobile";

//i18n
import { useTranslation } from "react-i18next";

//style
import "./personalEvents.scss";

//type
import { events } from "../../../utils/type";

//mui
import { Typography } from "@mui/material";
// import date
import { convertDate } from "../../../utils/convertDate";

interface Props {
  events: events[] | null;
}

interface State {
  futureEvents: events[] | null;
  pastEvents: events[] | null;
}

const initialState = {
  futureEvents: null,
  pastEvents: null,
};

const PersonalEvents: FC<Props> = (props) => {
  const { t }: any = useTranslation();
  const [today, setToday] = useState<Date>(new Date());
  const [state, setState] = useState<State>(initialState);

  useEffect(() => {
    splitEvents();
  }, []);

  function splitEvents(): void {
    let future: events[] = [];
    let past: events[] = [];

    props.events!.forEach((event: events) => {
      var dateTokens = event.eventDate.split("-");
      console.log(dateTokens);
      let tempDate = new Date(
        parseInt(dateTokens[0]),
        parseInt(dateTokens[1]) - 1,
        parseInt(dateTokens[2])
      );
      let eventDate: number = tempDate.getTime();
      let todaySec: number = today!.getTime();
      if (eventDate < todaySec) {
        past.push(event);
      } else {
        future.push(event);
      }
    });

    setState({
      ...state,
      futureEvents: future,
      pastEvents: past,
    });
  }

  const handle = (): void => {};

  const mapEvents =
    (past: boolean) =>
    (element: events, key: number): ReactElement => {
      return (
        <div key={key} className="singleCardContainer">
          <CardEventsMobile
            title={element.title}
            image={element.cover}
            requirement={element.requirements}
            description={element.description}
            date={convertDate(element.eventDate, t("dateFormat"))}
            place={element.place}
            opaque={past}
            attendants={element.attendants}
            callbackBook={handle}
            callbackCancel={handle}
          />
        </div>
      );
    };

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
