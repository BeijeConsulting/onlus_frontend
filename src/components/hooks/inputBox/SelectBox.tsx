import React, { FC, useState, useEffect } from "react"
// utils
import { theme } from "../../../utils/muiTheme"
// mui components
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select, { SelectChangeEvent } from "@mui/material/Select"
import { ThemeProvider } from "@mui/material/styles"

interface SelectBoxProps {
  label: string
  items: Array<any>
  callbackChange?: Function
  defaultValue?:string
}

interface State {
  value: string | undefined
}

const SelectBox: FC<SelectBoxProps> = (props) => {

  const [state, setState] = useState<State>({
    value: props.defaultValue
  })

  useEffect(() => {
    console.log(props.defaultValue)
  }, [])

  const handleChange = (event: SelectChangeEvent) => {
    setState({
      ...state,
      value: event.target.value as string,
    })
    if (!!props.callbackChange) props.callbackChange(event.target.value)
  }

  const mapItems = (item: any, key: number): JSX.Element => {
    return (
      <MenuItem key={key} value={item.value}>
        {item.label}
      </MenuItem>
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <div style={{ width: "100%" }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label" size="small" color="info">
            {props.label}
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={state.value}
            label={props.label}
            size="small"
            color="info"
            onChange={handleChange}
          >
            {props.items && props.items.length > 0 && props.items.map(mapItems)}
          </Select>
        </FormControl>
      </div>
    </ThemeProvider>
  )
}
export default SelectBox
