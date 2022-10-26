import { useEffect, FC } from "react"
import { useTranslation, Trans } from "react-i18next"
import Footer from "../components/footer/Footer"

const Home: FC = () => {
  const { t, i18n }: any = useTranslation()

  return (
    <div>
      {t("search")}

      <button onClick={() => i18n.changeLanguage("en")}>EN</button>
      <button onClick={() => i18n.changeLanguage("it")}>IT</button>
      <Footer/>
    </div>
  )
}

export default Home
