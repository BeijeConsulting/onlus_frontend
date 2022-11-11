import { FC, useState, useEffect, useRef } from "react"

//navigation
import { NavLink, useNavigate } from "react-router-dom"
import { HashLink } from "react-router-hash-link"
import SCREENS from "../../../route/router"

// mui
import ButtonGroup from "@mui/material/ButtonGroup"
import ClickAwayListener from "@mui/material/ClickAwayListener"
import Grow from "@mui/material/Grow"
import Paper from "@mui/material/Paper"
import Popper from "@mui/material/Popper"
import MenuItem from "@mui/material/MenuItem"
import MenuList from "@mui/material/MenuList"
import { Typography } from "@mui/material"

//Components
import TemporaryDrawer from "../TemporaryDrawer/TemporaryDrawer"
import ExpandButton from "../../ui/buttons/ExpandButton"

// Icons
import { BiUser } from "react-icons/bi"

//Style
import "./header.scss"

//i18n
import { useTranslation } from "react-i18next"

//responsive
import useResponsive from "../../../utils/useResponsive"

//redux
import { setLoggedState, saveUserData } from "../../../redux/duck/user"
import { useSelector, useDispatch } from "react-redux"

// type
import { color } from "../../../utils/type"

interface HeaderProps {
  isHome?: boolean
}

interface State {
  scroll: boolean
  lng: string
  open: boolean
}

const initialState = {
  scroll: false,
  lng: "it",
  open: false,
}

const Header: FC<HeaderProps> = (props) => {
  const [state, setState] = useState<State>(initialState)
  const dispatch: Function = useDispatch()

  const LOGO: any = useSelector((state: any) => state.generalDuck.logo)
  const PALETTE: Array<color> = useSelector(
    (state: any) => state.generalDuck.palette
  )
  const isLoggedIn: boolean = useSelector(
    (state: any) => state.userDuck.isLoggedIn
  )
  const anchorRef = useRef<HTMLDivElement>(null)

  const navigate: Function = useNavigate()

  const { t, i18n }: any = useTranslation()

  // mediaquery
  let [Mobile, Default] = useResponsive()

  // navigazione
  const goTo = (params: string) => (): void => {
    if (params === SCREENS.personalArea) {
      if (isLoggedIn) navigate(params)
      else navigate(SCREENS.login)
    } else {
      navigate(params)
    }
  }

  // Changelanguage
  const changeLanguageClick = (lang: string) => (): void => {
    i18n.changeLanguage(lang)
  }

  // Scroll
  const handleScroll = (): void => {
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

  const scrollWithOffset = (el: any): void => {
    const yCoordinate: number =
      el.getBoundingClientRect().top + window.pageYOffset
    const yOffset: number = -147.2
    window.scrollTo({ top: yCoordinate + yOffset, behavior: "smooth" })
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [state.scroll])

  const handleToggle = (): void => {
    setState({
      ...state,
      open: !state.open,
    })
  }

  const handleClose = (event: Event): void => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return
    }
    setState({
      ...state,
      open: false,
    })
  }

  const logout = (): void => {
    dispatch(setLoggedState(false))
    dispatch(saveUserData({}))

    sessionStorage.removeItem("userOnlus")
    localStorage.removeItem("onlusRefreshToken")
    localStorage.removeItem("onlusToken")

    navigate(SCREENS.home)
  }

  return (
    <header
      className={(state.scroll ? "active " : "") + (props.isHome && "home")}
      style={{ background: state.scroll ? PALETTE[0].bgColor : "transparent" }}
    >
      <div className={"top-header"}>
        <img src={LOGO} alt="" className="logo" onClick={goTo(SCREENS.home)} />
        <Default>
          <nav className={"nav-desktop"}>
            <NavLink end to={SCREENS.home}>
              <Typography color={PALETTE[0].textColor} variant="body1">
                {t("nav.home")}
              </Typography>
            </NavLink>
            <NavLink end to={SCREENS.about}>
              <Typography color={PALETTE[0].textColor} variant="body1">
                {t("nav.about")}
              </Typography>
            </NavLink>
            <NavLink end to={SCREENS.events}>
              <Typography color={PALETTE[0].textColor} variant="body1">
                {t("nav.events")}
              </Typography>
            </NavLink>
            <NavLink end to={SCREENS.blog}>
              <Typography color={PALETTE[0].textColor} variant="body1">
                {t("nav.blog")}
              </Typography>
            </NavLink>
            <NavLink end to={SCREENS.support}>
              <Typography color={PALETTE[0].textColor} variant="body1">
                {t("nav.supportUs")}
              </Typography>
            </NavLink>
            <NavLink end to={SCREENS.faq}>
              <Typography color={PALETTE[0].textColor} variant="body1">
                {t("nav.info")}
              </Typography>
            </NavLink>
          </nav>
          <ExpandButton />
        </Default>

        <div className="header-right">
          <div className="lng-buttons">
            <Typography
              color={PALETTE[0].textColor}
              variant="body1"
              onClick={changeLanguageClick("en")}
              className={
                (i18n.language === "en" ? "active-lng" : "") + " langButton"
              }
            >
              EN
            </Typography>
            <p style={{ padding: "0 10px", color: PALETTE[0].textColor }}>•</p>
            <Typography
              color={PALETTE[0].textColor}
              variant="body1"
              onClick={changeLanguageClick("it")}
              className={
                (i18n.language === "it" ? "active-lng" : "") + " langButton"
              }
            >
              IT
            </Typography>
          </div>

          <div>
            <ButtonGroup onClick={handleToggle} ref={anchorRef}>
              <BiUser color={PALETTE[0].textColor} className="profile-icon" />
            </ButtonGroup>
            <Popper
              sx={{
                zIndex: 1,
              }}
              open={state.open}
              anchorEl={anchorRef.current}
              role={undefined}
              transition
              disablePortal
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin:
                      placement === "bottom" ? "center top" : "center bottom",
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList id="split-button-menu">
                        <MenuItem onClick={goTo(SCREENS.personalArea)}>
                          {t("metaTitles.personalArea")}
                        </MenuItem>

                        {isLoggedIn && (
                          <MenuItem onClick={logout}>
                            {t("nav.logout")}
                          </MenuItem>
                        )}
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </div>

          <Mobile>
            <div className="burger-menu">
              <TemporaryDrawer />
            </div>
          </Mobile>
        </div>
      </div>
      <div className="bottom-header">
        <HashLink
          to="#events"
          className="bottom-header-button"
          scroll={(el) => scrollWithOffset(el)}
        >
          <Typography color={PALETTE[0].textColor} variant="body1">
            {t("nav.events")}
          </Typography>
        </HashLink>
        <HashLink
          to="#blog"
          className="bottom-header-button"
          scroll={(el) => scrollWithOffset(el)}
        >
          <Typography color={PALETTE[0].textColor} variant="body1">
            {t("nav.blog")}
          </Typography>
        </HashLink>
        <HashLink
          to="#history"
          className="bottom-header-button"
          scroll={(el) => scrollWithOffset(el)}
        >
          <Typography color={PALETTE[0].textColor} variant="body1">
            {t("home.history")}
          </Typography>
        </HashLink>
      </div>
    </header>
  )
}

export default Header
