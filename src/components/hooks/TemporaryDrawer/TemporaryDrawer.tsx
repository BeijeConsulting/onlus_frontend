import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
//MUI Components
import { Box } from "@mui/material";
import { Drawer } from "@mui/material";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
// Icons
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose } from "react-icons/md";
import { TbHeartHandshake } from "react-icons/tb";
import { BiDonateHeart } from "react-icons/bi";
// router
import SCREENS from "../../../route/router";
// components
import IconButton from "../../ui/buttons/IconButton";
// style
import styles from "./temporaryDrawer.module.scss";
// redux
import { useSelector } from "react-redux";

interface State {
  right: any;
}
const InitialState = {
  right: false,
};

// type
type social = {
  name: string;
  icon: any; 
  link: string;
  footerOn: boolean;
  homepageOn: boolean;
};

const TemporaryDrawer: FC = () => {
  // stati
  const [state, setState] = useState<State>(InitialState);
  // redux
  const PALLETTE = useSelector((state:any) => state.generalDuck.pallette)
  const SOCIAL = useSelector((state:any) => state.generalDuck.social)

  const navigate: any = useNavigate();

  const social: Array<any> = [
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

  //i18n
  const { t, i18n }: any = useTranslation();

  const toggleDrawer = (open: any) => (event: any) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, right: open });
  };

  const goToDonate = (): void => {
    navigate.navigate(SCREENS.donate);
  };

  const goToSignup = (): void => {
    navigate.navigate(SCREENS.signup);
  };

  //Navigation from sidebar
  const navigationFromSidebar = (text: string) => (): any => {
    switch (text) {
      case t("nav.home"):
        navigate(SCREENS.home);
        break;
      case t("nav.about"):
        navigate(SCREENS.about);
        break;
      case t("nav.events"):
        navigate(SCREENS.events);
        break;
      case t("nav.blog"):
        navigate(SCREENS.blog);
        break;
      case t("nav.support"):
        navigate(SCREENS.support);
        break;
      case t("nav.info"):
        navigate(SCREENS.faq);
        break;

      default:
        break;
    }
  };

  const list = () => (
    <Box
      className={styles.boxContainer}
      style={{backgroundColor:PALLETTE[0].bgColor}}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Button className={styles.closeButton} onClick={toggleDrawer(false)}>
        <MdClose className={styles.burgerIcons} />
      </Button>

      <List className={styles.navContainer}>
        {[
          t("nav.home"),
          t("nav.about"),
          t("nav.events"),
          t("nav.blog"),
          t("nav.supportUs"),
          t("nav.info"),
        ].map((text, index) => (
          <ListItem
            key={text}
            className={styles.navItemContainer}
            disablePadding
          >
            <ListItemButton>
              <ListItemText
                className={styles.navItem}
                primary={text}
                onClick={navigationFromSidebar(text)}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <div>
        <div className={styles.buttonsContainer}>
          <IconButton
            icon={<TbHeartHandshake />}
            label={t("buttons.volunteerButton")}
            callbackPress={goToSignup}
          />
          <IconButton
            icon={<BiDonateHeart />}
            label={t("buttons.donateButton")}
            callbackPress={goToDonate}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "25px",
          }}
        >
          {SOCIAL.map((elem:social, key:any) => {
            return (
              <ListItemIcon
                key={key}
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <img src={elem.icon} className={styles.socialIcons} />
              </ListItemIcon>
            );
          })}
        </div>
      </div>
    </Box>
  );

  return (
    <>
      <Button className={styles.burgerIcons}>
        <GiHamburgerMenu
          className={styles.burgerIcons}
          onClick={toggleDrawer(true)}
        />
      </Button>
      <Drawer open={state.right} anchor={"right"} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
    </>
  );
};

export default TemporaryDrawer;
