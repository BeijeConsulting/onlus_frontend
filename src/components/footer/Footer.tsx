import { FC } from 'react'
// mediaquery
import { useMediaQuery } from 'react-responsive'
// translation
import { useTranslation } from "react-i18next"
// style
// import styles from './footer.module.scss'
import './footer.scss'


// style
const primary: string = '#262E36'

// type
type social = {
    name: string,
    icon: any, //come tipizzare image? come ce lo passa backend? (string)
    link: string,
    footerOn: boolean,
    homepageOn: boolean
}

// dati mokup 
// contatti
const contacts = {
    telephone: "telephone",
    email: "email",
    address: "address",
    PIva: "PIva",
    CF: "CF",
}
// social
const social: Array<social> = [
    {
        name: "Facebook",
        icon: "https://www.ancoraprint.it/cms/docs/archive/Facebookicona.png",
        link: "#",
        footerOn: true,
        homepageOn: false
    },
    {
        name: "Youtube",
        icon: "https://www.dayoffreedom.it/wp-content/uploads/2021/03/icona-bianca-youtube3.png",
        link: "#",
        footerOn: true,
        homepageOn: false
    },
    {
        name: "Twitter",
        icon: "https://fratelliscantamburlo.it/it/design/iconabiancatwitter.png",
        link: "#",
        footerOn: true,
        homepageOn: false
    },
    {
        name: "Instagram",
        icon: "https://www.rifipack.it/wp-content/uploads/2019/11/instagram-icona-font-awesome-bianca-buste-personalizzate-300x225.png",
        link: "#",
        footerOn: true,
        homepageOn: false
    },
]

//React responsive const
const Desktop = ({ children }: any) => {
    const isDesktop = useMediaQuery({ minWidth: 992 })
    return isDesktop ? children : null
}

const Footer: FC = () => {

    // tranlation hook
    const { t }: any = useTranslation()

    const mapping = (el: social, key: number): JSX.Element | boolean => {
        if (el.footerOn) {
            return (
                <div key={key}>
                    <img
                        className='socialIcon'
                        src={el.icon}
                    />
                    <Desktop>
                        <p>{el.name}</p>
                    </Desktop>
                </div>
            )
        } else {
            return false
        }

    }

    return (
        <footer style={{ backgroundColor: primary }} id='footer'>
            <section className="contacts">
                <h4 className='titleContacts'>
                    {t("footer.contacts")}
                </h4>
                <ul className='contactsList'>
                    <li>{contacts.telephone}</li>
                    <li>{contacts.email}</li>
                    <li>{contacts.address}</li>
                    <li>{contacts.PIva}</li>
                    <li>{contacts.CF}</li>
                </ul>
            </section>
            <section className='social'>
                {social.map(mapping)}
            </section>
            <Desktop>
                <section className='nav'>

                </section>
            </Desktop>
            <section className='privacy'>
                <a href='#'>{t("footer.privacyPolicy")} </a>
                <a href='#'>{t("footer.cookiePolicy")} </a>
                <a href='#'>{t("footer.terms")} </a>
            </section>

        </footer>
    )
}

export default Footer