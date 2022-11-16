import { FC, useEffect, useState } from "react";

//i18n
import { useTranslation } from "react-i18next";

//mui
import { Typography } from "@mui/material";

// componenti
import Footer from "../components/hooks/Footer/Footer";
import PreFooter from "../components/hooks/preFooter/PreFooter";
import CardEvents from "../components/hooks/CardEvents/CardEvents";
import CardEventsMobile from "../components/hooks/CardEvents/CardEventsMobile";
import Header from "../components/hooks/Header/Header";
import SkeletonCardDesktop from "../components/ui/skeleton/SkeletonCardDesktop/SkeletonCardDesktop";
import SkeletonCard from "../components/ui/skeleton/skeletonCard/SkeletonCard";
import HelmetComponent from "../components/ui/HelmetComponent/HelmetComponent";

// mediaquery
import useResponsive from "../utils/useResponsive";

// stile
import "../styles/events.scss";

//api
import {
  bookEventApi,
  deleteAttendantApi,
  getEvents,
} from "../services/api/eventApi";
// convertDate
import { convertDate } from "../utils/convertDate";

//type
import { events } from "../utils/type";
import GenericModal from "../components/hooks/GenericModal/GenericModal";
import CustomButton from "../components/ui/buttons/CustomButton/CustomButton";

interface State {
  isLoaded: boolean;
  events: Array<events>;
  modal: {
    isOpen: boolean;
    message: string;
  };
}

const initialState = {
  isLoaded: false,
  events: [],
  modal: {
    isOpen: false,
    message: "",
  },
};

const Events: FC = () => {
  const [state, setState] = useState<State>(initialState);
  const { t }: any = useTranslation();
  let [Mobile, Default] = useResponsive();

  useEffect(() => {
    fetchDatas();
  }, []);

  const fetchDatas = async (): Promise<void> => {
    let result: any = await getEvents();
    console.log(result);

    setState({
      ...state,
      isLoaded: true,
      events: result.data,
    });
  };

  const openModal = (): void => {
    setState({
      ...state,
      modal: {
        isOpen: !state.modal.isOpen,
        message: "",
      },
    });
  };

  const bookEvent = (id: number) => async (): Promise<void> => {
    let response: any = await bookEventApi(id);
    let open: boolean = false;
    let message: string = "";
    switch (response.status) {
      case 200:
        open = true;
        message = t("events.bookingSuccess");
        break;
      default:
        open = true;
        message = t("events.bookingError");
        break;
    }
    let result: any = await getEvents();
    console.log(result);
    setState({
      ...state,
      events: result.data,
      modal: {
        isOpen: open,
        message: message,
      },
    });
  };

  const cancelBook = (id: number) => async (): Promise<void> => {
    let response: any = await deleteAttendantApi(id);
    console.log(response);
    let open: boolean = false;
    let message: string = "";
    switch (response.status) {
      case 200:
        open = true;
        message = t("events.cancelSuccess");
        break;
      default:
        open = true;
        message = t("events.bookingError");
        break;
    }
    let result: any = await getEvents();
    console.log(result);
    setState({
      ...state,
      events: result.data,
      modal: {
        isOpen: open,
        message: message,
      },
    });
  };

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
            date={convertDate(event.eventDate, t("dateFormat"))}
            place={event.place}
            attendants={event.attendants}
            callbackBook={bookEvent(event.id)}
            callbackCancel={cancelBook(event.id)}
          />
        </Default>
        <Mobile>
          <CardEventsMobile
            title={event.title}
            description={event.description}
            image={event.cover}
            requirement={event.requirements}
            date={convertDate(event.eventDate, t("dateFormat"))}
            place={event.place}
            opaque={false}
            callbackBook={bookEvent(event.id)}
            attendants={event.attendants}
            callbackCancel={cancelBook(event.id)}
          />
        </Mobile>
      </article>
    );
  };

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
        <GenericModal open={state.modal.isOpen} callback={openModal}>
          <div className="children-modal">
            <Typography variant="body1">{state.modal.message}</Typography>
            <CustomButton
              label={t("confirm")}
              isDisable={false}
              size={"big"}
              colorType="secondary"
              callback={openModal}
            />
          </div>
        </GenericModal>
      </main>

      <PreFooter />
      <Footer />
    </>
  );
};

export default Events;
