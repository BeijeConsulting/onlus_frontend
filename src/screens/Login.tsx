//Components
import Footer from "../components/footer/Footer";
import Header from "../components/hooks/Header/Header";
import InputBox from "../components/ui/inputBox/InputBox";

//Styles
import '../styles/login.scss'

function Login() {
  return (
    <>
      <Header />

      <main className="loginContainer">
        <h1>Login</h1>
        <InputBox label={"Email"} type={"mail"}/>
        <InputBox label={"Password"} type={"password"}/>
        
      </main>
    </>
  );
}

export default Login;
