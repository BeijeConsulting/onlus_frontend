//React
import { ReactElement, useState, useEffect } from "react";

//navigation
import { useNavigate, NavigateFunction, Link } from "react-router-dom";
import SCREENS from "../../../route/router";

//mui
import { Typography, Skeleton } from "@mui/material";

//Components
import CustomButton from "../../ui/buttons/CustomButton/CustomButton";

//Style
import "./joinUsBox.scss";

//type
import { joinUs } from "../../../utils/type";

//redux
import { useSelector } from "react-redux";

interface Props {
  type: string;
}

interface State {
  data: joinUs | null;
  isLoaded: boolean;
}

const initialState = {
  data: null,
  isLoaded: false,
};

function JoinUs(props: Props): ReactElement {

  const navigate: NavigateFunction = useNavigate();
  const [state, setState] = useState<State>(initialState);

  const BANNER: any = useSelector((state: any) => state.generalDuck.banner);

  useEffect(() => {
    getData();
  }, []);

  function goToDonations(): void {
    navigate(SCREENS.donate);
  }

  function goToJoin(): void {
    navigate(SCREENS.signup);
  }

  async function getData(): Promise<void> {
    setState({
      data: BANNER,
      isLoaded: true,
    });
  }

  return (
    <article className="joinUsBox">
      {state.isLoaded ? (
        <>
          <section className="upperSection">
            <Typography variant="h1"> {state.data!.title}</Typography>
            <hr className="separator" />
            <Typography variant="h4">{state.data!.subtitle}</Typography>
          </section>
          <div className="buttons">
            <div className="btn1">
              <CustomButton
                colorType="primary"
                label={state.data!.btnText1}
                size="big"
                callback={goToDonations}
              />
            </div>
            {props.type === "support" && (
              <div className="btn2">
                <CustomButton
                  colorType="secondary"
                  label={state.data!.btnText2}
                  size="big"
                  callback={goToJoin}
                />
              </div>
            )}
          </div>
          {props.type === "support" && (
            <section className="lowerSection">
              <Link to={SCREENS.support} className="supportLink">
                <Typography variant="body1">{state.data!.link}</Typography>
              </Link>
            </section>
          )}
        </>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Skeleton
            variant="text"
            animation="wave"
            sx={{
              fontSize: 70,
              width: "40%",
              backgroundColor: "rgb(249 249 249 / 13%)",
            }}
          />
          <Skeleton
            variant="text"
            animation="wave"
            sx={{
              fontSize: 40,
              width: "70%",
              backgroundColor: "rgb(249 249 249 / 13%)",
            }}
          />
        </div>
      )}
    </article>
  );
}

export default JoinUs;
