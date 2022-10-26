import React, { ReactElement, useState, useEffect } from "react";
import Button from "@mui/material/Button";
import "./donationHistory.scss";

interface donations {
  id: number;
  date: Date;
  amount: number;
}

const DONATIONS: Array<donations> = [
  { id: 1, date: new Date(2022, 10, 25), amount: 2000 },
  { id: 2, date: new Date(1993, 2, 10), amount: 1000 },
  { id: 3, date: new Date(2021, 0, 10), amount: 2000 },
];

function DonationHistory(): ReactElement {
  const [state, setState] = useState<number>(0);

  useEffect(()=>{
   sumDonations() 
  }, [])

  function sumDonations(): void {
    let sum: number = 0;
    DONATIONS.forEach((elem: donations) => {
      sum = sum + elem.amount;
    });
    setState(sum);
  }

  function mapping(element: donations): ReactElement {
    return (
      <div key={element.id} className="singleDonation">
        <span>{`${element.date.toLocaleDateString()}`}</span>
        <span>{`${element.amount}€`}</span>
      </div>
    );
  }

  return (
    <article>
      <section>
        <div className="donationTotal">
          {`In totale hai donato `}
          <span className="bigNumber">{`${state}€`}</span>
        </div>
        <div className="titleHistory">Storico donazioni</div>
        <section className="donations">{DONATIONS.map(mapping)}</section>
      </section>
    </article>
  );
}

export default DonationHistory;
