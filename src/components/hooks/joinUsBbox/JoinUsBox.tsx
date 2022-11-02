import React, { ReactElement, useState, useEffect } from "react"
import Button from "@mui/material/Button"
import Link from "@mui/material/Link"
import "./joinUsBox.scss"
import { useNavigate, NavigateFunction } from "react-router-dom"
import CustomButton from "../../ui/buttons/CustomButton/CustomButton"
import { useTranslation } from "react-i18next"
import axios from "axios"
import SCREENS from "../../../route/router"
import { Typography } from "@mui/material"

//ammessi valori "support" e "donate"
interface Props {
  type: string
}

interface State {
  title: string
  donate: string
  text: string
  link: string
}

const initialState = {
  title: "",
  text: "",
  link: "",
  donate: "",
}

function JoinUs(props: Props): ReactElement {
  const { t }: any = useTranslation()
  const navigate: NavigateFunction = useNavigate()
  const [state, setState] = useState<State>(initialState)

  useEffect(() => {
    getData()
  }, [])

  function goToDonations(): void {
    navigate(SCREENS.donate)
  }

  function goToJoin(): void {
    navigate(SCREENS.signup)
  }

  async function getData(): Promise<void> {
    let mockData: any = await axios.get("mockAPI/joinUsBox.json")
    setState(mockData.data)
  }

  return (
    <article className="joinUsBox">
      <section className="upperSection">
        {props.type === "support" ? (
          <Typography variant="h1"> {state.title}</Typography>
        ) : (
          <Typography variant="h1"> {state.donate}</Typography>
        )}

        <hr className="separator" />
        <Typography variant="h3">{state.text}</Typography>
      </section>
      <div className="buttons">
        <div className="btn1">
          <CustomButton
            colorType="primary"
            label={t("buttons.donateButton")}
            size="big"
            callback={goToDonations}
          />
        </div>
        {props.type === "support" && (
          <div className="btn2">
            <CustomButton
              colorType="secondary"
              label={t("buttons.volunteerButton")}
              size="big"
              callback={goToJoin}
            />
          </div>
        )}
      </div>
      {props.type === "support" && (
        <section className="lowerSection">
          <Typography variant="body1">{state.link}</Typography>
        </section>
      )}
    </article>
  )
}

export default JoinUs
