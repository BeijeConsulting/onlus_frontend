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
import GenericModal from "../GenericModal/GenericModal"
import CustomButton from "../../ui/buttons/CustomButton/CustomButton"

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
  isOpenModal: boolean
}

const initialState = {
  scroll: false,
  lng: "it",
  open: false,
  isOpenModal: false,
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

  const openModal = (): void => {
    setState({
      ...state,
      isOpenModal: !state.isOpenModal,
    })
  }

  return (
    <header
      className={(state.scroll ? "active " : "") + (props.isHome && "home")}
      style={
        props.isHome
          ? { background: state.scroll ? PALETTE[0].bgColor : "transparent" }
          : { background: PALETTE[0].bgColor }
      }
    >
      <div className={"top-header"}>
        <img src={LOGO} alt="" className="logo" onClick={goTo(SCREENS.home)} />
        <Default>
          <nav className={"nav-desktop"}>
            <NavLink end to={SCREENS.home}>
              <Typography variant="body2">
                {t("nav.home")}
                <div
                  className="underline"
                  style={{ background: PALETTE[0].textColor }}
                ></div>
              </Typography>
            </NavLink>

            <NavLink end to={SCREENS.about}>
              <Typography variant="body2">
                {t("nav.about")}
                <div
                  className="underline"
                  style={{ background: PALETTE[0].textColor }}
                ></div>
              </Typography>
            </NavLink>

            <NavLink end to={SCREENS.events}>
              <Typography variant="body2">
                {t("nav.events")}
                <div
                  className="underline"
                  style={{ background: PALETTE[0].textColor }}
                ></div>
              </Typography>
            </NavLink>

            <NavLink end to={SCREENS.blog}>
              <Typography variant="body2">
                {t("nav.blog")}
                <div
                  className="underline"
                  style={{ background: PALETTE[0].textColor }}
                ></div>
              </Typography>
            </NavLink>

            <NavLink end to={SCREENS.support}>
              <Typography variant="body2">
                {t("nav.supportUs")}
                <div
                  className="underline"
                  style={{ background: PALETTE[0].textColor }}
                ></div>
              </Typography>
            </NavLink>

            <NavLink end to={SCREENS.faq}>
              <Typography variant="body2">
                {t("nav.info")}
                <div
                  className="underline"
                  style={{ background: PALETTE[0].textColor }}
                ></div>
              </Typography>
            </NavLink>
          </nav>
          <ExpandButton />
        </Default>

        <div className="header-right">
          <div className="lng-buttons">
            <Typography
              variant="body2"
              onClick={changeLanguageClick("en")}
              className={
                (i18n.language === "en" ? "active-lng" : "") + " langButton"
              }
            >
              EN
            </Typography>
            <Typography className="lng-separator" variant="body2">
              •
            </Typography>
            <Typography
              variant="body2"
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
                      {isLoggedIn ? (
                        <MenuList id="split-button-menu">
                          <MenuItem onClick={goTo(SCREENS.personalArea)}>
                            {t("metaTitles.personalArea")}
                          </MenuItem>

                          <MenuItem onClick={openModal}>
                            {t("nav.logout")}
                          </MenuItem>
                        </MenuList>
                      ) : (
                        <MenuList id="split-button-menu">
                          <MenuItem onClick={goTo(SCREENS.login)}>
                            {t("buttons.loginButton")}
                          </MenuItem>
                        </MenuList>
                      )}
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
          <Typography variant="body2">
            {t("nav.events")}
            <div
              className="underline"
              style={{ background: PALETTE[0].textColor }}
            ></div>
          </Typography>
        </HashLink>
        <HashLink
          to="#blog"
          className="bottom-header-button"
          scroll={(el) => scrollWithOffset(el)}
        >
          <Typography variant="body2">
            {t("nav.blog")}
            <div
              className="underline"
              style={{ background: PALETTE[0].textColor }}
            ></div>
          </Typography>
        </HashLink>
        <HashLink
          to="#history"
          className="bottom-header-button"
          scroll={(el) => scrollWithOffset(el)}
        >
          <Typography variant="body2">
            {t("home.history")}
            <div
              className="underline"
              style={{ background: PALETTE[0].textColor }}
            ></div>
          </Typography>
        </HashLink>
      </div>

      <GenericModal open={state.isOpenModal} callback={openModal}>
        <div className="children-modal">
          <Typography variant="body2">{t("nav.logoutSentence")}</Typography>
          <CustomButton
            label={t("confirm")}
            isDisable={false}
            size={"big"}
            colorType="secondary"
            callback={logout}
          />
        </div>
      </GenericModal>
    </header>
  )
}

export default Header
