import { ReactElement, useState, useEffect } from "react";

//style
import "./donationHistory.scss";

//i18n
import { useTranslation } from "react-i18next";

//type
import { donation } from "../../../utils/type";
// convertdate
import { convertDate } from "../../../utils/convertDate";
//mui
import { Typography } from "@mui/material";

interface Props {
  datas: Array<donation>;
}

function DonationHistory(props: Props): ReactElement {
  const { t }: any = useTranslation();
  const [state, setState] = useState<number>(0);

  useEffect(() => {
    sumDonations();
  }, []);

  function sumDonations(): void {
    let sum: number = 0;
    props.datas?.forEach((elem: donation) => {
      sum = sum + elem.amount;
    });
    setState(sum);
  }

  function mapping(element: donation,key:number): ReactElement {
    return (
      <div key={key} className="singleDonation">
        <span>{`${convertDate(element.donationDate,t("dateFormat"))}`}</span>
        <span>{`${element.amount}€`}</span>
      </div>
    );
  }

  return (
    <article className="donationsSection">
      <section className="windowBox">
        <div className="donationTotal">
          <Typography variant="body1">
            {t("personalArea.totalDonated")}

            <span className="bigNumber">{`${state}€`}</span>
          </Typography>
        </div>
        <div className="titleHistory">
          <Typography variant="h3">
            {t("personalArea.donationsHistory")}
          </Typography>
        </div>
        <section className="donations">
          <Typography variant="body1">{props.datas?.map(mapping)}</Typography>
        </section>
      </section>
    </article>
  );
}

export default DonationHistory;
