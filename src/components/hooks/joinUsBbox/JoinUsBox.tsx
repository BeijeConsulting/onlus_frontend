import { ReactElement } from "react";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import "./joinUsBox.scss";
import { useNavigate, NavigateFunction } from "react-router-dom";
import CustomButton from "../../ui/buttons/CustomButton/CustomButton";

function JoinUs(): ReactElement {
  const navigate: NavigateFunction = useNavigate();

  function goToDonations(): void {
    navigate("/donate");
  }

  function goToJoin(): void {
    navigate("/signup");
  }
  return (
    <article className="joinUsBox">
      <section className="upperSection">
        <div className="header1">Unisciti a noi!</div>
        <hr className="separator" />
        <div className="header2">
          Se vuoi contribuire alla nostra causa, supporta le nostre attività
        </div>
      </section>
      <div className="buttons">
        <div className="btn1">
          <CustomButton
            colorType="primary"
            label="DONA ORA"
            size="big"
            callback={goToDonations}
          />
        </div>
        <div className="btn2">
          <CustomButton
            colorType="secondary"
            label="DIVENTA VOLONTARIO"
            size="big"
            callback={goToJoin}
          />
        </div>
      </div>
      <section className="lowerSection">
        Lorem, ipsum dolor. <Link href="#">Link</Link>
      </section>
    </article>
  );
}
//color="#B12009"

export default JoinUs;
