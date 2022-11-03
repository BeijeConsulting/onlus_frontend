import { FC } from "react";
// mediaquery
import { useMediaQuery } from "react-responsive";
// translation
import { useTranslation } from "react-i18next";
// navigazione
import { useNavigate } from "react-router-dom";
// redux
import { useSelector } from 'react-redux'
// components
import CustomButton from "../ui/buttons/CustomButton/CustomButton";
// style
import "./footer.scss";
import SCREENS from "../../route/router";

// type
type social = {
  name: string;
  icon: any; //come tipizzare image? come ce lo passa backend? (string)
  link: string;
  footerOn: boolean;
  homepageOn: boolean;
};
// contacts
type contactsTypo = {
  phone: number,
  email: string,
  address: string,
  PIva: string,
  CF: string,
}
// color
type color = {
  name: string,
  bgColor: string,
  textColor: string
}

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

  // popolo contacts
  const CONTACTS: contactsTypo = useSelector((state: any) => state.generalDuck.contacts)
  // popolo social
  const SOCIAL: Array<social> = useSelector((state: any) => state.generalDuck.social)
  // POPOLO IL COLOR PALLETTE
  const PALLETTE: Array<color> = useSelector((state: any) => state.generalDuck.pallette)
  // inizializzo navigazione
  let navigate = useNavigate();

  // navigazione
  const goToHome = (): void => {
    navigate(SCREENS.home);
  };
  const goToAbout = (): void => {
    navigate(SCREENS.about);
  };
  const goToEvents = (): void => {
    navigate(SCREENS.events);
  };
  const goToBlog = (): void => {
    navigate(SCREENS.blog);
  };
  const goToSupport = (): void => {
    navigate(SCREENS.support);
  };
  const goToInfo = (): void => {
    navigate(SCREENS.faq);
  };
  const goToLogin = (): void => {
    navigate(SCREENS.login);
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
    <footer style={{ backgroundColor: PALLETTE[0].bgColor }} id="footer">
      <section className="contacts">
        <div className="titleContacts">{t("footer.contacts")}</div>
        <ul className="contactsList">
          <li>{CONTACTS.phone}</li>
          <li>{CONTACTS.email}</li>
          <li>{CONTACTS.address}</li>
          <li>P.Iva: {CONTACTS.PIva}</li>
          <li>C.F: {CONTACTS.CF}</li>
        </ul>
      </section>
      <section className="social">{SOCIAL.map(mapping)}</section>
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
          <div onClick={goToHome}>{t("nav.home")}</div>
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
