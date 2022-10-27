import { FC, useState } from "react"
import FormControlLabel from "@mui/material/FormControlLabel"
import Checkbox from "@mui/material/Checkbox"
import { createTheme, ThemeProvider } from "@mui/material/styles"
// utils
import { theme } from "../../../utils/muiTheme"

interface InputCheckboxProps {
  label: string
  callbackChange?: Function
}

const InputCheckbox: FC<InputCheckboxProps> = (props) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!!props.callbackChange) {
      props.callbackChange(event.target.checked)
    }
  }
  return (
    <ThemeProvider theme={theme}>
      <div style={{ margin: 5 }}>
        <FormControlLabel
          control={<Checkbox size="small" onChange={handleChange} />}
          label={props.label}
        />
      </div>
    </ThemeProvider>
  )
}
export default InputCheckbox
