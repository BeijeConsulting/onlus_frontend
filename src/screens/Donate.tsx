import { FC, useState } from "react";
import { useTranslation } from "react-i18next";

//components
import Footer from "../components/footer/Footer";
import Header from "../components/hooks/Header/Header";
import PreFooter from "../components/preFooter/PreFooter";
import CustomButton from "../components/ui/buttons/CustomButton/CustomButton";
import InputBox from "../components/ui/inputBox/InputBox";
import InputCheckbox from "../components/ui/inputBox/InputCheckbox";

//check functions
import { checkText, checkEmail, checkPhone, checkCF } from "../utils/checkForm";

//style
import "../styles/donate.scss";

interface State {
  isChecked: boolean;
}

const initialState = {
  isChecked: false,
};

type dataObject = {
  name: string;
  surname: string;
  email: string;
  phone: string;
  cf: string;
  dateOfBirth: string;
  holderName: string;
  cardNumber: string;
  expirationDate: string;
  cvc: string;
  amount: string;
};

const Donate: FC = () => {
  const [state, setState] = useState<State>(initialState);
  const { t }: any = useTranslation();

  let data: dataObject = {
    name: "",
    surname: "",
    email: "",
    phone: "",
    cf: "",
    dateOfBirth: "",
    holderName: "",
    cardNumber: "",
    expirationDate: "",
    cvc: "",
    amount: "",
  };

  // const checkForm = (): void => {
  //   console.log("check");
  // };

  const setTerms = (e: any): void => {
    setState({
      ...state,
      isChecked: e,
    });
  };

  const checkForm = (): void => {
    checkText(data.name);
    checkText(data.surname);
    checkEmail(data.email);
  };

  const setEmail = (email: any): void => {
    console.log(checkEmail(email.target.value));
  };
  const setPhone = (phone: any): void => {
    console.log(checkPhone(phone.target.value));
  };
  const setCf = (cf: any): void => {
    console.log(checkCF(cf.target.value));
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
                type="email"
                isRequired={true}
                callbackChange={setEmail}
              />
              <InputBox
                callbackChange={setPhone}
                label={t("login.phone")}
                type="number"
              />
            </div>
            <div className="input-box">
              <InputBox
                callbackChange={setCf}
                label={t("login.cf")}
                type="text"
                isRequired={true}
                upperCase={true}
              />
              <InputBox label={""} type="date" />
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
              type="number"
              isRequired={true}
            />
            <div className="cvcContainer">
              <InputBox label={""} type="month" isRequired={true} />
              <InputBox
                label={t("donate.cvc")}
                type="number"
                isRequired={true}
              />
            </div>
            <InputBox
              label={t("donate.amount")}
              type="number"
              isRequired={true}
            />
          </section>
          <InputCheckbox
            label={t("login.privacyTerms")}
            callbackChange={setTerms}
          />
          <CustomButton
            colorType="primary"
            label={t("buttons.confirmButton")}
            size="big"
            callback={checkForm}
            isDisable={!state.isChecked}
          />
        </form>
      </main>
      <PreFooter />
      <Footer />
    </>
  );
};

export default Donate;
