import React, { FC, ReactElement, useState, useLayoutEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../ui/buttons/CustomButton/CustomButton";
import axios from "axios";
import "./hero.scss";


interface Props {
  type: "home" | "article" | "about";
  category?: string,
  title: string | undefined,
  subtitle?: string | undefined,
  image: string | undefined;
}

const Hero: FC<Props> = (props): ReactElement => {
  const { t }: any = useTranslation();
  const navigate: any = useNavigate();

  function handleNavigate() {
    navigate("/donate");
  }


  switch (props.type) {
    case "home":
      return (
        <>
            <section className="hero-container">
              <img
                className="hero-bg"
                src={require(`../../../assets/images/${props.image}`)}
                alt="hero-img"
              />
              <div className="hero-overlay" />
              <div className="hero-card">
                <h2 className="hero-title">{props.title}</h2>
                <div className="hero-linebr" />
                <h4 className="hero-subtitle">{props.subtitle}</h4>
                <CustomButton
                  size="small"
                  label="DIVENTA VOLONTARIO"
                  colorType="primary"
                  callback={handleNavigate}
                />
              </div>
            </section>
        </>
      );

    case "article":
      return (
        <>
            <section className="hero-container">
              <img
                className="hero-bg"
                src={require(`../../../assets/images/${props.image}`)}
                alt="hero-img"
              />
              <div className="hero-overlay" />
              <div className="hero-article-card">
                <h2 className="hero-category">{props.category}</h2>
                <h4 className="hero-title">{props.title}</h4>
              </div>
            </section>
        </>
      );

    case "about":
      return (
        <>
            <section className="hero-container">
              <img
                className="hero-bg"
                src={require(`../../../assets/images/${props.image}`)}
                alt="hero-img"
              />
              <div className="hero-overlay" />
              <div className="hero-about-card">
                <h2 className="hero-mission">{props.title}</h2>
              </div>
            </section>
        </>
      );
  }
};

export default Hero;
