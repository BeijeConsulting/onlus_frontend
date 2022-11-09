import { FC } from "react";

// mui
import Button from "@mui/material/Button";

// styles
import styles from "./buttons.module.scss";

interface IconButtonProps {
  icon: any;
  label: string;
  callbackPress?: Function;
}

const IconButton: FC<IconButtonProps> = (props) => {
  const press = (): void => {
    if (!!props.callbackPress) {
      props.callbackPress();
    }
  };

  return (
    <Button variant="contained" className={styles.iconButton} onClick={press}>
      <span className={styles.icon}>{props.icon}</span>
      <p>{props.label}</p>
    </Button>
  );
};

export default IconButton;
