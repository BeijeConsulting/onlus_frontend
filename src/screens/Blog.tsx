import { FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Footer from "../components/footer/Footer";
import Header from "../components/hooks/Header/Header";
import PreFooter from "../components/preFooter/PreFooter";
import InputBox from "../components/ui/inputBox/InputBox";
import SelectBox from "../components/ui/inputBox/SelectBox";
import { articles, categories } from "../utils/data";

interface State {
  categories: Array<any>;
}

let localCategories: Array<any> = [];

const Blog: FC = () => {
  const { t }: any = useTranslation();

  const search = (): void => {};

  useEffect(() => {
    createCategories();
  }, []);

  const createCategories = (): void => {
    categories.forEach((e) => {
      let singleCategory: any = {
        label: e.name,
        value: e.name,
      };
      localCategories.push(singleCategory);
    });
    console.log(localCategories);
  };

  return (
    <>
      <Header />
      <main className="blog">
        <h1>{t("titles.blogTitle")}</h1>
        <InputBox label={t("search")} type="text" callbackChange={search} />
        <SelectBox label={t("selectCategory")} items={localCategories} />
      </main>
      <PreFooter />
      <Footer />
    </>
  );
};

export default Blog;
