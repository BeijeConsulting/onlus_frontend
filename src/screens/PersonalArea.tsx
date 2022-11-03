import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";

//axios
import axios, { AxiosResponse } from "axios";

//helmet
import { Helmet } from "react-helmet";

//components
import Footer from "../components/hooks/Footer/Footer";
import Header from "../components/hooks/Header/Header";
import NavTab from "../components/ui/NavTab/NavTab";
import VerticalNavTab from "../components/ui/VerticalNavTab/VerticalNavTab";
import PreFooter from "../components/hooks/preFooter/PreFooter";
import DonationHistory from "../components/hooks/DonationsHistory/DonationHistory";
import PersonalEvents from "../components/hooks/PersonalEvents/PersonalEvents";
import MyInfoSection from "../components/hooks/MyInfoSection/MyInfoSection";

//style
import "../styles/personalArea.scss";

//type
import { personalInfo, Events, donation } from "../utils/type";
import { Typography } from "@mui/material";

interface State {
  isLoaded: boolean;
  data: personalInfo | null;
  eventsData: Events[] | null;
  donationData: donation[] | null;
}

const initialState = {
  isLoaded: false,
  data: null,
  eventsData: null,
  donationData: null
};

const PersonalArea: FC = () => {
  const { t }: any = useTranslation();

  const [state, setState] = useState<State>(initialState);

  const Default = ({ children }: any) => {
    const isNotMobile = useMediaQuery({ minWidth: 992 });
    return isNotMobile ? children : null;
  };
  const Mobile = ({ children }: any) => {
    const isMobile = useMediaQuery({ maxWidth: 991 });
    return isMobile ? children : null;
  };

  async function fetchDatas(): Promise<void> {
    let result: AxiosResponse = await axios.get("mockAPI/personalArea.json");
    let result2: AxiosResponse = await axios.get("mockAPI/events.json");
    let result3: AxiosResponse = await axios.get("mockAPI/donations.json");

    console.log(result.data, result2.data, result3.data);
    setState({
      ...state,
      isLoaded: true,
      data: result.data,
      eventsData: result2.data.events,
      donationData: result3.data.donations,
    });
  }

  useEffect(() => {
    fetchDatas();
  }, []);
  useEffect(() => {
    console.log(state)
  }, [state])

  return (
    <>
      <Helmet>
        <title>Onlus - {t("metaTitles.personalArea")}</title>
        <meta
          name="description"
          content={`${t("metaTitles.personalArea")} page`}
        />
      </Helmet>

      <Header />

      <main id="personalArea" className="sectionContainer">
        <section className="welcomeCard">
          <div className="icon-container"></div>
          <Typography variant="h1">{t("personalArea.welcome")}</Typography>
        </section>
        {state.isLoaded && (
          <>
            <Default>
              <VerticalNavTab
                pages={[
                  t("personalArea.myInfo"),
                  t("nav.events"),
                  t("personalArea.donations"),
                ]}
                children={[
                  <MyInfoSection datas={state!.data} />,
                  <PersonalEvents events={state!.eventsData} />,
                  <DonationHistory datas={state!.donationData} />,
                ]}
              />
            </Default>
            <Mobile>
              <NavTab
                pages={[
                  t("personalArea.myInfo"),
                  t("nav.events"),
                  t("personalArea.donations"),
                ]}
                children={[
                  <MyInfoSection datas={state!.data} />,
                  <PersonalEvents events={state!.eventsData} />,
                  <DonationHistory datas={state!.donationData} />,
                ]}
              />
            </Mobile>
          </>
        )}
      </main>
      <PreFooter />
      <Footer />
    </>
  );
};

export default PersonalArea;
