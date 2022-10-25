import { useEffect } from "react"
import { useTranslation, Trans } from "react-i18next"

function Home() {
  const { t, i18n }: any = useTranslation()

  return (
    <div>
      {t("search")}

      <button onClick={() => i18n.changeLanguage("en")}>EN</button>
      <button onClick={() => i18n.changeLanguage("it")}>IT</button>
    </div>
  )
}

export default Home
