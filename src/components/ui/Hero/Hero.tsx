import React, { FC, ReactElement, useState, useLayoutEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import CustomButton from "../buttons/CustomButton/CustomButton";
import "./hero.scss";

import SCREENS from "../../../route/router";

interface HeroProps {
  type: "home" | "article" | "about" | "support";
  category?: string;
  title: string | undefined;
  subtitle?: string | undefined;
  image: string | undefined;
}

const Hero: FC<HeroProps> = (props) => {
  const { t }: any = useTranslation();
  const navigate: Function = useNavigate();

  function handleNavigate() {
    props.type === "home" ? navigate(SCREENS.donate) : navigate(SCREENS.signup);
  }

  switch (props.type) {
    case "home" || "support":
      return (
        <section
          className="hero-container hero-container-home"
          style={{
            backgroundImage:
              "url(" + require(`../../../assets/images/${props.image}`) + ")",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <div className="hero-content">
            <h1 className="hero-title">{props.title}</h1>
            <div className="hero-linebr" />
            <h4 className="hero-subtitle">{props.subtitle}</h4>
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
      );

    case "article":
      return (
        <>
          <section
            className="hero-container hero-container-article"
            style={{
              backgroundImage:
                "url(" + require(`../../../assets/images/${props.image}`) + ")",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          >
            <div className="hero-content">
              <h4 className="hero-category">{props.category}</h4>
              <h1 className="hero-title">{props.title}</h1>
            </div>
          </section>
        </>
      );

    case "about":
      return (
        <>
          <section
            className="hero-container hero-container-about"
            style={{
              backgroundImage:
                "url(" + require(`../../../assets/images/${props.image}`) + ")",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          >
            <div className="hero-content">
              <h1 className="hero-mission">{props.title}</h1>
            </div>
          </section>
        </>
      );
    default:
      return <div>Errore</div>;
  }
};

export default Hero;
