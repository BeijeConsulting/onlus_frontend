import { FC, useEffect, useState } from "react";
// import router
import { Routes, Route } from "react-router-dom";
// import redux
import { setGeneral } from "./redux/duck/general";
import { useDispatch } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";

// Screens
import About from "./screens/About";
import Article from "./screens/Article";
import Blog from "./screens/Blog";
import Donate from "./screens/Donate";
import Events from "./screens/Events";
import Faq from "./screens/Faq";
import Home from "./screens/Home";
import Login from "./screens/Login";
import NotFound from "./screens/NotFound";
import PersonalArea from "./screens/PersonalArea";
import SignUp from "./screens/SignUp";
import Support from "./screens/Support";
import ScrollToTop from "./utils/ScrollToTop";
import CookieBanner from "./components/hooks/CookieBanner/CookieBanner";

// import mui
import ResetPassword from "./screens/ResetPassword";
import ConfirmDonation from "./screens/ConfirmDonation";

import SCREENS from "./route/router";
import { theme } from "./utils/muiTheme";

import { StyledEngineProvider } from "@mui/material";
import Loader from "./assets/images/loader.jpg";

// import style
import "./App.scss";
//Api
import { getSocial } from "./services/api/socialApi";
import { getCustomization } from "./services/api/customizationApi";
import { social } from "./utils/type";
import { getUserApi } from "./services/api/authApi";
import { saveUserData } from "./redux/duck/user";
import { useTranslation } from "react-i18next";

// state
interface State {
  isLoaded: {
    general: boolean;
    social: boolean;
    status: "notReady" | "apiOk" | "apiNotOk"; //"notReady" | "apiOk" | "apiNotOk"
  };
}
// inizializzazione
const initialState: State = {
  isLoaded: {
    general: false,
    social: false,
    status: "notReady",
  },
};

const App: FC = () => {
  const [state, setState] = useState<State>(initialState);
  const { t }: any = useTranslation();

  // hook redux x inviare dati di general
  const dispatch: Function = useDispatch();

  // useeffect per inviare dati all'avvio
  useEffect(() => {
    fetchDatas();
  }, []);

  // funzione per recuperare i dati da chiamata api
  const fetchDatas = async (): Promise<void> => {
    let general: boolean = false,
      social: boolean = false,
      ready: boolean = false;

    // estrapolo i dati dalle chiamate
    let generalResult: any = await getCustomization();
    if (generalResult.status === 200) general = true;

    let socialResult: any = await getSocial();
    if (socialResult.status === 200) social = true;

    social && general ? (ready = true) : (ready = false);

    if (ready) {
      const social: Array<social> = socialResult.data.social;

      // compongo l'oggetto da mandare a redux
      const generalData: Object = {
        ...generalResult.data,
        social,
      };

      //controllo sessionstorage
      let result: any = !!sessionStorage.getItem("userOnlus")
        ? JSON.parse(sessionStorage.getItem("userOnlus")!).userId
        : undefined;

      if (!!result) {
        let response: any = await getUserApi(result);
        dispatch(saveUserData(response.data));
      }

      // modifico gli stati su redux
      dispatch(setGeneral(generalData));
    }
    console.log(ready);

    setState({
      ...state,
      isLoaded: {
        general: general,
        social: social,
        status: ready ? "apiOk" : "apiNotOk",
      },
    });
  };

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        {state.isLoaded.status === "notReady" ? (
          <main>
            <img src={Loader} alt="loader" className="loader" />
          </main>
        ) : state.isLoaded.status === "apiOk" ? (
          <div className="app">
            <ScrollToTop />
            <Routes>
              <Route path={SCREENS.home} element={<Home />} />
              <Route path={SCREENS.about} element={<About />} />
              <Route path={SCREENS.article + "/:id"} element={<Article />} />
              <Route path={SCREENS.blog} element={<Blog />} />
              <Route path={SCREENS.donate} element={<Donate />} />
              <Route
                path={SCREENS.confirmDonate}
                element={<ConfirmDonation />}
              />
              <Route path={SCREENS.events} element={<Events />} />
              <Route path={SCREENS.faq} element={<Faq />} />
              <Route path={SCREENS.login} element={<Login />} />
              <Route path={SCREENS.resetPassword} element={<ResetPassword />} />
              <Route path={SCREENS.personalArea} element={<PersonalArea />} />
              <Route path={SCREENS.signup} element={<SignUp />} />
              <Route path={SCREENS.support} element={<Support />} />
              <Route path={SCREENS.notFound} element={<NotFound />} />
            </Routes>
            <CookieBanner />
          </div>
        ) : (
          <NotFound codeError={500} description={t("error.description")} />
        )}
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
