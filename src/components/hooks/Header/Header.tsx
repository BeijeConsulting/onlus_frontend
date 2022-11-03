import { FC, useState, useEffect } from "react";

//Hooks
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
//Components
import TemporaryDrawer from "../TemporaryDrawer/TemporaryDrawer";
import ExpandButton from "../../ui/buttons/ExpandButton";


// Route
import SCREENS from "../../../route/router";

// Icons
import { BiUser } from "react-icons/bi";
import { SiFoodpanda } from "react-icons/si";

//Style
import "./header.scss";

//i18n
import { useTranslation } from "react-i18next";

interface HeaderProps {
  isHome?: boolean;
}
interface State {
  scroll: boolean;
}
const initialState = {
  scroll: false,
};

const Header: FC<HeaderProps> = (props) => {
  // stati
  const [state, setState] = useState<State>(initialState);

  // navigazione
  const navigate: any = useNavigate();
  // traduzione
  const { t, i18n }: any = useTranslation();

  // mediaquery
  const Default = ({ children }: any) => {
    const isNotMobile = useMediaQuery({ minWidth: 992 });
    return isNotMobile ? children : null;
  };
  const Mobile = ({ children }: any) => {
    const isMobile = useMediaQuery({ maxWidth: 991 });
    return isMobile ? children : null;
  };

  //navigation functions
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
  const goToPersonalArea = (): void => {
    navigate(SCREENS.personalArea);
  };

  // Changelanguage
  const changeLanguageClick = (lang: string) => (): void => {
    i18n.changeLanguage(lang);
  };

  // Scroll
  function handleScroll() {
    let windowScroll = window.scrollY;
    let scrolly = false;

    if (windowScroll > 150) {
      scrolly = true;
    } else scrolly = false;

    setState({
      ...state,
      scroll: scrolly,
    });
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [state.scroll]);

  return (
    <header
      className={(state.scroll ? "active " : "") + (props.isHome && "home")}
    >
      <div className={"top-header"}>
        <SiFoodpanda className="logo" onClick={goToHome} />
        <Default>
          <nav className={"nav-desktop"}>
            <div onClick={goToHome}>{t("nav.home")}</div>
            <div onClick={goToAbout}>{t("nav.about")}</div>
            <div onClick={goToEvents}>{t("nav.events")}</div>
            <div onClick={goToBlog}>{t("nav.blog")}</div>
            <div onClick={goToSupport}>{t("nav.supportUs")}</div>
            <div onClick={goToInfo}>{t("nav.info")}</div>
          </nav>
          <ExpandButton />
        </Default>

        <div className="header-right">
          <div className="lng-buttons">
            <p className="langButton" onClick={changeLanguageClick("en")}>
              EN
            </p>
            <p style={{ padding: "0 10px" }}>•</p>
            <p className="langButton" onClick={changeLanguageClick("it")}>
              IT
            </p>
          </div>

          <BiUser onClick={goToPersonalArea} className="profile-icon" />

          <Mobile>
            <div className="burger-menu">
              <TemporaryDrawer />
            </div>
          </Mobile>
        </div>
      </div>
      <div className="bottom-header">
        <a href="#events" className="bottom-header-button">{t("nav.events")}</a>
        <a href="#blog" className="bottom-header-button">{t("nav.blog")}</a>
        <a href="#history" className="bottom-header-button">{t("home.history")}</a>
      </div>
    </header>
  );
};

export default Header;
