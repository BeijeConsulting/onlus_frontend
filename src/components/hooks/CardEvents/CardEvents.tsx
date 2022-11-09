import { FC, useEffect, useRef, useState } from "react"

// mui
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Typography from "@mui/material/Typography"

import { MutableRefObject } from "react"

// translation
import { useTranslation } from "react-i18next"

// componenti
import CustomButton from "../../ui/buttons/CustomButton/CustomButton"

//Style
import "./cardEvents.scss"

// props
interface CardProps {
  title: string
  image: string
  description: string
  requirement: string
  date: string
  time: string
  place: string
}

interface State {
  height: number
}

const initialState = {
  height: 0,
}

const CardEvents: FC<CardProps> = (props) => {
  const [state, setState] = useState<State>(initialState)

  // tranlation hook
  const { t }: any = useTranslation()

  const headerRef: MutableRefObject<any> = useRef(0)

  const goToBooking = (): void => {
    // navigate('/login')
    console.log("book")
  }

  useEffect(() => {
    setState({
      ...state,
      height: headerRef.current.clientHeight,
    })
  }, [])

  return (
    <Card className="eventsCard">
      <div className="cardHeader" ref={headerRef}>
        <Typography variant="h3" className="cardTitle">
          {props.title}
        </Typography>
        <CardMedia
          className="cardMedia"
          component="img"
          image={props.image}
          alt="Live from space album cover"
        />
      </div>

      <CardContent className="cardContent">
        <div
          className="cardContentSection cardContentSectionScroll"
          style={{ height: `${state.height}px` }}
        >
          <section>
            <Typography variant="h4">{t("events.description")}</Typography>
            <Typography variant="body1" color="text.primary" component="div">
              {props.description}
            </Typography>
          </section>
          <section>
            <Typography variant="h4">{t("events.requirements")}</Typography>
            <Typography variant="body1" color="text.primary" component="div">
              {props.requirement}
            </Typography>
          </section>
        </div>

        <div className="cardContentSection cardContentSectionRight">
          <div className="cardInfo">
            <Typography variant="body2">{props.date}</Typography>
            <Typography variant="body2">{props.time}</Typography>
            <Typography variant="body2">{props.place}</Typography>
          </div>
          <CustomButton
            colorType="secondary"
            callback={goToBooking}
            label={t("buttons.bookButton")}
            size={"small"}
          />
        </div>
      </CardContent>
    </Card>
  )
}

export default CardEvents
