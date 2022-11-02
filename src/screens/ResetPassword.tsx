import { Helmet } from "react-helmet"
import { useState } from "react"
import { Typography } from "@mui/material";
//Components
import Footer from "../components/footer/Footer"
import Header from "../components/hooks/Header/Header"
import CustomButton from "../components/ui/buttons/CustomButton/CustomButton"
import InputBox from "../components/ui/inputBox/InputBox"
//i18n
import { useTranslation } from "react-i18next"
//Styles
import "../styles/resetPassword.scss"
import PreFooter from "../components/preFooter/PreFooter"
//Check mail
import {checkEmail} from "../utils/checkForm"


interface State {
    errorEmail: boolean
  }
  
  const initialState = {
    errorEmail: false
  }
  
  let data: any = {
    email: ""
  }

function ResetPassword() {
  const [state, setState] = useState<State>(initialState)
  const { t }: any = useTranslation()

  const resetPassword = () => {
    console.log("Reset Password")
    setState({
        ...state,
        errorEmail: !checkEmail(data.email),
      })
  }

  const setEmail = (email: any): void => {
    data.email = email.target.value
    setState({
      ...state,
      errorEmail: false,
    })
  }

  return (
    <>
      <Helmet>
        <title>Onlus - {t("metaTitles.resetPassword")}</title>
        <meta name="description" content={`${t("metaTitles.resetPassword")} page`} />
      </Helmet>

      <Header />

      <main id="resetPassword" className="sectionContainer">

        <Typography variant="h1">{t("forgotPassword.resetPassword")}</Typography>

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