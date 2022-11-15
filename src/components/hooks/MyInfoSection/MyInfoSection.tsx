import { FC, ReactElement, useState, useEffect } from "react";

//i18n
import { useTranslation } from "react-i18next";

//components
import InputBox from "../inputBox/InputBox";
import SelectBox from "../inputBox/SelectBox";
import CustomButton from "../../ui/buttons/CustomButton/CustomButton";

//check
import {
  checkText,
  checkEmail,
  checkPhone,
  checkPassword,
  checkConfirmPassword,
} from "../../../utils/checkForm";

//api
import { updateUserApi } from "../../../services/api/authApi";

//style
import "../../../styles/signup.scss";
import "./myInfoSection.scss";

//type
import { personalInfo, sendObj } from "../../../utils/type";
import { send } from "process";

interface InfoProps {
  datas: personalInfo | null;
}

interface State {
  buttonDisabled: boolean;
  passwordDisabled: boolean;
  somethingChanged: boolean;
  errorName: boolean;
  name: string;
  errorSurname: boolean;
  surname: string;
  errorPassword: boolean;
  language: string;
  password: string;
  confirmPassword: string;
  errorConfirmPassword: boolean;
  errorEmail: boolean;
  email: string;
  errorPhoneNumber: boolean;
  phoneNumber: string;
}

