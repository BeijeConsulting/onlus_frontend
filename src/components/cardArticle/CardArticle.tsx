import {FC} from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardHeader } from "@mui/material";

interface CardProps {
    date:string,
    image:string,
    title:string,
    description:string
}

const CardArticolo:FC<CardProps> = (props) => {

  return (

    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardHeader subheader={props.date} sx={{ paddingBottom: "0px" }} />
        <CardContent>
          <CardMedia
            component="img"
            height="140"
            image={props.image}
            alt="green iguana"
          />
          <Typography gutterBottom variant="h5" component="div">
            {props.title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ paddingBottom: "20px" }}
          >
            {props.description}
          </Typography>

          <a href="#">Continua a leggere</a>
        </CardContent>
      </CardActionArea>
    </Card>

  );

}

export default CardArticolo;
