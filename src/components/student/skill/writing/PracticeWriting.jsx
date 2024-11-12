import { TabContext, TabPanel, TabList } from "@mui/lab";
import { Tab } from "@mui/material";
import { Box, Card } from "@mui/material";
import { useState } from "react";
import WritingAboutTopic from "./WritingAboutTopic";

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
                backgroundColor: value === "1" ? "#6EC2F7" : "#bee6ff",
                borderTopRightRadius: "999px",
                borderBottom: value === "1" ? "none" : "1px solid white",
                padding: "0.5rem 2.5rem",
                zIndex: 2,
              }}
            />
          </TabList>
        </Box>
        <TabPanel value="1" sx={{ backgroundColor: "#f1f1f1" }}>
          
        </TabPanel>
      </TabContext>
    </Card>
  );
}
