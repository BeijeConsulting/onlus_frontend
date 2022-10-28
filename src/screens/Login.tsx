//Components
import Footer from "../components/footer/Footer"
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
import PreFooter from "../components/preFooter/PreFooter"

function Login() {
  const { t }: any = useTranslation()
  const login = () => {
    console.log("login")
  }

  return (
    <>
      <Header />

      <main className="login">
        <form className="login-container" onSubmit={login}>
          <h1>{t("titles.loginTitle")}</h1>

          <InputBox label={t("login.email")} type={"mail"} />
          <InputBox label={t("login.password")} type={"password"} />

          <a href="#" className="forgot-password">
            {t("login.forgottenPassword")}
          </a>

          <CustomButton
            size={"big"}
            callback={login}
            colorType="primary"
            label={t("buttons.loginButton")}
          />
        </form>

        <div className="aside-section">
          <p>{t("login.notRegistered")}</p>
          <Link to={SCREENS.signup}>{t("buttons.signupButton")}</Link>
        </div>
      </main>

      <PreFooter />
      <Footer />
    </>
  )
}

export default Login
