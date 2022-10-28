import { FC, useState } from "react"

import Accordion from "@mui/material/Accordion"
import AccordionSummary from "@mui/material/AccordionSummary"
import AccordionDetails from "@mui/material/AccordionDetails"
import Typography from "@mui/material/Typography"
import AddIcon from "@mui/icons-material/Add"
import RemoveIcon from "@mui/icons-material/Remove"

import styles from "./AccordionItem.module.scss"

interface AccordionItemProps {
  title: string
  content: string
}

interface State {
  isExpanded: boolean
}

const initialState = {
  isExpanded: false,
}

const AccordionItem: FC<AccordionItemProps> = (props) => {
  const [state, setState] = useState<State>(initialState)

  const handleChange = (): void => {
    setState({
      ...state,
      isExpanded: !state.isExpanded,
    })
  }

  return (
    <Accordion onChange={handleChange} className={styles.accordion}>
      <AccordionSummary
        expandIcon={
          !state.isExpanded ? (
            <div className={styles.accordionIcon}>
              <AddIcon />
            </div>
          ) : (
            <div className={styles.accordionIcon}>
              <RemoveIcon />
            </div>
          )
        }
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography variant="h6">{props.title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>{props.content}</Typography>
      </AccordionDetails>
    </Accordion>
  )
}

export default AccordionItem
