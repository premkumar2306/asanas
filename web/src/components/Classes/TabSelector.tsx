import React from 'react';
import { TabType } from '../../pages/Classes/types';
import { Button } from '../common/Button';

interface TabSelectorProps {
  currentTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export default function TabSelector({ currentTab, onTabChange }: TabSelectorProps) {
  const tabs: TabType[] = ["all", "group", "personal", "workshop"];
  
  return (
    <div className="space-x-4 mb-4">
      {tabs.map(tab => (
        <Button
          key={tab}
          onClick={() => onTabChange(tab)}
          variant={currentTab === tab ? "success" : "secondary"}
          size="sm"
        >
          {tab === "all" ? "All classes" : `${tab.charAt(0).toUpperCase() + tab.slice(1)} classes`}
        </Button>
      ))}
    </div>
  );
}
