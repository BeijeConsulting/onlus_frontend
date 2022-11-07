import { FC, useEffect, useState } from "react";
// import router
import { Routes, Route } from "react-router-dom";
// import redux
import { setGeneral } from "./redux/duck/general";
import { useDispatch } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material/styles";

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
import axios from "axios";
// import route
// import mui
import ResetPassword from "./screens/ResetPassword";
import ConfirmDonation from "./screens/ConfirmDonation";

import SCREENS from "./route/router";
import { theme } from "./utils/muiTheme";

import { StyledEngineProvider } from "@mui/material";
import DataUsageSharpIcon from '@mui/icons-material/DataUsageSharp';


// import style
import "./App.scss";

// state
interface State {
  isLoaded: boolean
}
// inizializzazione
const initialState = {
  isLoaded: false
};

const App: FC = () => {
  const [state, setState] = useState<State>(initialState)
  // hook redux x inviare dati di general
  const dispatch: Function = useDispatch();
  // useeffect per inviare dati all'avvio
  useEffect(() => {
    fetchDatas();
  }, []);
  // funzione per recuperare i dati da chiamata api
  async function fetchDatas() {
    // estrapolo i dati dalle chiamate
    let generalResult: any = await axios.get("mockAPI/general.json");
    let socialResult: any = await axios.get("mockAPI/social.json");
    const social: Array<Object> = socialResult.data.response;
    // compongo l'oggetto da mandare a redux
    const generalData: Object = {
      ...generalResult.data.response,
      social,
    };
    // modifico gli stati su redux
    dispatch(setGeneral(generalData));
    setState({
      ...state,
      isLoaded: true
    })
  }

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        {
          state.isLoaded ?
            <div className="app">
              <Routes>
                <Route path={SCREENS.home} element={<Home />} />
                <Route path={SCREENS.about} element={<About />} />
                <Route path={SCREENS.article + "/:id"} element={<Article />} />
                <Route path={SCREENS.blog} element={<Blog />} />
                <Route path={SCREENS.donate} element={<Donate />} />
                <Route path={SCREENS.confirmDonate} element={<ConfirmDonation />} />
                <Route path={SCREENS.events} element={<Events />} />
                <Route path={SCREENS.faq} element={<Faq />} />
                <Route path={SCREENS.login} element={<Login />} />
                <Route path={SCREENS.resetPassword} element={<ResetPassword />} />
                <Route path={SCREENS.personalArea} element={<PersonalArea />} />
                <Route path={SCREENS.signup} element={<SignUp />} />
                <Route path={SCREENS.support} element={<Support />} />
                <Route path={SCREENS.notFound} element={<NotFound />} />
              </Routes>
            </div>
            :
            <div className="app loading-button">
              <DataUsageSharpIcon/>
            </div>
        }
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
