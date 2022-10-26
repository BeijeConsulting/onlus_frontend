import React, { FC, ReactElement } from "react"
import "./customButton.scss"

interface Props {
  bgColor: string
  txtColor: string
  label: string
  size: "big" | "small"
  callback: Function
}

const CustomButton: FC<Props> = (props): ReactElement => {
  function handleClick(): void {
    if (!!props.callback) props.callback()
  }

  return (
    <div
      onClick={handleClick}
      className={`btn ${props.size === "big" ? "bigBtn" : "smallBtn"}`}
      style={{ backgroundColor: props.bgColor, color: props.txtColor }}
    >
      {props.label}
    </div>
  )
}

export default CustomButton
