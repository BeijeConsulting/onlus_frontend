import React, { ReactElement, useState, useEffect } from "react";
import "./donationHistory.scss";

interface donations {
  id: number;
  date: Date;
  amount: number;
}

interface Props {
  datas: donations[]
};


function DonationHistory(props: Props): ReactElement {
  const [state, setState] = useState<number>(0);

  useEffect(() => {
    sumDonations();
  }, []);

  function sumDonations(): void {
    let sum: number = 0;
    props.datas.forEach((elem: donations) => {
      sum = sum + elem.amount;
    });
    setState(sum);
  }

  function mapping(element: donations): ReactElement {
    return (
      <div key={element.id} className="singleDonation">
        <span>{`${element.date}`}</span>
        <span>{`${element.amount}€`}</span>
      </div>
    );
  }

  return (
    <article>
      <section className="windowBox">
        <div className="donationTotal">
          {`In totale hai donato `}
          <span className="bigNumber">{`${state}€`}</span>
        </div>
        <div className="titleHistory">Storico donazioni</div>
        <section className="donations">{props.datas.map(mapping)}</section>
      </section>
    </article>
  );
}

export default DonationHistory;
