import { FC, useEffect, useState } from "react"

//i18n
import { useTranslation } from "react-i18next"

//components
import Footer from "../components/hooks/Footer/Footer"
import Header from "../components/hooks/Header/Header"
import NavTab from "../components/ui/NavTab/NavTab"
import VerticalNavTab from "../components/ui/VerticalNavTab/VerticalNavTab"
import PreFooter from "../components/hooks/preFooter/PreFooter"
import DonationHistory from "../components/hooks/DonationsHistory/DonationHistory"
import PersonalEvents from "../components/hooks/PersonalEvents/PersonalEvents"
import MyInfoSection from "../components/hooks/MyInfoSection/MyInfoSection"
import HelmetComponent from "../components/ui/HelmetComponent/HelmetComponent"

//style
import "../styles/personalArea.scss"

//type
import { personalInfo, events, donation} from "../utils/type"

//mui
import { Typography } from "@mui/material"

//icons
import { BiUser } from "react-icons/bi"

//fetch
import { getPersonalDatas } from "../services/api/personalAreaAPI"
import { getAllDonation } from "../services/api/donationApi"

//reponsive
import useResponsive from "../utils/useResponsive"

//Router
import { useNavigate } from "react-router-dom"
import SCREENS from "../route/router"

//Redux
import { useSelector } from "react-redux"
import { getUserEventsApi } from "../services/api/eventApi"


interface State {
  isLoaded: boolean
  data: personalInfo | null
  eventsData: events[] | null
  donationData: Array<donation>
}

const initialState = {
  isLoaded: false,
  data: null,
  eventsData: null,
  donationData: [],
}

const PersonalArea: FC = () => {
  const [state, setState] = useState<State>(initialState)

  const { t, i18n }: any = useTranslation()
  let [Mobile, Default] = useResponsive()

  const isLogged: boolean = useSelector(
    (state: any) => state.userDuck.isLoggedIn
  )
  const userId: number =
    sessionStorage.getItem("userOnlus") &&
    JSON.parse(sessionStorage.getItem("userOnlus")!).userId
  const navigate: Function = useNavigate()

  const checkLog = (): void => {
    if (!isLogged) navigate(SCREENS.login)
  }

  async function fetchDatas(): Promise<void> {
    let resultPersonalData: any = await getPersonalDatas(userId)
    let resultOwnDonation: any = await getAllDonation()
    let resultOwnEvents: any = await getUserEventsApi();
    setState({
      ...state,
      isLoaded: true,
      data: resultPersonalData.data,
      eventsData: resultOwnEvents.data,
      donationData: resultOwnDonation.data,
    })
  }

  const handleCancel = async():Promise<void> => {
    let newOwnEvents: any = await getUserEventsApi();
    setState({
      ...state,
      isLoaded: true,
      eventsData: newOwnEvents.data,
    })
  }

  useEffect(() => {
    checkLog()
    fetchDatas()
  }, [i18n.language])

  return (
    <>
      <HelmetComponent metatitleOn={true} title="personalArea" />

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
                  <PersonalEvents events={state!.eventsData} callbackCancel={handleCancel} />,
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
                  <PersonalEvents events={state!.eventsData} callbackCancel={handleCancel} />,
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
