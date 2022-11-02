import { FC } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardHeader } from "@mui/material";
// translation
import { useTranslation } from "react-i18next";
// navigazione
import { useNavigate } from "react-router-dom";
// componenti
import CustomButton from "../../ui/buttons/CustomButton/CustomButton";

// props
interface CardProps {
  title: string;
  image: string;
  description: string;
  requirement: string;
  date: string;
  time: string;
  place: string;
}

const CardEvents: FC<CardProps> = (props) => {
  // inizializzo navigazione
  let navigate: Function = useNavigate();
  // tranlation hook
  const { t }: any = useTranslation();

  const goToBooking = (): void => {
    // navigate('/login')
    console.log("book");
  };

  return (
    <Card
      sx={{
        display: "flex",
        maxHeight: "400px",
        padding: "40px",
        justifyContent: "space-between",
      }}
    >
      {/* cambiare la scrollbar e finire data section */}
      <div className="cardContainer" style={{ display: "flex" }}>
        {/* 25 */}
        <figure
          style={{ width: "30%", display: "flex", flexDirection: "column" }}
        >
          <figcaption style={{ height: "20%" }}>
            <Typography variant="h3">{props.title}</Typography>
          </figcaption>
          <div style={{ height: "80%" }}>
            <CardMedia
              component="img"
              sx={{ width: "100%", height: "100%", marginTop: "auto" }}
              image={props.image}
              alt="Live from space album cover"
            />
          </div>
        </figure>
        {/* 65 */}
        <section
          className="details"
          style={{ width: "55%", overflowY: "auto" }}
        >
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardContent
              sx={{ flex: "1 0 auto", paddingX: "20px", paddingY: "0" }}
            >
              <Typography sx={{ marginBottom: "10px" }} variant="h4">
                {t("events.description")}
              </Typography>
              <Typography variant="body1" color="text.primary" component="div">
                {props.description}
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  marginTop: "20px",
                  marginBottom: "10px",
                }}
              >
                {t("events.requirements")}
              </Typography>
              <Typography variant="body1" color="text.primary" component="div">
                {props.requirement}
              </Typography>
            </CardContent>
          </Box>
        </section>
        {/* 10 */}
        <section
          style={{
            width: "20%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <CardContent sx={{ flex: "1 0 auto", textAlign: "end" }}>
            <Typography variant="body2">{props.date}</Typography>
            <Typography variant="body2">{props.time}</Typography>
            <Typography variant="body2">{props.place}</Typography>
          </CardContent>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              pl: 1,
              pb: 1,
            }}
          >
            <div style={{ paddingRight: 16 }}>
              <CustomButton
                colorType="secondary"
                callback={goToBooking}
                label={t("buttons.bookButton")}
                size={"small"}
              />
            </div>
          </Box>
        </section>
      </div>
    </Card>
  );
};

export default CardEvents;