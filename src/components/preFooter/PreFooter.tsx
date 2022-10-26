import React from 'react'
// style
import './prefooter.scss'
// translation
import { useTranslation } from "react-i18next"

// mokup
const contacts = {
    telephone: "+39 331 211 345",
    email: "panda@gmail.com",
    address: "via dei panda 2, Milano, Italy",
    PIva: "IT 0221212121210212",
    CF: "8008976565786",
}

const logo =  'https://st2.depositphotos.com/1035649/10943/v/600/depositphotos_109435792-stock-illustration-panda-bear-template.jpg'


function PreFooter() {

    // tranlation hook
    const { t }: any = useTranslation()

    return (
        <mark id='prefooter'>
            <div className='logo'>
                <img src={logo} alt="" />
            </div>
            <div className='infoContact'>
                <p>
                    {t("preFooter.caption")}
                </p>
                <h6>
                    {contacts.email}
                </h6>
            </div>
        </mark>
    )
}

export default PreFooter