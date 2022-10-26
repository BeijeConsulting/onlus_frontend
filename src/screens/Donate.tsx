import { FC } from "react";
import { useTranslation } from "react-i18next";

//components
import Footer from "../components/footer/Footer";
import Header from "../components/hooks/Header/Header";
import PreFooter from "../components/preFooter/PreFooter";
import CustomButton from "../components/ui/buttons/CustomButton/CustomButton";
import InputBox from "../components/ui/inputBox/InputBox";

//style
import "../styles/donate.scss";

const secondary: string = "#B12009";

const Donate: FC = () => {
  const { t }: any = useTranslation();

  const checkForm = (): void => {
    console.log("check");
  };

  return (
    <>
      <Header />
      <main className="donateContainer">
        <h1>{t("personalArea.donate")}</h1>
        <form action="">
          <div className="titlePersonalData">
            {t("personalArea.personalData")}
          </div>
          <section className="personalData">
            <div className="input-box">
              <InputBox label={t("login.name")} type="text" isRequired={true} />
              <InputBox
                label={t("login.surname")}
                type="text"
                isRequired={true}
              />
            </div>
            <div className="input-box">
              <InputBox
                label={t("login.email")}
                type="text"
                isRequired={true}
              />
              <InputBox
                label={t("login.phone")}
                type="text"
                isRequired={true}
              />
            </div>
            <div className="input-box">
              <InputBox label={t("login.cf")} type="text" isRequired={true} />
              <InputBox
                label={t("login.dateOfBirth")}
                type="text"
                isRequired={true}
              />
            </div>
          </section>
          <div className="titlePersonalData">
            {t("personalArea.paymentOption")}
          </div>
          <section className="personalData">
            <InputBox
              label={t("donate.holderName")}
              type="text"
              isRequired={true}
            />
            <InputBox
              label={t("donate.cardNumber")}
              type="text"
              isRequired={true}
            />
            <div className="cvcContainer">
              <InputBox
                label={t("donate.expirationDate")}
                type="text"
                isRequired={true}
              />
              <InputBox label={t("donate.cvc")} type="text" isRequired={true} />
            </div>
            <InputBox
              label={t("donate.amount")}
              type="text"
              isRequired={true}
            />
          </section>
        </form>
        <div className="buttonContainer">
          <CustomButton
            bgColor={secondary}
            label={t("buttons.confirmButton")}
            size="big"
            txtColor={"white"}
            callback={checkForm}
          />
        </div>
      </main>
      <PreFooter />
      <Footer />
    </>
  );
};

export default Donate;
