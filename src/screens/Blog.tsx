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

interface State {
  categories: Array<category>;
  articles: Array<any>;
}

const initialState = {
  categories: [],
  articles: articles,
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

  const mapping = (): void => {};

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
          {/* {state.articles.map(mapping)} */}
        </section>
      </main>
      <PreFooter />
      <Footer />
    </>
  );
};

export default Blog;
