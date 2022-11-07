import { FC, useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { HashLink } from "react-router-hash-link"
import { Typography } from "@mui/material"

//Hooks
import { useNavigate } from "react-router-dom"
import { useMediaQuery } from "react-responsive"
//Components
import TemporaryDrawer from "../TemporaryDrawer/TemporaryDrawer"
import ExpandButton from "../../ui/buttons/ExpandButton"


// Route
import SCREENS from "../../../route/router"

// Icons
import { BiUser } from "react-icons/bi"
import { SiFoodpanda } from "react-icons/si"

//Style
import "./header.scss"

//i18n
import { useTranslation } from "react-i18next"

interface HeaderProps {
  isHome?: boolean
}
interface State {
  scroll: boolean
  lng: string
}
const initialState = {
  scroll: false,
  lng: "it",
}

const Header: FC<HeaderProps> = (props) => {
  const [state, setState] = useState<State>(initialState)

  const navigate: Function = useNavigate()

  const { t, i18n }: any = useTranslation()

  // mediaquery
  const Default = ({ children }: any) => {
    const isNotMobile = useMediaQuery({ minWidth: 992 })
    return isNotMobile ? children : null
  }

  const Mobile = ({ children }: any) => {
    const isMobile = useMediaQuery({ maxWidth: 991 })
    return isMobile ? children : null
  }

  //navigation functions
  // navigazione
  const goTo = (params:string) => (): void => {
    navigate(params);
  };

  // Changelanguage
  const changeLanguageClick = (lang: string) => (): void => {
    i18n.changeLanguage(lang)
  }

  // Scroll
  function handleScroll() {
    let windowScroll: number = window.scrollY
    let scrolly: boolean = false

    if (windowScroll > 150) {
      scrolly = true
    } else scrolly = false

    setState({
      ...state,
      scroll: scrolly,
    })
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [state.scroll])

  return (
    <header
      className={(state.scroll ? "active " : "") + (props.isHome && "home")}
    >
      <div className={"top-header"}>
        <SiFoodpanda className="logo" onClick={goTo(SCREENS.home)} />
        <Default>
          <nav className={"nav-desktop"}>
            <Typography variant="body1" onClick={goTo(SCREENS.home)}>
              {t("nav.home")}
            </Typography>
            <Typography variant="body1" onClick={goTo(SCREENS.about)}>
              {t("nav.about")}
            </Typography>
            <Typography variant="body1" onClick={goTo(SCREENS.events)}>
              {t("nav.events")}
            </Typography>
            <Typography variant="body1" onClick={goTo(SCREENS.blog)}>
              {t("nav.blog")}
            </Typography>
            <Typography variant="body1" onClick={goTo(SCREENS.support)}>
              {t("nav.supportUs")}
            </Typography>
            <Typography variant="body1" onClick={goTo(SCREENS.faq)}>
              {t("nav.info")}
            </Typography>
          </nav>
          <ExpandButton />
        </Default>

        <div className="header-right">
          <div className="lng-buttons">
            <Typography
              variant="body1"
              onClick={changeLanguageClick("en")}
              className={
                (i18n.language === "en" ? "active-lng" : "") + " langButton"
              }
            >
              EN
            </Typography>
            <p style={{ padding: "0 10px" }}>•</p>
            <Typography
              variant="body1"
              onClick={changeLanguageClick("it")}
              className={
                (i18n.language === "it" ? "active-lng" : "") + " langButton"
              }
            >
              IT
            </Typography>
          </div>

          <BiUser onClick={goTo(SCREENS.personalArea)} className="profile-icon" />

          <Mobile>
            <div className="burger-menu">
              <TemporaryDrawer />
            </div>
          </Mobile>
        </div>
      </div>
      <div className="bottom-header">
        <HashLink to="#events" className="bottom-header-button">
          <Typography variant="body1">{t("nav.events")}</Typography>
        </HashLink>
        <HashLink to="#blog" className="bottom-header-button">
          <Typography variant="body1">{t("nav.blog")}</Typography>
        </HashLink>
        <HashLink to="#history" className="bottom-header-button">
          <Typography variant="body1">{t("home.history")}</Typography>
        </HashLink>
      </div>
    </header>
  )
}

export default Header
