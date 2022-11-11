//Components
import Header from "../components/hooks/Header/Header"
import HelmetComponent from "../components/ui/HelmetComponent/HelmetComponent"

//Styles
import "../styles/notFound.scss"

//mui
import SdCardAlertIcon from "@mui/icons-material/SdCardAlert"
import { Typography } from "@mui/material"

//i18n
import { useTranslation } from "react-i18next"

function NotFound() {
  const { t }: any = useTranslation()

  return (
    <>
      <HelmetComponent metatitleOn={true} title="notFound" />

      <main id="notFound" className="sectionContainer">
        <Header />
        <section className="notFoundContainer">
          <SdCardAlertIcon className="error-icon" />
          <Typography variant="h1">
            {t("error.notFound")} <span className="found-title-color">404</span>
          </Typography>
          <Typography variant="body1">{t("error.description")} </Typography>
        </section>
      </main>
    </>
  )
}

export default NotFound
