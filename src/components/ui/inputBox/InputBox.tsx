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
import FormHelperText from "@mui/material/FormHelperText"
import { createTheme, ThemeProvider } from "@mui/material/styles"

interface InputBoxProps {
  label: string
  type: string
  defaultValue?: string
  isRequired?: boolean
  callbackChange?: Function
  notValid?: boolean
  upperCase?: boolean
  errorLabel?: string
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
              error={props.notValid}
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
            <FormHelperText error={props.notValid}>
              {props.notValid ? props.errorLabel : undefined}
            </FormHelperText>
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
            helperText={props.notValid ? props.errorLabel : undefined}
          />
        </div>
      )}
    </ThemeProvider>
  )
}

export default InputBox
