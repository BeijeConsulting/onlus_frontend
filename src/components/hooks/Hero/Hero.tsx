import React, { FC } from "react"

//navigation
import { useNavigate } from "react-router-dom"
import SCREENS from "../../../route/router"

//components
import CustomButton from "../../ui/buttons/CustomButton/CustomButton"

//mui
import { Typography } from "@mui/material"

//style
import "./hero.scss"

interface HeroProps {
  type: "home" | "article" | "about" | "support"
  category?: Array<JSX.Element>
  title?: string | undefined
  subtitle?: string | undefined
  image?: string | undefined
}

const Hero: FC<HeroProps> = (props) => {
  const navigate: Function = useNavigate()

  function handleNavigate() {
    props.type === "home" ? navigate(SCREENS.donate) : navigate(SCREENS.signup)
  }

  switch (props.type) {
    case "home" || "support":
      return (
        <section
          className="hero-container hero-container-home"
          style={{
            backgroundImage: `url("${props.image}")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <div className="hero-content">
            <Typography variant="h1">{props.title}</Typography>
            <div className="hero-linebr" />
            <Typography variant="h5" className="hero-subtitle">
              {props.subtitle}
            </Typography>
            {props.type === "home" ? (
              <CustomButton
                size="small"
                label="DONA ORA"
                colorType="primary"
                callback={handleNavigate}
              />
            ) : (
              <CustomButton
                size="small"
                label="DIVENTA VOLONTARIO"
                colorType="secondary"
                callback={handleNavigate}
              />
            )}
          </div>
        </section>
      )

    case "article":
      return (
        <>
          <section
            className="hero-container hero-container-article"
            style={{
              backgroundImage: `url("${props.image}")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          >
            <div className="hero-content">
              <div className="hero-categories">{props.category}</div>
              <Typography variant="h1">{props.title}</Typography>
            </div>
          </section>
        </>
      )

    case "about":
      return (
        <>
          <section
            className="hero-container hero-container-about"
            style={{
              backgroundImage: `url("${props.image}")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          >
            <div className="hero-content">
              <Typography variant="h1">{props.title}</Typography>
            </div>
          </section>
        </>
      )
    default:
      return <div>Errore</div>
  }
}

export default Hero
