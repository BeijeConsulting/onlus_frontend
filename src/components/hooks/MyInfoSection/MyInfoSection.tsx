import { FC, ReactElement, useState, useEffect } from "react"

//i18n
import { useTranslation } from "react-i18next"

//components
import InputBox from "../inputBox/InputBox"
import SelectBox from "../inputBox/SelectBox"
import CustomButton from "../../ui/buttons/CustomButton/CustomButton"

//check
import {
  checkText,
  checkEmail,
  checkPhone,
  checkPassword,
} from "../../../utils/checkForm"

//style
import "../../../styles/signup.scss"
import "./myInfoSection.scss"

//type
import { personalInfo } from "../../../utils/type"

interface InfoProps {
  datas: personalInfo | null
}

interface State {
  buttonDisabled: boolean
  errorName: boolean
  name: string
  errorSurname: boolean
  surname: string
  errorPassword: boolean
  language: string
  password: string
  errorEmail: boolean
  email: string
  errorPhoneNumber: boolean
  phoneNumber: string
}

const MyInfoSection: FC<InfoProps> = (props): ReactElement => {
  const { t, i18n }: any = useTranslation()

  const initialState = {
    buttonDisabled: true,
    name: props.datas!.name,
    surname: props.datas!.surname,
    email: props.datas!.email,
    password: props.datas!.password,
    phoneNumber: props.datas!.phone,
    language: i18n.language,
    errorName: false,
    errorSurname: false,
    errorEmail: false,
    errorPhoneNumber: false,
    errorPassword: false,
  }

  const lngs = [
    { label: t("login.italian"), value: t("login.italian") },
    { label: t("login.english"), value: t("login.english") },
  ]

  const [state, setState] = useState<State>(initialState)

  useEffect(() => {
    let handleErrorButton: boolean = false
    if (
      !state.errorName &&
      !state.errorEmail &&
      !state.errorSurname &&
      !state.errorPassword &&
      !state.errorPhoneNumber
    ) {
      handleErrorButton = true
    }
    setState({
      ...state,
      buttonDisabled: handleErrorButton,
    })
  }, [
    state.errorEmail,
    state.errorName,
    state.errorPassword,
    state.errorPhoneNumber,
    state.errorSurname,
  ])

  useEffect(() => {
    console.log(state)
  }, [state])

  const submit = (): void => {
    setState({
      ...state,
      errorName: !checkText(state.name),
      errorSurname: !checkText(state.surname),
      errorEmail: !checkEmail(state.email),
      errorPhoneNumber: !checkPhone(state.phoneNumber),
      errorPassword: !checkPassword(state.password),
    })
    i18n.changeLanguage(state.language)
  }

  function setName(val: React.ChangeEvent<HTMLInputElement>): void {
    setState({
      ...state,
      name: val.target.value,
      buttonDisabled: false,
    })
  }
  function setSurname(val: React.ChangeEvent<HTMLInputElement>): void {
    setState({
      ...state,
      surname: val.target.value,
      buttonDisabled: false,
    })
  }
  function setEmail(val: React.ChangeEvent<HTMLInputElement>): void {
    setState({
      ...state,
      email: val.target.value,
      buttonDisabled: false,
    })
  }
  function setPassword(val: React.ChangeEvent<HTMLInputElement>): void {
    setState({
      ...state,
      password: val.target.value,
      buttonDisabled: false,
    })
  }
  function setPhoneNumber(val: React.ChangeEvent<HTMLInputElement>): void {
    setState({
      ...state,
      phoneNumber: val.target.value,
      buttonDisabled: false,
    })
  }

  function setLanguage(val: string) {
    let language: string = ""
    if (val === t("login.italian")) language = "it"
    if (val === t("login.english")) language = "en"
    setState({
      ...state,
      language: language,
      buttonDisabled: false,
    })
  }

  function disableAccount(): void {
    console.log("disabled")
  }

  return (
    <section className="myInfo-container">
      <form action="" className={"form"} onSubmit={submit}>
        <div className={"input-box my-input-container"}>
          <InputBox
            label={t("login.name")}
            defaultValue={props.datas?.name}
            callbackChange={setName}
            type={"text"}
            isRequired={true}
            notValid={state.errorName}
          />
          <InputBox
            defaultValue={props.datas?.surname}
            callbackChange={setSurname}
            label={t("login.surname")}
            type={"text"}
            isRequired={true}
            notValid={state.errorSurname}
          />
        </div>
        <div className={"input-box my-input-container"}>
          <InputBox
            defaultValue={props.datas?.email}
            label={t("login.email")}
            callbackChange={setEmail}
            type={"email"}
            isRequired={true}
            notValid={state.errorEmail}
          />
          <InputBox
            defaultValue={props.datas?.password}
            label={t("login.password")}
            callbackChange={setPassword}
            type={"password"}
            isRequired={true}
            notValid={state.errorPassword}
          />
        </div>
        <div className={"input-box my-input-container"}>
          <InputBox
            defaultValue={props.datas?.phone}
            callbackChange={setPhoneNumber}
            label={t("login.phone")}
            type={"text"}
            notValid={state.errorPhoneNumber}
          />
          <SelectBox
            label={t("login.language")}
            items={lngs}
            callbackChange={setLanguage}
            defaultValue={
              i18n.language === "it" ? t("login.italian") : t("login.english")
            }
          />
        </div>
        <div className={"input-box my-input-container buttons-container"}>
          <CustomButton
            label={t("buttons.disableAccount")}
            isDisable={false}
            size={"big"}
            colorType="primary"
            callback={disableAccount}
          />
          <CustomButton
            label={t("buttons.modifyButton")}
            isDisable={state.buttonDisabled}
            size={"big"}
            colorType="primary"
            callback={submit}
          />
        </div>
      </form>
    </section>
  )
}

export default MyInfoSection
