import * as React from "react"
import Typography from "@mui/material/Typography"
import Pagination from "@mui/material/Pagination"
import Stack from "@mui/material/Stack"

interface LocalProps {
  callbackChange: Function
}

function CustomPagination(props: LocalProps): React.ReactElement {
  const [page, setPage] = React.useState(1)

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
    props.callbackChange(value)
  }

  return (
    <Stack spacing={2}>
      <Typography variant="body2">Page: {page}</Typography>
      <Pagination count={10} page={page} onChange={handleChange} />
    </Stack>
  )
}

export default CustomPagination
