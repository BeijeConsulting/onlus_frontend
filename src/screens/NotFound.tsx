//Components
import Header from "../components/hooks/Header/Header"
//Styles
import '../styles/notFound.scss'
//Icon
import SdCardAlertIcon from '@mui/icons-material/SdCardAlert';
//i18n
import { useTranslation } from "react-i18next"

import { Helmet } from "react-helmet";
import { Typography } from "@mui/material";

function NotFound() {
  const { t }: any = useTranslation()

  return (
    <>
      <Helmet>
        <title>Onlus - {t("metaTitles.notFound")}</title>
        <meta name="description" content={`${t("metaTitles.notFound")} page`} />
      </Helmet>
   
      <main id="notFound" className="sectionContainer">
        <Header />
        <section className="notFoundContainer">
          <SdCardAlertIcon className="error-icon"/>
          <Typography variant="h1">{t("error.notFound")} <span className="found-title-color">404</span></Typography>
          <Typography variant="body1">{t("error.description")} </Typography>
        </section>
      </main>
    </>
  )
}

export default NotFound
