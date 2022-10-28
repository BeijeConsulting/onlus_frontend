import { FC, useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import axios from "axios"

import Header from "../components/hooks/Header/Header"
import Footer from "../components/footer/Footer"

interface State {}

const initialState = {}

const Faq: FC = () => {
  const [state, setState] = useState<State>(initialState)
  const { t }: any = useTranslation()

  return (
    <>
      <Header />
      <main id={"faq"}></main>
      <Footer />
    </>
  )
}

export default Faq
