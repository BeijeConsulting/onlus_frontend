import React, { useState, FC } from "react";
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// mediaquery
import { useMediaQuery } from "react-responsive";
// components
import CustomButton from "../ui/buttons/CustomButton/CustomButton";
// translation
import { useTranslation } from "react-i18next"
// navigazione
import { useNavigate } from 'react-router-dom';


// interfaccia
interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

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

const Default = ({ children }: any) => {
    const isNotMobile = useMediaQuery({ minWidth: 601 });
    return isNotMobile ? children : null;
};

const Mobile = ({ children }: any) => {
    const isMobile = useMediaQuery({ maxWidth: 600 });
    return isMobile ? children : null;
};

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

const CardEventsMobile: FC<CardProps> = (props) => {
    // inizializzo navigazione
    let navigate = useNavigate()
    // tranlation hook
    const { t }: any = useTranslation()
    // stato
    const [expanded, setExpanded] = useState(false);
    // estende pannello
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    // naviga
    const goToBooking = (): void => {
        // navigate('/login')
        console.log('book')
    }

    return (
        <Card sx={{ padding: "20px" }} >
            <CardHeader sx={{ padding: "0px" }} titleTypographyProps={{ fontWeight: 700, fontSize: "25px" }} title={props.title} />
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
                    <CardHeader
                        sx={{ padding: "0", marginY: "10px" }}
                        subheader={props.date}
                        subheaderTypographyProps={{ fontWeight: 600, fontSize: "16px" }}
                    />
                    <CardHeader
                        sx={{ padding: "0", marginY: "10px" }}
                        subheader={props.time}
                        subheaderTypographyProps={{ fontWeight: 600, fontSize: "16px" }}
                    />
                    <CardHeader
                        sx={{ padding: "0px", marginY: "10px" }}
                        subheader={props.place}
                        subheaderTypographyProps={{ fontWeight: 600, fontSize: "16px" }}
                    />
                </div>
                {!expanded && (
                    <div style={{ width: "40%", display: "flex", alignItems: "center", justifyContent: "center" }}>
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
                    sx={{ margin: "0" }}
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
                    <CardHeader
                        sx={{ padding: "0px", marginBottom: "10px" }}
                        titleTypographyProps={{ fontWeight: 700, fontSize: "25px" }}
                        title={t("events.description")} />
                    <Typography paragraph>
                        {props.description}
                    </Typography>
                    <CardHeader
                     sx={{ padding: "0px", marginBottom: "10px" }}
                     titleTypographyProps={{ fontWeight: 700, fontSize: "25px" }}
                     title={t("events.requirements")}  />
                    <Typography paragraph>
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
}

export default CardEventsMobile;