const MyInfoSection: FC<InfoProps> = (props): ReactElement => {
  const { t, i18n }: any = useTranslation();

  const initialState = {
    buttonDisabled: true,
    passwordDisabled: true,
    somethingChanged: false,
    name: props.datas!.name,
    surname: props.datas!.surname,
    email: props.datas!.email,
    password: props.datas!.password,
    confirmPassword: "",
    errorConfirmPassword: false,
    phoneNumber: props.datas!.phone,
    language: i18n.language,
    errorName: false,
    errorSurname: false,
    errorEmail: false,
    errorPhoneNumber: false,
    errorPassword: false,
  };

  const lngs = [
    { label: t("login.italian"), value: t("login.italian") },
    { label: t("login.english"), value: t("login.english") },
  ];

  const oldPhoneNumber: string | undefined = props.datas?.phone;

  const [state, setState] = useState<State>(initialState);

  useEffect(() => {
    console.log( 
      state.somethingChanged &&
      !state.errorName &&
      !state.errorEmail &&
      !state.errorSurname &&
      !state.errorPassword &&
      !state.errorConfirmPassword &&
      !state.errorPhoneNumber
    )
    if ( 
      state.somethingChanged &&
      !state.errorName &&
      !state.errorEmail &&
      !state.errorSurname &&
      !state.errorPassword &&
      !state.errorConfirmPassword &&
      !state.errorPhoneNumber
    ) {
      console.log('funziona')
      updateDatas();
    }
  }, [
    state.somethingChanged,
    state.errorEmail,
    state.errorName,
    state.errorPassword,
    state.errorPhoneNumber,
    state.errorSurname,
    state.errorConfirmPassword,
  ]);

  useEffect(() => {
    console.log(state);
  }, [state]);

  const updateDatas = async (): Promise<void> => {

    let sendObj:sendObj = {
      id: props.datas!.id,
      language: `${state.language.toUpperCase()}`,
      name: `${state.name}`,
      password: `${state.password}`,
      surname: `${state.surname}`,
    };

    if(oldPhoneNumber !== state.phoneNumber) sendObj = {...sendObj, phone: state.phoneNumber}

    console.log(JSON.stringify(sendObj));

    let result:any = await updateUserApi(props.datas!.id, JSON.stringify(sendObj));
    console.log(result.data);
    setState({
      ...state,
      buttonDisabled: true,
      passwordDisabled:true
    })
  };

  const submit = (): any => {
    console.log(!checkConfirmPassword(state.password, state.confirmPassword));
    setState({
      ...state,
      errorName: !checkText(state.name),
      errorSurname: !checkText(state.surname),
      errorEmail: !checkEmail(state.email),
      errorPhoneNumber: !checkPhone(state.phoneNumber),
      errorPassword: !checkPassword(state.password),
      errorConfirmPassword: !checkConfirmPassword(
        state.password,
        state.confirmPassword
      ),
      somethingChanged: true,
    });
  };

  function setName(val: React.ChangeEvent<HTMLInputElement>): void {
    setState({
      ...state,
      name: val.target.value,
      buttonDisabled: false,
    });
  }
  function setSurname(val: React.ChangeEvent<HTMLInputElement>): void {
    setState({
      ...state,
      surname: val.target.value,
      buttonDisabled: false,
    });
  }
  function setEmail(val: React.ChangeEvent<HTMLInputElement>): void {
    setState({
      ...state,
      email: val.target.value,
      buttonDisabled: false,
    });
  }
  function setPassword(val: React.ChangeEvent<HTMLInputElement>): void {
    setState({
      ...state,
      password: val.target.value,
      buttonDisabled: false,
      passwordDisabled: false,
    });
  }
  function setConfirmPassword(val: React.ChangeEvent<HTMLInputElement>): void {
    setState({
      ...state,
      confirmPassword: val.target.value,
      buttonDisabled: false,
      passwordDisabled: false,
    });
  }

  function setPhoneNumber(val: React.ChangeEvent<HTMLInputElement>): void {
    setState({
      ...state,
      phoneNumber: val.target.value,
      buttonDisabled: false,
    });
  }

  function setLanguage(val: string) {
    let language: string = "";
    if (val === t("login.italian")) language = "it";
    if (val === t("login.english")) language = "en";
    setState({
      ...state,
      language: language,
      buttonDisabled: false,
    });
  }

  function disableAccount(): void {
    console.log("disabled");
  }

  return (
    <section className="myInfo-container">
      <form action="" className={"form"} onSubmit={submit}>
        <div className={"input-box my-input-container"}>
          <InputBox
            label={t("login.name")}
            defaultValue={state.name}
            callbackChange={setName}
            type={"text"}
            isRequired={true}
            notValid={state.errorName}
          />
          <InputBox
            defaultValue={state.surname}
            callbackChange={setSurname}
            label={t("login.surname")}
            type={"text"}
            isRequired={true}
            notValid={state.errorSurname}
          />
        </div>
        <div className={"input-box my-input-container"}>
          <InputBox
            defaultValue={state.email}
            label={t("login.email")}
            callbackChange={setEmail}
            disabled={true}
            type={"email"}
            isRequired={true}
            notValid={state.errorEmail}
          />
          <InputBox
            defaultValue={state.password}
            label={t("login.password")}
            callbackChange={setPassword}
            type={"password"}
            isRequired={true}
            notValid={state.errorPassword}
          />
          {state.passwordDisabled === false && (
            <InputBox
              defaultValue={""}
              label={t("login.confirmPassword")}
              callbackChange={setConfirmPassword}
              type={"password"}
              isRequired={true}
              notValid={state.errorPassword}
            />
          )}
        </div>
        <div className={"input-box my-input-container"}>
          <InputBox
            defaultValue={state.phoneNumber}
            callbackChange={setPhoneNumber}
            label={t("login.phone")}
            type={"text"}
            notValid={state.errorPhoneNumber}
          />
          <SelectBox
            label={t("login.language")}
            items={lngs}
            callbackChange={setLanguage}
            defaultValue={
              i18n.language === "it" ? t("login.italian") : t("login.english")
            }
          />
        </div>
        <div className={"input-box my-input-container buttons-container"}>
          <CustomButton
            label={t("buttons.disableAccount")}
            isDisable={false}
            size={"big"}
            colorType="primary"
            callback={disableAccount}
          />
          <CustomButton
            label={t("buttons.modifyButton")}
            isDisable={state.buttonDisabled}
            size={"big"}
            colorType="primary"
            callback={submit}
          />
        </div>
      </form>
    </section>
  );
};

export default MyInfoSection;
