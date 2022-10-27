import { FC, useState } from "react"
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

import {
  checkText,
  checkEmail,
  checkPhone,
  checkPassword,
  checkConfirmPassword,
} from "../utils/checkForm"

import "../styles/signup.scss"

interface State {
  errorName: boolean
  errorSurname: boolean
  errorEmail: boolean
  errorPhone: boolean
  errorPassword: boolean
  errorConfirmPassword: boolean
}

const initialState = {
  errorName: false,
  errorSurname: false,
  errorEmail: false,
  errorPhone: false,
  errorPassword: false,
  errorConfirmPassword: false,
}

let data: any = {
  name: "",
  surname: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  lng: "",
}

const SignUp: FC = () => {
  const [state, setState] = useState<State>(initialState)
  const { t, i18n }: any = useTranslation()

  const lngs = [
    { label: t("login.italian"), value: t("login.italian") },
    { label: t("login.english"), value: t("login.english") },
  ]

  const setName = (name: any): void => {
    data.name = name.target.value
    setState({
      ...state,
      errorName: false,
    })
  }

  const setSurname = (surname: any): void => {
    data.surname = surname.target.value
    setState({
      ...state,
      errorSurname: false,
    })
  }

  const setEmail = (email: any): void => {
    data.email = email.target.value
    setState({
      ...state,
      errorEmail: false,
    })
  }

  const setPhone = (phone: any): void => {
    data.phone = phone.target.value
    setState({
      ...state,
      errorPhone: false,
    })
  }

  const setPassword = (password: any): void => {
    data.password = password.target.value
    setState({
      ...state,
      errorPassword: false,
    })
  }

  const setConfirmPassword = (confirmPassword: any): void => {
    data.confirmPassword = confirmPassword.target.value
    setState({
      ...state,
      errorConfirmPassword: false,
    })
  }

  const submit = (): void => {
    setState({
      ...state,
      errorName: !checkText(data.name),
      errorSurname: !checkText(data.surname),
      errorEmail: !checkEmail(data.email),
      errorPhone: !checkPhone(data.phone),
      errorPassword: !checkPassword(data.password),
      errorConfirmPassword: !checkConfirmPassword(
        data.password,
        data.confirmPassword
      ),
    })
    console.log("check password", checkPassword(data.password))
  }
  return (
    <>
      <Header />
      <main className="signup">
        <h1>{t("titles.signupTitle")}</h1>
        <form action="" className={"form"} onSubmit={submit}>
          <div className={"input-box"}>
            <InputBox
              label={t("login.name")}
              type={"text"}
              isRequired={true}
              callbackChange={setName}
              notValid={state.errorName}
            />
            <InputBox
              label={t("login.surname")}
              type={"text"}
              isRequired={true}
              callbackChange={setSurname}
              notValid={state.errorSurname}
            />
          </div>
          <div className={"input-box"}>
            <InputBox
              label={t("login.email")}
              type={"email"}
              isRequired={true}
              callbackChange={setEmail}
              notValid={state.errorEmail}
            />
            <InputBox
              label={t("login.phone")}
              type={"number"}
              callbackChange={setPhone}
              notValid={state.errorPhone}
            />
          </div>
          <div className={"input-box"}>
            <InputBox
              label={t("login.password")}
              type={"password"}
              isRequired={true}
              callbackChange={setPassword}
              notValid={state.errorPassword}
            />
            <InputBox
              label={t("login.confirmPassword")}
              type={"password"}
              isRequired={true}
              callbackChange={setConfirmPassword}
              notValid={state.errorConfirmPassword}
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
