import { useState, useEffect, FC } from "react"
import { useTranslation } from "react-i18next"

//axios
import axios, { AxiosResponse } from "axios"

//helmet
import { Helmet } from "react-helmet"

//Components

import Footer from "../components/hooks/Footer/Footer"
import Header from "../components/hooks/Header/Header"
import Hero from "../components/hooks/Hero/Hero"
import JoinUs from "../components/hooks/joinUsBbox/JoinUsBox"
import PreFooter from "../components/hooks/preFooter/PreFooter"

//type
import { content } from "../utils/type"

//Styles
import "../styles/about.scss"
import { Typography } from "@mui/material"

interface State {
  content: Array<content>
}

const initialState: State = {
  content: [],
}

const About: FC = () => {
  const { t }: any = useTranslation()
  const [state, setState] = useState<State>(initialState)

  useEffect(() => {
    fetchDatas()
  }, [])

  async function fetchDatas() {
    let result: AxiosResponse = await axios.get("mockAPI/about.json")
    console.log(result)
    setState({ content: result.data.about.content })
  }
  const mappingContent = (item: content, key: number) => {
    return (
      <section className="content-about-container" key={key}>
        <Typography variant="body1">{item.paragraph}</Typography>
        <div className="img-container">
          <img className="img-about" src={item.media?.content} alt="hero-img" />
        </div>
      </section>
    )
  }

  return (
    <>
      <Helmet>
        <title>Onlus - {t("metaTitles.about")}</title>
        <meta name="description" content={`${t("metaTitles.about")} page`} />
      </Helmet>

      <Header />

      <main id="about">
        <Hero
          type={"about"}
          title={"Frase motivazionale super d'effetto per convincerti a donare"}
          image={"pandaImg.jpg"}
        />
        <section className="sectionContainer">
          <Typography variant="h1">{t("nav.about")}</Typography>
          {state.content.map(mappingContent)}
        </section>
      </main>
      <JoinUs type="support" />

      <PreFooter />
      <Footer />
    </>
  )
}

export default About
