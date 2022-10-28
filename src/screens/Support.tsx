import React, { useEffect, useState, ReactElement } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

//components
import JoinUs from "../components/hooks/joinUsBbox/JoinUsBox";
import Header from "../components/hooks/Header/Header";
import PreFooter from "../components/preFooter/PreFooter";
import Footer from "../components/footer/Footer";

//styles
import "../styles/support.scss";

interface State {
  hero: Hero;
  title: string;
  content: Array<Content>;
}

type Hero = {
  img: string;
  text: string;
};

type Content = {
  paragraph: string;
  media: string;
};

function Support() {
  const [state, setState] = useState<State>();
  useEffect(() => {
    getData();
  }, []);

  async function getData(): Promise<void> {
    let result = await axios.get("mockAPI/support.json");
    console.log("result", result.data);
    setState(result.data);
  }

  const mapping = (item: any, key: any) => {
    console.log("item è", item);
    console.log(`../assets/images/${item.media}`);
    if (key % 2 === 0) {
      return (
        <section className="content-about-container" key={key}>
          <div className="text-about">{item.paragraph}</div>
          <div className="img-container">
            <img
              className="img-about"
              src={require(`../assets/images/${item.media}`)}
              alt="hero-img"
            />
          </div>
        </section>
      );
    } else {
      return (
        <section className="content-about-container-inverted" key={key}>
          <div className="text-about">{item.paragraph}</div>
          <div className="img-container-inverted">
            <img
              className="img-about"
              src={require(`../assets/images/${item.media}`)}
              alt="hero-img"
            />
          </div>
        </section>
      );
    }
  };

  return (
    <>
      <Header />
      <main>
        <JoinUs type="donate" />
        <div className="title">{state?.title}</div>
        {state?.content.map(mapping)}
      </main>
      <PreFooter />
      <Footer />
    </>
  );
}

export default Support;
