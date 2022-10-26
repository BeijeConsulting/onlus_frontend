import React, { FC, ReactElement, useState, useLayoutEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../ui/buttons/CustomButton/CustomButton";
import axios from "axios";
import "./hero.scss";

interface State {
  title?: string | undefined;
  subtitle?: string | undefined;
  image?: string;
  isLoaded: boolean;
}

const Hero: FC = (): ReactElement => {
  const { t }: any = useTranslation();
  const navigate: any = useNavigate();

  const [state, setState] = useState<State>({
    isLoaded: false,
  });

  useLayoutEffect(() => {
    fetchDatas();
  }, []);

  function handleNavigate() {
    navigate("/donate");
  }

  async function fetchDatas() {
    let result:any = await axios.get("mockAPI/hero.json");
    console.log(result);
    setState({
      ...state,
      image: result.data.image,
      title: result.data.title,
      subtitle: result.data.subtitle,
      isLoaded: true,
    });
  }

  return (
    <>
      {state.isLoaded && (
        <section className="hero-container">
          <img className="hero-bg" src={require( `../../../assets/images/${state.image}`)} alt="hero-img" />
          <div className="hero-overlay" />
          <div className="hero-card">
            <h2 className="hero-title">{state.title}</h2>
            <div className="hero-linebr" />
            <h4 className="hero-subtitle">{state.subtitle}</h4>
            <CustomButton
              size="small"
              label="DIVENTA VOLONTARIO"
              bgColor="#B12009"
              txtColor="white"
              callback={handleNavigate}
            />
          </div>
        </section>
      )}
    </>
  );
};

export default Hero;
