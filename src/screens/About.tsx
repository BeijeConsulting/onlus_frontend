import { useState, useEffect, FC } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import axios from "axios";

//Components
import Footer from "../components/footer/Footer";
import Header from "../components/hooks/Header/Header";
import Hero from "../components/hooks/Hero/Hero";
import JoinUs from "../components/hooks/joinUsBbox/JoinUsBox";
import PreFooter from "../components/preFooter/PreFooter";

//Styles
import "../styles/about.scss";

interface State {
  content: Array<content>;
}
type content = {
  text: string;
  img: string;
};

const initialState: State = {
  content: [],
};
const About: FC =() =>{
  const { t }: any = useTranslation();
  const navigate: any = useNavigate();
  const [state, setState] = useState<State>(initialState);

  useEffect(() => {
    fetchDatas();
  }, []);

  function handleNavigate() {
    navigate("/donate");
  }

  async function fetchDatas() {
    let result: any = await axios.get("mockAPI/about.json");
    setState({content:result.data.content})
  }
  const mappingContent=(item:any,key:any)=>{
    if(key%2===0){
      return(
        <section className="content-about-container" key={key}>
          <div className="text-about">{item.text}</div>
          <div className="img-container">
            <img
              className="img-about"
              src={require(`../assets/images/${item.image}`)}
              alt="hero-img"
            />
          </div>
        </section>
      )
    }else{
      return(
        <section className="content-about-container-inverted" key={key}>
          <div className="text-about">{item.text}</div>
          <div className="img-container-inverted">
            <img
              className="img-about"
              src={require(`../assets/images/${item.image}`)}
              alt="hero-img"
            />
          </div>
        </section>
      )
    }   
  }
  
  return (
    <>
      <Header />

      <Hero type={"about"} title={"Frase motivazionale super d'effetto per convincerti a donare"} image={"pandaImg.jpg"}/>
      <main>
        <h1>{t("nav.about")}</h1>
        {state.content.map(mappingContent)}
      </main>
      <JoinUs />

      <PreFooter />
      <Footer />
    </>
  );
}

export default About;
/*

*/