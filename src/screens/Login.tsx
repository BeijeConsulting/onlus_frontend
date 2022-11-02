import { Helmet } from "react-helmet"
import { Typography } from "@mui/material"

//Components
import Footer from "../components/hooks/Footer/Footer"
import Header from "../components/hooks/Header/Header"
import CustomButton from "../components/ui/buttons/CustomButton/CustomButton"
import InputBox from "../components/ui/inputBox/InputBox"

//Router
import SCREENS from "../route/router"
import { Link } from "react-router-dom"

//i18n
import { useTranslation } from "react-i18next"

//Styles
import "../styles/login.scss"
import PreFooter from "../components/hooks/PreFooter/PreFooter"

function Login() {
  const { t }: any = useTranslation()
  const login = () => {
    console.log("login")
  }

  return (
    <>
      <Helmet>
        <title>Onlus - {t("metaTitles.login")}</title>
        <meta name="description" content={`${t("metaTitles.login")} page`} />
      </Helmet>

      <Header />

      <main id="login" className="sectionContainer">
        <Typography variant="h1">{t("titles.loginTitle")}</Typography>
        <form className="login-container" onSubmit={login}>
          <InputBox label={t("login.email")} type={"mail"} />
          <InputBox label={t("login.password")} type={"password"} />

          <Link to={"#"} className="forgot-password">
            <Typography variant="caption">
              {t("login.forgottenPassword")}
            </Typography>
          </Link>

          <CustomButton
            size={"big"}
            callback={login}
            colorType="primary"
            label={t("buttons.loginButton")}
          />
        </form>

        <div className="aside-section">
          <Typography variant="body2">{t("login.notRegistered")}</Typography>
          <Link to={SCREENS.signup}>
            <Typography variant="body2">{t("buttons.signupButton")}</Typography>
          </Link>
        </div>
      </main>

      <PreFooter />
      <Footer />
    </>
  )
}

export default Login
