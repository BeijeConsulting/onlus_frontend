import { FC, useEffect, useState } from "react"

//i18n
import { useTranslation } from "react-i18next"

//mui
import { Typography } from "@mui/material"

// componenti
import Footer from "../components/hooks/Footer/Footer"
import PreFooter from "../components/hooks/preFooter/PreFooter"
import CardEvents from "../components/hooks/CardEvents/CardEvents"
import CardEventsMobile from "../components/hooks/CardEvents/CardEventsMobile"
import Header from "../components/hooks/Header/Header"
import SkeletonCardDesktop from "../components/ui/skeleton/SkeletonCardDesktop/SkeletonCardDesktop"
import SkeletonCard from "../components/ui/skeleton/skeletonCard/SkeletonCard"
import HelmetComponent from "../components/ui/HelmetComponent/HelmetComponent"

// mediaquery
import useResponsive from "../utils/useResponsive"

// stile
import "../styles/events.scss"

//api
import { getEvents } from "../services/api/eventApi"
// convertDate
import { convertDate } from "../utils/convertDate"

//type
import { events } from "../utils/type"

interface State {
  isLoaded: boolean
  events: Array<events>
}

const initialState = {
  isLoaded: false,
  events: [],
}

const Events: FC = () => {
  const [state, setState] = useState<State>(initialState)
  const { t }: any = useTranslation()
  let [Mobile, Default] = useResponsive()

  useEffect(() => {
    fetchDatas()
  }, [])

  const fetchDatas = async (): Promise<void> => {
    let result: any = await getEvents()
    console.log(result);
    
    setState({
      ...state,
      isLoaded: true,
      events: result.data,
    })
  }

  // map
  const mapEvents = (event: events, key: number): JSX.Element => {
    return (
      <article key={key}>
        <Default>
          <CardEvents
            title={event.title}
            description={event.description}
            image={event.cover}
            requirement={event.requirements}
            date={convertDate(event.eventDate,t("dateFormat"))}
            place={event.place}
          />
        </Default>
        <Mobile>
          <CardEventsMobile
            title={event.title}
            description={event.description}
            image={event.cover}
            requirement={event.requirements}
            date={convertDate(event.eventDate,t("dateFormat"))}
            place={event.place}
            opaque={false}
          />
        </Mobile>
      </article>
    )
  }

  return (
    <>
      <HelmetComponent metatitleOn={true} title="events" />

      <Header />

      <main id={"events"} className="sectionContainer">
        <Typography variant="h1">{t("titles.eventsTitle")}</Typography>
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
  )
}

export default Events
