//react
import { BaseSyntheticEvent, useState, useEffect } from "react";

//mui
import { Typography } from "@mui/material";

//Components
import Footer from "../components/hooks/Footer/Footer";
import Header from "../components/hooks/Header/Header";
import CustomButton from "../components/ui/buttons/CustomButton/CustomButton";
import InputBox from "../components/hooks/inputBox/InputBox";
import PreFooter from "../components/hooks/preFooter/PreFooter";
import HelmetComponent from "../components/ui/HelmetComponent/HelmetComponent";

//navigation
import SCREENS from "../route/router";
import { Link, useNavigate } from "react-router-dom";

//i18n
import { useTranslation } from "react-i18next";

//Styles
import "../styles/login.scss";

//functions
import { signInApi } from "../services/api/authApi";
import { setLoggedState, saveUserData } from "../redux/duck/user";
import { useDispatch, useSelector } from "react-redux";

interface State {
  email: string | null;
  password: string | null;
  errorLogin: boolean;
  errorMessage: string;
}

const initialState = {
  email: null,
  password: null,
  errorLogin: false,
  errorMessage: "",
};

function Login() {
  const dispatch: Function = useDispatch();
  const isLogged: boolean = useSelector(
    (state: any) => state.userDuck.isLoggedIn
  );
  const navigate: Function = useNavigate();
  const { t }: any = useTranslation();

  const [state, setState] = useState<State>(initialState);

  const checkLog = (): void => {
    if (isLogged) navigate(SCREENS.personalArea);
  };

  useEffect(() => {
    checkLog();
  }, []);

  const login = async (): Promise<void> => {
    let result: any = await signInApi(state.email, state.password);
    let errorLogin: boolean = false;
    let message: string = "";

    switch (result.status) {
      case 200:
        dispatch(setLoggedState(true));
        dispatch(saveUserData(result.data));
        sessionStorage.setItem(
          "userOnlus",
          JSON.stringify({ userId: result.data.id, isLoggedIn: true })
        );
        localStorage.setItem("onlusRefreshToken", result.data.refreshToken);
        localStorage.setItem("onlusToken", result.data.token);
        navigate(SCREENS.personalArea);
        break;
      case 400:
        errorLogin = true;
        message = t("form.accountDisabled");
        console.log("Utente disabilitato");
        break;
      case 401:
        errorLogin = true;
        message = t("form.errorLogin");
        console.log("Email e/o Passwork invalidi");
        break;
      default:
        errorLogin = true;
        message = t("form.serverError");
        console.log("Unkown error");
    }
    setState({
      ...state,
      errorLogin: errorLogin,
      errorMessage: message,
    });
  };

  function getEmail(val: BaseSyntheticEvent) {
    setState({
      ...state,
      email: val.target.value,
      errorLogin: false,
    });
  }

  function getPsw(val: BaseSyntheticEvent) {
    setState({
      ...state,
      password: val.target.value,
      errorLogin: false,
    });
  }

  return (
    <>
      <HelmetComponent metatitleOn={true} title="login" />

      <Header />

      <main id="login" className="sectionContainer">
        <Typography variant="h1">{t("titles.loginTitle")}</Typography>
        <form className="login-container" onSubmit={login}>
          <InputBox
            label={t("login.email")}
            type={"mail"}
            callbackChange={getEmail}
            notValid={state.errorLogin}
          />
          <InputBox
            label={t("login.password")}
            type={"password"}
            callbackChange={getPsw}
            notValid={state.errorLogin}
            errorLabel={state.errorMessage}
          />

          <Link to={"/reset-password"} className="forgot-password">
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
  );
}

export default Login;
