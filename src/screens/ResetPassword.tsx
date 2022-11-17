import { useState } from "react"

//mui
import { Typography } from "@mui/material"

//Components
import Footer from "../components/hooks/Footer/Footer"
import Header from "../components/hooks/Header/Header"
import CustomButton from "../components/ui/buttons/CustomButton/CustomButton"
import InputBox from "../components/hooks/inputBox/InputBox"
import PreFooter from "../components/hooks/preFooter/PreFooter"
import HelmetComponent from "../components/ui/HelmetComponent/HelmetComponent"

//i18n
import { useTranslation } from "react-i18next"

//Styles
import "../styles/resetPassword.scss"

//Check mail
import { checkEmail } from "../utils/checkForm"

interface State {
  errorEmail: boolean
}

const initialState = {
  errorEmail: false,
}

let data: any = {
  email: "",
}

function ResetPassword() {
  const [state, setState] = useState<State>(initialState)
  const { t }: any = useTranslation()

  const resetPassword = () => {
    setState({
      ...state,
      errorEmail: !checkEmail(data.email),
    })
  }

  const setEmail = (email: React.ChangeEvent<HTMLInputElement>): void => {
    data.email = email.target.value
    setState({
      ...state,
      errorEmail: false,
    })
  }

  return (
    <>
      <HelmetComponent metatitleOn={true} title="resetPassword" />

      <Header />

      <main id="resetPassword" className="sectionContainer">
        <Typography variant="h1">
          {t("forgotPassword.resetPassword")}
        </Typography>

        <form className="resetPassword-container" onSubmit={resetPassword}>
          <InputBox
            label={t("forgotPassword.labelReset")}
            type={"email"}
            callbackChange={setEmail}
            notValid={state.errorEmail}
          />

          <CustomButton
            size={"big"}
            callback={resetPassword}
            colorType="primary"
            label={t("forgotPassword.clickReset")}
          />
        </form>
      </main>

      <PreFooter />
      <Footer />
    </>
  )
}

export default ResetPassword
