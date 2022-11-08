import { FC } from "react";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

// mediaquery
import { useMediaQuery } from "react-responsive";
// translation
import { useTranslation } from "react-i18next";
// navigazione
import { useNavigate } from "react-router-dom";
// redux
import { useSelector } from "react-redux";
// components
import CustomButton from "../../ui/buttons/CustomButton/CustomButton";

// style
import "./footer.scss";

import { social, contact, color } from "../../../utils/type";

import SCREENS from "../../../route/router";


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
  const CONTACTS: contact = useSelector(
    (state: any) => state.generalDuck.contacts
  );
  // popolo social
  const SOCIAL: Array<social> = useSelector(
    (state: any) => state.generalDuck.social
  );
  // POPOLO IL COLOR PALLETTE
  const PALLETTE: Array<color> = useSelector(
    (state: any) => state.generalDuck.pallette
  );
  // inizializzo navigazione
  let navigate = useNavigate();

  // navigazione
  const goTo = (params:string) => (): void => {
    navigate(params);
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
              <Typography variant="body1">{el.name}</Typography>
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
        <Typography variant="h4" className="titleContacts">
          {t("footer.contacts")}
        </Typography>
        <ul className="contactsList">
          <li>
            <Typography variant="body1">{CONTACTS.phone}</Typography>
          </li>
          <li>
            <Typography variant="body1">{CONTACTS.email}</Typography>
          </li>
          <li>
            <Typography variant="body1">{CONTACTS.address}</Typography>
          </li>
          <li>
            <Typography variant="body1">P.Iva: {CONTACTS.PIva}</Typography>
          </li>
          <li>
            <Typography variant="body1">C.F: {CONTACTS.CF}</Typography>
          </li>
        </ul>
      </section>
      <section className="social">{SOCIAL.map(mapping)}</section>
      <Mobile>
        <div className="buttonContainer">
          <CustomButton
            colorType="primary"
            callback={goTo(SCREENS.login)}
            label={"LOGIN"}
            size={"small"}
          />
        </div>
      </Mobile>
      <Default>
        <section className="nav">
          <Typography variant="body1" onClick={goTo(SCREENS.home)}>
            {t("nav.home")}
          </Typography>
          <Typography variant="body1" onClick={goTo(SCREENS.about)}>
            {t("nav.about")}
          </Typography>
          <Typography variant="body1" onClick={goTo(SCREENS.events)}>
            {t("nav.events")}
          </Typography>
          <Typography variant="body1" onClick={goTo(SCREENS.blog)}>
            {t("nav.blog")}
          </Typography>
          <Typography variant="body1" onClick={goTo(SCREENS.support)}>
            {t("nav.supportUs")}
          </Typography>
          <Typography variant="body1" onClick={goTo(SCREENS.faq)}>
            {t("nav.info")}
          </Typography>
        </section>
      </Default>
      <section className="privacy">
        <Link to="#">
          <Typography variant="body1">{t("footer.privacyPolicy")} </Typography>
        </Link>
        <Link to="#">
          <Typography variant="body1">{t("footer.cookiePolicy")} </Typography>
        </Link>
        <Link to="#">
          <Typography variant="body1">{t("footer.terms")} </Typography>
        </Link>
        <Default>
          <div className="buttonContainer">
            <CustomButton
              colorType="primary"
              callback={goTo(SCREENS.login)}
              label={"LOGIN"}
              size={"small"}
            />
          </div>
        </Default>
      </section>

      <Typography className="rightReserved">
        {t("footer.rightReserved")}
      </Typography>
    </footer>
  );
};

export default Footer;
