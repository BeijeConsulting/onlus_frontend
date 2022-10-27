import React from "react";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";

import Footer from "../components/footer/Footer";
import Header from "../components/hooks/Header/Header";
import NavTab from "../components/ui/NavTab/NavTab";
import VerticalNavTab from "../components/ui/VerticalNavTab/VerticalNavTab";
import PreFooter from "../components/preFooter/PreFooter";

import "../styles/personalArea.scss";

function PersonalArea() {
  const { t }: any = useTranslation();
  const isDesktop = useMediaQuery({ minWidth: "991px" });

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
            children={[<Header />, <Header />, <Header />]}
          />
        ) : (
          <NavTab
            pages={[
              t("personalArea.myInfo"),
              t("nav.events"),
              t("personalArea.donations"),
            ]}
            children={[<Header />, <Header />, <Header />]}
          />
        )}
        <PreFooter />
        <Footer />
      </main>
    </>
  );
}

export default PersonalArea;
