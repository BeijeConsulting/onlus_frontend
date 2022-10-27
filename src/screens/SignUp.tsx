import { FC } from "react"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"

import Footer from "../components/footer/Footer"
import PreFooter from "../components/preFooter/PreFooter"
import Header from "../components/hooks/Header/Header"
import InputBox from "../components/ui/inputBox/InputBox"
import SelectBox from "../components/ui/inputBox/SelectBox"
import InputCheckbox from "../components/ui/inputBox/InputCheckbox"
import CustomButton from "../components/ui/buttons/CustomButton/CustomButton"

import SCREENS from "../route/router"

import "../styles/signup.scss"

const SignUp: FC = () => {
  const { t, i18n }: any = useTranslation()

  const lngs = [
    { label: t("login.italian"), value: t("login.italian") },
    { label: t("login.english"), value: t("login.english") },
  ]

  const submit = (): void => {}
  return (
    <>
      <Header />
      <main className="signup">
        <h1>{t("titles.signupTitle")}</h1>
        <form action="" className={"form"} onSubmit={submit}>
          <div className={"input-box"}>
            <InputBox label={t("login.name")} type={"text"} isRequired={true} />
            <InputBox
              label={t("login.surname")}
              type={"text"}
              isRequired={true}
            />
          </div>
          <div className={"input-box"}>
            <InputBox
              label={t("login.email")}
              type={"email"}
              isRequired={true}
            />
            <InputBox label={t("login.phone")} type={"number"} />
          </div>
          <div className={"input-box"}>
            <InputBox
              label={t("login.password")}
              type={"password"}
              isRequired={true}
            />
            <InputBox
              label={t("login.confirmPassword")}
              type={"password"}
              isRequired={true}
            />
          </div>
          <div className="input-box">
            <SelectBox label={t("login.language")} items={lngs} />
          </div>
          <InputCheckbox label={t("login.acceptTerms")} />
          <CustomButton
            label={t("buttons.signupButton")}
            size={"big"}
            colorType="primary"
            callback={submit}
          />
        </form>
        <div className="aside-section">
          <p>{t("login.alreadyRegistered")}</p>
          <Link to={SCREENS.login}>{t("buttons.loginButton")}</Link>
        </div>
      </main>
      <PreFooter />
      <Footer />
    </>
  )
}

export default SignUp
