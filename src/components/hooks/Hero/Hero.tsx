import { Navigation } from "@mui/icons-material";
import React, {FC, ReactElement} from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../functional/Button/CustomButton";
import './hero.scss'

const Hero:FC = ():ReactElement => {

    const {t}:any = useTranslation();
    const navigate:any = useNavigate();

    function handleNavigate() {
        navigate('/donate')
    }

    return(
        <section className="hero-container">
            <img className="hero-bg" src={require('../../../assets/images/pandaImg.jpg')} alt='hero-img' />
            <div className="hero-overlay"/>
            <div className="hero-card">
                <h2 className="hero-title">Lorem, ipsum dolor sit amet consectetur adipisicing elit.</h2>
                <div className="hero-linebr" />
                <h4 className="hero-subtitle">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repudiandae excepturi esse suscipit deserunt voluptatem obcaecati repellendus quaerat soluta ut maiores!</h4>
                <CustomButton size="small" label='Button' color='#B12009' callback={handleNavigate} />
            </div>
        </section>
    )
}

export default Hero