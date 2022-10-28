import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

interface TabPanelProps {
  children?: React.ReactNode;
  index?: number;
  value?: number;
}

interface LocalProps {
  children: React.ReactNode[];
  pages: string[];
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box
          sx={{
            p: 3,
            width: "100%",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <Typography sx={{ width: "100%" }}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs(props: LocalProps) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display:"grid",
        gridTemplateColumns: "1fr 5fr",
        height: "fit-content",
        minWidth: "100%",
        maxWidth: "100%",

      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{
          borderRight: 1,
          borderColor: "divider",
          paddingTop: "24px",
        }}
      >
        <Tab label={props.pages[0]} {...a11yProps(0)} />
        <Tab label={props.pages[1]} {...a11yProps(1)} />
        <Tab label={props.pages[2]} {...a11yProps(2)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        {props.children[0]}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {props.children[1]}
      </TabPanel>
      <TabPanel value={value} index={2}>
        {props.children[2]}
      </TabPanel>
    </Box>
  );
}
