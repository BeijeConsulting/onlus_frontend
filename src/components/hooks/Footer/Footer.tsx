import { FC } from "react";

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

// convert to RGB
import { hexToRGB } from "../../../utils/hexToRGB";

const Footer: FC = () => {
  const isLogged: boolean = useSelector(
    (state: any) => state.userDuck.isLoggedIn
  );

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
          <img className="socialIcon" src={el.iconContent} />
          <Default>
            <div>
              <Typography variant="body2">{el.name}</Typography>
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
      <div className="top-footer">
        <section
          style={{ borderRightColor: hexToRGB(PALETTE[0].textColor, 0.3) }}
          className="contacts"
        >
          <Typography variant="h5" className="titleContacts">
            {t("footer.contacts")}
          </Typography>
          <ul>
            <li>
              <Typography variant="body2">{CONTACTS.site}</Typography>
            </li>
            <li>
              <Typography variant="body2">{CONTACTS.email}</Typography>
            </li>
            <li>
              <Typography variant="body2">{CONTACTS.address}</Typography>
            </li>
            <li>
              <Typography variant="body2">
                P.Iva: {CONTACTS.vatNumber}
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                C.F: {CONTACTS.fiscalCode}
              </Typography>
            </li>
          </ul>
        </section>

        <section
          style={{ borderRightColor: hexToRGB(PALETTE[0].textColor, 0.3) }}
          className="social"
        >
          <div className="social-container">
            {!!SOCIAL && SOCIAL.map(mapping)}
          </div>
          {!isLogged && (
            <Mobile>
              <CustomButton
                colorType="secondary"
                callback={goTo(SCREENS.login)}
                label={"LOGIN"}
                size={"small"}
              />
            </Mobile>
          )}
        </section>

        <Default>
          <section
            style={{ borderRightColor: hexToRGB(PALETTE[0].textColor, 0.3) }}
            className="nav"
          >
            <Typography variant="body2" onClick={goTo(SCREENS.home)}>
              {t("nav.home")}
            </Typography>
            <Typography variant="body2" onClick={goTo(SCREENS.about)}>
              {t("nav.about")}
            </Typography>
            <Typography variant="body2" onClick={goTo(SCREENS.events)}>
              {t("nav.events")}
            </Typography>
            <Typography variant="body2" onClick={goTo(SCREENS.blog)}>
              {t("nav.blog")}
            </Typography>
            <Typography variant="body2" onClick={goTo(SCREENS.support)}>
              {t("nav.supportUs")}
            </Typography>
            <Typography variant="body2" onClick={goTo(SCREENS.faq)}>
              {t("nav.info")}
            </Typography>
          </section>
        </Default>

        <section className="privacy">
          <div className="privacy-container">
            <Link to="#">
              <Typography variant="body2">
                {t("footer.privacyPolicy")}{" "}
              </Typography>
            </Link>
            <Link to="#">
              <Typography variant="body2">
                {t("footer.cookiePolicy")}{" "}
              </Typography>
            </Link>
            <Link to="#">
              <Typography variant="body2">{t("footer.terms")} </Typography>
            </Link>
          </div>
          {!isLogged && (
            <Default>
              <CustomButton
                colorType="secondary"
                callback={goTo(SCREENS.login)}
                label={"LOGIN"}
                size={"small"}
              />
            </Default>
          )}
        </section>
      </div>

      <Typography variant="body2" className="rightReserved">
        {t("footer.rightReserved")}
      </Typography>
    </footer>
  );
};

export default Footer;
