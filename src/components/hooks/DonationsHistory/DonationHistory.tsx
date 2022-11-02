import React, { ReactElement, useState, useEffect } from "react"
import "./donationHistory.scss"
import { useTranslation } from "react-i18next"
import { Typography } from "@mui/material"

interface donations {
  id: number
  date: Date
  amount: number
}

interface Props {
  datas: donations[]
}

function DonationHistory(props: Props): ReactElement {
  const { t }: any = useTranslation()
  const [state, setState] = useState<number>(0)

  useEffect(() => {
    sumDonations()
  }, [])

  function sumDonations(): void {
    let sum: number = 0
    props.datas.forEach((elem: donations) => {
      sum = sum + elem.amount
    })
    setState(sum)
  }

  function mapping(element: donations): ReactElement {
    return (
      <div key={element.id} className="singleDonation">
        <span>{`${element.date}`}</span>
        <span>{`${element.amount}€`}</span>
      </div>
    )
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
          <Typography variant="body1">{props.datas.map(mapping)}</Typography>
        </section>
      </section>
    </article>
  )
}

export default DonationHistory
