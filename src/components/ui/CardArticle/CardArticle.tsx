import { FC } from "react";

//mui
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardHeader } from "@mui/material";

//style
import "./cardarticle.scss";

interface CardProps {
  date: string;
  image: string;
  title: string;
  description: string;
  minWidth: string;
}

const CardArticle: FC<CardProps> = (props) => {
  return (
    <Card sx={{ minWidth: props.minWidth, maxWidth: "400px" }}>
      <CardActionArea>
        <CardHeader subheader={props.date} sx={{ paddingBottom: "0px" }} />
        <CardContent>
          <CardMedia
            component="img"
            image={props.image}
            alt="green iguana"
            sx={{ height: 250, objectFit: "cover" }}
          />
          <Typography gutterBottom variant="h4" sx={{ paddingTop: 5 }}>
            {props.title}
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ paddingBottom: "20px", height: 120, overflowY: "hidden" }}
          >
            {props.description}
          </Typography>
          <div className="continueContainer">
            <a href="#" className="continue">
              <Typography variant="caption">Continua a leggere</Typography>
            </a>
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CardArticle;
