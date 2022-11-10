//helmet
import { Helmet } from "react-helmet";

//react
import {BaseSyntheticEvent, useState, useEffect} from 'react'

//mui
import { Typography } from "@mui/material";

//Components
import Footer from "../components/hooks/Footer/Footer";
import Header from "../components/hooks/Header/Header";
import CustomButton from "../components/ui/buttons/CustomButton/CustomButton";
import InputBox from "../components/hooks/inputBox/InputBox";
import PreFooter from "../components/hooks/preFooter/PreFooter";

//navigation
import SCREENS from "../route/router";
import { Link, useNavigate } from "react-router-dom";

//i18n
import { useTranslation } from "react-i18next";

//Styles
import "../styles/login.scss";

//functions
import { signInApi } from "../services/api/signInApi";
import { setLoggedState, saveUserData } from '../redux/duck/user';
import { useDispatch, useSelector } from "react-redux";

interface State {
  email: string | null,
  password:string | null
}

function Login() {
  const dispatch:Function = useDispatch()
  const isLogged:boolean= useSelector((state:any)=>state.userDuck.isLoggedIn)
  const navigate:Function= useNavigate()
  const { t }: any = useTranslation();

  const [state, setState] = useState<State>({
    email: null,
    password: null,
  })

  const checkLog=():void=>{
    if(isLogged) navigate(SCREENS.personalArea)
  }

  useEffect(()=>{
    checkLog()
  },[])

  const login = async ():Promise<void> => {
    console.log(state);
    let result:any = await signInApi(state.email, state.password);

    switch(result.status){
      case 200:
        dispatch(setLoggedState(true))
        dispatch(saveUserData(result.data))
        sessionStorage.setItem("userOnlus", JSON.stringify({userId:result.data.id, isLoggedIn:true}))
        localStorage.setItem("onlusRefreshToken", result.data.refreshToken)
        navigate(SCREENS.personalArea)
        break;
      case 400:
        console.log("Utente disabilitato")
        break;
      case 401:
        console.log("Email e/o Passwork invalidi")
        break;
      default:
        console.log("Unkown error")
    }
  };

  function getEmail(val:BaseSyntheticEvent) {
    setState({
      ...state,
      email: val.target.value,
    })
  }

  function getPsw(val:BaseSyntheticEvent) {
    setState({
      ...state,
      password: val.target.value,
    })
  }

  return (
    <>
      <Helmet>
        <title>Onlus - {t("metaTitles.login")}</title>
        <meta name="description" content={`${t("metaTitles.login")} page`} />
      </Helmet>

      <Header />

      <main id="login" className="sectionContainer">
        <Typography variant="h1">{t("titles.loginTitle")}</Typography>
        <form className="login-container" onSubmit={login}>
          <InputBox label={t("login.email")} type={"mail"} callbackChange={getEmail} />
          <InputBox label={t("login.password")} type={"password"} callbackChange={getPsw} />

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
