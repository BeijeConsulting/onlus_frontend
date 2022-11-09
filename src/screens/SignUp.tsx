import { FC, useState } from "react";

//translation
import { useTranslation } from "react-i18next";

//helmet
import { Helmet } from "react-helmet";

//components
import Footer from "../components/hooks/Footer/Footer";
import PreFooter from "../components/hooks/preFooter/PreFooter";
import Header from "../components/hooks/Header/Header";
import InputBox from "../components/hooks/inputBox/InputBox";
import SelectBox from "../components/hooks/inputBox/SelectBox";
import InputCheckbox from "../components/hooks/inputBox/InputCheckbox";
import CustomButton from "../components/ui/buttons/CustomButton/CustomButton";

//navigation
import SCREENS from "../route/router";
import { Link } from "react-router-dom";

//type
import {
  checkText,
  checkEmail,
  checkPhone,
  checkPassword,
  checkConfirmPassword,
} from "../utils/checkForm";

//style
import "../styles/signup.scss";

//type
import { language } from "../utils/type";
import { Typography } from "@mui/material";

interface State {
  errorName: boolean;
  errorSurname: boolean;
  errorEmail: boolean;
  errorPhone: boolean;
  errorPassword: boolean;
  errorConfirmPassword: boolean;
  isChecked: boolean;
}

const initialState = {
  errorName: false,
  errorSurname: false,
  errorEmail: false,
  errorPhone: false,
  errorPassword: false,
  errorConfirmPassword: false,
  isChecked: false,
};

let data: any = {
  name: "",
  surname: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  lng: "",
};

const SignUp: FC = () => {
  const [state, setState] = useState<State>(initialState);
  const { t }: any = useTranslation();

  const lngs: Array<language> = [
    { label: t("login.italian"), value: t("login.italian") },
    { label: t("login.english"), value: t("login.english") },
  ];

  const setName = (name: React.ChangeEvent<HTMLInputElement>): void => {
    data.name = name.target.value;
    setState({
      ...state,
      errorName: false,
    });
  };

  const setSurname = (surname: React.ChangeEvent<HTMLInputElement>): void => {
    data.surname = surname.target.value;
    setState({
      ...state,
      errorSurname: false,
    });
  };

  const setEmail = (email: React.ChangeEvent<HTMLInputElement>): void => {
    data.email = email.target.value;
    setState({
      ...state,
      errorEmail: false,
    });
  };

  const setPhone = (phone: React.ChangeEvent<HTMLInputElement>): void => {
    data.phone = phone.target.value;
    setState({
      ...state,
      errorPhone: false,
    });
  };

  const setPassword = (password: React.ChangeEvent<HTMLInputElement>): void => {
    data.password = password.target.value;
    setState({
      ...state,
      errorPassword: false,
    });
  };

  const setConfirmPassword = (
    confirmPassword: React.ChangeEvent<HTMLInputElement>
  ): void => {
    data.confirmPassword = confirmPassword.target.value;
    setState({
      ...state,
      errorConfirmPassword: false,
    });
  };

  const setTerms = (e: boolean): void => {
    setState({
      ...state,
      isChecked: e,
    });
  };

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
    });
    console.log("check password", checkPassword(data.password));
  };
  return (
    <>
      <Helmet>
        <title>Onlus - {t("metaTitles.signup")}</title>
        <meta name="description" content={`${t("metaTitles.signup")} page`} />
      </Helmet>

      <Header />

      <main id="signup" className="sectionContainer">
        <Typography variant="h1">{t("titles.signupTitle")}</Typography>
        <form action="" className={"form"} onSubmit={submit}>
          <div className={"input-box"}>
            <InputBox
              label={t("login.name")}
              type={"text"}
              isRequired={true}
              callbackChange={setName}
              notValid={state.errorName}
              errorLabel={t("form.errorName")}
            />
            <InputBox
              label={t("login.surname")}
              type={"text"}
              isRequired={true}
              callbackChange={setSurname}
              notValid={state.errorSurname}
              errorLabel={t("form.errorSurname")}
            />
          </div>
          <div className={"input-box"}>
            <InputBox
              label={t("login.email")}
              type={"email"}
              isRequired={true}
              callbackChange={setEmail}
              notValid={state.errorEmail}
              errorLabel={t("form.errorEmail")}
            />
            <InputBox
              label={t("login.phone")}
              type={"number"}
              callbackChange={setPhone}
              notValid={state.errorPhone}
              errorLabel={t("form.errorPhone")}
            />
          </div>
          <div className={"input-box"}>
            <InputBox
              label={t("login.password")}
              type={"password"}
              isRequired={true}
              callbackChange={setPassword}
              notValid={state.errorPassword}
              errorLabel={t("form.errorPassword")}
            />
            <InputBox
              label={t("login.confirmPassword")}
              type={"password"}
              isRequired={true}
              callbackChange={setConfirmPassword}
              notValid={state.errorConfirmPassword}
              errorLabel={t("form.errorConfirmPassword")}
            />
          </div>
          <div className="input-box">
            <SelectBox label={t("login.language")} items={lngs} />
          </div>
          <InputCheckbox
            label={t("login.acceptTerms")}
            callbackChange={setTerms}
          />
          <CustomButton
            label={t("buttons.signupButton")}
            size={"big"}
            colorType="primary"
            callback={submit}
            isDisable={!state.isChecked}
          />
        </form>
        <div className="aside-section">
          <Typography variant="body2">
            {t("login.alreadyRegistered")}
          </Typography>
          <Link to={SCREENS.login}>
            <Typography variant="body2">{t("buttons.loginButton")}</Typography>
          </Link>
        </div>
      </main>

      <PreFooter />
      <Footer />
    </>
  );
};

export default SignUp;
