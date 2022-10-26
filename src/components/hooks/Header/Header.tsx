import { FC } from "react"
import { useNavigate } from "react-router-dom"
import { useMediaQuery } from "react-responsive"
//Components
import TemporaryDrawer from "../TemporaryDrawer/TemporaryDrawer"
import ExpandButton from "../../ui/buttons/ExpandButton"
//MUI Components
import { Button } from "@mui/material"
// Route
import SCREENS from "../../../route/router"
// Icons
import { BiUser } from "react-icons/bi"
import { SiFoodpanda } from "react-icons/si"
//Style
import "./header.scss"
//i18n
import { useTranslation, Trans } from "react-i18next"

const Header: FC = () => {
  //Naviagtion
  const navigate: any = useNavigate()
  //i18n
  const { t, i18n }: any = useTranslation()
  //Style object
  let passObj: object = {
    bColor: "#101010",
    bgColorHover: "green",
    bgColorActive: "yellow",
  }

  const Default = ({ children }: any) => {
    const isNotMobile = useMediaQuery({ minWidth: 992 })
    return isNotMobile ? children : null
  }

  const Mobile = ({ children }: any) => {
    const isMobile = useMediaQuery({ maxWidth: 991 })
    return isMobile ? children : null
  }

  const goToHome = (): void => {
    navigate(SCREENS.home)
  }

  const goToPersonalArea = (): void => {
    navigate(SCREENS.personalArea)
  }

  //Changelanguage
  const changeLanguageClick = (lang: string) => (): void => {
    i18n.changeLanguage(lang)
  }

  return (
    <header>
      <div className={"top-header"}>
        <SiFoodpanda className="logo" onClick={goToHome} />

        <Default>
          <nav className={"nav-desktop"}>
            <p>{t("nav.about")}</p>
            <p>{t("nav.events")}</p>
            <p>{t("nav.blog")}</p>
            <p>{t("nav.supportUs")}</p>
            <p>{t("nav.info")}</p>
          </nav>
          <ExpandButton />
        </Default>

        <div className="header-right">
          <div className="lng-buttons">
            <p className="langButton" onClick={changeLanguageClick("en")}>
              EN
            </p>
            <p style={{ padding: "0 10px" }}>•</p>
            <p className="langButton" onClick={changeLanguageClick("it")}>
              IT
            </p>
          </div>

          <BiUser onClick={goToPersonalArea} className="profile-icon" />

          <Mobile>
            <div className="burger-menu">
              <TemporaryDrawer />
            </div>
          </Mobile>
        </div>
      </div>

      <div className="bottom-header">
        <p className="bottom-header-button">{t("nav.events")}</p>
        <p className="bottom-header-button">{t("nav.blog")}</p>
        <p className="bottom-header-button">{t("home.history")}</p>
      </div>
    </header>
  )
}

export default Header
