import { FC, useEffect, useState } from "react";

//translation
import { useTranslation } from "react-i18next";

//components
import Footer from "../components/hooks/Footer/Footer";
import PreFooter from "../components/hooks/preFooter/PreFooter";
import Header from "../components/hooks/Header/Header";
import InputBox from "../components/hooks/inputBox/InputBox";
import SelectBox from "../components/hooks/inputBox/SelectBox";
import InputCheckbox from "../components/hooks/inputBox/InputCheckbox";
import CustomButton from "../components/ui/buttons/CustomButton/CustomButton";
import HelmetComponent from "../components/ui/HelmetComponent/HelmetComponent";

//navigation
import SCREENS from "../route/router";
import { Link, useNavigate } from "react-router-dom";

//api
import { signUpApi } from "../services/api/authApi";

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

//mui
import { Typography } from "@mui/material";
import GenericModal from "../components/hooks/GenericModal/GenericModal";

interface State {
  errorName: boolean;
  errorSurname: boolean;
  errorEmail: boolean;
  errorPhone: boolean;
  errorPassword: boolean;
  errorConfirmPassword: boolean;
  isChecked: boolean;
  isClicked: boolean;
  modal: {
    isOpen: boolean;
    message: string;
  };
}

const initialState = {
  errorName: false,
  errorSurname: false,
  errorEmail: false,
  errorPhone: false,
  errorPassword: false,
  errorConfirmPassword: false,
  isChecked: false,
  isClicked: false,
  modal: {
    isOpen: false,
    message: "",
  },
};

let data: any = {
  name: "",
  surname: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  lng: "IT",
};

let handleErrorSubmit: boolean = true;

const SignUp: FC = () => {
  const [state, setState] = useState<State>(initialState);
  const { t }: any = useTranslation();
  const navigate: Function = useNavigate();

  const lngs: Array<language> = [
    { label: t("login.italian"), value: t("login.italian") },
    { label: t("login.english"), value: t("login.english") },
  ];

  async function handleSignUp(obj: any): Promise<void> {
    let result = await signUpApi(obj);
    console.log(result);

    let open: boolean = false;
    let message: string = "";

    switch (result.status) {
      case 200:
        open = true;
        message = t("login.signupSuccess");
        break;
      case 503:
        open = true;
        message = t("login.alreadyExist");
        break;
      default:
        open = true;
        message = t("form.serverError");
        console.log("something went wrong");
        return;
    }
    setState({
      ...state,
      modal: {
        isOpen: open,
        message: message,
      },
    });
  }

  const openModal = (): void => {
    setState({
      ...state,
      modal: {
        isOpen: !state.modal.isOpen,
        message: "",
      },
    });
  };

  const goToLogin = (): void => {
    setState({
      ...state,
      modal: {
        isOpen: !state.modal.isOpen,
        message: state.modal.message,
      },
    });
    if (state.modal.message === t("login.signupSuccess"))
      navigate(SCREENS.login);
  };

  useEffect(() => {    
    console.log(!state.errorName,
      !state.errorEmail,
      !state.errorSurname,
      !state.errorPassword,
      !state.errorConfirmPassword,
      !state.errorPhone,
      state.isChecked);
    
    if (
      !state.errorName &&
      !state.errorEmail &&
      !state.errorSurname &&
      !state.errorPassword &&
      !state.errorConfirmPassword &&
      !state.errorPhone &&
      state.isChecked
    ) {
      handleErrorSubmit = false;
    }
  }, [
    state.errorEmail,
    state.errorName,
    state.errorPassword,
    state.errorPhone,
    state.errorSurname,
  ]);

  useEffect(() => {
    console.log(handleErrorSubmit);
    if (handleErrorSubmit === false)
      handleSignUp({
        name: data.name,
        surname: data.surname,
        email: data.email,
        phone: data.phone,
        password: data.password,
        language: data.lng,
      });
  }, [state.isClicked]);

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

  const setLanguage = (e: React.ChangeEvent<HTMLInputElement>): void => {
    console.log(e);
    data.lng = e.target.value === `${t("login.italian")}` ? "IT" : "EN";
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
      isClicked: !state.isClicked,
    });
  };

  return (
    <>
      <HelmetComponent metatitleOn={true} title="signup" />

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
            <SelectBox
              label={t("login.language")}
              items={lngs}
              callbackChange={setLanguage}
            />
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

        <GenericModal open={state.modal.isOpen} callback={openModal}>
          <div className="children-modal">
            <Typography variant="body1">{state.modal.message}</Typography>
            <CustomButton
              label={t("confirm")}
              isDisable={false}
              size={"big"}
              colorType="secondary"
              callback={goToLogin}
            />
          </div>
        </GenericModal>
      </main>

      <PreFooter />
      <Footer />
    </>
  );
};

export default SignUp;
