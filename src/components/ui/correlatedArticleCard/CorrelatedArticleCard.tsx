import { FC } from "react";

//style
import "./correlatedArticleCard.scss";

interface CorrelatedArticleCardProps {
  cover: string;
  title: string;
}

const CorrelatedArticleCard: FC<CorrelatedArticleCardProps> = (props) => {
  return (
    <div className="cardContainer">
      <img src={props.cover} className="image" />
      <div className="titleContainer">
        <div className="cardTitle">{props.title}</div>
        <a href="#" className="continue">Continua a leggere...</a>
      </div>
    </div>
  );
};

export default CorrelatedArticleCard;
