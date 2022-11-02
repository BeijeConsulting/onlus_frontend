import React, { ReactElement, useState, useEffect } from "react";
import "./donationHistory.scss";
import { useTranslation } from "react-i18next";
import { donation } from "../../../utils/type";

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
    props.datas.forEach((elem: donation) => {
      sum = sum + elem.amount;
    });
    setState(sum);
  }

  function mapping(element: donation): ReactElement {
    return (
      <div key={element.id} className="singleDonation">
        <span>{`${element.date}`}</span>
        <span>{`${element.amount}€`}</span>
      </div>
    );
  }

  return (
    <article className="donationsSection">
      <section className="windowBox">
        <div className="donationTotal">
          {t("personalArea.totalDonated")}
          <span className="bigNumber">{`${state}€`}</span>
        </div>
        <div className="titleHistory">{t("personalArea.donationsHistory")}</div>
        <section className="donations">{props.datas.map(mapping)}</section>
      </section>
    </article>
  );
}

export default DonationHistory;
