import React, { FC, useState } from "react"
import Pagination from "@mui/material/Pagination"
import Stack from "@mui/material/Stack"

interface CustomPaginationProps {
  callbackChange: Function
  numberOfPages: number
}

interface State {
  page: number
}

const initialState = {
  page: 1,
}

const CustomPagination: FC<CustomPaginationProps> = (props) => {
  const [state, setState] = useState<State>(initialState)

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setState({
      ...state,
      page: value,
    })
    props.callbackChange(value)
  }

  return (
    <Stack spacing={2}>
      <Pagination
        count={props.numberOfPages}
        page={state.page}
        onChange={handleChange}
      />
      <div>{props.numberOfPages}</div>
    </Stack>
  )
}

export default CustomPagination
