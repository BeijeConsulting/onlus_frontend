import { FC } from "react";
// mediaquery
import { useMediaQuery } from "react-responsive";
// translation
import { useTranslation } from "react-i18next";
// navigazione
import { useNavigate } from "react-router-dom";
// components
import CustomButton from "../ui/buttons/CustomButton/CustomButton";
// style
import "./footer.scss";

// style
const primary: string = "#262E36";
const secondary: string = "#B12009";

// type
type social = {
  name: string;
  icon: any; //come tipizzare image? come ce lo passa backend? (string)
  link: string;
  footerOn: boolean;
  homepageOn: boolean;
};

// dati mokup
// contatti
const contacts = {
  telephone: "+39 331 211 345",
  email: "panda@gmail.com",
  address: "via dei panda 2, Milano, Italy",
  PIva: "IT 0221212121210212",
  CF: "8008976565786",
};
// social
const social: Array<social> = [
  {
    name: "Facebook",
    icon: "https://www.ancoraprint.it/cms/docs/archive/Facebookicona.png",
    link: "#",
    footerOn: true,
    homepageOn: false,
  },
  {
    name: "Youtube",
    icon: "https://www.dayoffreedom.it/wp-content/uploads/2021/03/icona-bianca-youtube3.png",
    link: "#",
    footerOn: true,
    homepageOn: false,
  },
  {
    name: "Twitter",
    icon: "https://fratelliscantamburlo.it/it/design/iconabiancatwitter.png",
    link: "#",
    footerOn: true,
    homepageOn: false,
  },
  {
    name: "Instagram",
    icon: "https://www.rifipack.it/wp-content/uploads/2019/11/instagram-icona-font-awesome-bianca-buste-personalizzate-300x225.png",
    link: "#",
    footerOn: true,
    homepageOn: false,
  },
];

//React responsive const
const Default = ({ children }: any) => {
  const isNotMobile = useMediaQuery({ minWidth: 992 });
  return isNotMobile ? children : null;
};
const Mobile = ({ children }: any) => {
  const isMobile = useMediaQuery({ maxWidth: 991 });
  return isMobile ? children : null;
};

const Footer: FC = () => {
  // inizializzo navigazione
  let navigate = useNavigate();

  // navigazione
  const goToAbout = (): void => {
    navigate("/about");
    console.log("vai ad about");
  };

  const goToEvents = (): void => {
    navigate("/events");
    console.log("vai ad Events");
  };

  const goToBlog = (): void => {
    navigate("/blog");
    console.log("vai a blog");
  };

  const goToSupport = (): void => {
    navigate("/support");
    console.log("vai a supportaci");
  };

  const goToInfo = (): void => {
    navigate("/faq");
    console.log("vai ad about");
  };

  const goToLogin = (): void => {
    navigate("/login");
    console.log("vai al login");
  };

  // tranlation hook
  const { t }: any = useTranslation();

  const mapping = (el: social, key: number): JSX.Element | boolean => {
    if (el.footerOn) {
      return (
        <div className="iconContainer" key={key}>
          <img className="socialIcon" src={el.icon} />
          <Default>
            <div>
              <p>{el.name}</p>
            </div>
          </Default>
        </div>
      );
    } else {
      return false;
    }
  };

  return (
    <footer style={{ backgroundColor: primary }} id="footer">
      <section className="contacts">
        <div className="titleContacts">{t("footer.contacts")}</div>
        <ul className="contactsList">
          <li>{contacts.telephone}</li>
          <li>{contacts.email}</li>
          <li>{contacts.address}</li>
          <li>P.Iva: {contacts.PIva}</li>
          <li>C.F: {contacts.CF}</li>
        </ul>
      </section>
      <section className="social">{social.map(mapping)}</section>
      <Mobile>
        <div className="buttonContainer">
          <CustomButton
            colorType="primary"
            callback={goToLogin}
            label={"LOGIN"}
            size={"small"}
          />
        </div>
      </Mobile>
      <Default>
        <section className="nav">
          <div onClick={goToAbout}>{t("nav.about")}</div>
          <div onClick={goToEvents}>{t("nav.events")}</div>
          <div onClick={goToBlog}>{t("nav.blog")}</div>
          <div onClick={goToSupport}>{t("nav.supportUs")}</div>
          <div onClick={goToInfo}>{t("nav.info")}</div>
        </section>
      </Default>
      <section className="privacy">
        <a href="#">{t("footer.privacyPolicy")} </a>
        <a href="#">{t("footer.cookiePolicy")} </a>
        <a href="#">{t("footer.terms")} </a>
        <Default>
          <div className="buttonContainer">
            <CustomButton
              colorType="primary"
              callback={goToLogin}
              label={"LOGIN"}
              size={"small"}
            />
          </div>
        </Default>
      </section>

      <span className="rightReserved">{t("footer.rightReserved")}</span>
    </footer>
  );
};

export default Footer;
