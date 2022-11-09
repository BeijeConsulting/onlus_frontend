import { useState, FC } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// components
import CustomButton from "../../ui/buttons/CustomButton/CustomButton";
// translation
import { useTranslation } from "react-i18next";
import useResponsive from "../../../utils/useResponsive";
// navigazione

// interfaccia
interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

// props
interface CardProps {
  title: string;
  image: string;
  description: string;
  requirement: string;
  date: string;
  time: string;
  place: string;
  minWidth?: string;
  opaque: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const CardEventsMobile: FC<CardProps> = (props) => {
  // tranlation hook
  const { t }: any = useTranslation();

  //reponsive
  let [Mobile, Default] = useResponsive();

  // stato
  const [expanded, setExpanded] = useState(false);
  // estende pannello
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  // naviga
  const goToBooking = (): void => {
    // navigate('/login')
    console.log("book");
  };

  return (
    <Card
      sx={{ padding: "20px", minWidth: props.minWidth, position: "relative" }}
    >
      {props.opaque && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 2,
            backgroundColor: "rgba(0,0,0,0.4)",
          }}
        />
      )}
      <Typography variant="h3">{props.title}</Typography>
      {/* <CardHeader
        sx={{ padding: "0px" }}
        titleTypographyProps={{ fontWeight: 700, fontSize: "25px" }}
        title={props.title}
      /> */}
      <Default>
        <CardMedia
          component="img"
          sx={{ height: "400px", marginY: "20px" }}
          image={props.image}
          alt="event cover"
        />
      </Default>
      <Mobile>
        <CardMedia
          component="img"
          sx={{ height: "250px", marginY: "20px" }}
          image={props.image}
          alt="event cover"
        />
      </Mobile>
      <div style={{ display: "flex", flexWrap: "wrap", width: "100%" }}>
        <div style={{ width: "60%" }}>
          <Typography sx={{ padding: "0", marginY: "10px" }} variant="body2">
            {props.date}
          </Typography>
          <Typography sx={{ padding: "0", marginY: "10px" }} variant="body2">
            {props.time}
          </Typography>
          <Typography sx={{ padding: "0", marginY: "10px" }} variant="body2">
            {props.place}
          </Typography>
        </div>
        {!expanded && (
          <div
            style={{
              width: "40%",
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "flex-end",
            }}
          >
            <CustomButton
              colorType="secondary"
              callback={goToBooking}
              label={t("buttons.bookButton")}
              size={"small"}
            />
          </div>
        )}
      </div>

      <CardActions
        sx={{ display: "flex", justifyContent: "center" }}
        disableSpacing
      >
        <ExpandMore
          sx={{ margin: "0", zIndex: 3 }}
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography
            variant="h3"
            sx={{ padding: "0px", marginBottom: "10px" }}
          >
            {t("events.description")}
          </Typography>
          <Typography paragraph variant="body1">
            {props.description}
          </Typography>
          <Typography
            variant="h3"
            sx={{ padding: "0px", marginBottom: "10px" }}
          >
            {t("events.requirements")}
          </Typography>
          <Typography paragraph variant="body1">
            {props.requirement}
          </Typography>
          <CustomButton
            colorType="secondary"
            callback={goToBooking}
            label={t("buttons.bookButton")}
            size={"small"}
          />
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default CardEventsMobile;
