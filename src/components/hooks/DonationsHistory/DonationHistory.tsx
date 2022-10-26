import React, { ReactElement } from "react";
import Button from "@mui/material/Button";

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

  let sum: number = 0;
  
  function sumDonations(): void {
    DONATIONS.forEach((elem: donations) => {
      sum = sum + elem.amount;
    });
    console.log("in totale hai donato", sum);
  }

  return (
    <article>
      <section>
        {`In totale hai donato ${sum}`}{" "}
        <Button onClick={sumDonations} title="click" />
      </section>
    </article>
  );
}

export default DonationHistory;
