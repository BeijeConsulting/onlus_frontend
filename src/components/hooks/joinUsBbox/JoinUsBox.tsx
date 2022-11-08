//React
import { ReactElement, useState, useEffect } from "react"
import { useNavigate, NavigateFunction } from "react-router-dom"
import { useTranslation } from "react-i18next"
import axios from "axios"
import { Typography, Skeleton } from "@mui/material"
//Components
import CustomButton from "../../ui/buttons/CustomButton/CustomButton"
//Routes
import SCREENS from "../../../route/router"
//Style
import "./joinUsBox.scss"

//ammessi valori "support" e "donate"
interface Props {
  type: string
}

type Data ={
  title: string
  donate: string
  text: string
  link: string
}

interface State {
  data: Data,
  isLoaded: boolean
}

const initialState = {
  data:{
    title:'',
    donate:'',
    text:'',
    link:''
  },
  isLoaded: false
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
    setState({
      data:mockData.data,
      isLoaded:true
    })
  }

  return (
    <article className="joinUsBox">
      {state.isLoaded ? (
        <>
          <section className="upperSection">
            {props.type === "support" ? (
              <Typography variant="h1"> {state.data.title}</Typography>
            ) : (
              <Typography variant="h1"> {state.data.donate}</Typography>
            )}
    
            <hr className="separator" />
            <Typography variant="h3">{state.data.text}</Typography>
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
              <Typography variant="body1">{state.data.link}</Typography>
            </section>
          )}        
        </>
      ):(
        <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
          <Skeleton variant="text" animation="wave" sx={{fontSize:70, width:300, backgroundColor: 'rgb(249 249 249 / 13%)'}}/>
          <Skeleton variant="text" animation="wave" sx={{fontSize:40, width:800, backgroundColor: 'rgb(249 249 249 / 13%)'}}/>
        </div>
      )}
     
    </article>
  )
}

export default JoinUs
