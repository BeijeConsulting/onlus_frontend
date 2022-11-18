import { FC } from "react";
//Components
import HelmetComponent from "../components/ui/HelmetComponent/HelmetComponent";

//Styles
import "../styles/notFound.scss";

//mui
import SdCardAlertIcon from "@mui/icons-material/SdCardAlert";
import { Typography } from "@mui/material";

//i18n
import { useTranslation } from "react-i18next";

interface NotFoundProps {
  codeError?: number;
  description?: string;
}

const NotFound: FC<NotFoundProps> = (props) => {
  const { t }: any = useTranslation();

  return (
    <>
      <HelmetComponent metatitleOn={true} title="notFound" />

      <main id="notFound" className="sectionContainer">
        <section className="notFoundContainer">
          <SdCardAlertIcon className="error-icon" />
          <Typography variant="h1">
            {t("error.notFound")}{" "}
            <span className="found-title-color">{props.codeError}</span>
          </Typography>
          <Typography variant="body1">{props.description} </Typography>
        </section>
      </main>
    </>
  );
};
NotFound.defaultProps = {
  codeError: 404,
  description: "We are sorry, the page you requested was not found!",
};

export default NotFound;
