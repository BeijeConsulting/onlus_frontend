import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Footer from "../components/footer/Footer";
import Header from "../components/hooks/Header/Header";
import PreFooter from "../components/preFooter/PreFooter";
import InputBox from "../components/ui/inputBox/InputBox";
import SelectBox from "../components/ui/inputBox/SelectBox";

//utils
import { articles, categories } from "../utils/data";
import { article, category } from "../utils/type";

//style
import "../styles/blog.scss";
import CardArticle from "../components/cardArticle/CardArticle";
import { useMediaQuery } from "react-responsive";

interface State {
  categories: Array<category>;
  articles: Array<any>;
}

const initialState = {
  categories: [],
  articles: articles,
};

//React responsive const
const Default = ({ children }: any) => {
  const isNotMobile = useMediaQuery({ minWidth: 992 });
  return isNotMobile ? children : null;
};
const Mobile = ({ children }: any) => {
  const isMobile = useMediaQuery({ maxWidth: 991 });
  return isMobile ? children : null;
};

const Blog: FC = () => {
  const [state, setState] = useState<State>(initialState);
  const { t }: any = useTranslation();

  useEffect(() => {
    createCategories();
  }, []);

  const createCategories = (): void => {
    let localCategories: Array<category> = [];
    categories.forEach((e) => {
      let singleCategory: any = {
        label: e.name,
        value: e.name,
      };
      localCategories.push(singleCategory);
    });
    console.log(localCategories);
    setState({
      ...state,
      categories: localCategories,
    });
  };

  const mapping = (el: article, key: number): JSX.Element => {
    return (
      <div key={key}>
        <Mobile>
        <CardArticle
            date={el.date}
            image={el.cover}
            title={el.title}
            description={el.content[0].paragraph}
            minWidth="250px"
          />
        </Mobile>
        <Default>
          <CardArticle
            date={el.date}
            image={el.cover}
            title={el.title}
            description={el.content[0].paragraph}
            minWidth="350px"
          />
        </Default>
      </div>
    );
  };

  const search = (): void => {};

  const handleCategory = (): void => {
    //chiamata api
  };

  return (
    <>
      <Header />
      <main className="blog">
        <h1>{t("titles.blogTitle")}</h1>
        <InputBox label={t("search")} type="text" callbackChange={search} />
        <SelectBox
          label={t("selectCategory")}
          items={state.categories}
          callbackChange={handleCategory}
        />
        <section className="cardsContainer">
          {state.articles.map(mapping)}
        </section>
      </main>
      <PreFooter />
      <Footer />
    </>
  );
};

export default Blog;
