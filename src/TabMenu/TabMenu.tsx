import React from "react";
import { Tabs } from "@mantine/core";

interface ITabMenu {
  tabState: string;
  setTabState: React.Dispatch<React.SetStateAction<any>>;
}

const TabMenu: React.FC<ITabMenu> = ({ tabState, setTabState }) => {
  return (
    <div className="top-nav">
      <Tabs color="teal" value={tabState} onTabChange={setTabState}>
        <Tabs.List position="center">
          <Tabs.Tab value="day">Day</Tabs.Tab>
          <Tabs.Tab value="week">Week</Tabs.Tab>
          <Tabs.Tab value="month">Month</Tabs.Tab>
          <Tabs.Tab value="year">Year</Tabs.Tab>
        </Tabs.List>
      </Tabs>
    </div>
  );
};

export default TabMenu;
