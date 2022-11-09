import { FC } from "react";

//Components
import Header from "../components/hooks/Header/Header";
import CustomButton from "../components/ui/buttons/CustomButton/CustomButton";
import PreFooter from "../components/hooks/preFooter/PreFooter";
import Footer from "../components/hooks/Footer/Footer";

//Styles
import "../styles/confirmDonation.scss";

//Icon
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";

//i18n
import { useTranslation } from "react-i18next";

//helmet
import { Helmet } from "react-helmet";

//mui
import { Typography } from "@mui/material";

//navigation
import { useNavigate } from "react-router-dom";

const ConfirmDonation: FC = () => {
  const amount: number = 2303;
  const { t }: any = useTranslation();
  const navigation: Function = useNavigate();

  const backToHome = (): void => {
    navigation("/");
  };

  return (
    <>
      <Helmet>
        <title>Onlus - {t("metaTitles.confirmDonate")}</title>
        <meta
          name="description"
          content={`${t("metaTitles.confirmDonate")} page`}
        />
      </Helmet>

      <main id="confirmDonation" className="sectionContainer">
        <Header />

        <section className="confirmDonationContainer">
          <ThumbUpAltIcon className="confirm-icon" />
          <Typography variant="h1">{t("confirmDonate.congrats")}</Typography>
          <Typography className="amount" variant="h3">
            {t("confirmDonate.report")}: {amount}€
          </Typography>
          <CustomButton
            colorType="primary"
            size={"small"}
            label={t("confirmDonate.backToHome")}
            callback={backToHome}
          />
        </section>
      </main>
      <PreFooter />
      <Footer />
    </>
  );
};

export default ConfirmDonation;
