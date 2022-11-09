import { FC, useRef, useState } from "react";

//navigation
import { useNavigate } from "react-router-dom";
import SCREENS from "../../../route/router";

//mui
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import { Typography } from "@mui/material";

// icons
import { TbHeartHandshake } from "react-icons/tb";
import { BiDonateHeart } from "react-icons/bi";

// styles
import styles from "./buttons.module.scss";

//i18n
import { useTranslation } from "react-i18next";

interface State {
  open: boolean;
  selectedIndex: number;
}

const initialState = {
  open: false,
  selectedIndex: 1,
};

const ExpandButton: FC = () => {
  //i18n
  const { t }: any = useTranslation();
  const [state, setState] = useState<State>(initialState);
  const anchorRef = useRef<HTMLDivElement>(null);

  const navigate: Function = useNavigate();

  const goToDonate = (): void => {
    navigate(SCREENS.donate);
  };

  const goToSignup = (): void => {
    navigate(SCREENS.signup);
  };

  const handleToggle = () => {
    setState({
      ...state,
      open: !state.open,
    });
  };

  const handleClose = (event: Event) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setState({
      ...state,
      open: false,
    });
  };

  return (
    <>
      <ButtonGroup
        variant="contained"
        ref={anchorRef}
        aria-label="split button"
        className={styles.expandedButton}
      >
        <Button
          onClick={handleToggle}
          sx={{
            backgroundColor: "#CFC36F",
            "&:hover": {
              bgcolor: "#C4B64F",
            },
          }}
          className={styles.expandedButtonItem}
        >
          <Typography variant="button">
            {t("buttons.supportNavButton")}
          </Typography>
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper
        sx={{
          zIndex: 1,
        }}
        open={state.open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  id="split-button-menu"
                  autoFocusItem
                  className={styles.expandedButtonItemContainer}
                >
                  <MenuItem
                    className={styles.expandedButtonItem}
                    onClick={goToDonate}
                  >
                    {t("buttons.donateButton")}
                    <TbHeartHandshake />
                  </MenuItem>

                  <MenuItem
                    className={styles.expandedButtonItem}
                    onClick={goToSignup}
                  >
                    {t("buttons.volunteerButton")}
                    <BiDonateHeart />
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
};

export default ExpandButton;
