import {FC} from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardHeader } from "@mui/material";

const CardEvents:FC = () => {
  return (
    <Card
      sx={{
        display: "flex",
        height: "300px",
        padding: "0 20px 20px 20px",
        justifyContent: "space-between"
      }}
    >
      <div
        style={{ width: "85%", display: "flex", justifyContent: "flex-start" }}
      >
        <div style={{ height: "300px" }}>
          <CardHeader
            sx={{ height: "15%", padding: "0" }}
            title="Titolo Evento"
          />
          <div style={{ height: "85%" }}>
            <CardMedia
              component="img"
              sx={{ width: 400, height: "100%", backgroundColor: "blue" }}
              image="/static/images/cards/live-from-space.jpg"
              alt="Live from space album cover"
            />
          </div>
        </div>

        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography component="div" variant="h5">
              Descrizione
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              Mac MillerMac MillerMac MillerMac MillerMac MillerMac MillerMac
              MillerMac MillerMac MillerMac MillerMac MillerMac MillerMac
              MillerMac MillerMac MillerMac MillerMac MillerMac MillerMac
              MillerMac MillerMac Miller
            </Typography>
            <Typography component="div" variant="h5" sx={{ marginTop: "15px" }}>
              Requisiti
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              Mac Miller
            </Typography>
          </CardContent>
        </Box>
      </div>
      <div
        style={{ width: "15%", display: "flex", justifyContent: "flex-end" }}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto", textAlign: "end" }}>
            <Typography
              component="div"
              variant="subtitle2"
              sx={{ fontSize: "18px" }}
            >
              15/10/2022
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              h 12.00
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              Milano, MI
            </Typography>
          </CardContent>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              pl: 1,
              pb: 1
            }}
          >
            <Button sx={{ width: "90px" }} variant="contained">
              Prenotati
            </Button>
          </Box>
        </Box>
      </div>
    </Card>
  );
}

export default CardEvents;