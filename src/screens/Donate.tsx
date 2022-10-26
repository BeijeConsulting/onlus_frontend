import { FC } from "react"
import { useTranslation } from "react-i18next"

//components
import Footer from "../components/footer/Footer"

//MUI

//style
import '../styles/donate.scss'

const Donate: FC = () => {
  const { t }: any = useTranslation()


  return (
    <>
      <div className='donateContainer'>
        <div className='titleDonate'>{t("personalArea.donate")}</div>
        <section className='personalData'>
          <div className='titlePersonalData'>{t("personalArea.personalData")}</div>
        </section>
        <section className='payment'>

        </section>

      </div>
      <Footer />
    </>

  )
}

export default Donate
