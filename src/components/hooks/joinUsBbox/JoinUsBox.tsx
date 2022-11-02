import React, { ReactElement } from "react";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import "./joinUsBox.scss";
import { useNavigate, NavigateFunction } from "react-router-dom";
import CustomButton from "../../ui/buttons/CustomButton/CustomButton";
import { useTranslation } from "react-i18next";
import SCREENS from "../../../route/router";

//ammessi valori "support" e "donate"
interface Props {
  type: string;
}

function JoinUs(props: Props): ReactElement {
  const { t }: any = useTranslation();
  const navigate: NavigateFunction = useNavigate();

  function goToDonations(): void {
    navigate(SCREENS.donate);
  }

  function goToJoin(): void {
    navigate(SCREENS.signup);
  }
  return (
    <article className="joinUsBox">
      <section className="upperSection">
        {props.type === "support" ? (
          <div className="header1"> {t("preFooter.title")}</div>
        ) : (
          <div className="header1"> {t("buttons.donateButton")}</div>
        )}

        <hr className="separator" />
        <div className="header2">{t("preFooter.caption")}</div>
      </section>
      <div className="buttons">
        <div className="btn1">
          <CustomButton
            colorType="primary"
            label={t("buttons.donateButton")}
            size="big"
            callback={goToDonations}
          />
        </div>
        {props.type === "support" && (
          <div className="btn2">
            <CustomButton
              colorType="secondary"
              label={t("buttons.volunteerButton")}
              size="big"
              callback={goToJoin}
            />
          </div>
        )}
      </div>
      {props.type === "support" && (
        <section className="lowerSection">
          Lorem, ipsum dolor. <Link href="#">Link</Link>
        </section>
      )}
    </article>
  );
}

export default JoinUs;
