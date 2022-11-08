import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";

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
import { personalInfo, events, donationData } from "../utils/type";
import { Typography } from "@mui/material";
import { BiUser } from "react-icons/bi";

//fetch
import {getPersonalDatas} from '../services/api/personalAreaAPI'
import axios from 'axios'

interface State {
  isLoaded: boolean;
  data: personalInfo | null;
  eventsData: events[] | null;
  donationData: donationData | null;
}

const initialState = {
  isLoaded: false,
  data: null,
  eventsData: null,
  donationData: null,
};

const PersonalArea: FC = () => {
  const { t }: any = useTranslation();

  const [state, setState] = useState<State>(initialState);
  const isNotMobile = useMediaQuery({ minWidth: 992 });
  const isMobile = useMediaQuery({ maxWidth: 991 });

  const tryfetch = async () => {
    let result = await axios.post('http://52.58.94.27:8080/user/signup', {
      "disableDate": "string",
      "email": "string",
      "id": 0,
      "language": "string",
      "name": "string",
      "password": "string",
      "phone": "string",
      "publishedArticles": 0,
      "role": 0,
      "surname": "string"
    });
    console.log(result);
  }

  const Default = ({ children }: any) => {
    return isNotMobile ? children : null;
  };

  const Mobile = ({ children }: any) => {
    return isMobile ? children : null;
  };

  async function fetchDatas(): Promise<void> {
    let result:any = await getPersonalDatas();
    console.log(result.data.data.attributes.personalArea.Info);
    setState({
      ...state,
      isLoaded: true,
      data: result.data.data.attributes.personalArea.Info,
      eventsData: result.data.data.attributes.personalArea.events,
      donationData: result.data.data.attributes.personalArea.donations,
    });
  }

  useEffect(() => {
    fetchDatas();
    tryfetch();
  }, []);

  useEffect(() => {
    console.log(state);
  }, [state]);

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
          <div className="icon-container">
            <BiUser size={isMobile ? 30 : 50} />
          </div>
          <Typography variant="h1">{t("personalArea.welcome")}</Typography>
        </section>
        {state.isLoaded ? (
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
        ) : (
          <div className="loading-button">
            <img src={require("../assets/images/loader.jpg")} alt="loading" />
          </div>
        )}
      </main>
      <PreFooter />
      <Footer />
    </>
  );
};

export default PersonalArea;
