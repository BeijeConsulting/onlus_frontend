import { FC } from "react"
import { Routes, Route } from "react-router-dom"
import { createTheme, ThemeProvider } from "@mui/material/styles"

// Screens
import About from "./screens/About"
import Article from "./screens/Article"
import Blog from "./screens/Blog"
import Donate from "./screens/Donate"
import Events from "./screens/Events"
import Faq from "./screens/Faq"
import Home from "./screens/Home"
import Login from "./screens/Login"
import NotFound from "./screens/NotFound"
import PersonalArea from "./screens/PersonalArea"
import SignUp from "./screens/SignUp"
import Support from "./screens/Support"
import ResetPassword from "./screens/ResetPassword"
import ConfirmDonation from "./screens/ConfirmDonation"

import SCREENS from "./route/router"
import { theme } from "./utils/muiTheme"

import { StyledEngineProvider } from "@mui/material"

import "./App.scss"

const App: FC = () => {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <div className="app">
          <Routes>
            <Route path={SCREENS.home} element={<Home />} />
            <Route path={SCREENS.about} element={<About />} />
            <Route path={SCREENS.article} element={<Article />} />
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
      </ThemeProvider>
    </StyledEngineProvider>
  )
}

export default App
