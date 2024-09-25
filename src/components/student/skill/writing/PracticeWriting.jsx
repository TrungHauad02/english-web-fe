import { TabContext, TabPanel, TabList } from "@mui/lab";
import { Tab } from "@mui/material";
import { Box, Card } from "@mui/material";
import { useState } from "react";

export default function PracticeWriting() {
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
              label="Write a paragraph in topic"
              value="1"
              sx={{
                color: "#000!important",
                backgroundColor: value === "1" ? "#AFCC2B" : "#DCEA99",
                borderTopRightRadius: "999px",
                borderBottom: value === "1" ? "none" : "1px solid white",
                padding: "0.5rem 2.5rem",
                zIndex: 2,
              }}
            />
            <Tab
              label="Speaking in topic"
              value="2"
              sx={{
                color: "#000!important",
                backgroundColor: value === "2" ? "#AFCC2B" : "#DCEA99",
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
        <TabPanel value="1" sx={{ backgroundColor: "#F9FCEE" }}>
          A
        </TabPanel>
        <TabPanel value="2">B</TabPanel>
      </TabContext>
    </Card>
  );
}
