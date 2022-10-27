import { FC } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardHeader } from "@mui/material";
// translation
import { useTranslation } from "react-i18next"
// navigazione
import { useNavigate } from 'react-router-dom';

// props
interface CardProps {
    title: string,
    image: string,
    description: string,
    requirement: string,
    date: string,
    time: string,
    place: string
}

const CardEvents: FC<CardProps> = (props) => {

    // inizializzo navigazione
    let navigate = useNavigate()
    // tranlation hook
    const { t }: any = useTranslation()

    return (
        <Card sx={{
            display: "flex",
            maxHeight: "400px",
            padding: "40px",
            justifyContent: "space-between",
        }}
        >
            {/* cambiare la scrollbar e finire data section */}
            <div className="cardContainer" style={{ display: 'flex' }}>
                {/* 25 */}
                <figure style={{ width: '30%' }}>
                    <figcaption style={{ height: "15%" }}>
                        <CardHeader
                            sx={{padding: "0"}}
                            title={props.title}
                        />
                    </figcaption>
                    <div style={{ height: "94%" }}>
                        <CardMedia
                            component="img"
                            sx={{ width: '100%', height: "90%",marginTop:'auto' }}
                            image={props.image}
                            alt="Live from space album cover"
                        />
                    </div>
                </figure>
                {/* 65 */}
                <section className="details" style={{ width: '58%',overflowY:"auto" }}>
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <CardContent sx={{ flex: "1 0 auto",paddingX: "20px",paddingY:"0" }}>
                            <Typography style={{marginBottom:'10px'}} component="div" variant="h5">
                                Descrizione
                            </Typography>
                            <Typography
                                variant="subtitle1"
                                color="text.secondary"
                                component="div"
                            >
                                {props.description}
                            </Typography>
                            <Typography component="div" variant="h5" sx={{ marginTop: "15px",marginBottom:'10px' }}>
                                Requisiti
                            </Typography>
                            <Typography
                                variant="subtitle1"
                                color="text.secondary"
                                component="div"
                            >
                                {props.requirement}
                            </Typography>
                        </CardContent>
                    </Box>
                </section>
                {/* 10 */}
                <section style={{ width: '17%',display: "flex", flexDirection: "column",justifyContent:"space-between"  }}>
                        <CardContent sx={{ flex: "1 0 auto", textAlign: "end" }}>
                            <Typography
                                component="div"
                                variant="subtitle2"
                                sx={{ fontSize: "18px" }}
                            >
                                {props.date}
                            </Typography>
                            <Typography
                                variant="subtitle1"
                                color="text.secondary"
                                component="div"
                            >
                                {props.time}
                            </Typography>
                            <Typography
                                variant="subtitle1"
                                color="text.secondary"
                                component="div"
                            >
                                {props.place}
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
                                {t("buttons.bookButton")}
                            </Button>
                        </Box>
                </section>
            </div>
        </Card>
    );
}

export default CardEvents;