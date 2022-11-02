import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";

//axios
import axios, { AxiosResponse } from "axios";

//helmet
import { Helmet } from "react-helmet";

//components
import Footer from "../components/ui/Footer/Footer";
import Header from "../components/ui/Header/Header";
import NavTab from "../components/ui/NavTab/NavTab";
import VerticalNavTab from "../components/ui/VerticalNavTab/VerticalNavTab";
import PreFooter from "../components/hooks/preFooter/PreFooter";
import DonationHistory from "../components/hooks/DonationsHistory/DonationHistory";
import PersonalEvents from "../components/hooks/PersonalEvents/PersonalEvents";
import MyInfoSection from "../components/hooks/MyInfoSection/MyInfoSection";

//style
import "../styles/personalArea.scss";

//type
import { personalData } from "../utils/type";

interface State {
  isLoaded: boolean;
  data: personalData;
}

const initialState = {
  isLoaded: false,
  data: null,
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
    console.log(result.data);
    setState({
      ...state,
      isLoaded: true,
      data: result.data,
    });
  }

  useEffect(() => {
    fetchDatas();
  }, []);

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
          <h1>{t("personalArea.welcome")}</h1>
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
                  <MyInfoSection datas={state.data!.myInfo} />,
                  <PersonalEvents events={state.data!.events} />,
                  <DonationHistory datas={state.data!.donations} />,
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
                  <MyInfoSection datas={state.data!.myInfo} />,
                  <PersonalEvents events={state.data!.events} />,
                  <DonationHistory datas={state.data!.donations} />,
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
