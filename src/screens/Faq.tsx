import { FC, useState, useEffect } from "react";

//translation
import { useTranslation } from "react-i18next";

//axios
import axios from "axios";

//helmet
import { Helmet } from "react-helmet";

//components
import Header from "../components/ui/Header/Header";
import Footer from "../components/ui/Footer/Footer";
import AccordionItem from "../components/hooks/AccordionItem/AccordionItem";

//style
import "../styles/faq.scss";

//type
import { faq, infoType } from "../utils/type";

interface State {
  data: infoType;
}

const initialState = {
  data: null,
};

const Faq: FC = () => {
  const [state, setState] = useState<State>(initialState);
  const { t }: any = useTranslation();

  async function fetchDatas(): Promise<void> {
    let result = await axios.get("mockAPI/faq.json");
    setState({
      ...state,
      data: result.data,
    });
    console.log("result", result);
  }

  useEffect(() => {
    fetchDatas();
  }, []);

  const mapFaq = (item: faq, key: number): JSX.Element => {
    return (
      <AccordionItem key={key} title={item.question} content={item.answer} />
    );
  };

  return (
    <>
      <Helmet>
        <title>Onlus - {t("metaTitles.faq")}</title>
        <meta name="description" content={`${t("metaTitles.faq")} page`} />
      </Helmet>

      <Header />
      {state.data && (
        <main id={"faq"} className="sectionContainer">
          <section>
            <h1>{state.data.info.title}</h1>
            <p>{state.data.info.text}</p>
          </section>
          <section>
            <h1>Faq</h1>
            <div className="faq-container">{state.data.qna.map(mapFaq)}</div>
          </section>
        </main>
      )}
      <Footer />
    </>
  );
};

export default Faq;
