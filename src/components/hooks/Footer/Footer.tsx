import { FC } from "react"
import { Typography } from "@mui/material"
import { Link } from "react-router-dom"

// mediaquery
import { useMediaQuery } from "react-responsive"
// translation
import { useTranslation } from "react-i18next"
// navigazione
import { useNavigate } from "react-router-dom"
// components
import CustomButton from "../../ui/buttons/CustomButton/CustomButton"
// style
import "./footer.scss"

import SCREENS from "../../../route/router"

// style
const primary: string = "#262E36"
const secondary: string = "#B12009"

// type
type social = {
  name: string
  icon: any //come tipizzare image? come ce lo passa backend? (string)
  link: string
  footerOn: boolean
  homepageOn: boolean
}

// dati mokup
// contatti
const contacts = {
  telephone: "+39 331 211 345",
  email: "panda@gmail.com",
  address: "via dei panda 2, Milano, Italy",
  PIva: "IT 0221212121210212",
  CF: "8008976565786",
}
// social
const social: Array<social> = [
  {
    name: "Facebook",
    icon: "https://www.ancoraprint.it/cms/docs/archive/Facebookicona.png",
    link: "#",
    footerOn: true,
    homepageOn: false,
  },
  {
    name: "Youtube",
    icon: "https://www.dayoffreedom.it/wp-content/uploads/2021/03/icona-bianca-youtube3.png",
    link: "#",
    footerOn: true,
    homepageOn: false,
  },
  {
    name: "Twitter",
    icon: "https://fratelliscantamburlo.it/it/design/iconabiancatwitter.png",
    link: "#",
    footerOn: true,
    homepageOn: false,
  },
  {
    name: "Instagram",
    icon: "https://www.rifipack.it/wp-content/uploads/2019/11/instagram-icona-font-awesome-bianca-buste-personalizzate-300x225.png",
    link: "#",
    footerOn: true,
    homepageOn: false,
  },
]

//React responsive const
const Default = ({ children }: any) => {
  const isNotMobile = useMediaQuery({ minWidth: 992 })
  return isNotMobile ? children : null
}
const Mobile = ({ children }: any) => {
  const isMobile = useMediaQuery({ maxWidth: 991 })
  return isMobile ? children : null
}

const Footer: FC = () => {
  // inizializzo navigazione
  let navigate = useNavigate()

  // navigazione
  const goToHome = (): void => {
    navigate(SCREENS.home)
  }
  const goToAbout = (): void => {
    navigate(SCREENS.about)
  }
  const goToEvents = (): void => {
    navigate(SCREENS.events)
  }
  const goToBlog = (): void => {
    navigate(SCREENS.blog)
  }
  const goToSupport = (): void => {
    navigate(SCREENS.support)
  }
  const goToInfo = (): void => {
    navigate(SCREENS.faq)
  }
  const goToLogin = (): void => {
    navigate(SCREENS.login)
  }

  // tranlation hook
  const { t }: any = useTranslation()

  const mapping = (el: social, key: number): JSX.Element | boolean => {
    if (el.footerOn) {
      return (
        <div className="iconContainer" key={key}>
          <img className="socialIcon" src={el.icon} />
          <Default>
            <div>
              <Typography variant="body1">{el.name}</Typography>
            </div>
          </Default>
        </div>
      )
    } else {
      return false
    }
  }

  return (
    <footer style={{ backgroundColor: primary }} id="footer">
      <section className="contacts">
        <Typography variant="h4" className="titleContacts">
          {t("footer.contacts")}
        </Typography>
        <ul className="contactsList">
          <li>
            <Typography variant="body1">{contacts.telephone}</Typography>
          </li>
          <li>
            <Typography variant="body1">{contacts.email}</Typography>
          </li>
          <li>
            <Typography variant="body1">{contacts.address}</Typography>
          </li>
          <li>
            <Typography variant="body1">P.Iva: {contacts.PIva}</Typography>
          </li>
          <li>
            <Typography variant="body1">C.F: {contacts.CF}</Typography>
          </li>
        </ul>
      </section>
      <section className="social">{social.map(mapping)}</section>
      <Mobile>
        <div className="buttonContainer">
          <CustomButton
            colorType="primary"
            callback={goToLogin}
            label={"LOGIN"}
            size={"small"}
          />
        </div>
      </Mobile>
      <Default>
        <section className="nav">
          <Typography variant="body1" onClick={goToHome}>
            {t("nav.home")}
          </Typography>
          <Typography variant="body1" onClick={goToAbout}>
            {t("nav.about")}
          </Typography>
          <Typography variant="body1" onClick={goToEvents}>
            {t("nav.events")}
          </Typography>
          <Typography variant="body1" onClick={goToBlog}>
            {t("nav.blog")}
          </Typography>
          <Typography variant="body1" onClick={goToSupport}>
            {t("nav.supportUs")}
          </Typography>
          <Typography variant="body1" onClick={goToInfo}>
            {t("nav.info")}
          </Typography>
        </section>
      </Default>
      <section className="privacy">
        <Link to="#">
          <Typography variant="body1">{t("footer.privacyPolicy")} </Typography>
        </Link>
        <Link to="#">
          <Typography variant="body1">{t("footer.cookiePolicy")} </Typography>
        </Link>
        <Link to="#">
          <Typography variant="body1">{t("footer.terms")} </Typography>
        </Link>
        <Default>
          <div className="buttonContainer">
            <CustomButton
              colorType="primary"
              callback={goToLogin}
              label={"LOGIN"}
              size={"small"}
            />
          </div>
        </Default>
      </section>

      <Typography className="rightReserved">
        {t("footer.rightReserved")}
      </Typography>
    </footer>
  )
}

export default Footer
