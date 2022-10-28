import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useMediaQuery } from "react-responsive"
import axios from "axios"
import { Helmet } from "react-helmet"

import Footer from "../components/footer/Footer"
import Header from "../components/hooks/Header/Header"
import NavTab from "../components/ui/NavTab/NavTab"
import VerticalNavTab from "../components/ui/VerticalNavTab/VerticalNavTab"
import PreFooter from "../components/preFooter/PreFooter"
import DonationHistory from "../components/hooks/DonationsHistory/DonationHistory"
import PersonalEvents from "../components/hooks/PersonalEvents/PersonalEvents"
import MyInfoSection from "../components/MyInfoSection/MyInfoSection"

import "../styles/personalArea.scss"

function PersonalArea() {
  const { t }: any = useTranslation()
  const isDesktop = useMediaQuery({ minWidth: "991px" })

  const [state, setState] = useState<any>({
    isLoaded: false,
  })

  async function fetchDatas(): Promise<void> {
    let result = await axios.get("mockAPI/personalArea.json")
    let temp = result.data
    temp.isLoaded = true
    console.log(temp)
    setState({
      ...state,
      isLoaded: true,
      data: temp,
    })
  }

  useEffect(() => {
    fetchDatas()
  }, [])

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

      <main className="container">
        <section className="welcomeCard">
          <div className="icon-container"></div>
          <h3>{t("personalArea.welcome")}</h3>
        </section>
        {state.isLoaded &&
          (isDesktop ? (
            <VerticalNavTab
              pages={[
                t("personalArea.myInfo"),
                t("nav.events"),
                t("personalArea.donations"),
              ]}
              children={[
                <MyInfoSection datas={state.data.myInfo} />,
                <PersonalEvents events={state.data.events} />,
                <DonationHistory datas={state.data.donations} />,
              ]}
            />
          ) : (
            <NavTab
              pages={[
                t("personalArea.myInfo"),
                t("nav.events"),
                t("personalArea.donations"),
              ]}
              children={[
                <MyInfoSection datas={state.data.myInfo} />,
                <PersonalEvents events={state.data.events} />,
                <DonationHistory datas={state.data.donations} />,
              ]}
            />
          ))}
      </main>
      <PreFooter />
      <Footer />
    </>
  )
}

export default PersonalArea
