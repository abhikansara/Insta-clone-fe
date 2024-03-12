"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import UsersProfile from "../UsersProfile/page";
import Feed from "../Feed/page";

export default function Home() {
  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <div className="flex justify-center" style={{ width: "100%" }}>
      <Box sx={{ width: "50%", background: "white", height: "100%" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Home" value="1" />
              <Tab label="User's Profile" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1" sx={{ minHeight: "calc(100vh - 50px)" }}>
            <Feed />
          </TabPanel>
          <TabPanel value="2" sx={{ minHeight: "calc(100vh - 50px)" }}>
            <UsersProfile />
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  );
}
