import { FC, useState } from "react"

//i18n
import { useTranslation } from "react-i18next"

//mui
import { Typography } from "@mui/material"

//components
import Footer from "../components/hooks/Footer/Footer"
import Header from "../components/hooks/Header/Header"
import PreFooter from "../components/hooks/preFooter/PreFooter"
import CustomButton from "../components/ui/buttons/CustomButton/CustomButton"
import InputBox from "../components/hooks/inputBox/InputBox"
import InputCheckbox from "../components/hooks/inputBox/InputCheckbox"
import HelmetComponent from "../components/ui/HelmetComponent/HelmetComponent"

//check functions
import { checkText, checkEmail, checkPhone, checkCF } from "../utils/checkForm"

//style
import "../styles/donate.scss"

interface State {
  isChecked: boolean
  errorName: boolean
  errorSurname: boolean
  errorEmail: boolean
  errorPhone: boolean
  errorCf: boolean
  errorDate: boolean
}

const initialState = {
  isChecked: false,
  errorName: false,
  errorSurname: false,
  errorEmail: false,
  errorPhone: false,
  errorCf: false,
  errorDate: false,
}

//da fixare quando otteniamo api funzionanti
type dataObject = {
  name: string
  surname: string
  email: string
  phone: string
  cf: string
  dateOfBirth: string
  // holderName: string;
  // cardNumber: string;
  // expirationDate: string;
  // cvc: string;
  // amount: string;
}

let data: dataObject = {
  name: "",
  surname: "",
  email: "",
  phone: "",
  cf: "",
  dateOfBirth: "",
  // holderName: "",
  // cardNumber: "",
  // expirationDate: "",
  // cvc: "",
  // amount: "",
}

const Donate: FC = () => {
  const [state, setState] = useState<State>(initialState)
  const { t }: any = useTranslation()

  const setTerms = (e: boolean): void => {
    setState({
      ...state,
      isChecked: e,
    })
  }

  const checkForm = (): void => {
    setState({
      ...state,
      errorName: !checkText(data.name),
      errorSurname: !checkText(data.surname),
      errorEmail: !checkEmail(data.email),
      errorPhone: !checkPhone(data.phone),
      errorCf: !checkCF(data.cf),
      errorDate: data.dateOfBirth === "",
    })
    console.log(data)
  }

  //setData
  const setName = (name: React.ChangeEvent<HTMLInputElement>): void => {
    data.name = name.target.value
    setState({
      ...state,
      errorName: false,
    })
  }
  const setSurname = (surname: React.ChangeEvent<HTMLInputElement>): void => {
    setState({
      ...state,
      errorSurname: false,
    })
    data.surname = surname.target.value
  }
  const setEmail = (email: React.ChangeEvent<HTMLInputElement>): void => {
    setState({
      ...state,
      errorEmail: false,
    })
    data.email = email.target.value
  }
  const setPhone = (phone: React.ChangeEvent<HTMLInputElement>): void => {
    setState({
      ...state,
      errorPhone: false,
    })
    data.phone = phone.target.value
  }
  const setCf = (cf: React.ChangeEvent<HTMLInputElement>): void => {
    setState({
      ...state,
      errorCf: false,
    })
    data.cf = cf.target.value
  }
  const setDate = (date: React.ChangeEvent<HTMLInputElement>): void => {
    setState({
      ...state,
      errorDate: false,
    })
    data.dateOfBirth = date.target.value
  }

  return (
    <>
      <HelmetComponent metatitleOn={true} title="donate" />

      <Header />

      <main id="donate" className="sectionContainer">
        <Typography variant="h1">{t("personalArea.donate")}</Typography>
        <form action="">
          <Typography variant="h3">{t("personalArea.personalData")}</Typography>
          <section className="personalData">
            <div className="input-box">
              <InputBox
                callbackChange={setName}
                label={t("login.name")}
                type="text"
                isRequired={true}
                notValid={state.errorName}
                errorLabel={t("form.errorName")}
              />
              <InputBox
                label={t("login.surname")}
                type="text"
                isRequired={true}
                callbackChange={setSurname}
                notValid={state.errorSurname}
                errorLabel={t("form.errorSurname")}
              />
            </div>
            <div className="input-box">
              <InputBox
                label={t("login.email")}
                type="email"
                isRequired={true}
                callbackChange={setEmail}
                notValid={state.errorEmail}
                errorLabel={t("form.errorEmail")}
              />
              <InputBox
                callbackChange={setPhone}
                label={t("login.phone")}
                type="number"
                notValid={state.errorPhone}
                errorLabel={t("form.errorPhone")}
              />
            </div>
            <div className="input-box">
              <InputBox
                callbackChange={setCf}
                label={t("login.cf")}
                type="text"
                isRequired={true}
                upperCase={true}
                notValid={state.errorCf}
                errorLabel={t("form.errorCf")}
              />
              <InputBox
                notValid={state.errorDate}
                label={""}
                type="date"
                callbackChange={setDate}
                errorLabel={t("form.errorDateOfBirth")}
              />
            </div>
          </section>
          <Typography variant="h3">
            {t("personalArea.paymentOption")}
          </Typography>
          <section className="personalData">
            <InputBox
              label={t("donate.holderName")}
              type="text"
              isRequired={true}
            />
            <InputBox
              label={t("donate.cardNumber")}
              type="number"
              isRequired={true}
            />
            <div className="input-box">
              <InputBox label={""} type="month" isRequired={true} />
              <InputBox
                label={t("donate.cvc")}
                type="number"
                isRequired={true}
              />
            </div>
            <InputBox
              label={t("donate.amount")}
              type="number"
              isRequired={true}
            />
          </section>
          <InputCheckbox
            label={t("login.privacyTerms")}
            callbackChange={setTerms}
          />
          <CustomButton
            colorType="primary"
            label={t("buttons.confirmButton")}
            size="big"
            callback={checkForm}
            isDisable={!state.isChecked}
          />
        </form>
      </main>

      <PreFooter />
      <Footer />
    </>
  )
}

export default Donate
