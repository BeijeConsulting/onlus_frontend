//Components
import Footer from "../components/footer/Footer";
import Header from "../components/hooks/Header/Header";
import CustomButton from "../components/ui/buttons/CustomButton/CustomButton";
import InputBox from "../components/ui/inputBox/InputBox";

//i18n 
import { useTranslation } from "react-i18next"

//Styles
import '../styles/login.scss'

function Login() {
  const { t }: any = useTranslation()
  const login=()=>{
    console.log("login")
  }

  return (
    <>
      <Header />

      <main>

        <section className="login-container">
          <h1>{t("titles.loginTitle")}</h1>

          <InputBox label={t("login.email")} type={"mail"} />
          <InputBox label={t("login.password")} type={"password"} />

          <a href="#">{t("login.forgottenPassword")}</a>

          <CustomButton size={"big"} txtColor={"white"}  callback={login} bgColor={"red"} label={t("buttons.loginButton")}/>

          <p>{t("login.notRegistered")}</p>
          <a href="#">{t("buttons.signupButton")}</a>
        </section>

      </main>

      <Footer />
    </>
  );
}

export default Login;
