import { FC } from "react";
import { useTranslation } from "react-i18next";

//components
import Footer from "../components/footer/Footer";
import Header from "../components/hooks/Header/Header";
import PreFooter from "../components/preFooter/PreFooter";
import InputBox from "../components/ui/inputBox/InputBox";

//MUI

//style
import "../styles/donate.scss";

const Donate: FC = () => {
  const { t }: any = useTranslation();

  return (
    <>
      <Header />
      <main className="donateContainer">
        <div className="titleDonate">{t("personalArea.donate")}</div>
        <form action="">
          <section className="personalData">
            <div className="titlePersonalData">
              {t("personalArea.personalData")}
            </div>
            <InputBox label={t("login.name")} type="text" isRequired={true} />
            <InputBox
              label={t("login.surname")}
              type="text"
              isRequired={true}
            />
          </section>
          <section className="payment"></section>
        </form>
      </main>
      <PreFooter />
      <Footer />
    </>
  );
};

export default Donate;
