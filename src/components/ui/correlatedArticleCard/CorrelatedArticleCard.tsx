import { FC } from "react"
import { Typography } from "@mui/material"

//style
import "./correlatedArticleCard.scss"

interface CorrelatedArticleCardProps {
  cover: string
  title: string
}

const CorrelatedArticleCard: FC<CorrelatedArticleCardProps> = (props) => {
  return (
    <div className="articleCardContainer">
      <img src={props.cover} className="image" />
      <div className="titleContainer">
        <Typography variant="body1">{props.title}</Typography>
        <a href="#">
          <Typography variant="caption">Continua a leggere...</Typography>
        </a>
      </div>
    </div>
  )
}

export default CorrelatedArticleCard
