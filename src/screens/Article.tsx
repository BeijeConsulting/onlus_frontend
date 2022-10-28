import { FC, useEffect, useState } from "react";
import Footer from "../components/footer/Footer";
import Header from "../components/hooks/Header/Header";
import PreFooter from "../components/preFooter/PreFooter";
import { useTranslation } from "react-i18next";
import axios from "axios";

import { article, content } from "../utils/type";

//style
import "../styles/article.scss";
import CorrelatedArticleCard from "../components/ui/correlatedArticleCard/CorrelatedArticleCard";
import Hero from "../components/hooks/Hero/Hero";

const singleArticle = {
  id: 1,
  name: "riccardo",
  surname: "bottoli",
  email: "aletia@milan.it",
  date: "22 ottobre 2029",
  title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  status: "published",
  cover:
    "https://media.istockphoto.com/photos/giraffe-in-front-of-kilimanjaro-mountain-picture-id488580536?k=20&m=488580536&s=612x612&w=0&h=xXmFHuCU9Phc0rcxAm9jjeoToeQw-H_2y5HMgkMgs6k=",
  categories: ["buongiorismo", "religione", "scemenze"],
  content: [
    {
      paragraph:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in sem vitae leo consequat convallis. Duis fermentum euismod dui, sollicitudin rutrum purus. Proin posuere commodo mollis. Nam finibus pretium risus. Quisque vel maximus risus. Donec ultrices leo id aliquam hendrerit. Proin gravida dui id nulla venenatis suscipit. Morbi scelerisque tincidunt velit, bibendum dignissim velit sagittis ut. Suspendisse semper tincidunt odio, eget laoreet justo aliquet nec. Duis ut nunc posuere, tincidunt nulla sit amet, ultrices sapien. Quisque a pretium est. Nam malesuada convallis ipsum, sed volutpat ante accumsan nec. Donec ultrices scelerisque posuere.",
      media: {
        content:
          "https://media.istockphoto.com/photos/giraffe-in-front-of-kilimanjaro-mountain-picture-id488580536?k=20&m=488580536&s=612x612&w=0&h=xXmFHuCU9Phc0rcxAm9jjeoToeQw-H_2y5HMgkMgs6k=",
        type: "image",
      },
    },
    {
      paragraph:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in sem vitae leo consequat convallis. Duis fermentum euismod dui, sollicitudin rutrum purus. Proin posuere commodo mollis. Nam finibus pretium risus. Quisque vel maximus risus. Donec ultrices leo id aliquam hendrerit. Proin gravida dui id nulla venenatis suscipit. Morbi scelerisque tincidunt velit, bibendum dignissim velit sagittis ut. Suspendisse semper tincidunt odio, eget laoreet justo aliquet nec. Duis ut nunc posuere, tincidunt nulla sit amet, ultrices sapien. Quisque a pretium est. Nam malesuada convallis ipsum, sed volutpat ante accumsan nec. Donec ultrices scelerisque posuere.",
      media: null,
    },
    {
      paragraph:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in sem vitae leo consequat convallis. Duis fermentum euismod dui, sollicitudin rutrum purus. Proin posuere commodo mollis. Nam finibus pretium risus. Quisque vel maximus risus. Donec ultrices leo id aliquam hendrerit. Proin gravida dui id nulla venenatis suscipit. Morbi scelerisque tincidunt velit, bibendum dignissim velit sagittis ut. Suspendisse semper tincidunt odio, eget laoreet justo aliquet nec. Duis ut nunc posuere, tincidunt nulla sit amet, ultrices sapien. Quisque a pretium est. Nam malesuada convallis ipsum, sed volutpat ante accumsan nec. Donec ultrices scelerisque posuere.",
      media: {
        content:
          "https://i.ytimg.com/an_webp/xExzNVgjpoo/mqdefault_6s.webp?du=3000&sqp=CLzQ6ZoG&rs=AOn4CLB4z3Z-51GQQ7pc6LFqDAVwIcDGYQ",
        type: "video",
      },
    },
  ],
};

interface State {
  localArray: Array<article>;
}
const initialState = {
  localArray: [],
};

const Article: FC = () => {
  const [state, setState] = useState<State>(initialState);

  const { t }: any = useTranslation();

  useEffect(() => {
    fetchDatas();
  }, []);

  async function fetchDatas() {
    let result: any = await axios.get("/mockAPI/articles.json");
    console.log(result.data.articles);
    setState({
      ...state,
      localArray: result.data.articles,
    });
    // localArray = localArray.filter((obj) => {
    //   return obj.categories.some(singleArticle.categories);
    // });
    // console.log(localArray);
  }

  const mappingParagraph = (el: content, key: number): JSX.Element => {
    return (
      <div key={key} className="paragraph">
        <p className="paragraphText">{el.paragraph}</p>
        {/* {!!el.media && <img className="image" src={el.media} />} */}
        {!!el.media &&
          (el.media.type === "image" ? (
            <img className="media" src={el.media.content} />
          ) : (
            <video controls className="video">
              <source type="video/webm" src={el.media.content} />
            </video>
          ))}
      </div>
    );
  };

  const mappingCorrelated = (el: article, key: number): JSX.Element => {
    return (
      <div key={key}>
        <CorrelatedArticleCard cover={el.cover} title={el.title} />
      </div>
    );
  };

  return (
    <>
      <Header />
      <Hero image="giraffeImg.jpg" title={singleArticle.title} type="article" />
      <main className="article">
        <div className="date">{singleArticle.date}</div>
        <article>
          <section>{singleArticle.content.map(mappingParagraph)}</section>
          <div className="title">{t("home.relatedArticles")}</div>
          <section className="correlatedArticles">
            {state.localArray.length > 0 &&
              state.localArray.map(mappingCorrelated)}
          </section>
        </article>
      </main>
      <PreFooter />
      <Footer />
    </>
  );
};

export default Article;
