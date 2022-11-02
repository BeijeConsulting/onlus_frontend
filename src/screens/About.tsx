import { useState, useEffect, FC } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { Helmet } from "react-helmet"
import { Typography } from "@mui/material"

//Components
import Footer from "../components/hooks/Footer/Footer"
import Header from "../components/hooks/Header/Header"
import Hero from "../components/hooks/Hero/Hero"
import JoinUs from "../components/hooks/JoinUsBbox/JoinUsBox"
import PreFooter from "../components/hooks/PreFooter/PreFooter"

//Styles
import "../styles/about.scss"

interface State {
  content: Array<content>
}
type content = {
  text: string
  img: string
}

const initialState: State = {
  content: [],
}
const About: FC = () => {
  const { t }: any = useTranslation()
  const navigate: any = useNavigate()
  const [state, setState] = useState<State>(initialState)

  useEffect(() => {
    fetchDatas()
  }, [])

  function handleNavigate() {
    navigate("/donate")
  }

  async function fetchDatas() {
    let result: any = await axios.get("mockAPI/about.json")
    setState({ content: result.data.content })
  }
  const mappingContent = (item: any, key: any) => {
    return (
      <section className="content-about-container" key={key}>
        <Typography variant="body1">{item.text}</Typography>
        <div className="img-container">
          <img
            className="img-about"
            src={require(`../assets/images/${item.image}`)}
            alt="hero-img"
          />
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
