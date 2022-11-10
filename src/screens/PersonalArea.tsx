import { FC, useEffect, useState } from "react"

//i18n
import { useTranslation } from "react-i18next"

//helmet
import { Helmet } from "react-helmet"

//components
import Footer from "../components/hooks/Footer/Footer"
import Header from "../components/hooks/Header/Header"
import NavTab from "../components/ui/NavTab/NavTab"
import VerticalNavTab from "../components/ui/VerticalNavTab/VerticalNavTab"
import PreFooter from "../components/hooks/preFooter/PreFooter"
import DonationHistory from "../components/hooks/DonationsHistory/DonationHistory"
import PersonalEvents from "../components/hooks/PersonalEvents/PersonalEvents"
import MyInfoSection from "../components/hooks/MyInfoSection/MyInfoSection"

//style
import "../styles/personalArea.scss"

//type
import { personalInfo, events, donationData } from "../utils/type"

//mui
import { Typography } from "@mui/material"

//icons
import { BiUser } from "react-icons/bi"

//fetch
import { getPersonalDatas } from "../services/api/personalAreaAPI"
import axios from "axios"

//reponsive
import useResponsive from "../utils/useResponsive"

//Router
import { useNavigate } from "react-router-dom"
import SCREENS from '../route/router'

//Redux
import { useSelector } from "react-redux";

interface State {
  isLoaded: boolean
  data: personalInfo | null
  eventsData: events[] | null
  donationData: donationData | null
}

const initialState = {
  isLoaded: false,
  data: null,
  eventsData: null,
  donationData: null,
}

const PersonalArea: FC = () => {
  const [state, setState] = useState<State>(initialState)

  const { t }: any = useTranslation()
  let [Mobile, Default] = useResponsive()

  const isLogged:boolean= useSelector((state:any)=>state.userDuck.isLoggedIn)
  const navigate:Function= useNavigate()

  const checkLog=():void=>{
    if(!isLogged) navigate(SCREENS.login)
  }

  async function fetchDatas(): Promise<void> {
    let result: any = await getPersonalDatas()
    console.log(result.data.data.attributes.personalArea.Info)
    setState({
      ...state,
      isLoaded: true,
      data: result.data.data.attributes.personalArea.Info,
      eventsData: result.data.data.attributes.personalArea.events,
      donationData: result.data.data.attributes.personalArea.donations,
    })
  }

  useEffect(() => {
    checkLog()
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

      <main id="personalArea" className="sectionContainer">
        <section className="welcomeCard">
          <div className="icon-container">
            <Mobile>
              <BiUser size={30} />
            </Mobile>
            <Default>
              <BiUser size={50} />
            </Default>
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
  )
}

export default PersonalArea
