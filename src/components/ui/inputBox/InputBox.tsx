import React, { FC, useState } from "react"
// utils
import { theme } from "../../../utils/muiTheme"
// mui components
import OutlinedInput from "@mui/material/OutlinedInput"
import TextField, { TextFieldProps } from "@mui/material/TextField"
import InputAdornment from "@mui/material/InputAdornment"
import IconButton from "@mui/material/IconButton"
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import InputLabel from "@mui/material/InputLabel"
import FormControl from "@mui/material/FormControl"
import { createTheme, ThemeProvider } from "@mui/material/styles"

interface InputBoxProps {
  label: string
  type: string
  defaultValue?: string
  isRequired?: boolean
  error?: boolean
  callbackChange?: Function
  notValid?: boolean
  upperCase?: boolean
}

interface State {
  showPassword: boolean
}

const initialState = {
  showPassword: false,
}

const InputBox: FC<InputBoxProps> = (props) => {
  const [state, setState] = useState<State>(initialState)

  const change = (e: any): void => {
    if (!!props.callbackChange) {
      props.callbackChange(e)
    }
  }

  const handleClickShowPassword = () => {
    setState({
      ...state,
      showPassword: !state.showPassword,
    })
  }

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }

  const toInputUppercase = (e: any) => {
    e.target.value = ("" + e.target.value).toUpperCase()
  }

  return (
    <ThemeProvider theme={theme}>
      {props.type === "password" ? (
        <div style={{ margin: 5, width: "100%" }}>
          <FormControl variant="outlined" sx={{ width: "100%" }}>
            <InputLabel
              htmlFor="outlined-adornment-password"
              size="small"
              color="info"
            >
              {props.label}
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={state.showPassword ? "text" : "password"}
              size={"small"}
              onChange={change}
              defaultValue={props.defaultValue}
              required={props.isRequired}
              error={props.notValid}
              color="info"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {state.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
        </div>
      ) : (
        <div style={{ margin: 5, width: "100%" }}>
          <TextField
            sx={{ width: "100%" }}
            label={props.label}
            type={props.type}
            size="small"
            id="custom-css-outlined-input"
            onChange={change}
            defaultValue={props.defaultValue}
            required={props.isRequired}
            error={props.notValid}
            color="info"
            onInput={props.upperCase ? toInputUppercase : undefined}
          />
        </div>
      )}
    </ThemeProvider>
  )
}

export default InputBox
