import React, { useEffect, useState } from "react";
import JoinUs from "../components/hooks/joinUsBbox/JoinUsBox";
import Header from "../components/hooks/Header/Header";
import PreFooter from "../components/preFooter/PreFooter";
import Footer from "../components/footer/Footer";
import axios from "axios";

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
  media: Media;
};

type Media = {
  content: string;
  type: string;
};

function Support() {
  const [state, setState] = useState();
  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    let result = await axios.get("mockAPI/personalArea.json");
  }
  return (
    <>
      <Header />
      <JoinUs type="donate" />
      <PreFooter />
      <Footer />
    </>
  );
}

export default Support;
