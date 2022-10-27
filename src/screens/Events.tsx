import React, { FC } from "react"
// componenti
import Footer from "../components/footer/Footer"
import PreFooter from "../components/preFooter/PreFooter"
import CardEvents from "../components/cardEvents/CardEvents"
import Header from "../components/hooks/Header/Header"
// stile
import '../styles/events.scss'

// definisco typo evento
type Event = {
  title: string,
  image: string,
  description: string,
  requirement: string,
  date: string,
  time: string,
  place: string
}

// mokup eventi
const EVENTI: Array<Event> = [
  {
    title: 'Evento1',
    image: 'https://www.plasticfreeonlus.it/seo/plastic-free-raccolta-fb.jpeg',
    description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animi vero culpa velit magni aliquam. Voluptas non ullam quo temporibus aut, cum, sequi eaque recusandae iusto praesentium cumque omnis laudantium, saepe labore! Odio dicta tenetur, enim laboriosam quidem libero vel ipsam animi vitae ducimus aperiam magni fuga, ex cumque repudiandae eaque?',
    requirement: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animi vero culpa velit magni aliquam. Voluptas non ullam quo temporibus aut, cum, sequi eaque recusandae iusto praesentium cumque omnis laudantium, saepe labore! Odio dicta tenetur, enim laboriosam quidem libero vel ipsam animi vitae ducimus aperiam magni fuga, ex cumque repudiandae eaque?',
    date: '4 ottobre 2022',
    time: 'h 12.00',
    place: 'Milano'
  },
  {
    title: 'Evento2',
    image: 'https://www.plasticfreeonlus.it/seo/plastic-free-raccolta-fb.jpeg',
    description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animi vero culpa velit magni aliquam. Voluptas non ullam quo temporibus aut, cum, sequi eaque recusandae iusto praesentium cumque omnis laudantium, saepe labore! Odio dicta tenetur, enim laboriosam quidem libero vel ipsam animi vitae ducimus aperiam magni fuga, ex cumque repudiandae eaque?',
    requirement: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animi vero culpa velit magni aliquam. Voluptas non ullam quo temporibus aut, cum, sequi eaque recusandae iusto praesentium cumque omnis laudantium, saepe labore! Odio dicta tenetur, enim laboriosam quidem libero vel ipsam animi vitae ducimus aperiam magni fuga, ex cumque repudiandae eaque?',
    date: '4 ottobre 2022',
    time: 'h 12.00',
    place: 'Milano'
  }
]

// titolo pagina eventi
const TITLEEVENTS: string = 'Prossimamente'

const Events: FC = () => {

  const mapEvents = (event: Event, key: number): JSX.Element => {
    return (
      <article key={key}>
        <CardEvents
          title={event.title}
          description={event.description}
          image={event.image}
          requirement={event.requirement}
          time={event.time}
          date={event.date}
          place={event.place}
        />
      </article>
    )
  }

  return (

    <div id="events">
      {/* header */}
      <Header/>
      {/* main */}
      <main className="container">
        <h1 className="title">
          {TITLEEVENTS}
        </h1>
        {EVENTI.map(mapEvents)}
      </main>
      {/* footer */}
      <PreFooter />
      <Footer />
    </div>

  )
}

export default Events
