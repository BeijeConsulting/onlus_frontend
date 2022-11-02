import React, { ReactElement, useEffect, useState, FC } from "react"
import CardEventsMobile from "../CardEvents/CardEventsMobile"
import { useTranslation } from "react-i18next"

import "./personalEvents.scss"

type event = {
  title: string
  image: string
  description: string
  requirement: string
  date: string
  time: string
  place: string
}

interface Props {
  events: event[]
}

/*title: string,
    image: string,
    description: string,
    requirement: string,
    date: string,
    time: string,
    place: string*/

const PersonalEvents: FC<Props> = (props): ReactElement => {
  const { t }: any = useTranslation()
  const [today, setToday] = useState<Date>(new Date())

  //   useEffect(() => {
  //     setToday(new Date());
  //   }, []);

  function mapEvents(element: event, key: number): ReactElement {
    let eventDate = Date.parse(element.date)
    let todaySec: number = today!.getTime()
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
      )
    } else {
      return <></>
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
  )
}

export default PersonalEvents
