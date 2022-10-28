import React, { FC } from "react"
import { useTranslation } from "react-i18next"
import { Helmet } from "react-helmet"
// componenti
import Footer from "../components/footer/Footer"
import PreFooter from "../components/preFooter/PreFooter"
import CardEvents from "../components/cardEvents/CardEvents"
import CardEventsMobile from "../components/cardEvents/CardEventsMobile"
import Header from "../components/hooks/Header/Header"
// mediaquery
import { useMediaQuery } from "react-responsive"
// stile
import "../styles/events.scss"

// definisco typo evento
type Event = {
  title: string
  image: string
  description: string
  requirement: string
  date: string
  time: string
  place: string
}

// mokup eventi
const EVENTI: Array<Event> = [
  {
    title: "Save the planet",
    image: "https://www.plasticfreeonlus.it/seo/plastic-free-raccolta-fb.jpeg",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animi vero culpa velit magni aliquam. Voluptas non ullam quo temporibus aut, cum, sequi eaque recusandae iusto praesentium cumque omnis laudantium, saepe labore! Odio dicta tenetur, enim laboriosam quidem libero vel ipsam animi vitae ducimus aperiam magni fuga, ex cumque repudiandae eaque?",
    requirement:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animi vero culpa velit magni aliquam. Voluptas non ullam quo temporibus aut, cum, sequi eaque recusandae iusto praesentium cumque omnis laudantium, saepe labore! Odio dicta tenetur, enim laboriosam quidem libero vel ipsam animi vitae ducimus aperiam magni fuga, ex cumque repudiandae eaque?",
    date: "4 ottobre 2022",
    time: "h 12.00",
    place: "Milano",
  },
  {
    title: "Un gancio in mezzo al cielo",
    image:
      "https://www.congiulia.com/wp-content/uploads/2022/03/IMG-20220329-WA0008.jpg",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animi vero culpa velit magni aliquam. Voluptas non ullam quo temporibus aut, cum, sequi eaque recusandae iusto praesentium cumque omnis laudantium, saepe labore! Odio dicta tenetur, enim laboriosam quidem libero vel ipsam animi vitae ducimus aperiam magni fuga, ex cumque repudiandae eaque?",
    requirement: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. ",
    date: "12 ottobre 2022",
    time: "h 12.00",
    place: "Milano",
  },
  {
    title: "United for the heart",
    image:
      "http://incodaalgruppo.gazzetta.it/files/2022/03/United-Onlus-evento-21-marzo-2022-Milano-500x506.jpeg",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animi vero culpa velit magni aliquam. Voluptas non ullam quo temporibus aut, cum, sequi eaque recusandae iusto praesentium cumque omnis laudantium, saepe labore! Odio dicta tenetur, enim laboriosam quidem libero vel ipsam animi vitae ducimus aperiam magni fuga, ex cumque repudiandae eaque?",
    requirement: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. ",
    date: "12 ottobre 2022",
    time: "h 12.00",
    place: "Milano",
  },
]

//React responsive const
const Default = ({ children }: any) => {
  const isNotMobile = useMediaQuery({ minWidth: 992 })
  return isNotMobile ? children : null
}
const Mobile = ({ children }: any) => {
  const isMobile = useMediaQuery({ maxWidth: 991 })
  return isMobile ? children : null
}

const Events: FC = () => {
  const { t }: any = useTranslation()

  const mapEvents = (event: Event, key: number): JSX.Element => {
    return (
      <article key={key}>
        <Default>
          <CardEvents
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
            title={event.title}
            description={event.description}
            image={event.image}
            requirement={event.requirement}
            time={event.time}
            date={event.date}
            place={event.place}
          />
        </Mobile>
      </article>
    )
  }

  return (
    <>
      <Helmet>
        <title>Onlus - {t("metaTitles.events")}</title>
        <meta name="description" content={`${t("metaTitles.events")} page`} />
      </Helmet>

      <Header />

      <main id="events" className="container">
        <h1 className="title">{t("titles.eventsTitle")}</h1>
        {EVENTI.map(mapEvents)}
      </main>

      <PreFooter />
      <Footer />
    </>
  )
}

export default Events
