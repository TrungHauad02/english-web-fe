import { TabContext, TabPanel, TabList } from "@mui/lab";
import { Tab } from "@mui/material";

import { Box, Card } from "@mui/material";
import { useState } from "react";
import ListenAndWriteWord from "./ListenAndWriteWord";
import ListenAndAnswerQuestion from "./ListenAndAnswerQuestion";

function PracticeListening() {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Card sx={{ marginX: "5%", marginY: "1rem" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab
              label="Listen and write the word"
              value="1"
              sx={{
                color: "#000!important",
                backgroundColor: value === "1" ? "#6EC2F7" : "#bee6ff",
                borderTopRightRadius: "999px",
                borderBottom: value === "1" ? "none" : "1px solid white",
                padding: "0.5rem 2.5rem",
                zIndex: 2,
              }}
            />
            <Tab
              label="Listen and answer question"
              value="2"
              sx={{
                color: "#000!important",
                backgroundColor: value === "2" ? "#6EC2F7" : "#bee6ff",
                borderTopRightRadius: "999px",
                borderBottom: value === "2" ? "none" : "1px solid white",
                padding: "0.5rem 2.5rem",
                paddingLeft: "4rem",
                marginLeft: "-3rem",
                zIndex: 1,
              }}
            />
          </TabList>
        </Box>
        <TabPanel value="1" sx={{ backgroundColor: "#f1f1f1" }}>
          <ListenAndWriteWord />
        </TabPanel>
        <TabPanel value="2">
          <ListenAndAnswerQuestion />
        </TabPanel>
      </TabContext>
    </Card>
  );
}

export default PracticeListening;
