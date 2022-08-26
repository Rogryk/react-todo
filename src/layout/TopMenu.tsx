import React, { useState, useEffect } from "react";
import { Tabs, MantineProvider } from "@mantine/core";

interface ITopMenu {
  tabState: string;
  setTabState: React.Dispatch<React.SetStateAction<any>>;
}

const TopMenu: React.FC<ITopMenu> = ({ tabState, setTabState }) => {
  return (
    <MantineProvider theme={{ colorScheme: "dark" }}>
      <nav className="top-nav">
        <Tabs color="teal" value={tabState} onTabChange={setTabState}>
          <Tabs.List position="center">
            <Tabs.Tab value="day">Day</Tabs.Tab>
            <Tabs.Tab value="week">Week</Tabs.Tab>
            <Tabs.Tab value="month">Month</Tabs.Tab>
            <Tabs.Tab value="year">Year</Tabs.Tab>
          </Tabs.List>
        </Tabs>
      </nav>
    </MantineProvider>
  );
};

export default TopMenu;
