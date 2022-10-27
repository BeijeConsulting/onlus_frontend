import React, {useEffect, useState} from "react";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";
import axios from "axios";

import Footer from "../components/footer/Footer";
import Header from "../components/hooks/Header/Header";
import NavTab from "../components/ui/NavTab/NavTab";
import VerticalNavTab from "../components/ui/VerticalNavTab/VerticalNavTab";
import PreFooter from "../components/preFooter/PreFooter";
import DonationHistory from "../components/hooks/DonationsHistory/DonationHistory";

import "../styles/personalArea.scss";

function PersonalArea() {
  const { t }: any = useTranslation();
  const isDesktop = useMediaQuery({ minWidth: "991px" });

  const [state, setState] = useState<any>({

  })

  async function fetchDatas():Promise<void> {
    let result = await axios.get('mockAPI/personalArea.json')
    setState(result.data);
    console.log(result.data)
  }

  useEffect(() => {
    fetchDatas()
  }, [])

  return (
    <>
      <Header />
      <main>
        <section className="welcomeCard">
          <div className="icon-container">

          </div>
          <h3>{t("personalArea.welcome")}</h3>
        </section>
        {isDesktop ? (
          <VerticalNavTab
            pages={[
              t("personalArea.myInfo"),
              t("nav.events"),
              t("personalArea.donations"),
            ]}
            children={[<Header />, <Header />, <DonationHistory datas={state.donations} />]}
          />
        ) : (
          <NavTab
            pages={[
              t("personalArea.myInfo"),
              t("nav.events"),
              t("personalArea.donations"),
            ]}
            children={[<Header />, <Header />, <DonationHistory datas={state.donations} />]}
          />
        )}
        <PreFooter />
        <Footer />
      </main>
    </>
  );
}

export default PersonalArea;
