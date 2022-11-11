import { FC, useEffect } from "react";

//mui
import { Typography } from "@mui/material";

// translation
import { useTranslation } from "react-i18next";

// navigation
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import SCREENS from "../../../route/router";

// redux
import { useSelector } from "react-redux";

// components
import CustomButton from "../../ui/buttons/CustomButton/CustomButton";

// style
import "./footer.scss";

//type
import { social, contact, color } from "../../../utils/type";

//responsive
import useResponsive from "../../../utils/useResponsive";

const Footer: FC = () => {

  const isLogged:boolean= useSelector((state:any)=>state.userDuck.isLoggedIn);

  // popolo contacts
  const CONTACTS: contact = useSelector(
    (state: any) => state.generalDuck.contacts
  );
  // popolo social
  const SOCIAL: Array<social> = useSelector(
    (state: any) => state.generalDuck.social
  );
  // POPOLO IL COLOR PALETTE
  const PALETTE: Array<color> = useSelector(
    (state: any) => state.generalDuck.palette
  );

  useEffect(() => {
    console.log(PALETTE);
  
    return () => {
      
    }
  }, [])
  
  // inizializzo navigazione
  let navigate = useNavigate();

  let [Mobile, Default] = useResponsive();

  // navigazione
  const goTo = (params: string) => (): void => {
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
    <footer style={{ backgroundColor: PALETTE[0].bgColor }} id="footer">
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
      {
          !isLogged && 
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
        }
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
        {
          !isLogged && 
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
        }
      </section>

      <Typography className="rightReserved">
        {t("footer.rightReserved")}
      </Typography>
    </footer>
  );
};

export default Footer;
