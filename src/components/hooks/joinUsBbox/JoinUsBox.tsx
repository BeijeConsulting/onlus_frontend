import React, { ReactElement } from "react";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import "./joinUsBox.scss";
import { useNavigate, NavigateFunction } from "react-router-dom";
import CustomButton from "../../ui/buttons/CustomButton/CustomButton";
import { useTranslation } from "react-i18next";

function JoinUs(): ReactElement {
  const { t }: any = useTranslation();
  const navigate: NavigateFunction = useNavigate();

  function goToDonations(): void {
    navigate("/donate");
  }

  function goToJoin(): void {
    navigate("/signup");
  }
  return (
    <article className="joinUsBox">
      <section className="upperSection">
        <div className="header1">{t("preFooter.title")}</div>
        <hr className="separator" />
        <div className="header2">
        {t("preFooter.caption")}
        </div>
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
        <div className="btn2">
          <CustomButton
            colorType="secondary"
            label={t("buttons.volunteerButton")}
            size="big"
            callback={goToJoin}
          />
        </div>
      </div>
      <section className="lowerSection">
        Lorem, ipsum dolor. <Link href="#">Link</Link>
      </section>
    </article>
  );
}

export default JoinUs;
