import { Button, ThemeProvider } from "@mui/material";
import React, { FC, ReactElement } from "react";

import { theme } from "../../../../utils/muiTheme";

interface Props {
  colorType: "primary" | "secondary";
  label: string;
  size: "big" | "small";
  callback: Function;
  isDisable?: boolean;
}

const CustomButton: FC<Props> = (props): ReactElement => {
  function handleClick(): void {
    if (!!props.callback) props.callback();
  }

  return (
    <ThemeProvider theme={theme}>
      <Button
        sx={props.size === "big" ? { width: "100%" } : { width: "fit-content" }}
        variant="contained"
        disabled={props.isDisable}
        disableElevation
        color={props.colorType}
        onClick={handleClick}
      >
        {props.label}
      </Button>
    </ThemeProvider>
  );
};

export default CustomButton;
