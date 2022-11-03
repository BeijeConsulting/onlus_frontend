import React,{FC} from 'react'
// style
import './prefooter.scss'
// translation
import { useTranslation } from "react-i18next"
// redux
import { useSelector } from 'react-redux'


const PreFooter:FC = () => {

    const LOGO = useSelector((state:any) => state.generalDuck.logo)
    const BANNER = useSelector((state:any) => state.generalDuck.sectionWork)

    // tranlation hook
    const { t }: any = useTranslation()

    return (
        <mark id='prefooter'>
            <div className='logo'>
                <img src={LOGO} alt="" />
            </div>
            <div className='infoContact'>
                <p>
                    {t("preFooter.caption")}
                </p>
                <h6>
                    {BANNER.email}
                </h6>
            </div>
        </mark>
    )
}

export default PreFooter