import { FC, useState, useEffect } from "react"

//fetch
import { getFAQs } from "../services/api/faqAPI"

//components
import Header from "../components/hooks/Header/Header"
import Footer from "../components/hooks/Footer/Footer"
import AccordionItem from "../components/hooks/AccordionItem/AccordionItem"
import HelmetComponent from "../components/ui/HelmetComponent/HelmetComponent"

//style
import "../styles/faq.scss"

//type
import { faq, infoType } from "../utils/type"

//mui
import { Typography, Skeleton } from "@mui/material"

interface State {
  data: infoType
}

const initialState = {
  data: null,
}

const Faq: FC = () => {
  const [state, setState] = useState<State>(initialState)

  useEffect(() => {
    fetchDatas()
  }, [])

  async function fetchDatas(): Promise<void> {
    let result: any = await getFAQs()

    setState({
      ...state,
      data: result.data,
    })
  }

  const mapFaq = (item: faq, key: number): JSX.Element => {
    return (
      <div key={key} style={{ minHeight: "70px" }}>
        <AccordionItem key={key} title={item.question} content={item.answer} />
      </div>
    )
  }

  return (
    <>
      <HelmetComponent metatitleOn={true} title="faq" />

      <Header />
      {state.data ? (
        <main id={"faq"} className="sectionContainer">
          <section>
            <Typography variant="h1">{state.data.info.title}</Typography>
            <Typography variant="body1">{state.data.info.text}</Typography>
          </section>
          <section>
            <Typography variant="h1">Faq</Typography>
            <div className="faq-container">{state.data.qna.map(mapFaq)}</div>
          </section>
        </main>
      ) : (
        <main id={"faq"} className="sectionContainer">
          <section>
            <Typography variant="h1">
              <Skeleton variant="text" animation="wave" width={300} />
            </Typography>
            <Typography variant="body1">
              <Skeleton variant="text" animation="wave" />
            </Typography>
            <Typography variant="body1">
              <Skeleton variant="text" animation="wave" />
            </Typography>
            <Typography variant="body1">
              <Skeleton variant="text" animation="wave" />
            </Typography>
          </section>

          <section>
            <Typography variant="h1">Faq</Typography>
            <div className="faq-container" style={{ minHeight: "70px" }}>
              <Skeleton variant="rectangular" animation="wave" />
            </div>
            <div className="faq-container" style={{ minHeight: "70px" }}>
              <Skeleton variant="rectangular" animation="wave" />
            </div>
            <div className="faq-container" style={{ minHeight: "70px" }}>
              <Skeleton variant="rectangular" animation="wave" />
            </div>
          </section>
        </main>
      )}
      <Footer />
    </>
  )
}

export default Faq
